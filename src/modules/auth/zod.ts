import { z } from "zod";

/**
 * Validador a nivel de formulario para @tanstack/react-form.
 * Lo usas como: validators: { onSubmit: zodForm(Schema) }
 * Devuelve undefined si no hay errores, o un objeto de errores por campo.
 */
export const zodForm = <T extends z.ZodTypeAny>(schema: T) => {
    return ({ value }: { value: unknown }) => {
        const result = schema.safeParse(value);
        if (result.success) return undefined;

        // Mapea los issues de Zod a un objeto { [campo]: string[] }
        const fieldErrors: Record<string, string[]> = {};
        for (const issue of result.error.issues) {
            const key = issue.path.join(".") || "form";
            if (!fieldErrors[key]) fieldErrors[key] = [];
            fieldErrors[key].push(issue.message);
        }
        return fieldErrors;
    };
};

/**
 * Validador a nivel de campo para @tanstack/react-form.
 * Lo usas como: validators: { onChange: zodField(z.string().min(1)) }
 * Devuelve undefined o string[] de errores.
 */
export const zodField = <T extends z.ZodTypeAny>(schema: T) => {
    return ({ value }: { value: unknown }) => {
        const res = schema.safeParse(value);
        return res.success ? undefined : res.error.issues.map((i) => i.message);
    };
};
