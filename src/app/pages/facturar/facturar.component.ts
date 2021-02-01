import { Component, OnInit } from '@angular/core';
import { FacturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { empty, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ProductosModel } from '../../models/producto';
import { ClientesModel } from '../../models/clientes';
declare var $: any;
@Component({
  selector: 'app-facturar',
  templateUrl: './facturar.component.html',
  styleUrls: ['./facturar.component.scss'],
})
export class FacturarComponent implements OnInit {
  factura: FacturaModel = new FacturaModel();
  id = '';
  producto: ProductosModel[] = [];
  producto2: ProductosModel = new ProductosModel();
  cliente: ClientesModel[] = [];
  cliente2: ClientesModel = new ClientesModel();
  selectedItem: string;
  prodFact = [];
  totalf = 0;
  subtotalf = 0;
  ivaf = 0;
  cantidadpro = 0;
  cantidadtab: number;
  table: string;
  fecha = new Date();

  constructor(
    private datap: ServiceNameService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id === 'facturar') {
      this.factura.idFactura = null;
    }
    this.datap.getClientes().subscribe((rest) => (this.cliente = rest));
    this.datap.getProductos().subscribe((rest) => (this.producto = rest));
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.factura.cliente = this.cliente2;
    this.factura.producto = this.prodFact;
    this.factura.estado = true;
    this.factura.total = this.totalf.toString();
    this.factura.subtotal = this.subtotalf.toString();
    this.factura.iva = this.ivaf.toString();

    Swal.fire({
      title: 'espere plox',
      icon: 'info',
      text: 'guardanding',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.factura.idFactura) {
      peticion = this.datap.putFactura(this.factura);
      peticion.subscribe((resp) => {
        Swal.fire({
          title: this.factura.codigo,
          icon: 'success',
          text: 'se actualizó',
          allowOutsideClick: false,
          confirmButtonText:
            '<i class="fas fa-receipt"></i> <a href="/facturaGenerada"><b>Ver factura</b></a>',
        });
      });
    } else {
      peticion = this.datap.postFactura(this.factura);
      peticion.subscribe((resp) => {
        Swal.fire({
          title: 'Factura Creada',
          icon: 'success',
          text: '¡Gracias por su compra!',
          allowOutsideClick: false,
          confirmButtonText:
            '<i class="fas fa-receipt"></i> <a class="text-light" href="/facturaGenerada">Ver factura</a>',
        });
      });
    }
  }

  selectProducto(idProducto: ProductosModel) {
    this.producto2 = idProducto;
  }

  selectCliente(idCliente: ClientesModel) {
    this.cliente2 = idCliente;
  }

  alertError(img?: any, positions?: any, msj?: any, timers?: any, wid?: any) {
    Swal.fire({
      icon: img,
      text: msj,
      showConfirmButton: false,
      timer: timers,
      width: wid,
      position: positions,
    });
  }

  addProducto(producto: ProductosModel) {
    this.cantidadtab = this.producto2.cantidad;

    for (let index = 0; index < this.producto.length; index++) {
      //
      if (this.producto[index].idProducto === producto.idProducto) {
        if (this.cantidadpro === 0) {
          this.alertError('error', 'center', 'Por favor en cantidad escriba un numero diferente a 0', 1500);
        } else {
          if (this.cantidadtab < this.cantidadpro) {
            this.alertError(
              'error',
              'center',
              `Solo se tiene existencia de ${this.producto2.cantidad} productos`,
              1500
            );
          } else {
            if (
              this.prodFact[index] === undefined ||
              this.prodFact[index].id_producto !== producto.idProducto
            ) {
              this.factura.fecha = this.fecha;
              (this.totalf = 0), (this.subtotalf = 0), (this.ivaf = 0);
              let peticion: Observable<any>;
              this.cantidadtab -= this.cantidadpro;
              this.producto[index].cantidad = this.cantidadtab;
              peticion = this.datap.putProducto(producto);
              peticion.subscribe((resp) => this.alertError('success', 'top-end', '', 700, '12rem'));
              this.producto[index].cantidad = this.cantidadpro;
              this.prodFact.push(this.producto2);
            } else {
              this.alertError('info', 'center', 'El producto que intenta agregar ya se encuentra en la factura', 1500);
            }
            for (const ite of this.prodFact) {
              ite.IVA = (ite.total * ite.Ivap * ite.cantidad) / 100;
              ite.total = ite.total * ite.cantidad;
              ite.subtotal = ite.total - ite.IVA;
              this.ivaf += ite.IVA;
              this.totalf += ite.total;
              this.subtotalf += ite.subtotal;
            }
          }
        }
      }
    }
    this.cantidadpro = 0;
  }

  delProducto(index, producto: ProductosModel) {
    let peticion: Observable<any>;
    this.cantidadtab += this.cantidadpro;
    this.producto[index].cantidad = this.cantidadtab;
    // verificar
    for (const ite of this.prodFact) {
      ite.IVA = ite.IVA / $('#cantidadp')[0].innerHTML;
      ite.total = ite.total / $('#cantidadp')[0].innerHTML;
      ite.subtotal = ite.subtotal / $('#cantidadp')[0].innerHTML;
    }
    peticion = this.datap.putProducto(producto);
    peticion.subscribe((resp) => {
      this.alertError('success', 'top-end', '', 600, '12rem');
    });
    (this.totalf = 0), (this.subtotalf = 0), (this.ivaf = 0);
    this.prodFact.splice(index, 1);
  }

  clearform(form: NgForm) {
    form.resetForm();
    this.prodFact.splice(0, this.prodFact.length);
  }
}
