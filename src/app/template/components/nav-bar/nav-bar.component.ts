import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent{

  title = 'angular-material-theming-task';
  theme = 'theme-one';
  constructor() {
    if (localStorage.getItem('themeSelection') === null) {
      localStorage.setItem('themeSelection', 'theme-one');
    } else {
      this.theme = localStorage.getItem('themeSelection');
    }
  }

  themeChanging(theme) {
    this.theme = theme;
    localStorage.setItem('themeSelection', this.theme);
  }
}
