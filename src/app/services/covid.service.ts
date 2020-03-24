import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CovidService {

	constructor(private http: HttpClient) {
		console.log('Covid service is ready!');
	}

	getAllCountries() {
		const headers = new HttpHeaders({
			"x-rapidapi-host": "covid-193.p.rapidapi.com",
			"x-rapidapi-key": "d4b69d8b87msh51cecae556b2778p164a87jsnc5d6ee0fcb03"
		});
		return this.http.get("https://covid-193.p.rapidapi.com/statistics", { headers });
	}
}
