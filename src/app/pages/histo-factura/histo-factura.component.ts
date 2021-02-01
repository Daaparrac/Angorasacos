import { Component, OnInit } from '@angular/core';
import { FacturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
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
        console.log(data)
        this.facturas = data;
      }
    );
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
