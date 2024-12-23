from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    auth0_user_id = db.Column(db.String(120), unique=True, nullable=False)  # Guardar el user_id de Auth0 (sub)
    email = db.Column(db.String(120), unique=False, nullable=True)  # Opcional si se quiere guardar el email localmente
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)

    lists = db.relationship('List', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.auth0_user_id}>'

    def serialize(self):
        return {
            "id": self.id,
            "auth0_user_id": self.auth0_user_id,
            "email": self.email,
            "is_active": self.is_active
        }

class List(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)  # ejemplo: "compra", "tareas", "diligencias"
    name = db.Column(db.String(120), nullable=False)
    tasks = db.relationship('Task', backref='list', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "name": self.name,
            "tasks": [task.serialize() for task in self.tasks]
        }

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    list_id = db.Column(db.Integer, db.ForeignKey('list.id'), nullable=False)
    title = db.Column(db.String(120), nullable=False)
    is_completed = db.Column(db.Boolean, default=False)
    is_important = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            "id": self.id,
            "list_id": self.list_id,
            "title": self.title,
            "is_completed": self.is_completed,
            "is_important": self.is_important
        }
