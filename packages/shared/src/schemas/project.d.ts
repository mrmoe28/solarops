import { z } from 'zod';
export declare const createProjectSchema: z.ZodObject<{
    name: z.ZodString;
    address: z.ZodString;
    city: z.ZodString;
    state: z.ZodString;
    zipCode: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    state: string;
    address: string;
    city: string;
    zipCode: string;
}, {
    name: string;
    state: string;
    address: string;
    city: string;
    zipCode: string;
}>;
export declare const updateProjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    state: z.ZodOptional<z.ZodString>;
    zipCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    state?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    zipCode?: string | undefined;
}, {
    name?: string | undefined;
    state?: string | undefined;
    address?: string | undefined;
    city?: string | undefined;
    zipCode?: string | undefined;
}>;
export declare const projectIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
//# sourceMappingURL=project.d.ts.map