import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { productosModel } from '../../models/producto';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  constructor(private _data: ServiceNameService) {}

  productos: productosModel[] = [];
  ngOnInit(): void {
    this._data.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }
}
