import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { eq } from "drizzle-orm";
import { createId } from "@/lib/ids";
import { getDb } from "@/src/db";
import {
  estimatorLeads,
  leads,
  mpesaTransactions,
} from "@/src/db/schema";

type LeadInsert = typeof leads.$inferInsert;
type EstimatorInsert = typeof estimatorLeads.$inferInsert;
type MpesaInsert = typeof mpesaTransactions.$inferInsert;

type LocalStore = {
  leads: LeadInsert[];
  estimatorLeads: EstimatorInsert[];
  mpesaTransactions: MpesaInsert[];
};

const filePath = path.join(process.cwd(), "data", "local-records.json");

function databaseEnabled() {
  return Boolean(process.env.DATABASE_URL);
}

async function readLocal(): Promise<LocalStore> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as LocalStore;
    return {
      leads: parsed.leads ?? [],
      estimatorLeads: parsed.estimatorLeads ?? [],
      mpesaTransactions: parsed.mpesaTransactions ?? [],
    };
  } catch {
    return { leads: [], estimatorLeads: [], mpesaTransactions: [] };
  }
}

async function writeLocal(store: LocalStore) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(store, null, 2));
}

export async function insertLead(values: LeadInsert) {
  const row = { ...values, id: values.id ?? createId() };
  if (databaseEnabled()) {
    await getDb().insert(leads).values(row);
    return row;
  }
  const store = await readLocal();
  store.leads.unshift(row);
  await writeLocal(store);
  return row;
}

export async function insertEstimatorLead(values: EstimatorInsert) {
  const row = { ...values, id: values.id ?? createId() };
  if (databaseEnabled()) {
    await getDb().insert(estimatorLeads).values(row);
    return row;
  }
  const store = await readLocal();
  store.estimatorLeads.unshift(row);
  await writeLocal(store);
  return row;
}

export async function insertMpesaTransaction(values: MpesaInsert) {
  const row = { ...values, id: values.id ?? createId() };
  if (databaseEnabled()) {
    await getDb().insert(mpesaTransactions).values(row);
    return row;
  }
  const store = await readLocal();
  store.mpesaTransactions.unshift(row);
  await writeLocal(store);
  return row;
}

export async function updateMpesaByCheckout(input: {
  checkoutRequestId: string;
  merchantRequestId?: string | null;
  status: "pending" | "success" | "failed";
  resultCode?: string | null;
  resultDesc?: string | null;
  mpesaReceipt?: string | null;
}) {
  if (databaseEnabled()) {
    await getDb()
      .update(mpesaTransactions)
      .set({
        merchantRequestId: input.merchantRequestId ?? undefined,
        status: input.status,
        resultCode: input.resultCode,
        resultDesc: input.resultDesc,
        mpesaReceipt: input.mpesaReceipt,
      })
      .where(eq(mpesaTransactions.checkoutRequestId, input.checkoutRequestId));
    return;
  }

  const store = await readLocal();
  store.mpesaTransactions = store.mpesaTransactions.map((row) =>
    row.checkoutRequestId === input.checkoutRequestId
      ? {
          ...row,
          merchantRequestId: input.merchantRequestId ?? row.merchantRequestId,
          status: input.status,
          resultCode: input.resultCode,
          resultDesc: input.resultDesc,
          mpesaReceipt: input.mpesaReceipt,
        }
      : row,
  );
  await writeLocal(store);
}
