CREATE TABLE `request_events` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`status` text NOT NULL,
	`actor` text NOT NULL,
	`at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `baggage_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`secret` text NOT NULL,
	`name` text NOT NULL,
	`contact` text NOT NULL,
	`flight` text NOT NULL,
	`arrival_date` text NOT NULL,
	`arrival_time` text NOT NULL,
	`people` integer NOT NULL,
	`bags` integer NOT NULL,
	`language` text NOT NULL,
	`note` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created` text NOT NULL,
	`updated` text NOT NULL
);
