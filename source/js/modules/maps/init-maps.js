import {removeScroll, addScroll} from './utils-maps';

export const map1 = document.getElementById('map-1');
export const map2 = document.getElementById('map-2');

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

  // Добавляет пин на карту
  const addPins = (pins) => {
    let layout = ymaps.templateLayoutFactory.createClass('<div></div>');

    for (let i = 0; i < pins.length; i++) {
      let pin = new ymaps.Placemark(pins[i].coordinates, {
        balloonContent: pins[i].title,
      }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: pins[i].img,
        iconImageSize: [45, 45],
        iconImageOffset: [-20, -30],
        iconContentLayout: layout,
      });

      map.geoObjects.add(pin);
    }
  };

  if (mapData.pins) {
    addPins(mapData.pins);
  }

  // Убирает ресайз на десктопе (начальный размер экрана)
  const removeDesktopResize = (mapName) => {
    if (window.innerWidth > 1024) {
      removeScroll(mapName);
    } else {
      addScroll(mapName);
    }
  };

  removeDesktopResize(map);

  // Убирает ресайз на десктопе (при изменении ширины экрана)
  window.addEventListener('resize', () => {
    removeDesktopResize(map);
  });
};
