import { getCoachingById } from "@/api/coaching/list-coaching/getCoachingId"
import { CallPrinter } from "@/components/coaching/print-coaching/CallPrinter"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { InputRadioForm } from "@/components/InputRadioForm"
import { Option } from "@/components/Option"
import { PaperBlock } from "@/components/PaperBlock"
import { SelectField } from "@/components/SelectField"
import { ICoachingAll } from "@/interfaces/coaching/list-coaching/ListCoaching"
import { IResultDefaultResponse } from "@/interfaces/Generics"

export default async function Home({ params }: { params: { idCoaching: string } }) {

    const coachings: IResultDefaultResponse<ICoachingAll | null> = await getCoachingById(params.idCoaching)

    return (
        <>
            <PaperBlock>
                <>
                    <section className={`px-4`}>
                        <h1 className={`black/80 dark:text-white text-lg font-medium text-center my-4 md:text-lg`}>
                            ACOMPANHAMENTO IN-LOCO
                        </h1>

                        <div className={`flex flex-col lg:flex-row gap-2 font-medium print:shadow-none text-black/90 rounded-md p-4 print:p-0`}>
                            <FieldForm label="date" name="Data:" obrigatory={false}>
                                <Input
                                    value={coachings.data!.dataHeader[0].Created_At_Formatted}
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
                                        firstValue={coachings.data!.dataHeader[0].Creditor}
                                    />
                                </SelectField>
                            </FieldForm>

                            <FieldForm label="operator" name="Operador:" obrigatory={false}>
                                <SelectField name="operator" id="operator" styles={`h-11`} disabled>
                                    <Option
                                        value={"0"}
                                        firstValue={coachings.data!.dataHeader[0].Operator_Name +
                                            " " +
                                            coachings.data!.dataHeader[0].Operator_Last_Name
                                        }
                                    />
                                </SelectField>
                            </FieldForm>

                            <FieldForm label="responsable" name="Responsável:" obrigatory={false}>
                                <SelectField name="responsable" id="responsable" styles={`h-11`} disabled>
                                    <Option
                                        value={"0"}
                                        firstValue={coachings.data!.dataHeader[0].Supervisor_Name +
                                            " " +
                                            coachings.data!.dataHeader[0].Supervisor_Last_Name
                                        }
                                    />
                                </SelectField>
                            </FieldForm>

                            <FieldForm label="reason" name="Motivo:" obrigatory={false}>
                                <SelectField name="reason" id="reason" styles={`h-11`} disabled>
                                    <Option
                                        value={"0"}
                                        firstValue={coachings.data!.dataHeader[0].Reason}
                                    />
                                </SelectField>
                            </FieldForm>
                        </div>
                    </section>

                    <section className={`mb-6 px-4`}>
                        <table className={`w-full table-auto`}>
                            <thead className={`bg-slate-200 dark:bg-zinc-800 text-sm print:bg-white`}>
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

                                    <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md print:w-fit`}>
                                        DESCRIÇÃO
                                    </th>

                                </tr>
                            </thead>
                            <tbody className={`items-center p-1 odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 print:bg-white`}>
                                {coachings.data?.questions.map((item, i) => {
                                    return (
                                        <tr key={i} className={`odd:bg-gray-100 even:bg-gray-100 dark:odd:bg-zinc-700/30 dark:even:bg-zinc-800 dark:text-white print:bg-white`}>

                                            <td className={`p-2 text-center print:bg-white`}>
                                                {item.Item}
                                            </td>

                                            <td className={`p-2 text-center print:bg-white`}>
                                                <InputRadioForm answer={item.Answer == true} />
                                            </td>

                                            <td className={`p-2 text-center print:bg-white`}>
                                                <InputRadioForm answer={item.Answer == false} />
                                            </td>

                                            <td className={`p-2 text-center flex gap-2 print:w-full print:flex print:flex-col print:bg-white`}>
                                                {item.Answer == false &&
                                                    <>
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

                                                        <Input
                                                            id="desc"
                                                            name="desc"
                                                            type="text"
                                                            value={item.Description}
                                                            disabled
                                                            styles={item.Complement != "Outro motivo" ? "w-0 h-0 hidden" : ""}
                                                        />
                                                    </>

                                                }

                                                {item.Answer == true &&
                                                    <Input
                                                        id="desc"
                                                        name="desc"
                                                        type="text"
                                                        value={item.Description}
                                                        disabled
                                                    />
                                                }
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </section>

                    <div className={`flex items-baseline gap-4 px-4`}>
                        <FieldForm
                            label="observation"
                            name="Observações adicionais:"
                            obrigatory={false}
                            styles={`w-fit flex gap-1 font-medium dark:text-slate-100`}
                        />
                    </div>

                    <div className={`px-4`}>
                        <textarea
                            name="observation"
                            id="observation"
                            className={`w-full h-28 border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 print:overflow-hidden p-2 dark:bg-zinc-800 dark:border-zinc-900 dark:text-white`}
                            placeholder="Observações"
                            maxLength={600}
                            disabled
                            value={coachings.data?.observation[0].Observation}
                        />
                    </div>

                    <div className="flex w-full items-start justify-start my-5">
                        <div className="w-1/2 flex flex-col justify-start items-center">
                            <p className="font-bold mb-2">Assinatura do operador</p>
                            <div className="w-[320px] h-[20px] border-b-[2px] border-b-black"></div>
                        </div>
                        <div className="w-1/2 flex flex-col justify-start items-center">
                            <p className="font-bold mb-2">Assinatura do responsável</p>

                            <div className="w-[320px] h-[20px] border-b-[2px] border-b-black"></div>
                        </div>
                    </div>
                    <CallPrinter />
                </>
            </PaperBlock>
        </>
    )
}