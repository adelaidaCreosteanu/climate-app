import json
import requests

climate_trace_url = "https://api.dev.climatetrace.org/v3"


def get_sector_from_subsector(subsector: str) -> str:
    route = f"/definitions/subsectors/{subsector}"
    url = climate_trace_url + route
    r = requests.get(url)
    body = json.loads(r.text)

    if r.status_code == 200:
        return body["sector"]
    else:
        cause = body.get("detail")
        raise ValueError(f"Climate TRACE API returned {r.status_code} for "
                         f"subsector {subsector}: {cause}")


def get_timeseries(sector: str, countries: str):
    route = f"/emissions/timeseries/sectors/{sector}"
    url = climate_trace_url + route
    params = {
        "countries": countries,
        "since": "2010",
        "to": "2022",
    }

    r = requests.get(url, params=params)
    body = json.loads(r.text)

    if r.status_code == 200:
        return body
    else:
        cause = body.get("detail")
        raise ValueError(f"Climate TRACE API returned {r.status_code} for "
                         f"sector {sector} and countries {countries}: {cause}")
