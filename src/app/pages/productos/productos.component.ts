import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { productosModel } from '../../models/producto';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  id = null;
  productos: productosModel = new productosModel();
  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id != 'nuevo') {
      this._data.getProducto(this.id).subscribe((data: productosModel) => {
        this.productos = data;
        this.productos.id_producto = this.id;
      });
    }
    if (this.id == 'nuevo') {
      this.productos.id_producto = null;
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

    if (this.productos.id_producto) {
      peticion = this._data.putProducto(this.productos);
    } else {
      this.productos.estado = true;
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
