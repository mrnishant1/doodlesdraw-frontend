import { email, z } from "zod";

export const loginSchema = z.object({
  email: z.email({error:"Invalid email format"}),
  password: z.string().min(6, { error: "Too short! min 6 digit" }),
});

export const roomschema = z.object({
    roomcode: z.string().min(1,{ error: "Too short! min 1 digit" }),
    userId: z.string(),
    intent: z.enum(["signin", "signup"]).default("signin"),
    password: z.string().min(6, { error: "Too short! min 6 digit" }).max(10,{ error: "Too short! max 10 digit" }).optional(),
})

export const createRoomSchema = z.object({
    roomcode: z.string().max(10, { error: "Too short! max 10 digit" }).min(1,{ error: "Too short! min 1 digit" }),
    userId: z.string(),
    isPrivate: z.boolean(),
    password: z.string().min(6, { error: "Too short! min 6 digit" }).max(10,{ error: "Too short! max 10 digit" }).optional(),
})