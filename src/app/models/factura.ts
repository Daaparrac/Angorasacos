import { productosModel } from './producto';
import { clientesModel } from './clientes';
import { descuentoModel } from './descuento';
export class facturaModel {
  id_factura: string;
  codigo: string;
  producto: productosModel[];
  cantidad: string;
  iva: string;
  descuento: descuentoModel;
  total: string;
  subtotal: string;
  cliente: clientesModel;
  estado: boolean;
}
