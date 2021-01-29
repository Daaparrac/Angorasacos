import { Tallamodel } from './talla';
// tslint:disable-next-line: class-name
export class ProductosModel {
  idProducto: string;
  codigo: string;
  nombre: string;
  color: string;
  imagen: string;
  talla: string;
  // talla: tallamodel[];
  cantidad: number;
  estado: string;
  estadoCambio: string;
  subtotal: number;
  IVA: number;
  Ivap: number;
  total: number;
}

/*
id_producto: string;
codigo: string;
nombre: string;
precio: string;
imagen: string;
xs: string;
s: string;
m: string;
l: string;
xl: string;
unica: string;
estado: boolean;
estado_cambio: string;*/
