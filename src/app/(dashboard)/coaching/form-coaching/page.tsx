import { getAllCoachingItems } from "@/api/coaching/form-coaching/getAllCoachingItems";
import { getAllBackOffice } from "@/api/generics/getAllBackOffice";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOperators } from "@/api/generics/getAllOperators";
import { PaperBlock } from "@/components/PaperBlock";
import { FormCoaching } from "@/components/coaching/form-coaching/FormCoaching";
import { IBackOffice, ICoachingItems, ICoachingItemsData, ICoachingItemsDescription, ICoachingItemsGroup, ICreditor, IFormCoaching, IOperator } from "@/interfaces/coaching/form-coaching/FormCoaching";

export default async function Home() {

    const creditor: ICreditor[] = await getAllCreditors()
    const operator: IOperator[] = await getAllOperators()
    const backOffice: IBackOffice[] = await getAllBackOffice()
    const coachingItems: ICoachingItemsGroup = await getAllCoachingItems()

    return (
        <PaperBlock>
            <FormCoaching
                Creditor={creditor}
                Operator={operator}
                backOffice={backOffice}
                coachingItems={coachingItems}
            />
        </PaperBlock>
    )
}