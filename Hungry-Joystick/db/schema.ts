import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const cafeState = sqliteTable('cafe_state', {id:text('id').primaryKey(),value:text('value').notNull(),revision:integer('revision').notNull().default(0)});
