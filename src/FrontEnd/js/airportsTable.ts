// js/airportsTable.js

const DATA_URL = 'http://127.0.0.1:3000/JSONs/airports.json';
const DATA_URL_2 = 'http://127.0.0.1:3000/JSONs/airplanes.json';

// Columns to display in the table
const AIRPORT_COLS = [
	'icao_code',
	'is_hub',
	'latitude_deg',
	'longitude_deg',
	'runways',
];

const AIRPLANE_COLS = [
	'name',
	'fuel_capacity_gal',
	'max_speed_kt',
	'fuel_burn_rate_gal_hr',
	'max_seats',
	'current_seats',
];


async function fetchData(URL: string, HEADER_COLS : Array<string>) {
	try {
		const response = await fetch(URL);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}
		const data = await response.json();
		generateTable(data, HEADER_COLS, 'table--container');
		// console.log(data);
	} catch (error) {
		console.log(error);
	}
}

function generateTable(data : object, HEADER_COLS : Array<string>, container_class : string) {
	var table = document.createElement('table');
	document.querySelector(`.${container_class}`)?.appendChild(table) ?? "Failed to add table";

	var headerRow = document.createElement('tr');

	HEADER_COLS.forEach(colName => {
		const th = document.createElement('th');
		th.textContent = colName;
		headerRow.appendChild(th);
	});

	table.appendChild(headerRow);

	Object.values(data).forEach(element => {
		const tr = document.createElement('tr');

		HEADER_COLS.forEach(col => {
			const td : HTMLTableCellElement = document.createElement('td');

			if (Array.isArray(element[col])) {
				td.textContent = element[col].length.toString() ?? '';
			} else {
				td.textContent = element[col] ?? '';
			}
			tr.appendChild(td);
		});
		table.appendChild(tr);
	});
}
const removeLoadingElement = (id: string) => {
	document.getElementById(id)?.remove();
};
fetchData(DATA_URL, AIRPORT_COLS).finally(() => {
	removeLoadingElement('airports--loading');
});
fetchData(DATA_URL_2, AIRPLANE_COLS).finally(() => {
    removeLoadingElement('airplanes--loading')
}
);
