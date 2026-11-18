import { serverEnvSchema } from "./env-schema";

/** Import this module exclusively from server components and route handlers. */
export function getServerEnv(env: NodeJS.ProcessEnv = process.env) {
  return serverEnvSchema.parse(env);
}
