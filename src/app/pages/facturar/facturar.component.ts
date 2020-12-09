import { Component, OnInit } from '@angular/core';
import { facturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { productosModel } from '../../models/producto';
import { clientesModel } from '../../models/clientes';
declare var $: any;
@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.scss'],
})
export class FacturarComponent implements OnInit {
  factura: facturaModel = new facturaModel();
  id = '';
  producto: productosModel[] = [];
  producto2: productosModel = new productosModel();
  cliente: clientesModel[] = [];
  cliente2: clientesModel = new clientesModel();
  selectedItem: string;
  prod_Fact = [];

  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');

    if (this.id === 'facturar') {
      this.factura.id_factura = null;
    }
    this._data.getClientes().subscribe((rest) => (this.cliente = rest));
    this._data.getProductos().subscribe((rest) => (this.producto = rest));
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

  selectProducto(id_producto: productosModel) {
    this.producto2 = id_producto;
    console.log(this.producto2);
  }

  selectCliente(idcliente: clientesModel) {
    this.cliente2 = idcliente;
  }

  addProducto(id_producto: productosModel) {
    const cantidad = this.producto2.cantidad - $('#cantidadpro').val();
    if (cantidad < 0) {
      Swal.fire({
        icon: 'error',
        text: `Solo se tiene existencia de ${this.producto2.cantidad} productos`,
      });
    } else {
      this.producto2.cantidad = $('#cantidadpro').val();
      this.producto2.total = (
        parseInt($('#cantidadpro').val()) * parseInt(this.producto2.subtotal)
      ).toString();
      this.prod_Fact.push(id_producto);

      console.log(cantidad);
      console.log(this.prod_Fact);
      //this.selectProducto(id_producto);
    }
  }
}
