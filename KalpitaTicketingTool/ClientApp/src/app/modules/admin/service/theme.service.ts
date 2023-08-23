import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { THEMES } from '../theme.config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(name: string) {
    // if (name) {
    //   name = 'default';
    // }
    let themeSetting: any = THEMES;
    //console.log("name",name);

    let theme = themeSetting[name];
    Object.keys(theme).forEach((key) => {
      this.document.documentElement.style.setProperty(`--${key}`, theme[key]);
    });
  }
}
