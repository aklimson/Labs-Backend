import db from '../config/database.js';

class TasksModel {
    // Get all tasks
    static async getAll() {
        const con = await db.getConnection();
        const sql = 'SELECT * FROM tasks';
        const [rows] = await con.execute(sql);
        return rows;
    }

    // Get one task by id
    static async getById(id) {
        const con = await db.getConnection();
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        const [rows] = await con.execute(sql, [id]);
        return rows[0];
    }

    // Create a new task
    static async create(task) {
        const con = await db.getConnection();
        const sql = `
            INSERT INTO tasks (title, description, completed)
            VALUES (?, ?, ?)
        `;
        const [result] = await con.execute(sql, [
            task.title,
            task.description ?? null,
            task.completed ?? false
        ]);

        return {
            id: result.insertId,
            title: task.title,
            description: task.description ?? null,
            completed: task.completed ?? false
        };
    }

    // Update a task
    static async update(id, task) {
        const con = await db.getConnection();
        const sql = `
            UPDATE tasks
            SET title = ?, description = ?, completed = ?
            WHERE id = ?
        `;
        const [result] = await con.execute(sql, [
            task.title,
            task.description ?? null,
            task.completed ?? false,
            id
        ]);
        return result.affectedRows;
    }

    // Delete a task
    static async delete(id) {
        const con = await db.getConnection();
        const sql = 'DELETE FROM tasks WHERE id = ?';
        const [result] = await con.execute(sql, [id]);
        return result.affectedRows;
    }
}

export default TasksModel;