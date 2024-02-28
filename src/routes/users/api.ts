import express from 'express';
import validateSchema from '../../middlewares/validate-schema';
import { loginSchema, registerSchema } from './schema';
import { getUser, registerUser, verifyLogin } from './helpers';

const router = express.Router();

router.post('/register', validateSchema(registerSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await getUser(email);
        if (user) {
            res.status(409).send('Email is already registered!');
        }

        await registerUser(name, email, password);
        // TODO: add email verification
        res.status(201).send('User registered successfully!');
    } catch (err) {
        res.status(500)
    }
    res.end();
})

router.post('/login', validateSchema(loginSchema), async (req, res) => {
    const { email, password } = req.body;
    
    const user = await verifyLogin(email, password);

    //TODO: create access & refresh tokens


    res.json(user);
})

export default router;