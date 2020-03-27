import { Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	covidGlobalCases: any[] = [];
	loading: boolean = false;
	worldCases: number;
	worldDeaths: number;
	disabledAlpha: boolean = false;
	disabledMore: boolean = true;
	lastUpdate: Date;

	constructor(private covid: CovidService) { }

	ngOnInit() {
		this.loading = true;
		this.covid.getAllCountries()
			.subscribe((response: any) => {
				this.covidGlobalCases = response.response;
				for (let i = 0; i < this.covidGlobalCases.length; i++) {
					let country = this.covidGlobalCases[i];
					country.totalCases = country.cases.total;
					this.lastUpdate = country.time;
					if (country.country == "All" ) {
						this.worldCases = country.cases.total;
						this.worldDeaths = country.deaths.total;
						this.covidGlobalCases.splice(i, 1);
					}
				}
				for (let i = 0; i < this.covidGlobalCases.length; i++) {
					let country = this.covidGlobalCases[i];
					if (country.country == "Mozambique" ) {
						this.covidGlobalCases.splice(i, 1);
					}
				}
				console.log("Total world cases: " + this.worldCases);
				console.log("Total world deaths: " + this.worldDeaths);
				this.loading = false;
				console.log(this.covidGlobalCases);
				this.sortPlusCases();
				console.log(this.covidGlobalCases);
			});
	}

	/** This function allows you to sort an object list by an object property. */
	dynamicSort(property) {
		let sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

	sortAlpha() {
		this.covidGlobalCases.sort(this.dynamicSort("country"));
		this.disabledAlpha = true;
		this.disabledMore = false;
	}

	sortPlusCases() {
		this.covidGlobalCases.sort(this.dynamicSort("totalCases"));
		this.covidGlobalCases.reverse();
		this.disabledAlpha = false;
		this.disabledMore = true;
	}
}
