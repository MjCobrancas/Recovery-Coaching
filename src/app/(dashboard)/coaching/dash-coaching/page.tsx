import { getBackOfficeToday } from "@/api/coaching/dash-coaching/getBackOfficeToday";
import { getDashCoachingItems } from "@/api/coaching/dash-coaching/getDashCoachingItems";
import { getDashCoachingReasons } from "@/api/coaching/dash-coaching/getDashCoachingReasons";
import { getFilterCreditorsDash } from "@/api/coaching/dash-coaching/getFilterCreditorDash";
import { getFilterUsersDash } from "@/api/coaching/dash-coaching/getFilterUsersDash";
import { PaperBlock } from "@/components/PaperBlock";
import { DashCoachingContainer } from "@/components/coaching/dash-coaching/DashCoachingContainer";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IBackOfficesToday } from "@/interfaces/coaching/dash-coaching/DashBackOfficesToday";
import { IDashCreditorFilter, IDashUserFilter } from "@/interfaces/coaching/dash-coaching/DashFilters";

export default async function Home() {

    console.log("aassss")

    const dashReasons = await getDashCoachingReasons()
    const dashItems = await getDashCoachingItems()
    const backOffice: IResultDefaultResponse<IBackOfficesToday[] | null> = await getBackOfficeToday()
    const creditorFilter: IResultDefaultResponse<IDashCreditorFilter[] | null> = await getFilterCreditorsDash()
    const userFilter: IResultDefaultResponse<IDashUserFilter[] | null> = await getFilterUsersDash()

    return (
        <PaperBlock styles={`p-4`}>
            <h1 className={`text-black/90 text-center rounded-md text-3xl bg-slate-100 mb-4 p-2 font-semibold dark:bg-gray-700 dark:text-white`}>
                Dificuldades apresentadas pelos operadores durante o pronto atendimento
            </h1>

            <DashCoachingContainer
                dashReasons={dashReasons}
                dashItems={dashItems}
                backOffices={backOffice.data == null ? [] : backOffice.data}
                creditorFilter={creditorFilter.data == null ? [] : creditorFilter.data}
                userFilter={userFilter.data == null ? [] : userFilter.data}
            />

        </PaperBlock>
    )
}