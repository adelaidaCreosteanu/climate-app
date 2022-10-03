import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from processor import reformat_emissions
from queries import get_sector_from_subsector, get_timeseries

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

    return formatted_data
