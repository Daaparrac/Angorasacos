import { from } from 'rxjs';
import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
    {
      path: 'inventario',
      component: InventarioComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'inventario',
      component: InventarioComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })

  export class AppRoutingModule {}