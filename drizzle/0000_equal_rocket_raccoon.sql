CREATE TYPE "public"."lead_status" AS ENUM('new', 'contacted', 'quoted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."lead_type" AS ENUM('quote', 'contact', 'procurement');--> statement-breakpoint
CREATE TYPE "public"."mpesa_status" AS ENUM('pending', 'success', 'failed');--> statement-breakpoint
CREATE TYPE "public"."project_sector" AS ENUM('residential', 'commercial', 'civil', 'renovation');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('completed', 'ongoing');--> statement-breakpoint
CREATE TABLE "estimator_leads" (
	"id" text PRIMARY KEY NOT NULL,
	"project_type" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit" text NOT NULL,
	"estimated_range" text NOT NULL,
	"name" text,
	"phone" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "insights" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" text NOT NULL,
	"published_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reading_time" integer NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "insights_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "leads" (
	"id" text PRIMARY KEY NOT NULL,
	"type" "lead_type" NOT NULL,
	"name" text NOT NULL,
	"phone" text,
	"email" text,
	"project_type" text,
	"location" text,
	"budget_range" text,
	"timeline" text,
	"message" text,
	"source_page" text,
	"status" "lead_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mpesa_transactions" (
	"id" text PRIMARY KEY NOT NULL,
	"checkout_request_id" text NOT NULL,
	"merchant_request_id" text,
	"amount" integer NOT NULL,
	"phone" text NOT NULL,
	"account_reference" text NOT NULL,
	"status" "mpesa_status" DEFAULT 'pending' NOT NULL,
	"result_code" text,
	"result_desc" text,
	"mpesa_receipt" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "mpesa_transactions_checkout_request_id_unique" UNIQUE("checkout_request_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"sector" "project_sector" NOT NULL,
	"location" text NOT NULL,
	"county" text NOT NULL,
	"year" integer,
	"duration" text,
	"role" text,
	"contract_band" text,
	"status" "project_status" DEFAULT 'completed' NOT NULL,
	"summary" text,
	"scope" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"cover_image" text,
	"gallery" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"before_image" text,
	"after_image" text,
	"featured" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"includes" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"timeline" text,
	"cost_range" text,
	"icon" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"deleted_at" timestamp with time zone,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "testimonials" (
	"id" text PRIMARY KEY NOT NULL,
	"quote" text NOT NULL,
	"client_name" text NOT NULL,
	"project_location" text NOT NULL,
	"project_id" text,
	"featured" boolean DEFAULT false NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "estimator_leads_created_at_idx" ON "estimator_leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "leads_type_idx" ON "leads" USING btree ("type");--> statement-breakpoint
CREATE INDEX "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leads_created_at_idx" ON "leads" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "mpesa_transactions_status_idx" ON "mpesa_transactions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "projects_county_idx" ON "projects" USING btree ("county");--> statement-breakpoint
CREATE INDEX "projects_sector_idx" ON "projects" USING btree ("sector");--> statement-breakpoint
CREATE INDEX "projects_featured_idx" ON "projects" USING btree ("featured");