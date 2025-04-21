import { asc } from "drizzle-orm";

import { db } from "@/src/db";
import { seeder } from "@/src/db/schemas";
import { TransactionType } from "@/src/db/types";

export const seedList: {
  [key: string]: (tx: TransactionType) => Promise<void>;
} = {
  // Add seeders here
};

export const runSeeders = async () => {
  const runSeeds = await db.query.seeder.findMany({
    orderBy: [asc(seeder.localId)],
  });
  await db.transaction(async (tx) => {
    try {
      const keys = Object.keys(seedList);
      for await (const key of keys) {
        if (runSeeds.some((s) => s.name === key)) {
          console.log(`[db/seeders] Seeder ${key} already exists`);
          continue;
        }
        await seedList[key](tx);
        await tx.insert(seeder).values({ name: key });
        console.log(`[db/seeders] Seeder ${key} successfully run`);
      }
    } catch (e) {
      console.error("[db/seeders] Error running seeders");
      console.error(e);
      await tx.rollback();
    }
  });
};
