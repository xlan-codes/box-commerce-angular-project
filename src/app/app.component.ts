import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    RouterLinkActive,
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
}
