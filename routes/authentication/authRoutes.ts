import { Request, Response } from "express";
import { IUser } from "./auth-types";

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../../src/database');


const router = express.Router();

router.post('/login', async (req: Request<{}, {}, IUser>, res: Response) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).send('Username and password are required');
        }

        const user = await pool.query('SELECT * FROM USERS WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(404).send('Invalid username or password');
        }

        const match: boolean = await bcrypt.compare(password, user.rows[0].password_hash);

        if (match === false) {
            return res.status(401).send('Invalid username or password');
        }

        if (!process.env.JWT_SECRET) {  
            return res.status(500).send('Server configuration error');
        }
        
        // Generate JWT token
        const token: string = jwt.sign({ userId: user.rows[0].id}, process.env.JWT_SECRET , {expiresIn: '1h'});
        res.json({ token } );
    } catch (error) {

        console.error('Login error:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;