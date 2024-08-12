import { getCoachingList } from "@/api/coaching/list-coaching/getCoachingList";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ListCoachingTable } from "@/components/coaching/list-coaching/ListCoachingTable";
import { IListCoaching } from "@/interfaces/coaching/list-coaching/ListCoaching";
import { ICreditors } from "@/interfaces/generics/Creditors";

export default async function Home() {

    const listCoaching: IListCoaching[] = await getCoachingList()
    const creditors: ICreditors[] = await getAllCreditors()

    return (
        <PaperBlock>
            <TextPrincipal text="Lista Coaching" styles={`max-md:text-[2rem]`} />

            <ListCoachingTable
                coachings={listCoaching}
                creditors={creditors}
            />

        </PaperBlock>
    )
}