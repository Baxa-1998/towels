
import { ApexOptions } from "apexcharts";

export const TotalRevenueSeries = [
    {
        name: "Последний Месяц",
        data: [183, 124, 115, 85, 143, ],
    },
    {
        name: "Текущий Месяц",
        data: [95, 84, 72, 44, 108,  ],
    },
];

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ["#475BE8", "#CFC8FF"],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
        },
    },
    dataLabels: {
        enabled: false,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: ["Шохида Опа", "Убайдулло ака", "Мир посуды",  "Гулнора Опа", 'Алижон ака'],
    },
    yaxis: {
        title: {
            text: "$ (тысячи)",
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
    },
    tooltip: {
        y: {
            formatter(val: number) {
                return `$ ${val} thousands`;
            },
        },
    },
};