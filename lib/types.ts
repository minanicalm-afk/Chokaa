import type {
  estimatorLeads,
  insights,
  leads,
  mpesaTransactions,
  projectSector,
  projects,
  services,
  testimonials,
} from "@/src/db/schema";

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Service = typeof services.$inferSelect;
export type Insight = typeof insights.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type EstimatorLead = typeof estimatorLeads.$inferSelect;
export type MpesaTransaction = typeof mpesaTransactions.$inferSelect;
export type Testimonial = typeof testimonials.$inferSelect;

export type ProjectSector = (typeof projectSector.enumValues)[number];
