import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    role: text("role").notNull(),
    password: text("password").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
});