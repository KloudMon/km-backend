import express from 'express';
import validateSchema from '../../middlewares/validate-schema';
import { registerSchema } from './schema';
import { getUser, registerUser } from './helpers';

const router = express.Router();

router.post('/register', validateSchema(registerSchema), async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log({ name, email, password });

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

router.post('/login', (req, res) => {
    // TODO: add login API
    res.send('WIP');
})

export default router;