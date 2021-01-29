import { ProductosModel } from './producto';
import { ClientesModel } from './clientes';
import { DescuentoModel } from './descuento';
export class FacturaModel {
  idFactura: string;
  codigo: string;
  producto: ProductosModel[];
  cantidad: string;
  iva: string;
  // descuento: descuentoModel;
  total: string;
  subtotal: string;
  cliente: ClientesModel;
  estado: boolean;
}
