import { ExpoSQLiteDatabase, drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteDatabase } from "expo-sqlite";
import { Platform } from "react-native";

// TODO: for web support
// import { SubClassedDexie } from "@/src/db/dexie";
import * as schemas from "@/src/db/schemas";

const name = "localdb.db";

export let db: ExpoSQLiteDatabase<typeof schemas>;
export let expoDb: SQLiteDatabase;
// export const dexie = new SubClassedDexie(name);

if (Platform.OS !== "web") {
  expoDb = openDatabaseSync(name);
  db = drizzle(expoDb, {
    schema: schemas,
  });
}
