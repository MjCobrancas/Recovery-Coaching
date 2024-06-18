import { z } from "zod"

interface IDashCreditorFilter {
    Id_Creditor: number
    Creditor: string
}

interface IDashUserFilter {
   Id_User: number
   Name: string
   Last_Name: string 
}

interface IDashItemsFilter {
    id_creditor: number
    operator_id: number
    date: string
}

interface IDashFilters {
    creditorFilter: IDashCreditorFilter[]
    userFilter: IDashUserFilter[]
    setFilter: (value: any[]) => void
    dashItemsProps: any[]
    dashFilter: (value: boolean) => void
}

export const dashCoachingSchema = z.object({
    creditor: z.string(),
    user: z.string(),
    selectDate: z.string(),
    date: z.string()
})

export type dashCoachingData = z.infer<typeof dashCoachingSchema>

export type { IDashCreditorFilter, IDashUserFilter, IDashItemsFilter, IDashFilters }