'use strict';

import { tns } from 'tiny-slider/src/tiny-slider';

export class Reviews {
  constructor(options) {
    this.options = options;
  }

  init() {
    tns(this.options);
  }
}
