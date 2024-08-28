'use client'

import { createCoaching } from "@/api/coaching/form-coaching/createCoaching";
import { Ancora } from "@/components/Ancora";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFormCoaching, formCoachingData, formCoachingSchema } from "@/interfaces/coaching/form-coaching/FormCoaching";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { SelectSection } from "./SelectCoachingSection";
import { verifyUserToken } from "@/api/generics/verifyToken";
import { useRouter } from "next/navigation";

export function FormCoaching({idUser, Creditor, Operator, coachingItems }: IFormCoaching) {

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm<formCoachingData>({
        defaultValues: {
            creditor: "0",
            operator: "0",
            backOffice: String(idUser),
            reason: "Selecione",
            observation: "",
            formCoaching: [
                {
                    inputRadio: 2,
                    selectIndex: 1,
                    otherReasonIndex: 0,
                    answerReason: ''
                },
                {
                    inputRadio: 2,
                    selectIndex: 1,
                    otherReasonIndex: 0,
                    answerReason: ''
                },
                {
                    inputRadio: 2,
                    selectIndex: 1,
                    otherReasonIndex: 0,
                    answerReason: ''
                },
                {
                    inputRadio: 2,
                    selectIndex: 1,
                    otherReasonIndex: 0,
                    answerReason: ''
                },
                {
                    inputRadio: 2,
                    selectIndex: 1,
                    otherReasonIndex: 0,
                    answerReason: ''
                }
            ]
        },
        resolver: zodResolver(formCoachingSchema)
    })

    const { fields, update } = useFieldArray({ control, name: "formCoaching" })
    const [disableButton, setDisableButton] = useState(false)

    let currentDate = ""
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    currentDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`

    function openSelect(id: number) {
        const field = fields[id]
        const length = coachingItems.data[id].length

        if (field.inputRadio == 0) {
            return
        }

        field.inputRadio = 0
        field.selectIndex = coachingItems.data[id][0].Id_Item_Complement
        field.otherReasonIndex = coachingItems.data[id][length - 1].Id_Item_Complement
        update(id, field)
    }

    function closeSelect(id: number) {
        const field = fields[id]
        const length = coachingItems.data[id].length

        if (field.inputRadio == 1) {
            return
        }

        field.inputRadio = 1
        field.selectIndex = coachingItems.data[id][0].Id_Item_Complement
        field.otherReasonIndex = coachingItems.data[id][length - 1].Id_Item_Complement
        update(id, field)
    }

    function handleChangeValue(value: number, index: number) {
        const field = fields[index]
        field.selectIndex = value

        if (field.selectIndex != field.otherReasonIndex) {
            field.answerReason = ''
        }

        update(index, field)
    }

    async function handleSubmitForm(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const questions = []
        let emptyAnswer = false

        for (let i = 0; i < data.formCoaching.length; i++) {
            const formData = data.formCoaching[i];

            if (formData.otherReasonIndex == formData.selectIndex) {
                if (formData.answerReason.length <= 0) {
                    setError(`formCoaching.${i}.answerReason`, {
                        type: "400"
                    })

                    emptyAnswer = true
                }
            }

            questions.push({
                answer: formData.inputRadio,
                id_coaching_item: i + 1,
                id_coaching_complement: formData.selectIndex,
                description: formData.answerReason.trim().length > 0 ? formData.answerReason.trim() : null
            })
        }

        if (emptyAnswer) {
            return
        }

        const object = {
            dataHeader: {
                id_operator: Number(data.operator),
                id_supervisor: Number(data.backOffice),
                id_creditor: Number(data.creditor),
                reason: data.reason
            },
            questions: questions,
            observation: {
                text: data.observation
            }
        }

        const submitForm = await createCoaching<typeof object>(object)

        setDisableButton(false)

        if (!submitForm.status) {
            toast.error("Houve um erro ao salvar o formulário. Revise os valores e tente novamente.", {
                duration: 5000
            })

            return
        }

        toast.success("Formulário criado com sucesso!", {
            duration: 5000
        })

        reset()
    }

    return (
        <form className={`h-full mx-4 pr-4 overflow-y-auto`} onSubmit={handleSubmit(handleSubmitForm)}>
            <SelectSection
                creditor={Creditor}
                operator={Operator}
                currentDate={currentDate}
                watch={watch}
                register={register}
                errors={errors}
            />

            <section className={`mb-6`}>
                <h1 className={`black/80 text-lg font-medium text-center p-2 pt-6 md:text-lg mt-4`}>
                    ANÁLISE SCRIPT
                </h1>

                <div className={`overflow-x-auto`}>
                    <table className={`table-auto sm:w-full w-[40rem]`}>
                        <thead className={`bg-gray-200 dark:bg-zinc-800 text-sm`}>
                            <tr>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                                    ITEM
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    SIM
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80`}>
                                    NÃO
                                </th>

                                <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                                    DESCRIÇÃO
                                </th>

                            </tr>
                        </thead>
                        <tbody className={`items-center p-1`}>
                            {coachingItems.scriptItems.map((item, i) => {

                                return (
                                    <tr
                                        key={fields[i].id}
                                        className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}
                                    >

                                        <td className={`p-2 text-center`}>
                                            {item.Item}
                                        </td>
                                        <Input
                                            type="hidden"
                                            name="idCoachingItem"
                                            value={item.Id_Coaching_Item}
                                        />

                                        <td className={`p-2 text-center`}>
                                            <input
                                                required
                                                type="radio"
                                                className={`w-4 h-4 cursor-pointer`}
                                                name={String(item.Id_Coaching_Item)}
                                                onClick={() => closeSelect(i)}
                                                checked={fields[i].inputRadio == 1 ? true : false}
                                            />
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            <input
                                                required
                                                type="radio"
                                                className={`w-4 h-4 cursor-pointer`}
                                                name={String(item.Id_Coaching_Item)}
                                                checked={fields[i].inputRadio == 0 ? true : false}
                                                onClick={() => openSelect(i)}
                                            />
                                        </td>

                                        {fields[i].inputRadio == 0 ?
                                            <td className={`p-2 flex items-center justify-center gap-2`}>
                                                <SelectField
                                                    id="complement"
                                                    styles={`h-11`}
                                                    required
                                                    onForm={true}
                                                    register={register}
                                                    name={`formCoaching.${i}.selectIndex`}
                                                    OnChange={(event) => handleChangeValue(Number(event.target.value), i)}
                                                    value={watch(`formCoaching.${i}.selectIndex`)}
                                                >
                                                    {coachingItems.data.map((itemComp, index) => {
                                                        if (i != index) {
                                                            return
                                                        }

                                                        return itemComp.map((item, i) => {
                                                            return (
                                                                <>
                                                                    <Option
                                                                        key={i}
                                                                        value={item.Id_Item_Complement}
                                                                        firstValue={item.Complement}
                                                                    />
                                                                </>
                                                            )
                                                        })

                                                    })}
                                                </SelectField>

                                                <Input
                                                    id={""}
                                                    name={`formCoaching.${i}.answerReason`}
                                                    value={watch(`formCoaching.${i}.answerReason`)}
                                                    type="text"
                                                    disabled={fields[i].otherReasonIndex != fields[i].selectIndex}
                                                    onForm={true}
                                                    register={register}
                                                    styles={errors.formCoaching && errors.formCoaching[i]?.answerReason ? `border-[--label-color-error] dark:border-[--label-color-error]` : ``}
                                                />
                                            </td>
                                            :
                                            <td className={`p-2 text-center`}>
                                                <Input
                                                    id=""
                                                    name=""
                                                    type="text"
                                                    disabled
                                                />
                                            </td>
                                        }
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </section>

            <div className={`flex items-baseline gap-4`}>
                <FieldForm
                    label="observation"
                    name="Observações adicionais:"
                    obrigatory={true}
                    styles={`w-fit flex gap-1 font-medium`}
                >

                    {errors.observation &&
                        <p className={`text-red-400 font-medium`}>
                            Observação inválida!
                        </p>
                    }
                </FieldForm>
            </div>

            <textarea
                id="observation"
                className={`w-full h-28 border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 dark:bg-zinc-800 dark:border-[--border-dark]`}
                placeholder="Observações"
                maxLength={600}
                value={watch("observation")}
                {...register("observation")}
                required
            />

            <footer className={`flex items-baseline justify-between gap-2`}>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />

                <Ancora
                    title="Voltar"
                    toGo="/"
                />

                <Button
                    type="submit"
                    text="Salvar alterações"
                    disabled={disableButton}
                    styles={`w-fit text-md h-12 my-2 dark:disabled:bg-slate-500`}
                />
            </footer>
        </form>
    )
}