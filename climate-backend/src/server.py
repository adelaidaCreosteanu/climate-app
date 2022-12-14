import logging
from fastapi import FastAPI
from fastapi import Response
from fastapi import status
from fastapi.middleware.cors import CORSMiddleware
from src.processor import reformat_emissions
from src.queries import get_sector_from_subsector
from src.queries import get_timeseries

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://main.d1v91ui4o6nkl1.amplifyapp.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/timeseries/{subsector}", status_code=200)
async def timeseries(subsector: str, countries: str, response: Response):
    # Get sector name
    sector = None
    try:
        sector = get_sector_from_subsector(subsector)
    except Exception as ex:
        logging.exception(ex)
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"detail": str(ex)}

    # Get timeseries
    try:
        emissions = get_timeseries(sector, countries)
    except Exception as ex:
        logging.exception(ex)
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"detail": str(ex)}

    # Parse to list of countries
    formatted_data = reformat_emissions(emissions, subsector)

    return formatted_data
