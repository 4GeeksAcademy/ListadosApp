from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, List, Task
from api.utils import APIException
from flask_cors import CORS
from .auth_decorator import requires_auth


api = Blueprint('api', __name__)
CORS(api)

########################################
# USER ENDPOINTS
########################################

def get_or_create_user(auth0_user_id, email=None):
    user = User.query.filter_by(auth0_user_id=auth0_user_id).first()
    if not user:
        user = User(auth0_user_id=auth0_user_id, email=email, is_active=True)
        db.session.add(user)
        db.session.commit()
    return user


@api.route('/user', methods=['GET'])
@requires_auth
def get_current_user():
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id, email=current_user.get("email"))
    return jsonify(user.serialize()), 200

@api.route('/user', methods=['PUT'])
@requires_auth
def update_user():
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id, email=current_user.get("email"))

    data = request.get_json()
    if "email" in data:
        user.email = data["email"]
    if "is_active" in data:
        user.is_active = data["is_active"]

    db.session.commit()
    return jsonify(user.serialize()), 200

@api.route('/user', methods=['DELETE'])
@requires_auth
def delete_user():
    # Esta ruta podría "desactivar" el usuario localmente,
    # pero Auth0 controla la cuenta real.
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = User.query.filter_by(auth0_user_id=auth0_user_id).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404
    # Desactivamos el usuario en lugar de borrarlo físicamente
    user.is_active = False
    db.session.commit()
    return jsonify({"msg": "User deactivated"}), 200

########################################
# LIST ENDPOINTS
########################################

@api.route('/lists', methods=['GET'])
@requires_auth
def get_lists():
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id, email=current_user.get("email"))

    lists = List.query.filter_by(user_id=user.id).all()
    return jsonify([l.serialize() for l in lists]), 200

@api.route('/lists/<int:list_id>', methods=['GET'])
@requires_auth
def get_list(list_id):
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    lista = List.query.filter_by(id=list_id, user_id=user.id).first()
    if not lista:
        return jsonify({"msg": "List not found"}), 404
    return jsonify(lista.serialize()), 200

@api.route('/lists', methods=['POST'])
@requires_auth
def create_list():
    data = request.get_json()
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id, email=current_user.get("email"))

    new_list = List(
        user_id=user.id,
        type=data.get("type", "tareas"), # tipo por defecto
        name=data.get("name", "Mi Lista")
    )
    db.session.add(new_list)
    db.session.commit()
    return jsonify(new_list.serialize()), 201

@api.route('/lists/<int:list_id>', methods=['PUT'])
@requires_auth
def update_list(list_id):
    data = request.get_json()
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    lista = List.query.filter_by(id=list_id, user_id=user.id).first()
    if not lista:
        return jsonify({"msg": "List not found or not authorized"}), 404

    if "type" in data:
        lista.type = data["type"]
    if "name" in data:
        lista.name = data["name"]

    db.session.commit()
    return jsonify(lista.serialize()), 200

@api.route('/lists/<int:list_id>', methods=['DELETE'])
@requires_auth
def delete_list(list_id):
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    lista = List.query.filter_by(id=list_id, user_id=user.id).first()
    if not lista:
        return jsonify({"msg": "List not found or not authorized"}), 404
    db.session.delete(lista)
    db.session.commit()
    return jsonify({"msg": "List deleted"}), 200

########################################
# TASK ENDPOINTS
########################################

@api.route('/lists/<int:list_id>/tasks', methods=['GET'])
@requires_auth
def get_tasks_for_list(list_id):
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    lista = List.query.filter_by(id=list_id, user_id=user.id).first()
    if not lista:
        return jsonify({"msg": "List not found or not authorized"}), 404

    tasks = Task.query.filter_by(list_id=lista.id).all()
    return jsonify([t.serialize() for t in tasks]), 200

@api.route('/lists/<int:list_id>/tasks', methods=['POST'])
@requires_auth
def create_task_in_list(list_id):
    data = request.get_json()
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    lista = List.query.filter_by(id=list_id, user_id=user.id).first()
    if not lista:
        return jsonify({"msg": "List not found or not authorized"}), 404

    new_task = Task(
        list_id=lista.id,
        title=data.get("title", "Nueva Tarea"),
        is_important=data.get("is_important", False),
        is_completed=data.get("is_completed", False),
        price=data.get("price") # Puede ser None si no se provee
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.serialize()), 201

@api.route('/tasks/<int:task_id>', methods=['GET'])
@requires_auth
def get_task(task_id):
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"msg": "Task not found"}), 404

    # Verificar si la tarea pertenece a una lista del usuario
    lista = List.query.get(task.list_id)
    if lista.user_id != user.id:
        return jsonify({"msg": "Not authorized"}), 403

    return jsonify(task.serialize()), 200

@api.route('/tasks/<int:task_id>', methods=['PUT'])
@requires_auth
def update_task(task_id):
    data = request.get_json()
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"msg": "Task not found"}), 404

    lista = List.query.get(task.list_id)
    if lista.user_id != user.id:
        return jsonify({"msg": "Not authorized"}), 403

    # Actualizar campos editables
    if "title" in data:
        task.title = data["title"]
    if "is_completed" in data:
        task.is_completed = data["is_completed"]
    if "is_important" in data:
        task.is_important = data["is_important"]
    if "price" in data:
        task.price = data["price"]

    db.session.commit()
    return jsonify(task.serialize()), 200

@api.route('/tasks/<int:task_id>', methods=['DELETE'])
@requires_auth
def delete_task(task_id):
    current_user = request.current_user
    auth0_user_id = current_user["sub"]
    user = get_or_create_user(auth0_user_id)

    task = Task.query.get(task_id)
    if not task:
        return jsonify({"msg": "Task not found"}), 404

    lista = List.query.get(task.list_id)
    if lista.user_id != user.id:
        return jsonify({"msg": "Not authorized"}), 403

    db.session.delete(task)
    db.session.commit()
    return jsonify({"msg": "Task deleted"}), 200
