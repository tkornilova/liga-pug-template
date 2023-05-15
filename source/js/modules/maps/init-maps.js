import {removeScroll, addScroll} from './utils-maps';

export const mapData = {
  id: 'map-1',
  center: [40.76767820708949, -73.97180998839444],
  zoom: 16,
};

export const initMap = (data) => {
  let ymaps = window.ymaps;

  // Создает карту
  let map = new ymaps.Map(data.id, {
    center: data.center,
    zoom: data.zoom,
    behaviors: ['default', 'scrollZoom'],
  }, {
    searchControlProvider: 'yandex#search',
  });

  // Кастомизирует и подключает новый baloon
  let baloon = new ymaps.Placemark(data.center, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/content/baloon.png',
    iconImageSize: [60, 60],
    iconImageOffset: [-29, -56],
  });

  map.geoObjects.add(baloon);

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

  // Добавляет пин на карту
  const addPin = (pinData) => {
    let layout = ymaps.templateLayoutFactory.createClass('<div></div>');

    let pin = new ymaps.Placemark(pinData.coordinates, {
      balloonContent: pinData.title,
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: pinData.img,
      iconImageSize: [45, 45],
      iconImageOffset: [-20, -30],
      iconContentLayout: layout,
    });

    map.geoObjects.add(pin);
  };

  // Получает данные из JSON файла и переносит их на карту
  const getPinData = () => {
    fetch('./../../../data/pins.json')
        .then((response) => response.json())
        .then((pins) => {
          for (let i = 0; i < pins.length; i++) {
            addPin(pins[i]);
          }
        });
  };

  ymaps.ready(getPinData());
};
