import { db } from "@/src/db";

export type TransactionType =
  | typeof db
  | Parameters<Parameters<typeof db.transaction>[0]>[0];

/**
 * Generic utility type that extracts property types from Drizzle query parameters.
 * @template K - Property key to extract from query parameters
 * @template TableQuery - The table query function type
 */
export type QueryPropType<K extends string, TableQuery> = 
  TableQuery extends (arg: infer T) => any
    ? T extends { [P in K]?: infer U } ? U : never
    : never;