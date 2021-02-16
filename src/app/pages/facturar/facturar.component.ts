import { Component, OnInit } from '@angular/core';
import { FacturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { empty, Observable, of } from 'rxjs';
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
  selectedTalla: any = [];
  selectedTallas: string;
  prodFact = [];
  totalf = 0;
  cantidadf = 0;
  subtotalf = 0;
  ivaf = 0;
  cantidadpro = 0;
  cantidadtab: number;
  table: string;
  fecha = new Date();
  tallaselect: any;


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
    this.factura.fecha = `${this.fecha.getFullYear()}/${this.fecha.getMonth()+1}/${this.fecha.getDate()}`; // asigna la fecha a la factura
    this.factura.cliente = this.cliente2; // se asigna el cliente
    this.factura.producto = this.prodFact; // los productos añadidos a la factura
    this.factura.estado = true; // el estado de la factura
    this.factura.total = this.totalf; // total de la factura
    this.factura.subtotal = this.subtotalf; // subtotal de la factura
    this.factura.iva = this.ivaf; // iva total de la factura
    this.factura.cantidad = this.cantidadf; // cantidad total de productos

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
            `<i class="fas fa-receipt"></i> <a href="/facturaGenerada/${this.factura.idFactura}"><b>Ver factura</b></a>`,
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
          `<i class="fas fa-receipt"></i> <a class="text-light" href="/facturaGenerada${this.factura.idFactura}">Ver factura</a>`,
        });
      });
    }
  }

  selectProducto(idProducto: ProductosModel) {
    this.producto2 = idProducto;
  }

  addProducto(producto: ProductosModel) {
    let cant = producto.cantidad - this.cantidadpro
    if (this.cantidadpro !== 0) {
      if (producto.cantidad >= this.cantidadpro) {
        producto.cantidad = cant;
        console.log(producto)
        let peticion: Observable<any>;
        peticion = this.datap.postProducto(producto);
        this.prodFact.push(producto)
        this.prodFact[0].cantidad=this.cantidadpro;       
      }else {
        this.alertError('error', 'center', `Solo se tiene existencia de ${producto.cantidad} productos`, 1500);
      }
    } else {
      this.alertError('error', 'center', 'Por favor en cantidad escriba un numero diferente a 0', 1500);
    }
    for (const ite of this.prodFact) {
      this.subtotalf += ite.subtotal;
      this.ivaf += ite.Ivap;
      this.totalf += ite.total;
      this.cantidadf += ite.cantidad;
    }
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

  delProducto(index, producto: ProductosModel) {
    let peticion: Observable<any>;
    this.cantidadtab += this.cantidadpro;
    // verificar
    for (const iterator of this.producto) {
      if (iterator ==producto) {
        console.log(iterator)
        //peticion = this.datap.putProducto(producto);
    peticion.subscribe((resp) => {
      this.alertError('success', 'top-end', '', 600, '12rem');
    });
      }
    }

    for (const ite of this.prodFact) {
      ite.IVA = ite.IVA / $('#cantidadp')[0].innerHTML;
      ite.total = ite.total / $('#cantidadp')[0].innerHTML;
      ite.subtotal = ite.subtotal / $('#cantidadp')[0].innerHTML;
    }

    
    (this.totalf = 0), (this.subtotalf = 0), (this.ivaf = 0);
    this.prodFact.splice(index, 1);
  }

  clearform(form: NgForm) {
    form.resetForm();
    this.prodFact.splice(0, this.prodFact.length);
  }
}