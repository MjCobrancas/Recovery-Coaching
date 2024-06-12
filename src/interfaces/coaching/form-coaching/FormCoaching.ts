import { FieldErrors, FieldValue, UseFormRegister, UseFormWatch } from "react-hook-form"
import { z } from "zod"

interface ICreditor {
    Id_Creditor: number
    Identifier?: number
    Creditor: string
    Number_Operators?: number
    Working_Days?: number
    Returns?: string
    Target?: number
}

interface IOperator {
    Id_User: number
    Name: string
    Last_Name: string
}

interface IBackOffice {
    Id_User: number
    Name: string 
    Last_Name: string
    Permission_Level_Id: number
}

interface ICoachingItems {
    Id_Coaching_Item: number
    Item: string
}

interface ICoachingItemsData {
    Id_Item_Complement: number
    Complement: string
    Id_Coaching_Item: number
}

interface ICoachingItemsDescription {
    Id_Item_Complement: number
    Complement: string
    Id_Coaching_Item: number
}

interface ICoachingItemsGroup {
    scriptItems: ICoachingItems[]
    scriptDescription: ICoachingItemsDescription[]
    data: ICoachingItemsData[][]
}

interface IFormCoaching {
    Creditor: ICreditor[]
    Operator: IOperator[]
    backOffice: IBackOffice[]
    coachingItems: ICoachingItemsGroup
}

interface ISelectCoachingSection {
    creditor: ICreditor[]
    operator: IOperator[]
    backOffice: IBackOffice[]
    errors: FieldErrors
    currentDate: string
    watch: UseFormWatch<FieldValue<any>>
    register: UseFormRegister<FieldValue<any>>
}

export const formCoachingSchema = z.object({
    creditor: z.string().refine((value) => {
        return Number(value) > 0
    }, {
        message: "Inválido"
    }),
    backOffice: z.string().refine((value) => {
        return Number(value) > 0
    }, {
        message: "Inválido"
    }),
    operator: z.string().refine((value) => {
        return Number(value) > 0
    }, {
        message: "Inválido"
    }),
    reason: z.enum(["Selecione", "SOLICITAÇÃO CREDOR", "BAIXA REVERSÃO", "BAIXA PERFORMANCE", "RETORNO DE FEEDBACK", "RETORNO DE TREINAMENTO"]).refine((value) => {
        if (value == "Selecione") {
            return false
        }

        return true
    }),
    observation: z.string().min(1),
    formCoaching: z.array(
        z.object({
            inputRadio: z.number().refine((value) => {
                if (value != 0 && value != 1) {
                    return false
                }

                return true
            }),
            selectIndex: z.number().refine((value) => {
                if (value <= 0) {
                    return false
                }

                return true
            }),
            otherReasonIndex: z.number().refine((value) => {
                if (value <= 0) {
                    return false
                }

                return true
            }),
            answerReason: z.string()
        })
    )
})

export type formCoachingData = z.infer<typeof formCoachingSchema>

export type { ICreditor, IOperator, IBackOffice, IFormCoaching, ICoachingItems, ICoachingItemsData, ICoachingItemsDescription, ICoachingItemsGroup, ISelectCoachingSection }

