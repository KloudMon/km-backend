import { pgTable, serial, text } from "drizzle-orm/pg-core";

const user = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    password_hash: text('password_hash').notNull(),
})

export default user;