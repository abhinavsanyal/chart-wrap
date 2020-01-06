import React, { Component } from 'react';
import Chart from 'chart.js';
import classes from './LineGraph.module.css';
import point from './graph-point.svg';
let myLineChart;

//--Chart Style Options--//
Chart.defaults.global.defaultFontFamily = "'PT Sans', sans-serif";
// Chart.defaults.global.legend.display = false;
//--Chart Style Options--//
let yourImage = new Image();

yourImage.src = point;

yourImage.width = '25';

yourImage.height = '25';

let getPointsOptions = (data, highlights) => {
	let pointData = data;
	let pointStyle = pointData.map((d) => {
		if (highlights.indexOf(d) !== -1) return yourImage;
		else return '';
	});

	let pointRadius = pointData.map((d) => {
		if (highlights.indexOf(d) !== -1) return 20;
		else return 0;
	});

	let pointHitRadius = pointData.map((d) => {
		if (highlights.indexOf(d) !== -1) return 5;
		else return 0;
	});

	return {
		pointRadius,

		pointHoverRadius: pointHitRadius,

		pointHitRadius: pointHitRadius,

		pointStyle
	};
};

let data = [ 390, 300, 496, 181, 410, 280, 670, 489, 860, 420, 630, 340 ];
let data1 = [ 490, 310, 296, 681, 110, 580, 470, 389, 560, 620, 730, 340 ];
let pointsOpt = getPointsOptions(data, [ 410 ]);
let chartData = {
	labels: [ 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC' ],

	datasets: [
		{
			label: 'No. of transactions',

			fill: false,
			id: 'y-axis-0',
			// strokeColor: '#006ee9',

			pointColor: 'rgba(220,220,220,1)',

			pointStrokeColor: '#fff',

			pointHighlightFill: '#fff',

			pointHighlightStroke: 'rgba(220,220,220,1)',

			borderColor: '#006ee9',

			borderWidth: '1.5',

			pointRadius: pointsOpt.pointRadius,

			pointHoverRadius: pointsOpt.pointHoverRadius,

			pointHitRadius: pointsOpt.pointHitRadius,

			pointStyle: pointsOpt.pointStyle,

			data: data
		},
		{
			label: 'Billed Amount',
			id: 'y-axis-1',
			fill: false,
			lineTension: 0,

			// strokeColor: '#43c7ff',

			pointColor: 'rgba(220,220,220,1)',

			pointStrokeColor: '#fff',

			pointHighlightFill: '#fff',

			pointHighlightStroke: 'rgba(220,220,220,1)',

			borderColor: '#43c7ff',

			borderWidth: '1.5',

			pointRadius: pointsOpt.pointRadius,

			pointHoverRadius: pointsOpt.pointHoverRadius,

			pointHitRadius: pointsOpt.pointHitRadius,

			pointStyle: pointsOpt.pointStyle,

			data: data1
		}
	]
};

var chartOptions = {
	//Customize chart options
	scales: {
		xAxes: [
			{
				gridLines: {
                    display: true,
                    
					borderDash: [ 6, 10 ],

					color: '#d8d8d8'
				},
				ticks: {
					beginAtZero: false
				}
			}
		],

		yAxes: [
			{
				position: 'left',
				id: 'y-axis-0',
				gridLines: {
					display: true,

					borderDash: [ 6, 10 ],

					color: '#d8d8d8'
				},

				scaleLabel: {
					display: true,

					labelString: 'No. of Transactions'
				},

				ticks: {
					suggestedMin: 50,

					suggestedMax: 1000,

					stepSize: 250
				}
			},
			{
				position: 'right',
				id: 'y-axis-1',
				gridLines: {
					display: true,

					borderDash: [ 6, 10 ],

					color: '#d8d8d8'
				},

				scaleLabel: {
					display: true,

					labelString: 'Monthly Spends'
				},

				ticks: {
					suggestedMin: 50,

					suggestedMax: 1000,

					stepSize: 250
				}
			}
		]
	},

	tooltips: {
		// Disable the on-canvas tooltip

		enabled: false,
		position: 'custom',

		custom: function(tooltipModel) {
			// Tooltip Element

			var tooltipEl = document.getElementById('chartjs-tooltip');

			// Create element on first render

			if (!tooltipEl) {
				tooltipEl = document.createElement('div');

				tooltipEl.id = 'chartjs-tooltip';

				tooltipEl.innerHTML = '<span style="padding:20px"></span>';

				// tooltipEl.style.width = "206px";

				// tooltipEl.style.height = "55px";

				tooltipEl.style.boxShadow = '2px 2px 10px 0 rgba(0, 0, 0, 0.1)';

				tooltipEl.style.border = 'solid 1px #ececec';

				tooltipEl.style.backgroundColor = '#ffffff';

				document.body.appendChild(tooltipEl);
			}

			// Hide if no tooltip

			if (tooltipModel.opacity === 0) {
				tooltipEl.style.opacity = 0;

				return;
			}

			let directionY = tooltipModel.dataPoints[0].value >= 500 ? 'top' : 'bottom';

			let directionX = tooltipModel.xAlign ? tooltipModel.xAlign : 'right';

			console.log(directionY, 'directionY');

			console.log(directionX, 'directionX');

			console.log(tooltipModel, 'Hulk');

			// Set caret Position

			// tooltipEl.classList.remove('above', 'below', 'no-transform');

			if (directionY == 'top') {
				tooltipEl.classList.add('tooltip-top');
				// if (directionX === 'left') {
				// 	tooltipEl.classList.remove('tooltip-right');

				// 	tooltipEl.classList.add('tooltip-left');
				// } else {
				// 	tooltipEl.classList.remove('tooltip-right');

				// 	tooltipEl.classList.add('tooltip-left');
				// }
			} else if (directionY == 'bottom') {
				tooltipEl.classList.add('tooltip-top');
				// if (directionX === 'left') {
				// 	tooltipEl.classList.add('tooltip-right');
				// } else {
				// }
			}

			// if (tooltipModel.yAlign) {

			// tooltipEl.classList.add(tooltipModel.yAlign);

			// tooltipEl.classList.add("tooltip-left");

			// } else {

			// tooltipEl.classList.add('no-transform');

			// }

			function getBody(bodyItem) {
				return bodyItem.lines;
			}

			// Set Text

			if (tooltipModel.body) {
				var titleLines = tooltipModel.title || [];

				var bodyLines = tooltipModel.body.map(getBody);

				// console.log(titleLines , "Title lines");

				// console.log(bodyLines , "Body Lines");

				// var innerHtml = '<thead>';

				// titleLines.forEach(function(title) {

				// innerHtml += '<div>' + title + '</div>';

				// });

				// innerHtml += '</thead><tbody>';

				// bodyLines.forEach(function(body, i) {

				// var colors = tooltipModel.labelColors[i];

				// var style = 'background:' + colors.backgroundColor;

				// style += '; border-color:' + colors.borderColor;

				// style += '; border-width: 2px';

				// var span = '<span style="' + style + '"></span>';

				// innerHtml += '<tr><td>' + span + body + '</td></tr>';

				// });

				// innerHtml += '</tbody>';

				var tableRoot = tooltipEl.querySelector('span');

				tableRoot.innerHTML = bodyLines[0];
			}

			// `this` will be the overall tooltip

			var position = this._chart.canvas.getBoundingClientRect();

			// Display, position, and set styles for font

			tooltipEl.style.opacity = 1;

			tooltipEl.style.position = 'absolute';

			tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';

			tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';

			tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;

			tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';

			tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;

			tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';

			tooltipEl.style.pointerEvents = 'none';
		}
	}
};

export default class LineGraph extends Component {
	chartRef = React.createRef();

	componentDidMount() {
		this.buildChart();
	}

	componentDidUpdate() {
		this.buildChart();
	}

	buildChart = () => {
		const myChartRef = this.chartRef.current.getContext('2d');
		const { data, average, labels } = this.props;
        myChartRef.canvas.style.backgroundColor = '#f9f9f9';
		if (typeof myLineChart !== 'undefined') myLineChart.destroy();
        Chart.Tooltip.positioners.custom = function(elements, position) {
            if (!elements.length) {
              return false;
            }
            var offsetx = 0;
            var offsety = 0;
            //adjust the offset left or right depending on the event position
            if (elements[0]._chart.width / 2 > position.x) {
              offsetx = 13;
            } else {
              offsetx = -13;
            }

            if (elements[0]._chart.width / 2 > position.y) {
                offsety = 13;
              } else {
                offsety = -13;
              }
            return {
              x: position.x  + offsetx,
              y: position.y  + offsety
            }
          }
          let draw = Chart.controllers.line.prototype.draw;
          Chart.controllers.line = Chart.controllers.line.extend({
			draw: function() {
				let ctx = this.chart.chart.ctx;

				ctx.save();

                draw.apply(this, arguments);
				if (this.chart.tooltip._active && this.chart.tooltip._active.length) {

				let activePoint = this.chart.tooltip._active[0];

				// ctx = this.chart.ctx,

				let x = activePoint.tooltipPosition().x;
                let y = activePoint.tooltipPosition().y;
				let topY = this.chart.scales['y-axis-0'].top;

				let bottomY = this.chart.scales['y-axis-0'].bottom;

				// draw line

                ctx.save();
                
                ctx.beginPath();
                ctx.setLineDash([5, 15]);
				ctx.moveTo(x, y);

				ctx.lineTo(x, bottomY);

				ctx.lineWidth = 2;

				ctx.strokeStyle = '#C8C8C8';

				ctx.stroke();

              
            }
            ctx.save();
            draw.apply(this, arguments);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';

				ctx.shadowBlur = 10;

				ctx.shadowSpread = 0;

				ctx.shadowOffsetX = 4;

				ctx.shadowOffsetY = 5;

				ctx.stroke();

				draw.apply(this, arguments);

            ctx.restore();
			}
        });
		myLineChart = new Chart(myChartRef, {
            type: 'line',
            data: chartData,
			// data: {
			// 	//Bring in data
			// 	labels: labels,
			// 	datasets: [
			// 		{
			// 			label: 'Sales',
			// 			data: data,
			// 			fill: false,
			// 			borderColor: '#6610f2'
			// 		},
			// 		{
			// 			label: 'National Average',
			// 			lineTension: 0,
			// 			data: average,
			// 			fill: false,
			// 			borderColor: 'red'
			// 		}
			// 	]
			// },
			options: chartOptions
		});
	};

	render() {
		return (
			<div className={classes.graphContainer}>
				<canvas id="myChart" ref={this.chartRef} />
			</div>
		);
	}
}
