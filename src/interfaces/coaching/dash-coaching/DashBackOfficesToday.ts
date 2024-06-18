interface IBackOfficesToday {
    name: string,
    quantityToday: number
}

interface IDashBackResponse {
    backOffices: IBackOfficesToday[]
}

export type { IBackOfficesToday, IDashBackResponse }