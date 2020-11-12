import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { FacturarComponent } from './pages/facturar/facturar.component';
import { HistoFacturaComponent } from './pages/histo-factura/histo-factura.component';
import { CrearClienteComponent } from './pages/crear-cliente/crear-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './pages/products-list/products-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InventarioComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ProductosComponent,
    FacturarComponent,
    HistoFacturaComponent,
    CrearClienteComponent,
    ProductsListComponent,
  ],
  imports: [HttpClientModule, FormsModule, BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
