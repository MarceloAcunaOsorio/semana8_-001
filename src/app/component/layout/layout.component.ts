import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',

})
export class LayoutComponent  {

  

  constructor() { }

}


