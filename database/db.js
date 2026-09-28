import Database from "better-sqlite3";

const db = new Database("library");

const usersTable = db.prepare(`
    SELECT sql
    FROM sqlite_master
    WHERE type = 'table' AND name = 'users'
`).get();

if (usersTable && usersTable.sql.includes("id INTERGER")) {
    const migrateUsers = db.transaction(() => {
        db.exec(`
            ALTER TABLE users RENAME TO users_old;

            CREATE TABLE users (
                id INTEGER PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user'
            );

            INSERT INTO users(username, email, password, role)
            SELECT username, email, password, role
            FROM users_old;

            DROP TABLE users_old;
        `);
    });

    migrateUsers();
}

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user'
    )
    `)

export default db;