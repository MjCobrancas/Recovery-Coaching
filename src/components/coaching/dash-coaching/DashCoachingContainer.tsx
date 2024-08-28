'use client'

import { IDashContainer } from "@/interfaces/coaching/dash-coaching/DashContainer";
import { DashCoachingFilter } from "./DashCoachingFilter";
import { DashCoachingGraphics } from "./DashCoachingGraphics";
import { DashCoachingTable } from "./DashCoachingTable";
import { useState } from "react";

export function DashCoachingContainer({ dashReasons, dashItems, backOffices, creditorFilter, userFilter, userTheme }: IDashContainer) {

    const [isFilter, setIsFilter] = useState(false)
    const [dashItemsFilter, setDashItemsFilter] = useState<any[]>([])

    function setValueDashItem(value: any[]) {
        setDashItemsFilter(value)
    }

    function setFilterValue(value: boolean) {
        setIsFilter(value)
    }

    return (
        <>
            <DashCoachingFilter
                creditorFilter={creditorFilter}
                userFilter={userFilter}
                setFilter={setValueDashItem}
                dashItemsProps={dashItems}
                dashFilter={setFilterValue}
            />

            <DashCoachingGraphics
                userTheme={userTheme}
                dashReasons={dashReasons}
                dashItems={dashItems}
                isFilter={isFilter}
                dashItemsFilter={dashItemsFilter}
            />

            <DashCoachingTable
                userTheme={userTheme}
                backOffices={backOffices}
            />
        </>
    )
}