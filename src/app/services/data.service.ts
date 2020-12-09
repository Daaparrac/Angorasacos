import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clientesModel } from '../models/clientes';
import { productosModel } from '../models/producto';
import { facturaModel } from '../models/factura';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private url = 'https://angorasacos-25f71.firebaseio.com/';

  constructor(private _http: HttpClient) {}

  //productos

  getProductos() {
    return this._http
      .get(`${this.url}/productos.json`)
      .pipe(map(this.crearArregloProducto));
  }

  getProductosActivos() {
    return this._http
      .get(`${this.url}/productos.json`)
      .pipe(map(this.crearArregloProductoActivos));
  }

  getProducto(id) {
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
  private crearArregloProductoActivos(producto: object) {
    const productos: productosModel[] = [];
    if (producto === null) {
      return [];
    }

    Object.keys(producto).forEach((key) => {
      const producto2: productosModel = producto[key];
      producto2.id_producto = key;
      if (producto2.estado) {
        productos.push(producto2);
      }
    });
    return productos;
  }

  //Factura

  getFacturas() {
    return this._http
      .get(`${this.url}/facturas.json`)
      .pipe(map(this.crearArregloFactura));
  }

  getFactura(id) {
    return this._http.get(`${this.url}/facturas/${id}.json`);
  }

  putFactura(factura: facturaModel) {
    const FacturaTemp = {
      ...factura,
    };
    delete FacturaTemp.id_factura;
    return this._http.put(
      `${this.url}/facturas/${factura.id_factura}.json`,
      FacturaTemp
    );
  }

  postFactura(factura: facturaModel) {
    return this._http.post(`${this.url}/facturas.json`, factura).pipe(
      map((resp: any) => {
        factura.id_factura = resp.name;
        return factura;
      })
    );
  }
  private crearArregloFactura(factura: object) {
    const facturas: facturaModel[] = [];
    if (factura === null) {
      return [];
    }

    Object.keys(factura).forEach((key) => {
      const facturas2: facturaModel = factura[key];
      facturas2.id_factura = key;
      facturas.push(facturas2);
    });
    return facturas;
  }

  //Clientes

  getClientes() {
    return this._http
      .get(`${this.url}/clientes.json`)
      .pipe(map(this.crearArregloCliente));
  }

  getCliente(id) {
    return this._http.get(`${this.url}/clientes/${id}.json`);
  }

  putCliente(cliente: clientesModel) {
    const ClienteTemp = {
      ...cliente,
    };
    delete ClienteTemp.id_cliente;
    return this._http.put(
      `${this.url}/clientes/${cliente.id_cliente}.json`,
      ClienteTemp
    );
  }

  postCliente(cliente: clientesModel) {
    return this._http.post(`${this.url}/clientes.json`, cliente).pipe(
      map((resp: any) => {
        cliente.id_cliente = resp.name;
        return cliente;
      })
    );
  }
  private crearArregloCliente(cliente: object) {
    const clientes: clientesModel[] = [];
    if (cliente === null) {
      return [];
    }

    Object.keys(cliente).forEach((key) => {
      const clientes2: clientesModel = cliente[key];
      clientes2.id_cliente = key;
      clientes.push(clientes2);
    });
    return clientes;
  }
}
