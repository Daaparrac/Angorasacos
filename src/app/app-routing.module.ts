import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FacturarComponent } from './pages/facturar/facturar.component';
import { HistoFacturaComponent } from './pages/histo-factura/histo-factura.component';
import { CrearClienteComponent } from './pages/crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'inventario',
    component: InventarioComponent,
  },
  {
    path: 'productos',
    component: ProductosComponent,
  },
  {
    path: 'facturar',
    component: FacturarComponent,
  },
  {
    path: 'histo_factura',
    component: HistoFacturaComponent,
  },
  {
    path: 'crearCliente',
    component: CrearClienteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
