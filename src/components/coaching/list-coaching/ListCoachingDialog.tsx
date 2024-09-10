'use client'

import { getCoachingById } from "@/api/coaching/list-coaching/getCoachingId";
import { verifyUserToken } from "@/api/generics/verifyToken";
import { Ancora } from "@/components/Ancora";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { InputRadioForm } from "@/components/InputRadioForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { ICoachingAll, IListCoachingDialog } from "@/interfaces/coaching/list-coaching/ListCoaching";
import { faPaperPlane, faPrint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function ListCoachingDialog({ idForm }: IListCoachingDialog) {
    const router = useRouter()

    const dialog = useRef<HTMLDialogElement>(null)
    const [coachingItem, setCoachingItem] = useState<ICoachingAll | null>(null)
    const [isLoadingModal, setIsLoadingModal] = useState(true)

    async function openDialog(idForm: number) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setIsLoadingModal(true)
        dialog.current?.showModal()

        const selectedCoaching: IResultDefaultResponse<ICoachingAll | null> = await getCoachingById(String(idForm))

        if (!selectedCoaching.status) {
            toast.error("Não foi possível encontrar o acompanhamento do operador", {
                duration: 5000
            })

            dialog.current?.close()

            setIsLoadingModal(false)

            return
        }

        setIsLoadingModal(false)
        setCoachingItem(selectedCoaching.data!)

    }

    function closeDialog() {
        dialog.current?.close()
    }

    return (
        <>
            <button
                type="submit"
                className={`bg-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 hover:bg-blue-500 duration-100 text-white rounded-md px-2 py-[5px]`}
                name="idCoaching"
                onClick={() => openDialog(idForm)}
            >
                <FontAwesomeIcon icon={faPaperPlane} fontSize={14} />
            </button>

            <dialog
                ref={dialog}
                id="coaching-dialog"
                className={`w-11/12 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-900 max-sm:w-full`}
            >
                {!isLoadingModal ? (
                    <>
                        <section>
                            <h1 className={`black/80 dark:text-white text-lg font-medium text-center my-4 md:text-lg`}>
                                ACOMPANHAMENTO IN-LOCO
                            </h1>

                            <div className={`flex flex-col lg:flex-row gap-2 font-medium print:shadow-none text-black/90 shadow rounded-md p-4`}>
                                <FieldForm label="date" name="Data:" obrigatory={false}>
                                    <Input
                                        value={coachingItem?.dataHeader[0].Created_At_Formatted}
                                        type="text"
                                        id="date"
                                        name="date"
                                        disabled
                                    />
                                </FieldForm>

                                <FieldForm label="creditor" name="Credor:" obrigatory={false}>
                                    <SelectField name="creditor" id="creditor" styles={`h-11`} disabled>
                                        <Option
                                            value={"0"}
                                            firstValue={coachingItem?.dataHeader[0].Creditor}
                                        />
                                    </SelectField>
                                </FieldForm>

                                <FieldForm label="operator" name="Operador:" obrigatory={false}>
                                    <SelectField name="operator" id="operator" styles={`h-11`} disabled>
                                        <Option
                                            value={"0"}
                                            firstValue={coachingItem?.dataHeader[0].Operator_Name +
                                                " " +
                                                coachingItem?.dataHeader[0].Operator_Last_Name
                                            }
                                        />
                                    </SelectField>
                                </FieldForm>

                                <FieldForm label="responsable" name="Responsável:" obrigatory={false}>
                                    <SelectField name="responsable" id="responsable" styles={`h-11`} disabled>
                                        <Option
                                            value={"0"}
                                            firstValue={coachingItem?.dataHeader[0].Supervisor_Name +
                                                " " +
                                                coachingItem?.dataHeader[0].Supervisor_Last_Name
                                            }
                                        />
                                    </SelectField>
                                </FieldForm>

                                <FieldForm label="reason" name="Motivo:" obrigatory={false}>
                                    <SelectField name="reason" id="reason" styles={`h-11`} disabled>
                                        <Option
                                            value={"0"}
                                            firstValue={coachingItem?.dataHeader[0].Reason}
                                        />
                                    </SelectField>
                                </FieldForm>
                            </div>
                        </section>

                        <section className={`mb-6`}>
                            <table className={`w-full table-auto`}>
                                <thead className={`bg-slate-200 dark:bg-zinc-800 text-sm`}>
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
                                <tbody className={`items-center p-1 odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                                    {coachingItem?.questions.map((item, i) => {
                                        return (

                                            <tr key={i} className={`odd:bg-gray-100 even:bg-gray-100 dark:odd:bg-zinc-700/30 dark:even:bg-zinc-800 dark:text-white`}>

                                                <td className={`p-2 text-center`}>
                                                    {item.Item}
                                                </td>

                                                <td className={`p-2 text-center`}>
                                                    <InputRadioForm answer={item.Answer == true} />
                                                </td>

                                                <td className={`p-2 text-center`}>
                                                    <InputRadioForm answer={item.Answer == false} />
                                                </td>

                                                <td className={`p-2 text-center flex gap-2`}>
                                                    {item.Answer == false &&
                                                        <SelectField
                                                            id="answerNot"
                                                            name="answerNot"
                                                            disabled
                                                        >
                                                            <Option
                                                                value={"none"}
                                                                firstValue={item.Complement}
                                                            />
                                                        </SelectField>
                                                    }

                                                    <Input
                                                        id="desc"
                                                        name="desc"
                                                        type="text"
                                                        value={item.Description}
                                                        disabled
                                                    />
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </section>

                        <div className={`flex items-baseline gap-4`}>
                            <FieldForm
                                label="observation"
                                name="Observações adicionais:"
                                obrigatory={false}
                                styles={`w-fit flex gap-1 font-medium dark:text-slate-100`}
                            />
                        </div>

                        <textarea
                            name="observation"
                            id="observation"
                            className={`w-full h-28 border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 dark:bg-zinc-800 dark:border-zinc-900 dark:text-white`}
                            placeholder="Observações"
                            maxLength={600}
                            disabled
                            value={coachingItem?.observation[0].Observation}
                        />

                        <div className={`flex justify-end print print:hidden`}>
                            <Link
                                className={`bg-blue-400 hover:bg-blue-500 duration-300 text-white rounded-md px-2 py-[5px] mr-2 items-center justify-center flex gap-1 font-bold`}
                                href={`/coaching/print-coaching/${idForm}`}
                            >
                                <FontAwesomeIcon icon={faPrint} />
                                Imprimir 
                            </Link>

                            <Button
                                type="button"
                                text="Fechar"
                                styles={`w-fit h-fit border-red-400 bg-red-400 text-white hover:bg-red-500 focus:bg-red-400 text-md px-2 py-2`}
                                OnClick={() => closeDialog()}
                            />
                        </div>
                    </>
                ) : (
                    <p className="text-left font-bold dark:text-white">Carregando...</p>
                )}
            </dialog>
        </>
    )
}