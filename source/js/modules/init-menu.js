export const initMenu = () => {
  const menuButton = document.querySelector('.main-nav__toggle');
  const header = document.querySelector('.header');

  menuButton.addEventListener('click', () => {
    header.classList.toggle('opened');
  });
};
