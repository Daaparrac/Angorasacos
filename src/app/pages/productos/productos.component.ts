import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../../services/data.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductosModel } from '../../models/producto';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { SlugifyPipe } from '../../pipes/slugify.pipe';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  id = null;
  productos: ProductosModel = new ProductosModel();
  firstcod = null;
  secondcod = null;
  codigop = null;
  base64textString = [];

  constructor(
    private datap: ServiceNameService,
    private activatedRoute: ActivatedRoute,
    private pipeLearn: SlugifyPipe,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id !== 'nuevo') {
      this.datap.getProducto(this.id).subscribe((data: ProductosModel) => {
        this.productos = data;
        this.productos.idProducto = this.id;
      });
    }
    if (this.id === 'nuevo') {
      this.productos.idProducto = null;
    }
  }

  createcodcompleto(texts: string) {
    const textitos1 = `${this.productos.nombre} ${this.productos.color}`;
    const textitos2 = `${this.productos.talla}`;
    const textitos = `${this.productos.subtotal}`;
    this.productos.codigo = `${this.pipeLearn.transform(
      textitos1
    )}${this.pipeLearn.transform1(textitos2)} - ${this.pipeLearn.transform2(
      textitos
    )}`;
  }

  createIvaSub(texts: string) {
    this.createcodcompleto(texts);
    const textoprecio = `${this.productos.total}`;
    const textoIVA = `${this.productos.IVA}`;
    const total =
      parseInt(textoprecio, 10) -
      (parseInt(textoprecio, 10) * parseInt(textoIVA, 10)) / 100;
    this.productos.subtotal = total;
  }

  guardar(form: NgForm) {
    this.productos.Ivap = this.productos.total - this.productos.subtotal;    
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

    if (this.productos.idProducto) {
      peticion = this.datap.putProducto(this.productos);
    } else {
      this.productos.estado = 'Activo';
      peticion = this.datap.postProducto(this.productos);
    }

    peticion.subscribe((resp) => {
      Swal.fire({
        title: this.productos.nombre,
        icon: 'success',
        text: 'se actualizó',
      });
      this.router.navigateByUrl('/inventario');
    });
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  handleReaderLoaded(e) {
    this.base64textString = [];
    this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
    this.productos.imagen = this.base64textString[0];
  }

}
