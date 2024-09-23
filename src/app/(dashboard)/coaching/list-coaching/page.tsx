import { getCoachingList } from "@/api/coaching/list-coaching/getCoachingList";
import { getAllBackOffice } from "@/api/generics/getAllBackOffice";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ListCoachingTable } from "@/components/coaching/list-coaching/ListCoachingTable";
import { IListCoaching } from "@/interfaces/coaching/list-coaching/ListCoaching";
import { ICreditors } from "@/interfaces/generics/Creditors";
import { IGetAllBackOffices } from "@/interfaces/generics/IGetAllBackOffices";

export default async function Home() {

    const listCoaching: IListCoaching[] = await getCoachingList()
    const creditors: ICreditors[] = await getAllCreditors()
    const getAllBackOffices: IGetAllBackOffices[] = await getAllBackOffice()

    return (
        <PaperBlock>
            <TextPrincipal text="Lista Coaching" styles={`max-md:text-[2rem]`} />

            <ListCoachingTable
                backOffices={getAllBackOffices}
                coachings={listCoaching}
                creditors={creditors}
            />

        </PaperBlock>
    )
}