import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const signupSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});
export const formSchema = z.object({
  videos: z
    .object({
      videoId: z.string().min(1),
      defaultThumbnail: z.string(),
      thumbnail: z.string().min(1).optional(),
      title: z.string().min(1),
    })
    .array(),
  thumbnail: z.string().optional(),
  title: z.string().min(1),
  description: z.string().min(1),
});
export { loginSchema };
