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

	constructor(private covid: CovidService) { }

	ngOnInit() {
		this.loading = true;
		this.covid.getAllCountries()
			.subscribe((response: any) => {
				this.covidGlobalCases = response.response;
				console.log(this.covidGlobalCases[0]);
				this.loading = false;
			});
	}
}
