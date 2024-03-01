import express from 'express';
import validateSchema from '../../middlewares/validate-schema';
import { loginSchema, registerSchema } from './schema';
import { createAccessToken, createRefreshToken, getUser, registerUser, setAccessTokenCookie, setRefreshTokenCookie, verifyLogin } from './helpers';
import { ConflictError } from '../../utils/errors';

const router = express.Router();

router.post('/register', validateSchema(registerSchema), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const user = await getUser(email);
        if (user) {
            throw new ConflictError('Email is already registered!');
        }

        await registerUser(name, email, password);
        // TODO: add email verification
        res.status(201).send('User registered successfully!');
    } catch (err) {
        next(err);
    }
})

router.post('/login', validateSchema(loginSchema), async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await verifyLogin(email, password);
    
        const accessToken = createAccessToken(String(user.id), user.email, user.name);
        const refreshToken = createRefreshToken(String(user.id), user.email, user.name);
    
        setAccessTokenCookie(res, accessToken);
        setRefreshTokenCookie(res, refreshToken);
    
        const { encrypted_password: _, ...userWithoutPassword } = user;
    
        res.json(userWithoutPassword);
    } catch (err) {
        next(err);
    }
})

export default router;