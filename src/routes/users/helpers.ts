import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import db from "../../db"
import user from "../../models/user"

export const getUser = async (email: string) => {
    return (await db.select().from(user).where(eq(user.email, email)))[0];
}

export const registerUser = async (name: string, email: string, password: string) => {
    const encrypted_password = await bcrypt.hash(password, 10);
    return await db.insert(user).values({ name, email, encrypted_password });
}