import postgres from "postgres";
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres({
    hostname: process.env.DBHOST as string,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME as string,
})

const db = drizzle(sql);

export default db;