import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { zodForm, zodField } from "../../../auth/zod";
import type { CardResponse } from "../../../../models";
import { useCardUpdate } from "../../hooks/useCardUpdate";
import { UpdateCardSchema, type UpdateFormCard } from "../../schemas/UpdateCard.schema";
import { Calendar, DollarSign } from "lucide-react";

type Props = {
    card: CardResponse;
    onSuccess?: () => void;
    formUpdateId?: string;
    onPendingChange?: (pending: boolean) => void;
};

export default function UpdateCardForm({
    card,
    onSuccess,
    formUpdateId = "update-card-form",
    onPendingChange,
}: Props) {
    const updateCardForm = useCardUpdate(card.card_Id);

    const form = useForm({
        defaultValues: {
            money: card.money,
            expiration_Date: card.expiration_Date,
        } as UpdateFormCard,

        validators: {
            onSubmit: zodForm(UpdateCardSchema),
            onChange: zodForm(UpdateCardSchema),
        },

        onSubmit: async ({ value }) => {
            await updateCardForm.mutateAsync({
                money: value.money,
                expiration_Date: value.expiration_Date,
            });

            if (onSuccess) onSuccess();
        },
    });

    useEffect(() => {
        if (onPendingChange) onPendingChange(updateCardForm.isPending);
    }, [updateCardForm.isPending, onPendingChange]);

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
                name="money"
                validators={{
                    onBlur: zodField(UpdateCardSchema.shape.money),
                    onChange: zodField(UpdateCardSchema.shape.money),
                }}
            >
                {(field) => (
                    <div>
                        <label htmlFor="money" className="text-sm font-semibold text-gray-200 mb-2 flex items-center">
                            <DollarSign className="w-5 h-5 mr-2 text-teal-400" />Dinero<span className="text-gray-400">(opcional)</span>
                        </label>

                        <input
                            id="money"
                            type="number"
                            placeholder="Ingrese el monto"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(Number(e.target.value || 1))}
                            onBlur={field.handleBlur}
                            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600 
                            focus:border-teal-500 focus:ring-teal-500/20 focus:ring-2"
                        />

                        {!!field.state.meta.errors?.length && (
                            <p className="text-red-400 text-sm mt-1">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

            
            <form.Field
                name="expiration_Date"
                validators={{
                    onSubmit: zodField(UpdateCardSchema.shape.expiration_Date),
                    onChange: zodField(UpdateCardSchema.shape.expiration_Date),
                }}
            >
                {(field) => (
                    <div>
                        <label htmlFor="date" className="text-sm font-semibold text-gray-200 mb-2 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-teal-400" />
                            Fecha de expiración<span className="text-gray-400">(opcional)</span> 
                        </label>

                        <input
                            id="date"
                            type="date"
                            placeholder="Seleccione fecha"
                            value={field.state.value ?? ""}
                            onChange={(e) => field.handleChange(e.target.value)}
                            onBlur={field.handleBlur}
                            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600
                            focus:border-teal-500 focus:ring-teal-500/20 focus:ring-2"
                        />

                        {!!field.state.meta.errors?.length && (
                            <p className="text-red-400 text-sm mt-1">
                                {field.state.meta.errors[0]}
                            </p>
                        )}
                    </div>
                )}
            </form.Field>

        </form>
    );
}
