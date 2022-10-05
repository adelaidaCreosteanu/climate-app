import React, { useState } from "react";
import "./App.css";
import CountrySelect from "./components/CountrySelect";
import EmissionsChart from "./components/Chart";

function App() {
  const [emissions, setEmissions] = useState<IYearlyEmissions[] | undefined>(
    undefined
  );
  const [loadingData, setLoadingData] = useState<boolean>(false);

  return (
    <div className="App">
      <CountrySelect
        setEmissions={setEmissions}
        setLoadingData={setLoadingData}
      />
      <div>
        {loadingData ? (
          "Loading Data"
        ) : (
          <EmissionsChart subsector={emissions} />
        )}
      </div>
    </div>
  );
}

export default App;
