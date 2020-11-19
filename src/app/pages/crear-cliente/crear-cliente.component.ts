import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { clientesModel } from '../../models/clientes';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
})
export class CrearClienteComponent implements OnInit {
  id = null;
  clientes: clientesModel = new clientesModel();
  constructor(
    private _data: ServiceNameService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.id != 'nuevo') {
      this._data.getCliente(this.id).subscribe((data: clientesModel) => {
        this.clientes = data;
        this.clientes.id_cliente = this.id;
      });
    }
    if (this.id == 'nuevo') {
      this.clientes.id_cliente = null;
    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      title: 'espere plox',
      icon: 'info',
      text: 'guardanding',
      allowOutsideClick: false,
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.clientes.id_cliente) {
      peticion = this._data.putCliente(this.clientes);
    } else {
      peticion = this._data.postCliente(this.clientes);
    }
    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.clientes.nombre,
        icon: 'success',
        text: 'ha sido creado',
      });
    });
  }
}
