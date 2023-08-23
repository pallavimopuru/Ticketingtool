import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEMES } from '../theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(name: string) {
    if (!name) {
      let value = JSON.parse(sessionStorage.getItem('adminDetails')!)

      var userTheme = value?.userTheme;

      // name = 'default';

      name = userTheme;
    
    }
    let themeSetting: any = THEMES;
    let theme = themeSetting[name];
    Object.keys(theme).forEach((key) => {
      this.document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
}