import { SQL } from "bun";

export const pg = new SQL(process.env.DB_URL);