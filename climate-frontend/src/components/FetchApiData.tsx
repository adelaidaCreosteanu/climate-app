import { useEffect, useState } from "react";
import EmissionsChart from "./Chart";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

function FetchData() {
  const country_codes = {
    aut: "Austria",
    fin: "Finland",
    fra: "France",
    deu: "Germany",
    hun: "Hungary",
    irl: "Ireland",
    lva: "Latvia",
    mex: "Mexico",
    rou: "Romania",
    swe: "Sweden",
    tur: "Turkey",
    gbr: "United Kingdom",
  };

  const [emissions, setEmissions] = useState<IYearlyEmissions[] | undefined>(
    undefined
  );
  const [countries, setCountries] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    if (countries.length > 0) {
      getApiData();
    }
  }, [countries]);

  const getApiData = () => {
    const subsector: string = "electricity-generation";
    setLoadingData(true);
    fetch(
      `http://127.0.0.1:8000/timeseries/${subsector}?countries=${countries.join()}`
    )
      .then((response) => response.json())
      .then((yearlyCountryEmissions: IYearlyEmissions[]) => {
        setEmissions(yearlyCountryEmissions);
        setLoadingData(false);
      })
      .catch((e) => setLoadingData(false));
  };

  const handleChange = (event: SelectChangeEvent<typeof countries>) => {
    const {
      target: { value },
    } = event;
    setCountries(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="country-selection-label">Select:</InputLabel>
          <Select
            labelId="country-selection-label"
            id="country-selection"
            multiple
            value={countries}
            onChange={handleChange}
            input={<OutlinedInput id="select-country" label="Country" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={country_codes[value as keyof typeof country_codes]}
                  />
                ))}
              </Box>
            )}
          >
            {Object.entries(country_codes).map(([code, name]) => (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
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

export default FetchData;
