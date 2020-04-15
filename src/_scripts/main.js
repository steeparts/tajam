'use strict';

import './vendor/modernizr';
import {WOW} from '../../node_modules/wowjs/dist/wow.min';

import 'core-js';
import 'regenerator-runtime/runtime';
import {Header} from '../_modules/header/header';
import {Modal} from '../_partials/modal/modal';
import {Reviews} from '../_partials/reviews/reviews';

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this.reviews = document.querySelector('.reviews__list');
    this.openModals = document.querySelectorAll('[data-modal]');
  }

  init() {
    new WOW().init();

    if (this.header) {
      const header = new Header();
      header.init();
    }

    if (this.openModals.length) {
      [...this.openModals].map(openModal => {
        openModal.addEventListener('click', event => {
          event.preventDefault();

          const options = {closable: true};
          if (openModal.dataset.modal === 'video') {
            Object.assign(options, {
              content: `
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/KvUgaHTNit4?autoplay=1"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              `,
              onClose: () => modal.destroy()
            });
          }

          const modal = new Modal(options);
          modal.open();
        });
      });
    }

    if (this.reviews) {
      const reviews = new Reviews({
        "container": ".reviews__list",
        "items": 1,
        "mouseDrag": true,
        "controls": false,
        "navContainer": ".reviews__thumbnails",
        "navAsThumbnails": true,
        "preventScrollOnTouch": "force",
        "swipeAngle": false,
        "speed": 500
      });
      reviews.init();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  main.init();
});
