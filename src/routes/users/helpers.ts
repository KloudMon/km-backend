import { eq } from "drizzle-orm";
import bcrypt from 'bcrypt';
import db from "../../db"
import user, { UserSelect } from "../../models/user"
import { UnauthorizedError } from "../../utils/errors";
import jwt from "jsonwebtoken";
import { Response } from "express";

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

export const createAccessToken = (id: string, email: string, name: string) => {
    const payload = { id, email, name };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30m' });
}

export const createRefreshToken = (id: string, email: string, name: string) => {
    const payload = { id, email, name };
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 30);
    res.cookie('accessToken', accessToken, { httpOnly: true, expires: date, sameSite: 'none', secure: true });
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, expires: date, sameSite: 'none', secure: true });
};

export const verifyToken = (token: string): { id: string, email: string, name: string } => {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, email: string, name: string };
    return payload;
}
