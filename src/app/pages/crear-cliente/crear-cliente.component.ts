import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute,RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ClientesModel } from 'src/app/models/clientes';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.scss'],
})
export class CrearClienteComponent implements OnInit {
  id = null;
  nombre='';
  documento:string;
  correo:string;
  celular:string;
  direccion:string;
  clientes: ClientesModel = new ClientesModel();
  constructor(
    private datap: ServiceNameService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id === 'nuevo') {
      this.datap.getCliente(this.id).subscribe((data: ClientesModel) => {
        this.clientes = data;
        this.clientes.idCliente = this.id;
      });
    }
    if (this.id === 'nuevo') {
      this.clientes.idCliente = null;
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

    if (this.clientes.idCliente) {
      peticion = this.datap.putCliente(this.clientes);
    } else {
      peticion = this.datap.postCliente(this.clientes);
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
