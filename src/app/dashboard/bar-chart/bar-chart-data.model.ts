interface SingleBarData {
        name: string;
        value: number;
}

export interface BarChartData {
    barValues: SingleBarData[];
    showXAxisLabel: boolean;
    xAxisLabel: string;
    showYAxisLabel: boolean;
    yAxisLabel: string;
    colors: [string, string];
    title: string;
}
