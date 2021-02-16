import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientesModel } from '../models/clientes';
import { ProductosModel } from '../models/producto';
import { FacturaModel } from '../models/factura';
import { map } from 'rxjs/operators';
import * as express from './../../../../backendAngora/app.js';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private url = 'https://angorasacos-25f71.firebaseio.com/';
  private url2 = 'localhost:3000/';

  constructor(private http: HttpClient) {}

  // productos

  getProductos() {
    return this.http
      .get(`${this.url}/productos.json`)
      .pipe(map(this.crearArregloProducto));
  }

  getProductosActivos() {
    return this.http
      .get(`${this.url}/productos.json`)
      .pipe(map(this.crearArregloProductoActivos));
  }

  getProducto(id) {
    return this.http.get(`${this.url}/productos/${id}.json`);
  }

  putProducto(producto: ProductosModel) {
    const ProductoTemp = {
      ...producto,
    };
    delete ProductoTemp.idProducto;
    return this.http.put(
      `${this.url}/productos/${producto.idProducto}.json`,
      ProductoTemp
    );
  }

  postProducto(producto: ProductosModel) {
    return this.http.post(`${this.url}/productos.json`, producto).pipe(
      map((resp: any) => {
        producto.idProducto = resp.name;
        return producto;
      })
    );
  }
  private crearArregloProducto(producto: object) {
    const productos: ProductosModel[] = [];
    if (producto === null) {
      return [];
    }

    Object.keys(producto).forEach((key) => {
      const producto2: ProductosModel = producto[key];
      producto2.idProducto = key;
      productos.push(producto2);
    });
    return productos;
  }
  private crearArregloProductoActivos(producto: object) {
    const productos: ProductosModel[] = [];
    if (producto === null) {
      return [];
    }

    Object.keys(producto).forEach((key) => {
      const producto2: ProductosModel = producto[key];
      producto2.idProducto = key;
      if (producto2.estado) {
        productos.push(producto2);
      }
    });
    return productos;
  }

  // Factura

  getFacturas() {
    return this.http
      .get(`${this.url}/facturas.json`)
      .pipe(map(this.crearArregloFactura));
  }

  getFactura(id) {
    return this.http.get(`${this.url}/facturas/${id}.json`);
  }

  putFactura(factura: FacturaModel) {
    const FacturaTemp = {
      ...factura,
    };
    delete FacturaTemp.idFactura;
    return this.http.put(
      `${this.url}/facturas/${factura.idFactura}.json`,
      FacturaTemp
    );
  }

  postFactura(factura: FacturaModel) {
    return this.http.post(`${this.url}/facturas.json`, factura).pipe(
      map((resp: any) => {
        factura.idFactura = resp.name;
        return factura;
      })
    );
  }
  private crearArregloFactura(factura: object) {
    const facturas: FacturaModel[] = [];
    if (factura === null) {
      return [];
    }

    Object.keys(factura).forEach((key) => {
      const facturas2: FacturaModel = factura[key];
      facturas2.idFactura = key;
      facturas.push(facturas2);
    });
    return facturas;
  }

  // Clientes

  getClientes() {
    return this.http
      .get(`${this.url}/clientes.json`)
      .pipe(map(this.crearArregloCliente));
  }

  getCliente(id) {
    return this.http.get(`${this.url}/clientes/${id}.json`);
  }

  putCliente(cliente: ClientesModel) {
    const ClienteTemp = {
      ...cliente,
    };
    delete ClienteTemp.idCliente;
    return this.http.put(
      `${this.url}/clientes/${cliente.idCliente}.json`,
      ClienteTemp
    );
  }

  postCliente(cliente: ClientesModel) {
    return this.http.post(`${this.url}/clientes.json`, cliente).pipe(
      map((resp: any) => {
        cliente.idCliente = resp.name;
        return cliente;
      })
    );
  }
  private crearArregloCliente(cliente: object) {
    const clientes: ClientesModel[] = [];
    if (cliente === null) {
      return [];
    }

    Object.keys(cliente).forEach((key) => {
      const clientes2: ClientesModel = cliente[key];
      clientes2.idCliente = key;
      clientes.push(clientes2);
    });
    return clientes;
  }
  /* Servidor*/

  postServidor(body: string) {
    console.log(body)
    console.log(this.http.post(`localhost:3000/formulario`, body))
    try {
      
    return this.http.post(`${this.url2}/formulario`,body);
    } catch (error) {
      return console.log(error);
    }
  }
}

