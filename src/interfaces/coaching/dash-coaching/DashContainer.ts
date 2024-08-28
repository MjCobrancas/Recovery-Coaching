import { IBackOfficesToday } from "./DashBackOfficesToday"
import { IDashCreditorFilter, IDashUserFilter } from "./DashFilters"

interface IDashContainer {
    userTheme: string
    dashReasons: any
    dashItems: any
    backOffices: IBackOfficesToday[]
    creditorFilter: IDashCreditorFilter[]
    userFilter: IDashUserFilter[]
}

export type { IDashContainer }