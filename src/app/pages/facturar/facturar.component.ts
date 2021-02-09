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
    this.factura.fecha = `${this.fecha.getFullYear()}/${this.fecha.getMonth()}/${this.fecha.getDay()}`; // asigna la fecha a la factura
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
    this.selectedTalla = [];
    for (const item of this.producto2.talla) {
      if (item.unidades !== 0) {
        this.selectedTalla.push(item);
      }
    }
  }

  selectTalla(tallaselected: any) {
    this.tallaselect = tallaselected;
  }

  async addProducto(producto: ProductosModel) {
    let value = this.cantidadpro;
    let comprobar_unidades: any;
    let productoTem = {
      ...producto
    }
    if (this.cantidadpro !== 0) {
      if (this.tallaselect.unidades > this.cantidadpro) {
        for (const pr of this.producto) {
          if (pr === producto) {
            for (const ir of producto.talla) {
              if (ir.talla === this.tallaselect.talla) {
                comprobar_unidades = this.tallaselect.unidades;
                ir.unidades -= this.cantidadpro;
                productoTem.talla = [];
                productoTem.talla.push(this.tallaselect);
                productoTem.talla[0].unidades = value;
                console.log(productoTem);
                console.log(productoTem.talla[0].unidades)
                this.prodFact.push(productoTem);
              }
            }
            comprobar_unidades -= this.cantidadpro;
          }
        }

        for (const iterator of producto.talla) {
          if (iterator.talla === this.tallaselect.talla) iterator.unidades = comprobar_unidades
        }
        console.log(producto)

        //console.log(this.prodFact)
      }
    }
































    /*
        console.log(this.tallaselect.unidades);
        const cantidadtempdb = this.tallaselect.unidades;
        const temptalla = this.tallaselect;
        const temptallas = this.tallaselect;
        // si la cantidad ingresada es diferente a 0
        if (this.cantidadpro !== 0) {
          // valida la cantidad de productos en existencia
          if (cantidadtempdb > this.cantidadpro) {
            // recorrer los productos que existen
            // tslint:disable-next-line: prefer-for-of
            for (let index = 0; index < this.producto.length; index++) {
              // validar el producto vs los que existen en la DB
              if (this.producto[index] === producto) {
                const unddisponibles = producto.talla[0].unidades;
                const cantingresada = this.cantidadpro;
                const cantidadtemp = unddisponibles - cantingresada;
                const productobd = producto;
                const productofactura = producto;
                for (let item = 0; item < productobd.talla.length; item++) {
                  console.log(temptallas);
                  console.log(productobd.talla[item]);
                  if (productobd.talla[item] === temptallas) {
                    if (productobd.talla.length > 1) {
                      console.log('¿Cuánto? ' + productobd.talla.length);
                      // let peticion: Observable<any>;
                      productobd.talla[item].unidades = cantidadtemp;
                      /* peticion = this.datap.putProducto(productobd);
                       peticion.subscribe((resp) => {
                         this.alertError('success', 'top-end', '', 700, '12rem');
                       });
  }
  productofactura.talla = [];
  temptalla.unidades = cantingresada;
  console.log('unidad temp' + temptalla.unidades);
console.log(temptalla.unidades);
console.log(temptalla);
productofactura.talla[0] = temptalla;
productofactura.talla[0].unidades = cantingresada;
this.prodFact.push(productofactura);
console.log(this.prodFact);
console.log(productobd);

              }

            }
          }
        }
      } else {
  this.alertError('error', 'center', `Solo se tiene existencia de ${this.tallaselect.unidades} productos`, 1500);
}
    } else {
  this.alertError('error', 'center', 'Por favor en cantidad escriba un numero diferente a 0', 1500);
}
for (const ite of this.prodFact) {
  this.subtotalf += ite.subtotal;
  this.ivaf += ite.Ivap;
  this.totalf += ite.total;
  this.cantidadf += ite.talla[0].unidades;
}
$('#cantprod').val('');*/
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
