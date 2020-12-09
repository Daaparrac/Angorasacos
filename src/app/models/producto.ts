import { tallamodel } from './talla';
export class productosModel {
  id_producto: string;
  codigo: string;
  nombre: string;
  color: string;
  imagen: string;
  talla: string;
  //talla: tallamodel[];
  cantidad: number;
  estado: string;
  estado_cambio: string;
  subtotal: string;
  IVA: string;
  total: string;
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
