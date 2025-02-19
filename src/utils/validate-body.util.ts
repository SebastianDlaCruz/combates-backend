import { ZodObject } from "zod";

export const validateSchema = (schema: ZodObject<any>, object: any) => {
  return schema.safeParse(object);
}