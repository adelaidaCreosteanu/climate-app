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
    subsector: IYearlyEmissions[] | undefined
}

export default function EmissionsChart(props: IChartProps) {
    if (props.subsector && props.subsector?.length > 0) {
        const country_set = Object.keys(props.subsector[0]).filter(x => x !== "year");
        const lineColors = ["#76b7e6", "#ff7f0e", "#cc0000", "#cd5f96", "#6aa84f", "#16537e", "#906e04"]

        return (
            <LineChart
                width={700}
                height={400}
                data={props.subsector}
                margin={{
                    top: 30,
                    right: 30,
                    left: 30,
                    bottom: 10
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: "Tonnes CO2E", angle: -90 }} />
                <Tooltip />
                <Legend />
                {country_set.map((
                    country_code, country_index
                ) =>
                    <Line
                        type="monotone"
                        dataKey={country_code}
                        stroke={lineColors[country_index % lineColors.length]}
                        activeDot={{ r: 8 }}
                    />

                )}

            </LineChart>
        );
    } else {
        return (
            <div> No data to plot! </div>
        );
    }
}