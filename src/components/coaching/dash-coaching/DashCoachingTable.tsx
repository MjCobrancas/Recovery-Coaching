import { IDashBackResponse } from "@/interfaces/coaching/dash-coaching/DashBackOfficesToday";
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
import { useState } from "react";
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export function DashCoachingTable({ backOffices, userTheme }: IDashBackResponse) {
    const [backOfficeValues, setBackOfficeValues] = useState(backOfficeQuantityToday())
    let currentDate = ""
    let date = new Date()
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    currentDate = `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`

    function backOfficeQuantityToday() {
        let maxValue = 0

        const arrayValues = []
        const labels = []

        for (let i = 0; i < backOffices.length; i++) {
            labels.push(backOffices[i].name)
            arrayValues.push(backOffices[i].quantityToday)

            if (backOffices[i].quantityToday > maxValue) {
                maxValue = backOffices[i].quantityToday
            }
        }

        return {
            labels: labels,
            quantity: arrayValues,
            maxQuantity: maxValue
        }
    }

    const options: ChartOptions<'bar'> = {
        indexAxis: 'y' as const,
        responsive: true,
        scales: {
            x: {
                max: backOfficeValues.maxQuantity + 3,
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
                    color: userTheme === "light" ? "#000" : "#FFF",
                    font: {
                        size: 14,
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: userTheme === "light" ? "#000" : "#FFF",
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    const backOfficesChart: ChartData<'bar'> = {
        labels: backOfficeValues.labels,
        datasets: [
            {
                label: `Quantidade de feedbacks aplicados hoje`,
                data: backOfficeValues.quantity,
                borderWidth: 1,
                backgroundColor: "#fbbf2480",
                borderColor: "#fbbf24"
            },
        ],
    };

    return (
        <div className={`flex items-center justify-center mt-4 w-fit`}>
            <div className={`w-[300px] h-48 lg:w-[600px]`}>
                <Bar options={options} data={backOfficesChart}/>
            </div>
        </div>
    )
}