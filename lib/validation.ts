import {z} from 'zod';
export const leadSchema=z.object({name:z.string().min(2),email:z.string().email(),phone:z.string().min(10),eventDate:z.string().optional(),eventType:z.string().min(2),city:z.string().min(2),district:z.string().optional(),people:z.coerce.number().int().min(1),budget:z.coerce.number().min(0),notes:z.string().max(2000).optional(),listingId:z.string().optional()});
export const registerSchema=z.object({name:z.string().min(2),email:z.string().email(),password:z.string().min(8),role:z.enum(['CUSTOMER','COMPANY'])});
