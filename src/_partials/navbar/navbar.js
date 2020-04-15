'use strict';

export class NavBar {
  constructor(props) {
    this.navBar = props.element;
    this.links = this.navBar.querySelectorAll('.navbar__link');
    if (props.hasBurger) {
      this.burger = this.navBar.querySelector('.navbar__burger');
    }
  }

  activeMenuItemHandler() {
    [...this.links].map(link => {
      link.parentNode.classList.remove('navbar__item--active');

      let anchor = link.getAttribute('href'),
        ref = document.querySelector(anchor);

      if (ref) {
        let refTopBound = ref.offsetTop,
          refBottomBound = refTopBound + ref.clientHeight;

        if (window.scrollY >= refTopBound - 50 && window.scrollY < refBottomBound) {
          link.parentNode.classList.add('navbar__item--active');
        }
      }
    });
  }

  menuLinkClickHandler() {
    [...this.links].map(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        if (! link.parentNode.classList.contains('navbar__item--active')) {
          let anchor = event.target.getAttribute('href'),
            ref = document.querySelector(anchor);

          if (ref) {
            ref.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }

        this.burger && this.burgerClickHandler(true);
      });
    });
  }

  burgerClickHandler(force) {
    force = force || false;

    if (force) {
      this.burger.classList.remove('navbar__burger--active');
      document.body.classList.remove('no-scroll');
    }
    else {
      this.burger.classList.toggle('navbar__burger--active');
      document.body.classList.toggle('no-scroll');
    }
  }

  init() {
    if (this.navBar) {
      this.menuLinkClickHandler();

      this.activeMenuItemHandler();
      document.addEventListener('scroll', () => this.activeMenuItemHandler());

      this.burger && this.burger.addEventListener('click', () => this.burgerClickHandler());
    }
  }
}
