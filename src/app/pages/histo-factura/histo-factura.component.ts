import { Component, OnInit } from '@angular/core';
import { FacturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
import * as Chart from 'chart.js';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-histo-factura',
  templateUrl: './histo-factura.component.html',
  styleUrls: ['./histo-factura.component.scss'],
})
export class HistoFacturaComponent implements OnInit {
  facturas: FacturaModel[] = [];
  constructor(private datap: ServiceNameService) { }

  ngOnInit(): void {
    this.datap.getFacturas().subscribe(
      (data) => {
        this.facturas = data;
        this.graph(this.facturas);
      }
    );
  }

  graph(hi){
    console.log(hi)
    let data=[];
    let labels= [];
     for (const element of hi) {
       labels.push(element.fecha);
       data.push(element.total)
    }

    let myChart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total de compras por dia',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
            xAxes: [{
                type: 'time',
                distribution: 'series'
            }]
        }
      }
    });
  }
  search() {
    $('#myInput').on('keyup', function () {
      const value = $(this).val().toLowerCase();
      $('#myTable tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }

}
