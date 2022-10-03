import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

interface IChartProps {
    subsector: ISubsectorEmission | undefined
}

export default function EmissionsChart(props: IChartProps) {
    if (props.subsector !== undefined) {
        return (
            <LineChart
                width={700}
                height={400}
                data={props.subsector.emissions}
                margin={{
                    top: 30,
                    right: 30,
                    left: 30,
                    bottom: 10
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: "M Tonnes CO2E", angle: -90}}/>
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="co2"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
            </LineChart>
        );
    } else {
        return (
            <div> No data to plot! </div>
        );
    }
}