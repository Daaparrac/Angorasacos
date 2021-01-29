import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { ProductosModel } from '../../models/producto';
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
  productos: ProductosModel = new ProductosModel();
  firstcod = null;
  secondcod = null;

  constructor(
    private datap: ServiceNameService,
    private activatedRoute: ActivatedRoute,
    private pipeLearn: SlugifyPipe
  ) {}

  codigop = null;
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this.datap.getProducto(this.id).subscribe((data: ProductosModel) => {
        this.productos = data;
        this.productos.idProducto = this.id;
      });
    }
    if (this.id === 'nuevo') {
      this.productos.idProducto = null;
    }
  }

  createcodcompleto(texts: string) {
    const textitos1 = `${this.productos.nombre} ${this.productos.color}`;
    const textitos2 = `${this.productos.talla}`;
    const textitos = `${this.productos.subtotal}`;
    this.productos.codigo = `${this.pipeLearn.transform(
      textitos1
    )}${this.pipeLearn.transform1(textitos2)} - ${this.pipeLearn.transform2(
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
      parseInt(textoprecio, 10) -
      (parseInt(textoprecio, 10) * parseInt(textoIVA, 10)) / 100;
    this.productos.subtotal = total;
    console.log(this.productos.IVA);
  }

  createTotSub(texts: string) {
    const textostotal = `${this.productos.subtotal}`;
    const textoIVA = `${this.productos.IVA}`;

    console.log(textoIVA);
    console.log(textostotal);
    this.productos.subtotal = parseInt(this.pipeLearn.preciop(textostotal), 10);
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

    if (this.productos.idProducto) {
      peticion = this.datap.putProducto(this.productos);
    } else {
      this.productos.estado = 'Activo';
      peticion = this.datap.postProducto(this.productos);
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
