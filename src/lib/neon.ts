import { neon } from "@neondatabase/serverless";

export const getNeon = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  const sql = neon(process.env.DATABASE_URL);
  return sql;
};
