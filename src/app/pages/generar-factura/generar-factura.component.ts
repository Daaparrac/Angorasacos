import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosModel } from '../../models/producto';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SlugifyPipe } from '../../pipes/slugify.pipe';
import { Tallamodel } from '../../models/talla';
import { FacturaModel } from '../../models/factura';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.scss'],
})
export class GenerarFacturaComponent implements OnInit {
  id = null;
  unidadestotal = 0;
  facturas: FacturaModel = new FacturaModel();
  constructor(
    private datap: ServiceNameService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.datap.getFactura(this.id).subscribe(
      (data: FacturaModel) => {
        data.idFactura = this.id;
        this.facturas = data;
        console.log(data)
      });

  }
}
