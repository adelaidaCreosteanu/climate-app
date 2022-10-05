import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

const country_codes = {
  aut: "Austria",
  fin: "Finland",
  fra: "France",
  deu: "Germany",
  hun: "Hungary",
  irl: "Ireland",
  lva: "Latvia",
  mex: "Mexico",
  prt: "Portugal",
  rou: "Romania",
  esp: "Spain",
  swe: "Sweden",
  tur: "Turkey",
  gbr: "United Kingdom",
};

interface IProps {
  setEmissions: React.Dispatch<
    React.SetStateAction<IYearlyEmissions[] | undefined>
  >;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}

function CountrySelect(props: IProps) {
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    if (countries.length > 0) {
      getApiData();
    }
  }, [countries]);

  const getApiData = () => {
    const subsector: string = "electricity-generation";
    props.setLoadingData(true);
    fetch(
      `http://localhost:8000/timeseries/${subsector}?countries=${countries.join()}`
    )
      .then((response) => response.json())
      .then((yearlyCountryEmissions: IYearlyEmissions[]) => {
        props.setEmissions(yearlyCountryEmissions);
        props.setLoadingData(false);
      })
      .catch((e) => props.setLoadingData(false));
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
          <InputLabel id="country-selection-label">Countries:</InputLabel>
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
    </div>
  );
}

export default CountrySelect;
