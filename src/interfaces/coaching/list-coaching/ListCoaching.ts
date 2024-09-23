import { ICreditors } from "@/interfaces/generics/Creditors"
import { IGetAllBackOffices } from "@/interfaces/generics/IGetAllBackOffices"
import { z } from "zod"

// ListCoaching
interface ICoachingAll {
    dataHeader: ICoaching[],
    questions: ICoachingQuestions[],
    observation: ICoachingObservation[]
    idForm: number
}

interface ICoaching {
    Id_Form: number
    Operator_Name: string
    Operator_Last_Name: string
    Supervisor_Name: string
    Supervisor_Last_Name: string
    Creditor: string
    Reason: string
    Created_At: string
    Created_At_Formatted: string
}

interface ICoachingQuestions {
    Answer: boolean
    Description: string
    Item: string
    Complement?: string
}

interface ICoachingObservation {
    Observation: string
}

// ListCoachingTable
interface IListCoachingAll {
    coachings: IListCoaching[]
    creditors: ICreditors[]
    backOffices: IGetAllBackOffices[]
}

interface IListCoaching {
    Id_Form: number
    Operator_Name: string
    Operator_Last_Name: string
    Supervisor_Name: string
    Supervisor_Last_Name: string
    Creditor: string
    Reason: string
    Created_At: string
    Created_At_Formatted: string
}


// ListCoachingDialog
interface IListCoachingDialog {
    idForm: number
}

// ListCoachingFilter
interface IListCoachingFilter {
    creditors: ICreditors[]
    setFilter: (value: IListCoaching[]) => void
    backOffices: IGetAllBackOffices[]
}

export const listCoachingSchema = z.object({
    creditor: z.string(),
    backOffice: z.string(),
    reason: z.string(),
    name: z.string(),
    selectDate: z.string(),
    date: z.string(),
    dateEnd: z.string()
})

export type listCoachingData = z.infer<typeof listCoachingSchema>

export type { ICoaching, ICoachingQuestions, ICoachingObservation, ICoachingAll, IListCoaching, IListCoachingAll, IListCoachingDialog, IListCoachingFilter }