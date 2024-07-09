import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { listaProdutosAdidas } from '../../Data/datos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adidas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adidas.component.html',
  styleUrl: './adidas.component.css'
})
export class AdidasComponent {



  listaProd: Producto[]=[];
  zapatillasElegidas: Producto = new Producto();
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listaProd = listaProdutosAdidas;
  }

  verPelicula(nike: Producto):void {

    this.zapatillasElegidas = nike;
    console.log(this.zapatillasElegidas);
  }

}
