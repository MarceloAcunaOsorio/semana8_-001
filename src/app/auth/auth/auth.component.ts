import { Component } from '@angular/core';
import { FooterComponent } from '../../component/footer/footer.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../component/login/login.component';
import { RegistrarComponent } from '../../component/registrar/registrar.component';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FooterComponent,RouterModule,CommonModule,LoginComponent,RegistrarComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AuthComponent {

  constructor(private router: Router) { }

  get isLoginRoute(): boolean {
    return this.router.url === '/auth/login';
  }

}
