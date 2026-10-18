import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { ulid } from "ulid";

/**
 * ULIDs are generated in the application so primary keys stay time-ordered
 * without a database extension. Columns are snake_case. Content the firm
 * edits is soft-deleted via deleted_at; leads and payments are kept.
 */

const emptyTextArray = sql`ARRAY[]::text[]`;

function id() {
  return text("id")
    .primaryKey()
    .$defaultFn(() => ulid());
}

function createdAt() {
  return timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow();
}

function updatedAt() {
  return timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date());
}

function deletedAt() {
  return timestamp("deleted_at", { withTimezone: true, mode: "date" });
}

export const projectSector = pgEnum("project_sector", [
  "residential",
  "commercial",
  "civil",
  "renovation",
]);

export const projectStatus = pgEnum("project_status", [
  "completed",
  "ongoing",
]);

export const leadType = pgEnum("lead_type", [
  "quote",
  "contact",
  "procurement",
]);

export const leadStatus = pgEnum("lead_status", [
  "new",
  "contacted",
  "quoted",
  "closed",
]);

export const mpesaStatus = pgEnum("mpesa_status", [
  "pending",
  "success",
  "failed",
]);

export const projects = pgTable(
  "projects",
  {
    id: id(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    sector: projectSector("sector").notNull(),
    location: text("location").notNull(),
    county: text("county").notNull(),
    year: integer("year"),
    duration: text("duration"),
    role: text("role"),
    contractBand: text("contract_band"),
    status: projectStatus("status").notNull().default("completed"),
    summary: text("summary"),
    scope: text("scope").array().notNull().default(emptyTextArray),
    coverImage: text("cover_image"),
    gallery: text("gallery").array().notNull().default(emptyTextArray),
    beforeImage: text("before_image"),
    afterImage: text("after_image"),
    latitude: doublePrecision("latitude"),
    longitude: doublePrecision("longitude"),
    featured: boolean("featured").notNull().default(false),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
    deletedAt: deletedAt(),
  },
  (table) => [
    index("projects_county_idx").on(table.county),
    index("projects_sector_idx").on(table.sector),
    index("projects_featured_idx").on(table.featured),
  ],
);

export const services = pgTable("services", {
  id: id(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  includes: text("includes").array().notNull().default(emptyTextArray),
  timeline: text("timeline"),
  costRange: text("cost_range"),
  icon: text("icon").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  deletedAt: deletedAt(),
});

export const insights = pgTable("insights", {
  id: id(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  publishedAt: timestamp("published_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  readingTime: integer("reading_time").notNull(),
  deletedAt: deletedAt(),
});

export const leads = pgTable(
  "leads",
  {
    id: id(),
    type: leadType("type").notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    email: text("email"),
    projectType: text("project_type"),
    location: text("location"),
    budgetRange: text("budget_range"),
    timeline: text("timeline"),
    message: text("message"),
    sourcePage: text("source_page"),
    status: leadStatus("status").notNull().default("new"),
    createdAt: createdAt(),
  },
  (table) => [
    index("leads_type_idx").on(table.type),
    index("leads_status_idx").on(table.status),
    index("leads_created_at_idx").on(table.createdAt),
  ],
);

export const estimatorLeads = pgTable(
  "estimator_leads",
  {
    id: id(),
    projectType: text("project_type").notNull(),
    quantity: integer("quantity").notNull(),
    unit: text("unit").notNull(),
    estimatedRange: text("estimated_range").notNull(),
    name: text("name"),
    phone: text("phone"),
    createdAt: createdAt(),
  },
  (table) => [index("estimator_leads_created_at_idx").on(table.createdAt)],
);

export const mpesaTransactions = pgTable(
  "mpesa_transactions",
  {
    id: id(),
    checkoutRequestId: text("checkout_request_id").notNull().unique(),
    merchantRequestId: text("merchant_request_id"),
    amount: integer("amount").notNull(),
    phone: text("phone").notNull(),
    /**
     * Shown on the STK prompt. Pesafy sends at most 12 characters,
     * so writers must keep this short (for example C7K2MPQ9X1A).
     */
    accountReference: text("account_reference").notNull(),
    status: mpesaStatus("status").notNull().default("pending"),
    resultCode: text("result_code"),
    resultDesc: text("result_desc"),
    /** Safaricom receipt, present only after a successful callback. */
    mpesaReceipt: text("mpesa_receipt"),
    createdAt: createdAt(),
  },
  (table) => [index("mpesa_transactions_status_idx").on(table.status)],
);

export const testimonials = pgTable("testimonials", {
  id: id(),
  quote: text("quote").notNull(),
  clientName: text("client_name").notNull(),
  projectLocation: text("project_location").notNull(),
  projectId: text("project_id").references(() => projects.id, {
    onDelete: "set null",
  }),
  featured: boolean("featured").notNull().default(false),
  deletedAt: deletedAt(),
});
