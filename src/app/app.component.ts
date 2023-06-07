import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(private _authService:AuthService)
  {
    this._authService.showLoginPageIfTokenExpries();
  }
 
  title = 'User-App';
  onActive()
  {
    window.scroll(0,0);
  }
  
}
