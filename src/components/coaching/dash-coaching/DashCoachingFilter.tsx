'use client'

import { getFilterDashItems } from "@/api/coaching/dash-coaching/getFilterDashItems";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IDashFilters, dashCoachingData, dashCoachingSchema } from "@/interfaces/coaching/dash-coaching/DashFilters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function DashCoachingFilter({ creditorFilter, userFilter, setFilter, dashItemsProps, dashFilter }: IDashFilters) {

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm<dashCoachingData>({
        defaultValues: {
            creditor: "0",
            user: "0",
            selectDate: "0",
            date: ""
        },
        resolver: zodResolver(dashCoachingSchema)
    })

    const [disableButton, setDisableButton] = useState(false)
    const [didFilter, setDidFilter] = useState(false)

    function resetFilter() {
        dashFilter(false)
        setDisableButton(false)
<<<<<<< HEAD
        setDidFilter(true)
=======
        setDidFilter(false)
>>>>>>> ff2f9b643fc73ee7132da355d0498b6b50c6b8d5
        reset()
    }

    async function handleSubmitForm(data: FieldValues) {

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

        const object = {
            id_creditor: Number(data.creditor),
            operator_id: Number(data.user),
            date: String(data.selectDate) != "0" ? String(data.selectDate) : String(data.date)
        }

        const filter = await getFilterDashItems<typeof object>(object)

        setDidFilter(true)

        setDisableButton(false)

        if (!filter.status) {
            toast.error("Não há nenhum dado com esses filtros!", {
                duration: 5000
            })

            setDidFilter(false)

            return
        }

        setFilter(filter.data)
        dashFilter(true)

        toast.success("Sucesso ao filtrar os dados!", {
            duration: 5000
        })
    }

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)} className={`flex items-end justify-center my-6`}>
            <div className={`md:flex items-end justify-between gap-2 font-medium`}>
                <FieldForm
                    label="creditor"
                    name="Credor:"
                    obrigatory={false}
                    styles={`w-full`}
                    error={errors.creditor && "Inválido"}
                >
                    <SelectField
                        name="creditor"
                        id="creditor"
                        styles={`w-full md:fit h-11`}
                        onForm={true}
                        value={watch("creditor")}
                        register={register}
                    >
                        <Option
                            value={"0"}
                            firstValue={"Selecione"}
                        />

                        {creditorFilter.map((value, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={value.Id_Creditor}
                                    firstValue={value.Creditor}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="user"
                    name="Operadores"
                    obrigatory={false}
                    styles={`w-full md:fit`}
                    error={errors.user && "Inválido"}
                >
                    <SelectField
                        name="user"
                        id="user"
                        styles={`w-full md:fit h-11`}
                        onForm={true}
                        value={watch("user")}
                        register={register}
                    >
                        <Option
                            value={"0"}
                            firstValue={"Selecione"}
                        />

                        {userFilter.map((value, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={value.Id_User}
                                    firstValue={value.Name +
                                        " " +
                                        value.Last_Name
                                    }
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <div className={`flex w-full items-end mt-3 gap-2`}>
                    <FieldForm
                        label="selectDate"
                        name="Período:"
                        obrigatory={false}
                        styles={`w-full p-0`}
                        error={errors.selectDate && "Inválido"}
                    >
                        <SelectField
                            name="selectDate"
                            id="selectDate"
                            styles={`w-full sm:w-fit h-11`}
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
                        styles={`w-full`}
                        error={errors.date && "Inválido"}
                    >
                        <Input
                            id="date"
                            name="date"
                            type="date"
                            styles={`w-full`}
                            onForm={true}
                            value={watch("date")}
                            register={register}
                        />
                    </FieldForm>
                </div>

                <div className={`flex w-full mt-3 gap-2`}>
                    <Button
                        type="submit"
                        text="Filtrar"
                        disabled={disableButton}
                        styles={`w-full md:w-[90px] text-md h-11`}
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