import { z } from 'zod';
export const createProjectSchema = z.object({
    name: z.string().trim().min(1, 'Project name is required'),
    address: z.string().trim().min(1, 'Address is required'),
    city: z.string().trim().min(1, 'City is required'),
    state: z.string().length(2, 'State is required'),
    zipCode: z
        .string()
        .trim()
        .regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
});
export const updateProjectSchema = createProjectSchema.partial();
export const projectIdSchema = z.object({
    id: z.string().uuid('Invalid project ID'),
});
