import { Component, OnInit } from '@angular/core';
import { facturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.scss'],
})
export class FacturarComponent implements OnInit {
  factura: facturaModel = new facturaModel();
  id = null;
  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id != 'nuevo') {
      this._data.getProducto(this.id).subscribe((data: facturaModel) => {
        this.factura = data;
        this.factura.id_factura = this.id;
      });
    }
    if (this.id == 'nuevo') {
      this.factura.id_factura = null;
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      title: 'espere plox',
      icon: 'info',
      text: 'guardanding',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.factura.id_factura) {
      peticion = this._data.putFactura(this.factura);
    } else {
      peticion = this._data.postFactura(this.factura);
    }
    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.factura.codigo,
        icon: 'success',
        text: 'se actualizó',
      });
    });
  }
}
