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
	disabledDeaths: boolean = false;
	lastUpdate: Date;

	constructor(private covid: CovidService) { }

	ngOnInit() {
		this.loading = true;
		this.covid.getAllCountries()
			.subscribe((response: any) => {
				for (let i = 0; i < response.response.length; i++) {
					let country = response.response[i];
					country.totalCases = country.cases.total;
					country.totalDeaths = country.cases.deaths;
					this.lastUpdate = country.time;
					if (country.country == "All") {
						this.worldCases = country.cases.total;
						this.worldDeaths = country.deaths.total;
					} else if (country.country != "Europe" && country.country != "Asia" && country.country != "North-America"
						&& country.country != "South-America" && country.country != "Oceania" && country.country != "Africa") {
						this.covidGlobalCases.push(country);
					}
				}
				console.log("Total world cases: " + this.worldCases);
				console.log("Total world deaths: " + this.worldDeaths);
				this.loading = false;
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
		this.disabledDeaths = false;
	}

	sortPlusCases() {
		this.covidGlobalCases.sort(this.dynamicSort("totalCases"));
		this.covidGlobalCases.reverse();
		this.disabledAlpha = false;
		this.disabledMore = true;
		this.disabledDeaths = false;
	}

	// sortPlusDeaths() {
	// 	this.covidGlobalCases.sort(this.dynamicSort("totalDeaths"));
	// 	this.covidGlobalCases.reverse();
	// 	this.disabledAlpha = false;
	// 	this.disabledMore = false;
	// 	this.disabledDeaths = true;
	// }
}
