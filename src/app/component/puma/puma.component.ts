import { Component } from '@angular/core';
import { Producto } from '../../models/Producto';
import { listaProdutosPuma } from '../../Data/datos';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-puma',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './puma.component.html',
  styleUrl: './puma.component.css'
})
export class PumaComponent {


  listaProd: Producto[]=[];
  zapatillasElegidas: Producto = new Producto();
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listaProd = listaProdutosPuma;
  }

  verPelicula(nike: Producto):void {

    this.zapatillasElegidas = nike;
    console.log(this.zapatillasElegidas);
  }


}
