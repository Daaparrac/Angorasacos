import { ProductosModel } from './producto';
import { ClientesModel } from './clientes';
import { DescuentoModel } from './descuento';
export class FacturaModel {
  idFactura: string;
  codigo: string;
  producto: ProductosModel[];
  cantidad: number;
  iva: number;
  // descuento: descuentoModel;
  total: number;
  subtotal: number;
  cliente: ClientesModel;
  estado: boolean;
  fecha: string;
}
