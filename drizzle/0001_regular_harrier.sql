ALTER TABLE "users" RENAME COLUMN "password_hash" TO "encrypted_password";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_confirmed_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "confirmation_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "confirmation_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "recovery_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "recovery_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_sign_in_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3) NOT NULL;