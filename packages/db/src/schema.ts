import {
  pgTable,
  text,
  timestamp,
  integer,
  serial,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const user = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  image: text('image'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const room = pgTable('room', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  adminId: text('adminId')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
    .$onUpdate(() => new Date())
    .notNull(),
});

export const chat = pgTable(
  'chat',
  {
    id: serial('id').primaryKey(),
    roomId: integer('roomId')
      .notNull()
      .references(() => room.id, { onDelete: 'cascade' }),
    userId: text('userId')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    message: text('message').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'date' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updatedAt', { precision: 3, mode: 'date' })
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    roomIdIdx: index('chat_roomId_idx').on(table.roomId),
    userIdIdx: index('chat_userId_idx').on(table.userId),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  rooms: many(room),
  chats: many(chat),
}));

export const roomRelations = relations(room, ({ one, many }) => ({
  admin: one(user, {
    fields: [room.adminId],
    references: [user.id],
  }),
  chats: many(chat),
}));

export const chatRelations = relations(chat, ({ one }) => ({
  room: one(room, {
    fields: [chat.roomId],
    references: [room.id],
  }),
  user: one(user, {
    fields: [chat.userId],
    references: [user.id],
  }),
}));
