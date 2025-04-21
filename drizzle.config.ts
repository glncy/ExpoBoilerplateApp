import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;
