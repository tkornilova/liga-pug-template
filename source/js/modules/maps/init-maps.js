import {
  removeScroll,
  addScroll,
  addPlacemark,
  removeActiveState,
  addActiveState,
  crtlZoom
} from './utils-maps';

export const map1 = document.getElementById('map-1');
export const map2 = document.getElementById('map-2');
export const map3 = document.getElementById('map-3');

// Получает данные из JSON файла и переносит их на карту
export const getMapData = (map) => {
  if (!map) {
    return;
  }

  fetch(map.dataset.url)
      .then((response) => response.json())
      .then((data) => {
        let ymaps = window.ymaps;
        ymaps.ready(function () {
          composeMap(data);
        });
      });
};

const composeMap = (mapData) => {
  let ymaps = window.ymaps;

  // Создает карту
  let map = new ymaps.Map(mapData.center.id, {
    center: mapData.center.coordinates,
    zoom: mapData.center.zoom,
    behaviors: ['default', 'scrollZoom'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  // Кастомизирует и подключает новый baloon
  if (mapData.center.img) {
    let baloon = new ymaps.Placemark(mapData.center.coordinates, {}, {
      iconLayout: 'default#image',
      iconImageHref: mapData.center.img,
      iconImageSize: mapData.center.imgSize,
      iconImageOffset: mapData.center.imgOffset,
    });

    map.geoObjects.add(baloon);
  }

  // Добавляет пин в переменную placemarks
  let placemarks = new ymaps.GeoObjectCollection();

  const addPins = (pins) => {
    let layout = ymaps.templateLayoutFactory.createClass('<div></div>');

    for (let i = 0; i < pins.length; i++) {
      addPlacemark(pins[i], layout, placemarks);
    }

    map.geoObjects.add(placemarks);
  };

  // Добавляет пины (placemarks) на карту
  if (mapData.pins) {
    addPins(mapData.pins);
  }

  // Фильтрация пинов на карте
  const filterBtns = document.querySelectorAll('.filter__button');

  const filterPins = () => {
    filterBtns.forEach((button) => {
      button.addEventListener('click', () => {
        // Меняет активное состояние кнопки
        removeActiveState(filterBtns);
        addActiveState(button);

        // Убирает все пины
        placemarks.removeAll();
        let layout = ymaps.templateLayoutFactory.createClass('<div></div>');

        // Проверяет на соответствие пины
        if (button.dataset.type === 'all') {
          addPins(mapData.pins);
        } else {
          for (let i = 0; i < mapData.pins.length; i++) {
            if (mapData.pins[i].type === button.dataset.type) {
              addPlacemark(mapData.pins[i], layout, placemarks);
            }
          }
        }
      });
    });
  };

  if (filterBtns) {
    filterPins();
  }

  // Показывает overlay при скролле
  if (mapData.map.isOverlay) {
    crtlZoom(mapData, map);
  }

  // Убирает ресайз на десктопе (проверка размера начального экрана)
  const removeDesktopResize = (mapName) => {
    if (window.innerWidth > 1024) {
      removeScroll(mapName);
    } else {
      addScroll(mapName);
    }
  };

  removeDesktopResize(map);

  // Убирает ресайз на десктопе (проверка при изменении ширины экрана)
  window.addEventListener('resize', () => {
    removeDesktopResize(map);
  });
};
