# View Nest Data

Shows a list of cycles by day of Nest thermostat data from Google Takeout.

I wanted to graph my furnace usage by month to see if it matched an increase in
billing. The data exported from google ended up being inconstant and erroneous.
So, the project ended up comparing exports.

Expects ./data/takeout-[x]/[years]/[months]/[year]-[month]-summary.json files

Check nest-data-store.js > `loadDatSet()` for fixed date ranges
