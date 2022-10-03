
interface IEmissionsYear {
    "year": number;
    "co2": number | null;
    "ch4": number | null;
    "n20": number | null;
    "co2100": number | null;
    "co220": number | null;
}

interface ISubsectorEmission {
    name: string;
    emissions: IEmissionsYear[];
}

interface ICountryEmission {
    name: string;
    data: ISubsectorEmission[];
}
