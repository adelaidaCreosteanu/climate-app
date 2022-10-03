import React, { useEffect, useState } from "react";
import EmissionsChart from "./Chart";

function FetchData() {

    const [emissions, setEmissions] = useState<IYearlyEmissions[] | undefined>(undefined)

    useEffect(() => {
        getApiData();
    }, []);

    const getApiData = () => {
        // TODO: Get from user input
        const subsector: string = "electricity-generation";
        const countries: string = "rou,gbr,hun,fra,irl,lva,mex";

        fetch(
            `http://127.0.0.1:8000/timeseries/${subsector}?countries=${countries}`
        ).then((response) => response.json())
            .then((yearlyCountryEmissions: IYearlyEmissions[]) => {
                setEmissions(yearlyCountryEmissions);
            });
    };


    return (
        <div> <EmissionsChart subsector={emissions} /></div>
    );
}

export default FetchData;
