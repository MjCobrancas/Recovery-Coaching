'use client'

import { IDashCoachingGraphichsProps } from "@/interfaces/coaching/dash-coaching/DashCoachingGraphics"
import { ForwardedRef, useEffect, useRef, useState } from "react"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function DashCoachingGraphics({ dashReasons, dashItems, dashItemsFilter, isFilter }: IDashCoachingGraphichsProps) {
    const [values, setValues] = useState(dashItems.data[0])
    const [identification, setIdentification] = useState(dashItems.data[1])
    const [names, setNames] = useState(dashItems.data[2])

    useEffect(() => {
        if (dashItems.status) {
            setHasItems(true)
        }
        setValues(!isFilter ? dashItems.data[0] : dashItemsFilter[0])
    }, [isFilter, dashItems.data, dashItemsFilter, dashItems.status])

    let optionsReason: ChartOptions<'bar'> = {
        indexAxis: "y" as const,
        responsive: true,
        scales: {
            x: {
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "rgb(255, 99, 132)",
                },
            },
        },
    }
    let dataReason: ChartData<'bar'> = {
        labels: [
            "SOLICITAÇÃO CREDOR",
            "BAIXA REVERSÃO",
            "BAIXA PERFORMANCE",
            "RETORNO DE FEEDBACK",
            "RETORNO DE TREINAMENTO",
        ],
        datasets: [
            {
                label: "Quantidade de cada motivo",
                data: dashReasons.data,
                borderWidth: 1,
                backgroundColor: [
                    "rgb(255, 99, 132, 0.5)",
                    "rgb(54, 162, 235, 0.5)",
                    "rgb(255, 205, 86, 0.5)",
                    "#4f46e580",
                    "#f9731680",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                    "#4f46e5",
                    "#f97316",
                ],
            },
        ],
    }

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        scales: {
            x: {
                max: isFilter ? dashItemsFilter[1] + 3 : dashItems.data[3] + 3,
                ticks: {
                    stepSize: 1,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: "transparent",
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const opening: ChartData<'bar'> = {
        labels: names[0],
        datasets: [
            {
                label: identification[0],
                data: values[0],
                borderWidth: 1,
                backgroundColor: "#ab000080",
                borderColor: "#ab0000"
            },
        ],
    };

    const negotiation: ChartData<'bar'> = {
        labels: names[1],
        datasets: [
            {
                label: identification[1],
                data: values[1]!,
                borderWidth: 1,
                backgroundColor: "#16a34a80",
                borderColor: "#16a34a",
            },
        ],
    };

    const argumentation: ChartData<'bar'> = {
        labels: names[2],
        datasets: [
            {
                label: identification[2],
                data: values[2]!,
                borderWidth: 1,
                backgroundColor: "#2563eb80",
                borderColor: "#2563eb",
            },
        ],
    };

    const ratification: ChartData<'bar'> = {
        labels: names[3],
        datasets: [
            {
                label: identification[3],
                data: values[3]!,
                borderWidth: 1,
                backgroundColor: "#4f46e580",
                borderColor: "#4f46e5",
            },
        ],
    };

    const closure: ChartData<'bar'> = {
        labels: names[4],
        datasets: [
            {
                label: identification[4],
                data: values[4]!,
                borderWidth: 1,
                backgroundColor: "#f9731680",
                borderColor: "#f97316",
            },
        ],
    };


    const [hasItems, setHasItems] = useState(false)
    const [hasReason, setHasReason] = useState(false)

    return (
        <div className={`h-fit`}>
            <div className={`gap-1 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:place-items-stretch sm:h-full`}>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={options} data={opening} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={options} data={negotiation} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={options} data={argumentation} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={options} data={ratification} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={options} data={closure} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
                <div className={`w-full ${hasItems ? `` : ``}`}>
                    <Bar options={optionsReason} data={dataReason} className={`z-10 ${hasItems ? `` : `h-0`}`} />
                    <div
                        className={`w-full border-2 rounded-md z-50 h-48 ${hasItems ? `hidden` : `relative`
                            }`}
                    >
                        <div
                            className="h-full w-full flex animate-pulse flex-row items-center justify-center"
                        >
                            <div className="w-full bg-gray-300 h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}