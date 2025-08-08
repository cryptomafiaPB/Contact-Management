import z from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });


const envSchema = z.object({
    PORT: z.string().transform(Number).default(3000),
    CORS_ORIGIN: z.url().default('http://localhost:5173'),
    RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default(60000),
    RATE_LIMIT_MAX: z.string().transform(Number).default(10),
    ENVIRONMENT: z.enum(['development', 'production']).default('development'),
})

// This function is used to validate the environment variables
function createEnv(env: NodeJS.ProcessEnv) {
    const validationResult = envSchema.safeParse(env); // parse the env

    if (!validationResult.success) { // if Invalid
        console.error("Invalid environment variables:", validationResult.error.message);
        throw new Error("Invalid environment variables: " + validationResult?.error.message);
    }
    return validationResult.data;
}

export const env = createEnv(process.env);