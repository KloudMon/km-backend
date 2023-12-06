import dotenv from 'dotenv';
import { Config } from 'drizzle-kit';

dotenv.config();

export default {
    schema: './src/models',
    out: './drizzle',
    driver: 'pg',
    dbCredentials: {
        host: process.env.DBHOST as string,
        port: Number(process.env.DBPORT),
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME as string,
    },
} satisfies Config;