import { z } from 'zod';


export const EditProductSchema = z.object({
        
    quantity: z.number().int().positive().min(1,{message:"La cantidad debe de ser 1 o más"} ),
})    
        
export type EditProduct = z.infer<typeof EditProductSchema>;
