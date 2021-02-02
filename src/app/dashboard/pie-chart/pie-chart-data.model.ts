export interface PieChartData {
    pieValues: [
        {
            name: string,
            value: number
        },
        {
            name: string,
            value: number
        },
        {
            name: string,
            value: number
        },
    ],
    piegradient: boolean,
    pieshowLegend: boolean ,
    showLabels: boolean, 
    isDoughnut: boolean,
    legendPosition: string,
    colors: [string, string, string],
    title: string
}