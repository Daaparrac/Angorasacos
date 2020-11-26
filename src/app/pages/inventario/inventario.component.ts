import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceNameService } from '../../services/data.service';
import { productosModel } from '../../models/producto';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  constructor(private _data: ServiceNameService) {}

  productos: productosModel[] = [];
  ngOnInit(): void {
    this._data.getProductosActivos().subscribe((data) => {
      console.log(data);
      this.productos = data;
    });
  }

  ocultar(productos: productosModel) {
    Swal.fire({
      title: 'Información Importante',
      text:
        'Por favor confirme que va a inactivar este producto de forma permanente, esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Ocultar',
    }).then((result) => {
      if (result.value) {
        productos.estado = 'Inactivo';

        Swal.fire({
          title: 'Espere',
          icon: 'info',
          text: 'Guardando información',
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let peticion: Observable<any>;

        peticion = this._data.putProducto(productos);

        peticion.subscribe((resp) => {
          Swal.fire({
            title: 'Producto Inactivo',
            icon: 'success',
          });
        });
      }
    });
  }

  activar(productos: productosModel) {
    Swal.fire({
      title: 'Información Importante',
      text:
        'Por favor confirme que va a Activar este producto de forma permanente, esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, Activar',
    }).then((result) => {
      if (result.value) {
        productos.estado = 'Activo';

        Swal.fire({
          title: 'Espere',
          icon: 'info',
          text: 'Guardando información',
          allowOutsideClick: false,
        });
        Swal.showLoading();

        let peticion: Observable<any>;

        peticion = this._data.putProducto(productos);

        peticion.subscribe((resp) => {
          Swal.fire({
            title: 'Producto Activado',
            icon: 'success',
          });
        });
      }
    });
  }
}
