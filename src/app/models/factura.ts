import { productosModel } from './producto';
import { clientesModel } from './clientes';
export class facturaModel {
  id_factura: string;
  codigo: string;
  producto: productosModel;
  cantidad: string;
  iva: string;
  descuento: string;
  total: string;
  subtotal: string;
  cliente: clientesModel;
  estado: boolean;
}
