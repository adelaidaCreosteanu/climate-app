# Introduction

[Climate TRACE](https://www.climatetrace.org/) provides green-house gas emissions data to a never-before-seen granularity.

After playing around with their exploration tool, I noticed that there was no way to compare different countries' trends over the years on a graph.
You could only compare the absolute values of their emissions.
However, their API provides the data required for this feature.

This project uses the Climate TRACE API to plot the electricity generation emissions of countries of your choice, between 2015 and 2020.

# Frontend

## Structure

The frontend is in Typescript with React.
It contains:

- `components/CountrySelect.txs`: a multiple select to choose the countries to compare.
- `components/Chart.txs`: a line chart implemented with `recharts` which plots each country's emissions with a different colour. If there would be more countries than possible colours selected, the colours would loop.

## Local execution

From the `climate-frontend` directory, run:

```bash
npm i
npm start
```

and then visit [localhost:3000](http://localhost:3000/) in your browser.

# Backend

## Structure

The backend is in Python 3.10 and uses FastAPI.

It contains:

- `server.py`: the FastAPI server. It only exposes one endpoint `/timeseries/{subsector}` with the countries given as a parameter. In turn, this endpoint makes two requests to the Climate TRACE API:
  - one to get the sector of the given subsector.
  - and the second to get the timeseries data for the given **sector** and countries.
- `processor.py`: the timeseries data from the Climate TRACE API is processed:
  - the data structure is flattened so that the frontend can display it without having to process it.
  - the units are converted to million tonnes.
  - Only the "co2100" attribute (CO2 equivalent after 100 years) is selected and the other attributes are dropped (e.g. "c02", "ch4", "n02")

## Local execution

You can run the backend in a docker container. After installing docker, build the image:

```bash
docker build -t climate-backend-app climate-backend
```

and then run the container:

```bash
sudo docker run -p 8000:8000 climate-backend
```

The app will be listening on port 8000.

# Future extensions

1. Allow the user to select the subsector from a dropdown. The backend **already** has functionality to return the data from any subsector accepted by Climate TRACE.
2. Create a new endpoint to fetch the entire list of countries from Climate TRACE. Then the frontend can display a dynamic choice of countries.
3. Dynamic conversion of units. Currently we convert to millions, but the unit could be interpreted from the magnitude of the returned data. This would require sending the unit name back to the frontend so it can be displayed correctly.
4. Use `recharts-to-png` to allow users to save their chart as an image.
