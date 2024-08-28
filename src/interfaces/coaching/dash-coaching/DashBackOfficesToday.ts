interface IBackOfficesToday {
    name: string,
    quantityToday: number
}

interface IDashBackResponse {
    backOffices: IBackOfficesToday[]
    userTheme: string
}

export type { IBackOfficesToday, IDashBackResponse }