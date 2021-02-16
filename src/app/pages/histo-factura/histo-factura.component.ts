import { Component, OnInit } from '@angular/core';
import { FacturaModel } from '../../models/factura';
import { ServiceNameService } from '../../services/data.service';
declare var $: any;
@Component({
  selector: 'app-histo-factura',
  templateUrl: './histo-factura.component.html',
  styleUrls: ['./histo-factura.component.scss'],
})
export class HistoFacturaComponent implements OnInit {
  facturas: FacturaModel[] = [];
  constructor(private datap: ServiceNameService) { }

  ngOnInit(): void {
    this.datap.getFacturas().subscribe(
      (data) => {
        console.log(data)
        this.facturas = data;
      }
    );
  }

  search() {
    $('#myInput').on('keyup', function () {
      const value = $(this).val().toLowerCase();
      $('#myTable tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
  }
/*
  mail() {

    let nodemailer = require('nodemailer');
    //console.log(nodemailer);


    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'danielparrac26@gmail.com',
        pass: 'Daniel12345.'
      }
    });

    let mailOptions = {
      from: 'danielparrac26@gmail.com',
      to: 'daaparrac@correo.udistrital.edu.co',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!',
      html: "<p>HTML version of the message</p>"
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }*/
}
