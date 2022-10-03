interface IYearlyEmissions {
    year: number;
    // Each country's CO2 equivalent after 100 years
    [country: string]: number | null;
}
