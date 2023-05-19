// Инициализирует загрузочный экран при прогрузке страницы
export const initLoader = () => {
  const loader = document.querySelector('.loader');

  if (!loader) {
    return;
  }

  loader.classList.add('hidden');
};
