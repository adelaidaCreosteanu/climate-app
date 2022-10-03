import logging
from fastapi import FastAPI
from processor import reformat_emissions
from queries import get_sector_from_subsector, get_timeseries

app = FastAPI()


@app.get("/timeseries/{subsector}")
async def timeseries(subsector: str, countries: str):
    # Get sector name
    sector = None
    try:
        sector = get_sector_from_subsector(subsector)
    except Exception as ex:
        # TODO: Raise error to request
        logging.exception(ex)

    # Get timeseries
    try:
        emissions = get_timeseries(sector, countries)
    except Exception as ex:
        # TODO: Raise error to request
        logging.exception(ex)

    # Parse to list of countries
    formatted_data = reformat_emissions(emissions, subsector)

    return {
        "subsector": subsector,
        "sector": sector,
        "countries": countries,
        "my_data": formatted_data,
    }
