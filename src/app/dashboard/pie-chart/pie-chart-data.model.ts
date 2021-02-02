interface SinglePieData {
    name: string;
    value: number;
}

export interface PieChartData {
    pieValues: Array<SinglePieData>;
    piegradient: boolean;
    pieshowLegend: boolean;
    showLabels: boolean;
    isDoughnut: boolean;
    legendPosition: string;
    colors: Array<string>;
    title: string;
}
