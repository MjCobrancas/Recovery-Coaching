import { IDashBackResponse } from "@/interfaces/coaching/dash-coaching/DashBackOfficesToday";

export function DashCoachingTable({ backOffices }: IDashBackResponse) {

    /* Date region */

    let currentDate = ""
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    currentDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`

    /* End of date region */

    return (
        <div className={`flex items-center justify-center mt-4 w-full`}>
            <table className={`w-[70vw] h-full m-2 p-2`}>
                <thead className={`bg-gray-200 dark:bg-slate-600`}>
                    <tr>

                        <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                            Hoje
                        </th>

                        <th className={`font-semibold p-2 dark:text-white/80`}>
                            BackOffice
                        </th>

                        <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                            Quantidade
                        </th>

                    </tr>
                </thead>
                <tbody className={`items-center p-1 bg-slate-100`}>
                    {backOffices.map((backOffice, i) => {
                        return (
                            <tr
                                key={i}
                                className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600`}
                            >
                                <td className={`p-2 text-center`}>
                                    {currentDate}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {backOffice.name}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {backOffice.quantityToday}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}