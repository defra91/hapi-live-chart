/* global Highcharts, io */
'use strict';

angular.module('liveChart')

.controller('TemperatureCtrl', function($scope, TemperatureService) {

    var socket = io('http://127.0.0.1:3000');

    var series = [];

    socket.on('temperature logged', function(data) {
        console.log('Somebody logged temperature', data);
    });

    var drawChart = function(series) {
        $('#chart-container').highcharts({
            animation: Highcharts.svg,
            title: {
                text: 'Temperature'
            },
            chart: {
                type: 'spline',
                animation: Highcharts.svg,
                events: {
                    load: function() {
                        var series = this.series[0];
                        socket.on('temperature-logged', function(doc) {
                            series.addPoint([new Date(doc.timestamp).getTime(), doc.value], true, true);
                        });
                    }
                },
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: 'Temperature (°C)'
            },
            series: series
        });
    };

    var getSeriesFromData = function(data) {

        series = [{
            name: 'temperature',
            data: []
        }];
        data.forEach(function(elem) {
            series[0].data.push([new Date(elem.timestamp).getTime(), elem.value]);
        });
        return series;
    };

    TemperatureService.getAll().then(function(result) {
        drawChart(getSeriesFromData(result.data));
    });
});
