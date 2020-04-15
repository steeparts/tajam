'use strict';

import path from 'path';
import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import { config, taskTarget } from '../utils';

let dirs = config.directories;
let dist = {
  images: path.join(taskTarget, dirs.images.replace(/^_/, '')),
  styles: path.join(taskTarget, dirs.styles.replace(/^_/, ''))
};

// Sprite
gulp.task('sprite', () => {
  let spriteData =
    gulp
      .src(`${dirs.source}/${dirs.images}/sprite/**/*.png`)
      .pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.css',
      }));

  spriteData.img.pipe(gulp.dest(dist.images));
  spriteData.css.pipe(gulp.dest(dist.styles));
});
