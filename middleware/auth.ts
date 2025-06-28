const jwt = require('jsonwebtoken');
const util = require('util');

const verify = util.promisify(jwt.verify);

async function authenticateToken(req: any, res: any, next: any) {
    try {
        const authHeader: string = req.headers['authorization'];
        const token: string = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token is missing or invalid' });
        }

        //add a interface for the user object
        const user: any = await verify(token, process.env.JWT_SECRET);

        if (!user || !user.userId) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.user = user;
        next();

    } catch (error: any) {
        console.error('JWT verification error:', error);
        return res.sendStatus(403);
    }
}

module.exports = authenticateToken;