import { Component, OnInit } from '@angular/core';
import { Menu } from "../../componentes/menu/menu";
import { Veiculo } from '../../models/veiculo.model';
import { Vehicle } from '../../services/vehicle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [Menu, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  vehicles: Veiculo[] = [];
  selecionado: Veiculo | null = null;
  vin: string = '';
  dadosVeiculo: any;

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

  buscarDadosVeiculo(): void {
    if (!this.vin) {
      this.dadosVeiculo = null;
      this.selecionado = null;
      return;
    }

    this.vehicle.getDadosVeiculo(this.vin).subscribe({
      next: (response) => {
        this.dadosVeiculo = response;

        this.selecionado = this.vehicles.find(
          v => v.id === response.id
        ) || null;

        console.log(this.dadosVeiculo);
        console.log(this.selecionado);
      },
      error: (erro) => {
        console.error('Erro ao buscar dados do veículo', erro);
      }
    });
  }

  limparDados(): void {
    if (!this.vin) {
      this.dadosVeiculo = null;
      this.selecionado = null;
    }
  }

}
