// Инициализирует загрузочный экран при прогрузке страницы
export const initLoader = () => {
  const loader = document.querySelector('.loader');

  loader.classList.add('hidden');
};
