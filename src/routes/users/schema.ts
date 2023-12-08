import { z } from 'zod';

export const registerSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Please enter name!' }),
        email: z.string({ required_error: 'Please enter email!' }).email(),
        password: z.string({ required_error: 'Please enter a password!'})
            .min(8, 'Password must be at least 8 characters!'),
    })
})