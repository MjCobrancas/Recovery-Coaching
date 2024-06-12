'use client'

import { getFilterCoaching } from "@/api/coaching/list-coaching/getCoachingFilter";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IListCoachingFilter, listCoachingData, listCoachingSchema } from "@/interfaces/coaching/list-coaching/ListCoaching";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function ListCoachingFilter({ creditors, setFilter }: IListCoachingFilter) {

    const [disableButton, setDisableButton] = useState(false)
    const [didFilter, setDidFilter] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm<listCoachingData>({
        defaultValues: {
            creditor: "0",
            reason: "Selecione",
            name: "",
            selectDate: "0",
            date: ""
        },
        resolver: zodResolver(listCoachingSchema)
    })

    function resetFilter() {
        reset()
        setDisableButton(false)
        setDidFilter(false)
        setFilter([])
    }

    async function handleSubmitForm(data: FieldValues) {
        let splitedName = data.name.toString().split(' ')
        let firstName = splitedName[0]
        let lastName = splitedName.slice(1).join(' ')

        if (String(data.selectDate) != "0" && String(data.date).length > 0) {
            setError("selectDate", {
                type: "400"
            })

            setError("date", {
                type: "400"
            })

            return
        }

        setDisableButton(true)
        setDidFilter(true)

        const object = {
            id_creditor: Number(data.creditor),
            operator_name: String(firstName),
            operator_last_name: String(lastName),
            reason: String(data.reason),
            date: Number(data.selectDate) != 0 ? String(data.selectDate) : String(data.date)
        }

        const filter = await getFilterCoaching<typeof object>(object)

        setDisableButton(false)

        if (!filter.status) {
            toast.error("Não há nenhum dado com esses filtros!", {
                duration: 5000
            })

            return
        }

        setFilter(filter.data)

        toast.success("Sucesso ao filtrar os dados!", {
            duration: 5000
        })

    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className={`lg:flex lg:items-end lg:justify-center lg:gap-2 font-medium`}>
                <div className={`px-8 w-full items-center justify-center md:flex md:justify-center lg:w-fit md:gap-2 md:px-0`}
                >
                    <FieldForm
                        label="creditor"
                        name="Credor:"
                        obrigatory={false}
                        styles={`w-full md:w-52`}
                        error={errors.creditor && "Inválido"}
                    >
                        <SelectField
                            name="creditor"
                            id="creditor"
                            styles={`w-full md:w-52
                                    ${errors.creditor ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            onForm={true}
                            value={watch("creditor")}
                            register={register}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />

                            {creditors.map((company, i) => {
                                return (
                                    <Option
                                        key={i}
                                        value={company.Id_Creditor}
                                        firstValue={company.Creditor}
                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>

                    <FieldForm
                        label="reason"
                        name="Motivo:"
                        obrigatory={false}
                        styles={`w-full md:w-52`}
                        error={errors.reason && "Inválido"}
                    >
                        <SelectField
                            name="reason"
                            id="reason"
                            styles={`
                                    w-full md:w-52
                                    ${errors.reason ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            onForm={true}
                            value={watch("reason")}
                            register={register}
                        >
                            <Option
                                value={"Selecione"}
                                firstValue={"Selecione"}
                            />

                            <Option
                                value={"SOLICITAÇÃO CREDOR"}
                                firstValue={"SOLICITAÇÃO CREDOR"}
                            />
                            <Option
                                value={"BAIXA REVERSÃO"}
                                firstValue={"BAIXA REVERSÃO"}
                            />
                            <Option
                                value={"BAIXA PERFORMANCE"}
                                firstValue={"BAIXA PERFORMANCE"}
                            />
                            <Option
                                value={"RETORNO DE FEEDBACK"}
                                firstValue={"RETORNO DE FEEDBACK"}
                            />
                            <Option
                                value={"RETORNO DE TREINAMENTO"}
                                firstValue={"RETORNO DE TREINAMENTO"}
                            />
                        </SelectField>
                    </FieldForm>

                    <FieldForm
                        label="name"
                        name="Nome:"
                        obrigatory={false}
                        styles={`w-56`}
                        error={errors.name && "Inválido"}
                    >
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nome"
                            maxlength={255}
                            styles={`mt-0
                                     ${errors.name ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            onForm={true}
                            value={watch("name")}
                            register={register}
                        />
                    </FieldForm>

                    <FieldForm
                        label="selectDate"
                        name="Período:"
                        obrigatory={false}
                        styles={`w-fit p-0`}
                        error={errors.selectDate && "Inválido"}
                    >
                        <SelectField
                            name="selectDate"
                            id="selectDate"
                            styles={`w-full sm:w-fit h-11
                                    ${errors.selectDate ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            onForm={true}
                            value={watch("selectDate")}
                            register={register}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />
                            <Option value={"7 DIAS"} firstValue={"7 DIAS"} />
                            <Option value={"15 DIAS"} firstValue={"15 DIAS"} />
                            <Option value={"30 DIAS"} firstValue={"30 DIAS"} />
                            <Option value={"45 DIAS"} firstValue={"45 DIAS"} />
                        </SelectField>
                    </FieldForm>

                    <FieldForm
                        label="date"
                        name="Data:"
                        obrigatory={false}
                        styles={`w-fit`}
                        error={errors.date && "Inválido"}
                    >
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            styles={`w-full
                                    ${errors.selectDate ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                `}
                            onForm={true}
                            value={watch("date")}
                            register={register}
                        />
                    </FieldForm>
                </div>

                <div className={`flex items-center justify-center gap-2 mt-4`}>
                    <Button
                        type="submit"
                        text="Filtrar"
                        disabled={disableButton}
                        styles={`w-18 text-md h-11`}
                    />

                    <input
                        type="reset"
                        value="Remover filtros"
                        onClick={() => resetFilter()}
                        disabled={!didFilter}
                        className={`h-11 w-18 text-md font-medium p-2 border border-red-400 text-red-500 rounded-md hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                    />

                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                </div>
            </div>
        </form>
    )
}