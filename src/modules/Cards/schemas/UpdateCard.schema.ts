import { z } from "zod";
import { convertCRToISO, stripTimeFromDateTimeLocal } from "../../../utils/date.utils";

export const UpdateCardSchema = z.object({
    money: z.number().int().min(1, { message: "La cantidad debe ser 1 o más" }).optional(),

    expiration_Date: z
        .union([
            z.string().length(0),   
            z.string().min(1)       
        ])
        .transform((val) => {
            if (!val || val.length === 0) return undefined; 

            if (val.includes("/")) return convertCRToISO(val);

            if (val.includes("T")) return stripTimeFromDateTimeLocal(val);

            return val;
        })
        .refine((v) => {
            if (!v) return true; 
            return /^\d{4}-\d{2}-\d{2}$/.test(v);
        }, {
            message: "Formato de fecha inválido. Usa DD/MM/YYYY o datetime-local"
        })
        .optional(),
});

export type UpdateFormCard = z.infer<typeof UpdateCardSchema>;
