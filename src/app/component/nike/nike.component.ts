import { Component, OnInit, input } from '@angular/core';
import { listaProdutosNike } from '../../Data/datos';
import { Producto } from '../../models/Producto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nike',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nike.component.html',
  styleUrl: './nike.component.css'
})
export class NikeComponent implements OnInit {

  listaProd: Producto[]=[];
  zapatillasElegidas: Producto = new Producto();
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listaProd = listaProdutosNike;
  }

  verPelicula(nike: Producto):void {

    this.zapatillasElegidas = nike;
    console.log(this.zapatillasElegidas);
  }
  
}

