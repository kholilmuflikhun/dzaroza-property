import { publicEnvSchema } from "./env-schema";

export function getPublicEnv(env: NodeJS.ProcessEnv = process.env) {
  return publicEnvSchema.parse(env);
}
