import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.component.html',
  styleUrls: ['./generar-factura.component.scss'],
})
export class GenerarFacturaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.print();
  }
}
