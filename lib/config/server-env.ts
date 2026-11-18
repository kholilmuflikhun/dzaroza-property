import "server-only";
import { serverEnvSchema } from "./env-schema";

export function getServerEnv(env: NodeJS.ProcessEnv = process.env) {
  return serverEnvSchema.parse(env);
}
