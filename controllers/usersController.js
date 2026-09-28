import db from "../database/db.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET;


export async function createUser(req, res) {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "username, email and password are required"
        });
    }
    
    const existingUser = db.prepare(`
        SELECT id
        FROM users
        WHERE username = ? or email = ?
        `).get(username, email);
    
    if(existingUser) {
        return res.status(409).json({
            message: "username or email already exists"
        });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);

    const stmt = db.prepare(`
        INSERT INTO users(username, email, password)
        VALUES(?, ?, ?)
        `);
    const user = stmt.run(username, email, encryptedPassword);
    
    const token = JWT.sign({id: user.lastInsertRowid, username, email},
        JWT_SECRET,
        { expiresIn: "1h" }
    )
    
    return res.status(200).json({
        message: "new user account created successfully",
        token
    });
}

export function getUserData(req, res) {
    const userId = req.user.id;

    const user = db.prepare(`
        SELECT * FROM users
        WHERE id = ?
        `).get(userId);

    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    
    return res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
    });
    
}
export async function login(req, res) {
    const {username, password} = req.body;

    if(!username || !password) {
        return res.status(400).json({
            message: "Username and password are required to log in"
        });
    }
    const user = db.prepare(`
        SELECT * 
        FROM users
        WHERE username = ?
        `).get(username);

    if (!user) {
        return res.status(401).json({
            message: "invalid password or username"
        });
    }

    const verification = await bcrypt.compare(password, user.password);

    if(!verification) {
        return res.status(400).json({
            message: "invalid password or username"
        });
    }
    const token = JWT.sign({id: user.id, username: user.username, email: user.email},
        JWT_SECRET,
        { expiresIn: "1h" }
    )
    return res.status(200).json({message: "You logged in successfully", token});
}