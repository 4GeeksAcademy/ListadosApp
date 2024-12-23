const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            tasks: [], // Aseguramos que las tareas se inicialicen correctamente
        },
        actions: {
            // Obtener todas las tareas para una lista
            getTasksForList: async (token, listId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/lists/${listId}/tasks`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (resp.ok) {
                        const tasks = await resp.json();
                        setStore({ tasks });
                    } else {
                        console.log("Error obteniendo las tareas");
                    }
                } catch (error) {
                    console.log("Error obteniendo las tareas:", error);
                }
            },

            // Agregar una nueva tarea
            createTask: async (token, listId, taskData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/lists/${listId}/tasks`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(taskData),
                    });
                    if (resp.ok) {
                        const newTask = await resp.json();
                        const store = getStore();
                        setStore({ tasks: [...store.tasks, newTask] });
                    } else {
                        console.log("Error creando la tarea");
                    }
                } catch (error) {
                    console.log("Error creando la tarea:", error);
                }
            },

            // Eliminar una tarea
            deleteTask: async (token, taskId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tasks/${taskId}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (resp.ok) {
                        const store = getStore();
                        const tasks = store.tasks.filter((task) => task.id !== taskId);
                        setStore({ tasks });
                    } else {
                        console.log("Error eliminando la tarea");
                    }
                } catch (error) {
                    console.log("Error eliminando la tarea:", error);
                }
            },
        },
    };
};

export default getState;
