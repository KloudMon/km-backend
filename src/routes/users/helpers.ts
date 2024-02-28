import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import db from "../../db"
import user, { UserSelect } from "../../models/user"
import { UnauthorizedError } from "../../utils/errors";

export const getUser = async (email: string) => {
    return (await db.select().from(user).where(eq(user.email, email)))[0];
}

export const registerUser = async (name: string, email: string, password: string) => {
    const encrypted_password = await bcrypt.hash(password, 10);
    return await db.insert(user).values({ name, email, encrypted_password });
}

export const verifyLogin = async (email: string, password: string): Promise<UserSelect> => {
    const user = await getUser(email);

    if (!user) throw new UnauthorizedError("Invalid email or password!");

    const passwordIsValid = await bcrypt.compare(password, user.encrypted_password);
    if (!passwordIsValid) throw new UnauthorizedError("Invalid email or password!");

    return user;
}