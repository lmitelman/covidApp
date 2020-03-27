import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
	selector: 'app-graph',
	templateUrl: './graph.component.html',
	styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

	@Input() covidGlobalCases: any[];
	testArray: any[] = [];

	constructor() { }

	ngOnInit() {
		for (let i = 0; i < 5; i++) {
			let country = this.covidGlobalCases[i];
			this.pieChartLabels.push(country.country);
			this.pieChartData.push(country.cases.total);
		}
	}

	// Pie
	public pieChartOptions: ChartOptions = {
		responsive: true,
		legend: {
			position: 'top',
		},
		plugins: {
			datalabels: {
				formatter: (value, ctx) => {
					const label = ctx.chart.data.labels[ctx.dataIndex];
					return label;
				},
			},
		}
	};
	public pieChartLabels: Label[] = [];
	public pieChartData: number[] = [];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [pluginDataLabels];
	public pieChartColors = [
		{
			backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255, 0, 166, 0.3)', 'rgba(0, 157, 255, 0.3)'],
		},
	];

	// events
	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
		console.log(event, active);
	}
}
