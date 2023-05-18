import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {map1, map2, map3, map4} from './modules/maps/utils-maps';
import {getMapData} from './modules/maps/init-maps';
import {initLoader} from './modules/init-loader';
import {initIntroAnimation} from './modules/init-intro-animation';
import {initSliderAnimation} from './modules/init-slider-animation';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  // Инициализирует загрузочный экран при прогрузке страницы
  setTimeout(initLoader, 1700);
  initIntroAnimation();
  initSliderAnimation();
  // Убирает проблемы с vh на iOS
  iosVhFix();


  // Modules
  // ---------------------------------

  // Инициализирует карты
  getMapData(map1);
  getMapData(map2);
  getMapData(map3);
  getMapData(map4);

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

    // Инициализирует модальное окно
    initModals();
    // Проверяет и загружает файл
    uploadFile();
    // Проверяет и загружает картинку
    uploadImageDrop();
    // Добавляет кастомный селект
    const select = new CustomSelect();
    select.init();
    // Проверка формы при отправке
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
