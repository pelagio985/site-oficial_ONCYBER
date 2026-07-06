import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Define the 'users' table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'service_bookings' table for scheduled IT/Security Audits
export const serviceBookings = pgTable('service_bookings', {
  id: serial('id').primaryKey(),
  userId: text('user_uid').references(() => users.uid).notNull(),
  serviceName: text('service_name').notNull(),
  scheduledAt: text('scheduled_at').notNull(), // Format: YYYY-MM-DD
  status: text('status').notNull().default('Pendente'), // Pendente, Confirmado, Concluído
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define the 'workspace_actions' table to store logs of user operations
export const workspaceActions = pgTable('workspace_actions', {
  id: serial('id').primaryKey(),
  userId: text('user_uid').references(() => users.uid).notNull(),
  actionType: text('action_type').notNull(), // Drive, Calendar, Gmail, etc.
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(serviceBookings),
  actions: many(workspaceActions),
}));

export const serviceBookingsRelations = relations(serviceBookings, ({ one }) => ({
  user: one(users, {
    fields: [serviceBookings.userId],
    references: [users.uid],
  }),
}));

export const workspaceActionsRelations = relations(workspaceActions, ({ one }) => ({
  user: one(users, {
    fields: [workspaceActions.userId],
    references: [users.uid],
  }),
}));
