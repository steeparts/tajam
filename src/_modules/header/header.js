'use strict';

import {NavBar} from '../../_partials/navbar/navbar';

export class Header {
  constructor() {
    this.header = document.querySelector('.header');
    this.navBar = this.header.querySelector('.navbar');
  }

  init() {
    if (this.navBar) {
      const navBar = new NavBar({
        element: this.navBar,
        hasBurger: true
      });
      navBar.init();
    }
  }
}
