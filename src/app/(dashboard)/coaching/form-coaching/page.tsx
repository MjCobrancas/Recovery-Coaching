import { getAllCoachingItems } from "@/api/coaching/form-coaching/getAllCoachingItems";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOperators } from "@/api/generics/getAllOperators";
import { PaperBlock } from "@/components/PaperBlock";
import { FormCoaching } from "@/components/coaching/form-coaching/FormCoaching";
import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics";
import { ICoachingItemsGroup, ICreditor, IOperator } from "@/interfaces/coaching/form-coaching/FormCoaching";
import { GetUserToken } from "@/utils/GetUserToken";
import { parseJWT } from "@/utils/ParseJWT";

export default async function Home() {

    const creditor: ICreditor[] = await getAllCreditors()
    const operator: IOperator[] = await getAllOperators()
    const coachingItems: ICoachingItemsGroup = await getAllCoachingItems()
    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    return (
        <PaperBlock>
            <FormCoaching
                idUser = {userValues.id}
                Creditor={creditor}
                Operator={operator}
                coachingItems={coachingItems}
            />
        </PaperBlock>
    )
}