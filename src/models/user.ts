import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

const user = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    encrypted_password: text('encrypted_password').notNull(),
    email_confirmed_at: timestamp('email_confirmed_at'),
    confirmation_token: text('confirmation_token'),
    confirmation_sent_at: timestamp('confirmation_sent_at'),
    recovery_token: text('recovery_token'),
    recovery_sent_at: timestamp('recovery_sent_at'),
    last_sign_in_at: timestamp('last_sign_in_at'),
    deleted_at: timestamp('deleted_at'),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
    emailIdx: uniqueIndex("email_idx").on(table.email)
}))

export type UserInsert = typeof user.$inferInsert;
export type UserSelect = typeof user.$inferSelect;

export default user;