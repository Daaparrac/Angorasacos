import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceNameService } from '../../services/data.service';
import { productosModel } from '../../models/producto';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  constructor(private _data: ServiceNameService) {}

  productos: productosModel[] = [];
  ngOnInit(): void {
    this._data.getProductos().subscribe((data) => {
      console.log(data);
      this.productos = data;
    });
  }
}
