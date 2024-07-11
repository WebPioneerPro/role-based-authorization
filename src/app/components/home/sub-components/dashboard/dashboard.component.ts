import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartElement: ElementRef;
  @ViewChild('workingChart') typeChartElement: ElementRef;
  currentDate = new Date()
  recentDate = this.currentDate.toLocaleString('en-US', {month : 'short', day: '2-digit'})
  preceedingDate = []

  constructor() { }

  ngOnInit(): void {
    for (let i = 1; i <= 4; i++) {
      const date = new Date();
      date.setDate(this.currentDate.getDate() - i);
      this.preceedingDate.unshift(date.toLocaleString('en-US', {month : 'short', day: '2-digit'}));
    }

    const chartOptions: ApexCharts.ApexOptions = {
      series: [{
        name: 'Sick leave',
        data: [20, 7, 18, 5, 15]
      }, {
        name: 'Paid leave',
        data: [13, 24, 14, 7, 22]
      }, {
        name: 'Unpaid leave',
        data: [4, 2, 10, 12, 3]
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [...this.preceedingDate, this.recentDate],
      },
      yaxis: {
        title: {
          text: 'employees'
        },
        min: 0,
        max: 25
      },
      fill: {
        opacity: 1
      },
      colors: ['#4BAAC8', '#FFC300', '#C70039'],
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " employees"
          }
        }
      }
    };

    const chart = new ApexCharts(this.chartElement.nativeElement, chartOptions);
    chart.render();
  }
}
