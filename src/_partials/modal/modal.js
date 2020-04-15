'use strict';

export const Modal = options => {
  const _create = options => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
      <div class='modal__overlay'>
        <div class='modal__container'>
          <div class='modal__header'>
            ${options.closable ? `<div class='modal__close'>&times;</div>` : ''}
          </div>
          <div class='modal__content'>${options.content || ''}</div>
        </div>
      </div>
    `);
    document.body.appendChild(modal);
    return modal;
  };

  const $modal = _create(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      !destroyed && !closing && $modal.classList.add('modal--open');
      document.body.classList.add('no-scroll');
    },
    close() {
      closing = true;
      document.body.classList.remove('no-scroll');
      $modal.classList.remove('modal--open');
      $modal.classList.add('modal--hidden');
      setTimeout(() => {
        $modal.classList.remove('modal--hidden');
        closing = false;
        if (typeof options.onClose === 'function') {
          options.onClose();
        }
      }, 300);
    }
  };

  const closeEvent = event => {
    if (event.target.classList.contains('modal__overlay') ||
      event.target.classList.contains('modal__close')) {
      modal.close();
    }
  };
  $modal.addEventListener('click', closeEvent);

  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal);
      $modal.removeEventListener('click', closeEvent);
      destroyed = true;
    }
  });
};
