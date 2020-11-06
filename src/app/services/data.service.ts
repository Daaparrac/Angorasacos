import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clientesModel } from '../models/clientes';
import { map } from 'rxjs/operators';
import { productosModel } from '../models/producto';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private url = 'https://angorasacos-25f71.firebaseio.com/';

  constructor(private _http: HttpClient) {}

  getProductos() {
    return this._http
      .get(`${this.url}/productos.json`)
      .pipe(map(this.crearArregloProducto));
  }

  getProducto(id) {
    console.log(this._http.get(`${this.url}/productos/${id}.json`));
    return this._http.get(`${this.url}/productos/${id}.json`);
  }

  putProducto(producto: productosModel) {
    const ProductoTemp = {
      ...producto,
    };
    delete ProductoTemp.id_producto;
    return this._http.put(
      `${this.url}/productos/${producto.id_producto}.json`,
      ProductoTemp
    );
  }

  postProducto(producto: productosModel) {
    return this._http.post(`${this.url}/productos.json`, producto).pipe(
      map((resp: any) => {
        producto.id_producto = resp.name;
        return producto;
      })
    );
  }
  private crearArregloProducto(producto: object) {
    const productos: productosModel[] = [];
    if (producto === null) {
      return [];
    }

    Object.keys(producto).forEach((key) => {
      const producto2: productosModel = producto[key];
      producto2.id_producto = key;
      productos.push(producto2);
    });
    return productos;
  }
}
