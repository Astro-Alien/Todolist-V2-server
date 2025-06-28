import { ITaskBody} from "./requester-types";
const express = require('express');
const authentication = require('../../middleware/auth');
const pool = require('../../src/database');

const router = express.Router();

//create a new task
router.post('/createTask', authentication, async (req:any, res:any) => {
    try {
        const {title, description}: ITaskBody = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }

        const userId: number = req.user.id; 

        if (!userId) {
            return res.status(400).json({ error: 'User id is missing or invalid' });
        }

        const result = await pool.query(
            'INSERT INTO tasks (title, description, user_id) VALUES($1,$2,$3) RETURING *',
            [title, description, userId]
        );

        res.json(result.rows[0]);
    }catch (error: any) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
    }
});

//Get all tasks
router.get('/getTasks', authentication, async (req: any, res: any) => {
    try {
        const userId: number = req.user.userId;
        
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        //update the generic type to an iterface that matches the task structure
        const result = await pool.query(
            'SELECT * FROM tasks WHERE user_id = $1',
            [userId]
        )
        return res.json(result.rows);
    }catch(error: any) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: error.message });
    }
})