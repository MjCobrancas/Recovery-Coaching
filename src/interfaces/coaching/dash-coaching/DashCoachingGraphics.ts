interface IDashCoachingGraphichsProps {
    userTheme: string
    dashReasons: { data: number[]} | any
    dashItems: IDashItems | any
    dashItemsFilter: IDashItems | any
    isFilter: boolean
}

interface IDashItems {
    data: [[number[]], string[], [string[]], number]
    status: boolean
}

export type { IDashCoachingGraphichsProps }