const DATA_URL = 'http://127.0.0.1:3000/JSONs/airports.json';
const DATA_URL_2 = 'http://127.0.0.1:3000/JSONs/airplanes.json';

const AIRPORT_COLS: string[] = [
	'icao_code',
	'is_hub',
	'latitude_deg',
	'longitude_deg',
	'runways',
];

const AIRPLANE_COLS: string[] = [
	'name',
	'fuel_capacity_gal',
	'max_speed_kt',
	'fuel_burn_rate_gal_hr',
	'max_seats',
	'current_seats',
];

async function fetchData(URL: string, HEADER_COLS: string[]): Promise<void> {
	try {
		const response = await fetch(URL);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		const data: Record<string, any> = await response.json();
		generateTable(data, HEADER_COLS, 'table--container');

	} catch (error) {
		console.log(error);
	}
}

function generateTable(
	data: Record<string, any>,
	HEADER_COLS: string[],
	container_class: string
): void {

	const table = document.createElement('table');

	const container = document.querySelector(`.${container_class}`);
	if (!container) return;

	container.appendChild(table);

	const headerRow = document.createElement('tr');

	HEADER_COLS.forEach((colName: string) => {
		const th = document.createElement('th');
		th.textContent = colName;
		headerRow.appendChild(th);
	});

	table.appendChild(headerRow);

	Object.values(data).forEach((element: any) => {
		const tr = document.createElement('tr');

		HEADER_COLS.forEach((col: string) => {
			const td = document.createElement('td');

			const value = element[col];

			if (Array.isArray(value)) {
				td.textContent = String(value.length);
			} else {
				td.textContent = String(value ?? '');
			}

			tr.appendChild(td);
		});

		table.appendChild(tr);
	});
}

const removeLoadingElement = (id: string): void => {
	const el = document.getElementById(id);
	if (el) el.remove();
};

fetchData(DATA_URL, AIRPORT_COLS).finally(() => {
	removeLoadingElement('airports--loading');
});

fetchData(DATA_URL_2, AIRPLANE_COLS).finally(() => {
	removeLoadingElement('airplanes--loading');
});

