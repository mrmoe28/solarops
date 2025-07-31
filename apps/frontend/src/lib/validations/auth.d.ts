import { z } from 'zod';
export declare const signInSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const signUpSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
    terms: z.ZodEffects<z.ZodBoolean, boolean, boolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}>, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}, {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
}>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
//# sourceMappingURL=auth.d.ts.map