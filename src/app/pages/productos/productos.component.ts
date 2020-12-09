import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { productosModel } from '../../models/producto';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SlugifyPipe } from '../../pipes/slugify.pipe';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  id = null;
  productos: productosModel = new productosModel();
  firstcod = null;
  secondcod = null;

  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute,
    private _pipelearn: SlugifyPipe
  ) {}

  codigop = null;
  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this._data.getProducto(this.id).subscribe((data: productosModel) => {
        this.productos = data;
        this.productos.id_producto = this.id;
      });
    }
    if (this.id == 'nuevo') {
      this.productos.id_producto = null;
    }
  }

  createcodcompleto(texts: string) {
    const textitos1 = `${this.productos.nombre} ${this.productos.color}`;
    const textitos2 = `${this.productos.talla}`;
    const textitos = `${this.productos.subtotal}`;
    this.productos.codigo = `${this._pipelearn.transform(
      textitos1
    )}${this._pipelearn.transform1(textitos2)} - ${this._pipelearn.transform2(
      textitos
    )}`;
  }

  create(texts: string) {
    console.log(this.productos.talla);
  }

  createIvaSub(texts: string) {
    this.createcodcompleto(texts);
    const textoprecio = `${this.productos.total}`;
    const textoIVA = `${this.productos.IVA}`;
    const total =
      parseInt(textoprecio) -
      (parseInt(textoprecio) * parseInt(textoIVA)) / 100;
    console.log(total);
    this.productos.subtotal = `${total}`;
    console.log(this.productos.IVA);
  }

  createTotSub(texts: string) {
    const textostotal = `${this.productos.subtotal}`;
    const textoIVA = `${this.productos.IVA}`;

    console.log(textoIVA);
    console.log(textostotal);
    this.productos.subtotal = `${this._pipelearn.preciop(textostotal)}`;
    console.log(this.productos.subtotal);
  }

  guardar(form: NgForm) {
    console.log(form.invalid);
    /* if (form.invalid) {
      return;
    }*/

    Swal.fire({
      title: 'espere plox',
      icon: 'info',
      text: 'guardanding',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.productos.id_producto) {
      peticion = this._data.putProducto(this.productos);
    } else {
      this.productos.estado = 'Activo';
      peticion = this._data.postProducto(this.productos);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.productos.nombre,
        icon: 'success',
        text: 'se actualizó',
      });
    });
  }
}
