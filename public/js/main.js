var locale = {
	de: {
		decimalPoint: ',',
		months: [
			'Januar',
			'Feburar',
			'März',
			'April',
			'Mai',
			'Juni',
			'Juli',
			'August',
			'September',
			'Oktober',
			'November',
			'Dezember',
		],
		shortMonths: [
			'Jan',
			'Feb',
			'Mär',
			'Apr',
			'Mai',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dez',
		],
		thousandsSep: '.',
		weekdays: [
			'Sonntag',
			'Montag',
			'Dienstag',
			'Mittwoch',
			'Donnerstag',
			'Freitag',
			'Samstag'
		],
		rangeFrom: 'Vom',
		rangeTo: 'Bis'
	},
	en: {
		decimalPoint: '.',
		months: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		],
		shortMonths: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		],
		thousandsSep: ',',
		weekdays: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		],
		rangeFrom: 'From',
		rangeTo: 'To'
	}
};

var App = {
	locale: 'de',
	getLocale: function(type) {
		if (typeof locale[this.locale][type] != 'undefined') {
			return locale[this.locale][type];
		} else {
			return locale['en'][type];
		}
	},
	getMonthNames: function() {
		return this.getLocale('months');
	},
	getShortMonthNames: function() {
		return this.getLocale('shortMonths');
	},
	getDecimalPoint: function() {
		return this.getLocale('decimalPoint');
	},
	getThousandsSep: function() {
		return this.getLocale('thousandsSep');
	},
	getWeekdays: function() {
		return this.getLocale('weekdays');
	},
	getRangeSelectorFrom: function() {
		return this.getLocale('rangeFrom');
	},
	getRangeSelectorTo: function() {
		return this.getLocale('rangeTo');
	},
};

if (typeof Highcharts != 'undefined') {
	var highchartsOptions = {
		credits: {
			enabled: false
		},
		legend: {
			enabled: false
		},
		title: {
			text: null
		},
		colors: [
			'#A1CF64', // Green
			'#D95C5C', // Red
			'#6ECFF5', // Blue
			'#564F8A', // Purple
			'#F05940', // Orange
			'#00B5AD' // Teal
		],
		navigator: {
			outlineColor: '#dddddd',
			outlineWidth: 1,
			handles: {
				backgroundColor: '#fff',
				borderColor: '#999'
			}
		},
		plotOptions: {
			area: {
				turboThreshold: 0
			}
		},
		rangeSelector: {
			buttonTheme: {
				fill: 'none',
				stroke: 'none',
				states: {
					hover: {
						fill: '#eee',
						stroke: 'none'
					},
					select: {
						fill: '#ccc',
						stroke: 'none',
					}
				}
			},
			inputBoxBorderColor: '#eee',
			inputBoxHeight: 18,
			inputDateFormat: '%e. %b %Y',
			inputEditDateFormat: '%d.%m.%Y',
			labelStyle: {
				color: '#111'
			}
		},
		xAxis: {
			lineColor: '#dddddd'
		},
		yAxis: {
			gridLineColor: '#dddddd'
		},
		tooltip: {
			shadow: false
		}
	};

	Highcharts.setOptions({
		lang: {
			rangeSelectorFrom: App.getRangeSelectorFrom(),
			rangeSelectorTo: App.getRangeSelectorTo(),
			months: App.getMonthNames(),
			shortMonths: App.getShortMonthNames(),
			decimalPoint: App.getDecimalPoint(),
			thousandsSep: App.getThousandsSep(),
			weekdays: App.getWeekdays()
		}
	});
}

$(function() {
	console.log('Init application...');

	var $checkUptimeChart = $('#chart-check-uptime');
	var $checkLatencyChart = $('#chart-check-latency');

	if ($checkUptimeChart.length) {
		$.getJSON($checkUptimeChart.data('url'), function(json) {
			$checkUptimeChart.highcharts('StockChart', $.extend(true, {}, highchartsOptions,
				{
					chart: {
						zoomType: 'x',
						type: 'area'
					},
					plotOptions: {
						area: {
							animation: false,
							cropThreshold: 60 * 24 * 31
						}
					},
					rangeSelector: {
						buttons: [{
							type: 'day',
							count: 1,
							text: '1d'
						},
						{
							type: 'day',
							count: 2,
							text: '2d'
						},
						{
							type: 'week',
							count: 1,
							text: '1w'
						},
						{
							type: 'month',
							count: 1,
							text: '1m'
						}],
						selected: 2
					},
					series: json,
					tooltip: {
						shared: true,
						followPointer: true,
						formatter: function() {
							var header = Highcharts.dateFormat('%A, %e. %b, %H:%M', this.x) + '<br>';
							if (this.y == 1) {
								return header + '<b>Online</b>';
							} else {
								return header + '<b>Offline</b>';
							}
						}
					},
					xAxis: {
						type: 'datetime',
						minRange: 3600 * 1000,
						title: {
							text: null
						}
					},
					yAxis: {
						labels: {
							enabled: false
						},
						title: {
							text: null
						}
					}
				}
			));
		});
	}

	if ($checkLatencyChart.length) {
		$.getJSON($checkLatencyChart.data('url'), function(json) {
			$checkLatencyChart.highcharts('StockChart', $.extend(true, {}, highchartsOptions,
				{
					chart: {
						zoomType: 'x',
						type: 'area'
					},
					plotOptions: {
						area: {
							animation: false,
							cropThreshold: 60 * 24 * 7
						}
					},
					rangeSelector: {
						buttons: [{
							type: 'day',
							count: 1,
							text: '1d'
						},
						{
							type: 'day',
							count: 2,
							text: '2d'
						},
						{
							type: 'week',
							count: 1,
							text: '1w'
						}],
						selected: 0
					},
					series: json,
					tooltip: {
						shared: true,
						followPointer: true,
						formatter: function() {
							return Highcharts.dateFormat('%A, %e. %b, %H:%M', this.x) + '<br>' + '<b>' + this.y + ' ' + $checkLatencyChart.data('seconds') + '</b>';
						}
					},
					xAxis: {
						type: 'datetime',
						minRange: 3600 * 1000,
						title: {
							text: null
						}
					},
					yAxis: {
						title: {
							text: null
						}
					}
				}
			));
		});
	}
});