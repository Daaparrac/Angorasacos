import { from } from 'rxjs';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FacturarComponent } from './pages/facturar/facturar.component';
import { HistoFacturaComponent } from './pages/histo-factura/histo-factura.component';
import { CrearClienteComponent } from './pages/crear-cliente/crear-cliente.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { AuthGuard } from './guards/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'inventario',
    component: InventarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'producto/:id',
    component: ProductosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'facturar',
    component: FacturarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'histo_factura',
    component: HistoFacturaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crearCliente/:id',
    component: CrearClienteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
