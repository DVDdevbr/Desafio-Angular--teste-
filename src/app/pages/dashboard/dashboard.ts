import { Component, OnInit } from '@angular/core';
import { Menu } from "../../componentes/menu/menu";
import { Veiculo } from '../../models/veiculo.model';
import { Vehicle } from '../../services/vehicle';

@Component({
  selector: 'app-dashboard',
  imports: [Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  vehicles: Veiculo[] = [];
  selecionado: Veiculo | null = null;

  constructor(private vehicle:Vehicle){}
  ngOnInit(): void {

  this.vehicle.getVeiculos().subscribe({
    next: (response) => {
      this.vehicles = response.vehicles;
      console.log(this.vehicles);
    },
    error: (erro) => {
      console.error('Erro ao buscar veículos', erro);
    }
  });
}

  veiculoSelecionado(event:Event):void{

    const idSelecionado = (event.target as HTMLSelectElement).value;

    if(idSelecionado){
      this.selecionado = this.vehicles.find(v => v.id == Number(idSelecionado)) || null;
    } else{
      this.selecionado = null;
    }
  }
}
