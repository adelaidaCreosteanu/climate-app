from collections import defaultdict
from typing import Any


def reformat_emissions(emissions: list[dict], subsector: str) -> list[dict]:
    """Select `subsector` emissions and simplify format.

    Expected format of `emissions` arg is:
    `emissions = [country_a, country_b ...]`, where
    `country_a =  {"name": country_code, "data": subsector_data}`, where
    `subsector_data =  {"name": subsector, "emissions": subs_emissions}`, where
    `subs_emissions =  ["year": y, ghg: value_in_tonnes ...]`

    Format returned by this function is:
    `emissions = [yearly_emissions_a ...]`, where
    `yearly_emissions_a = {"year": y, country_code: co2e_in_tonnes ...}`
    for the requested subsector.

    Warning! Only the "co2100" attribute (CO2 equivalent after 100 years)
    is selected.

    Args:
        emissions: Data received from Climate TRACE. See format above.
        subsector: Name of subsector to select the data for.
    
    Returns: 
    """
    # Keys are years, value is dict like `yearly_emissions_a` from docstring
    country_emissions = defaultdict(dict)

    for country in emissions:
        country_code = country["name"]

        for subsector_data in country["data"]:
            if subsector_data["name"] != subsector:
                continue

            # Add each year of emissions for this country
            for yearly_e in subsector_data["emissions"]:
                year = yearly_e["year"]
                country_emissions[year][country_code] = yearly_e["co2100"]

    # Add year attribute to each dict
    country_emissions = {
        y: dict(data, **{"year": y})
        for y, data in country_emissions.items()
    }
    # Drop the keys as return as list of yearly emissions
    parsed = list(country_emissions.values())
    return parsed
