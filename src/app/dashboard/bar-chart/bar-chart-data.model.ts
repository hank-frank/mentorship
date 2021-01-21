export interface BarChartData {
    barValues: [
        {
            name: string,
            value: number
        },
        {
            name: string,
            value: number
        },
    ],
    showXAxisLabel: boolean,
    xAxisLabel: string,
    showYAxisLabel: boolean,
    yAxisLabel: string,
    colors: [string, string],
    title: string
}