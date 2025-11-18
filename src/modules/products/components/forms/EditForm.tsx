import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodForm, zodField } from "../../../auth/zod";
import { EditProductSchema, type EditProduct } from "../../schemas/EditProduct.schema";
import type { ProductResponse } from "../../../../models";
import { useUpdateProductQuantity } from "../../hooks/useUpdateProductQuantity";

type Props = {
    product: ProductResponse;
    onSuccess?: () => void;
    formUpdateId?: string;
    readOnlyCode?: boolean;
    onPendingChange?: (pending: boolean) => void;
};

export default function EditProductForm({
    product,
    onSuccess,
    formUpdateId = "update-product-form",
    onPendingChange,
}: Props) {

    const editQuantityForm = useUpdateProductQuantity(product.product_Id);

    const form = useForm({
        defaultValues: { quantity: 1 } as EditProduct,

        validators: {
            onSubmit: zodForm(EditProductSchema),
            onChange: zodForm(EditProductSchema),
        },

        onSubmit: async ({ value }) => {
            await editQuantityForm.mutateAsync({ quantity: value.quantity });
            if (onSuccess) onSuccess();
        },
    });

    useEffect(() => {
        if (onPendingChange) onPendingChange(editQuantityForm.isPending);
    }, [editQuantityForm.isPending, onPendingChange]);

    return (
        <form
            id={formUpdateId}
            noValidate
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className="space-y-6"
        >

            <form.Field
                name="quantity"
                validators={{
                    onBlur: zodField(EditProductSchema.shape.quantity),
                    onChange: zodField(EditProductSchema.shape.quantity),
                }}
            >
                {(field) => (
                    <div className="group">
                        <label
                            htmlFor="quantity"
                            className="text-sm font-semibold text-gray-200 mb-2 block"
                        >
                            Cantidad
                        </label>

                        <input
                            id="quantity"
                            type="number"
                            min={1}
                            step={1}
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(Math.max(1, Number(e.target.value)))}
                            onBlur={field.handleBlur}
                            className="w-full rounded-xl p-4 bg-slate-800/80 text-gray-100 
                                       border border-slate-700 
                                       focus:border-teal-500 focus:ring-4 focus:ring-teal-500/20 
                                       transition"
                        />

                        {!!field.state.meta.errors?.length && (
                            <p className="text-red-400 text-sm mt-2">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>
        </form>
    );
}
