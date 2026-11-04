import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const requests = sqliteTable('baggage_requests', {
 id: text('id').primaryKey(), secret: text('secret').notNull(), name: text('name').notNull(), contact: text('contact').notNull(), flight: text('flight').notNull(), date: text('arrival_date').notNull(), time: text('arrival_time').notNull(), people: integer('people').notNull(), bags: integer('bags').notNull(), language: text('language').notNull(), note: text('note').notNull(), status: text('status').notNull().default('pending'), created: text('created').notNull(), updated: text('updated').notNull()
});
export const events = sqliteTable('request_events', { id:text('id').primaryKey(), requestId:text('request_id').notNull(), status:text('status').notNull(), actor:text('actor').notNull(), at:text('at').notNull() });
