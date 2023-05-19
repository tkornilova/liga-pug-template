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
import {initParalaxAnimation} from './modules/init-paralax-animation';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  // Инициализирует загрузочный экран при прогрузке страницы
  initLoader();
  // Инициализирует анимацию интро
  initIntroAnimation();
  // Инициализирует слайдера
  initSliderAnimation();
  // Инициализирует анимацию паралакса
  initParalaxAnimation();
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

