import { Component } from '@angular/core';
import { Menu } from "../../componentes/menu/menu";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [Menu, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
