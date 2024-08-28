'use client'

import { IListCoaching, IListCoachingAll } from "@/interfaces/coaching/list-coaching/ListCoaching"
import { ListCoachingDialog } from "./ListCoachingDialog"
import { useState } from "react"
import { ListCoachingFilter } from "./ListCoachingFilter"

export function ListCoachingTable({ coachings, creditors }: IListCoachingAll) {

    const [isFiltred, setIsFiltred] = useState<IListCoaching[]>([])

    function setValueFilter(value: IListCoaching[]) {
        setIsFiltred(value)
    }

    return (
        <>
            <ListCoachingFilter
                creditors={creditors}
                setFilter={setValueFilter}
            />

            <section className={`max-h-[24.8rem] overflow-y-auto pl-2 mt-4`}>
                <table className={`w-[96vw] px-4 mx-auto my-4`}>
                    <thead className={`bg-gray-200 dark:bg-zinc-800`}>
                        <tr>

                            <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                                Negociador
                            </th>

                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Supervisor
                            </th>

                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Credor
                            </th>

                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Motivo
                            </th>

                            <th className={`font-semibold p-2 dark:text-white/80`}>
                                Data
                            </th>

                            <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                                Ações
                            </th>

                        </tr>
                    </thead>
                    <tbody className={`items-center p-1 bg-slate-100`}>
                        {isFiltred.length > 0 ?
                            isFiltred.map((filter, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}
                                    >

                                        <td className={`p-2 text-center`}>
                                            {filter.Operator_Name +
                                                " " +
                                                filter.Operator_Last_Name
                                            }
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {filter.Supervisor_Name +
                                                " " +
                                                filter.Supervisor_Last_Name
                                            }
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {filter.Creditor}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {filter.Reason}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {filter.Created_At_Formatted}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            <ListCoachingDialog
                                                idForm={filter.Id_Form}
                                            />
                                        </td>
                                    </tr>
                                )
                            })
                            : coachings.map((item, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}
                                    >

                                        <td className={`p-2 text-center`}>
                                            {item.Operator_Name +
                                                " " +
                                                item.Operator_Last_Name
                                            }
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Supervisor_Name +
                                                " " +
                                                item.Supervisor_Last_Name
                                            }
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Creditor}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Reason}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            {item.Created_At_Formatted}
                                        </td>

                                        <td className={`p-2 text-center`}>
                                            <ListCoachingDialog
                                                idForm={item.Id_Form}
                                            />
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </section>
        </>
    )
}