import { ZodObject } from "zod";

/**
 * Validate object against schema
 * @param schema - Zod schema
 * @param object - Object to validate
 * @returns - Zod validation result
 */

export const validateSchema = (schema: ZodObject<any>, object: any) => {
  return schema.safeParse(object);
}