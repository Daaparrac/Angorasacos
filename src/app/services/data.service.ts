import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { clientesModel } from '../models/clientes';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServiceNameService {
  private url = 'https://angorasacos-25f71.firebaseio.com/';

  constructor(private _http: HttpClient) {}

  getHeroes() {
    return this._http
      .get(`${this.url}/heroes.json`)
      .pipe(map(this.crearArregloHeroe));
  }
  getHeroe(id) {
    return this._http.get(`${this.url}/heroes/${id}.json`);
  }

  putheroe(heroe: clientesModel) {
    const HeroeTemp = {
      ...heroe,
    };
    delete HeroeTemp.id_cliente;
    return this._http.put(
      `${this.url}/heroes/${heroe.id_cliente}.json`,
      HeroeTemp
    );
  }

  postheroe(heroe: clientesModel) {
    return this._http.post(`${this.url}/heroes.json`, heroe).pipe(
      map((resp: any) => {
        heroe.id_cliente = resp.name;
        return heroe;
      })
    );
  }
  private crearArregloHeroe(heroe: object) {
    const heroes: clientesModel[] = [];
    if (heroe === null) {
      return [];
    }

    Object.keys(heroe).forEach((key) => {
      const heroes2: clientesModel = heroe[key];
      heroes2.id_cliente = key;
      heroes.push(heroes2);
    });
    return heroes;
  }
}
