import React, { useEffect, useState } from "react";
import EmissionsChart from "./Chart";

function FetchData() {

    const [emissions, setEmissions] = useState<ISubsectorEmission | undefined>(undefined)

    useEffect(() => {
        getApiData();
    }, []);

    useEffect(() => {
        //updates graph data
    }, [emissions]);

    const getApiData = () => {
        const sector: string = "power";
        const country: string = "rou";

        fetch(
            `https://api.dev.climatetrace.org/v3/emissions/timeseries/sectors/${sector}?countries=${country}&since=2010&to=2022`
        ).then((response) => response.json())
            .then((countriesEmissions: ICountryEmission[]) => {
                const allSubsectors = countriesEmissions.pop()?.data;
                let elecSubSector = allSubsectors?.filter(x => x.name === "electricity-generation").pop();
                elecSubSector?.emissions.forEach(x => {
                    x.co2=x.co2?x.co2/1000000:x.co2;
                })
                setEmissions(elecSubSector);
            });
    };


    return (
        <div> <EmissionsChart subsector={emissions} /></div>
    );
}

export default FetchData;
