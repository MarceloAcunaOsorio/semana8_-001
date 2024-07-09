import { Component } from '@angular/core';
import { listaProdutosReebok } from '../../Data/datos';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/Producto';

@Component({
  selector: 'app-reebok',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reebok.component.html',
  styleUrl: './reebok.component.css'
})
export class ReebokComponent {



  listaProd: Producto[]=[];
  zapatillasElegidas: Producto = new Producto();
  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listaProd = listaProdutosReebok;
  }

  verPelicula(nike: Producto):void {

    this.zapatillasElegidas = nike;
    console.log(this.zapatillasElegidas);
  }

}
