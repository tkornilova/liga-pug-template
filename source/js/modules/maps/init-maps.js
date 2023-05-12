import {removeScroll, addScroll, addPin} from './utils-maps';

export const mapData = {
  id: 'map-1',
  center: [40.76767820708949, -73.97180998839444],
  zoom: 16,
};

export const initMap = (data) => {
  // Создает карту
  let map = new ymaps.Map(data.id, {
    center: data.center,
    zoom: data.zoom,
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

  // Добавляет пины
  addPin(map);
};
