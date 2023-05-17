export const map1 = document.getElementById('map-1');
export const map2 = document.getElementById('map-2');
export const map3 = document.getElementById('map-3');
export const map4 = document.getElementById('map-4');

// Убирает скролл с карты
export const removeScroll = (mapName) => {
  mapName.behaviors.disable('scrollZoom');
  mapName.behaviors.disable('drag');
};

// Добавляет скролл карте
export const addScroll = (mapName) => {
  mapName.behaviors.enable('scrollZoom');
  mapName.behaviors.enable('drag');
};

// Добавляет пин на карту
export const addPlacemark = (pinData, layout, placemarks) => {
  let ymaps = window.ymaps;

  let pin = new ymaps.Placemark(pinData.coordinates, {
    balloonContentHeader: pinData.title,
    balloonContentBody: pinData.description,
    balloonContentFooter: `Тип иконки: ${pinData.type}`,
  }, {
    iconLayout: 'default#imageWithContent',
    iconImageHref: pinData.img,
    iconImageSize: [45, 45],
    iconImageOffset: [-20, -30],
    iconContentLayout: layout,
  });

  placemarks.add(pin);
};

// Добавляет кластеры с пинами на карту
export const initClusterer = (pins, map) => {
  let ymaps = window.ymaps;

  let clusterer = new ymaps.Clusterer({
    clusterDisableClickZoom: true,
  });

  for (let i = 0; i < pins.length; i++) {
    let pin = new ymaps.Placemark(pins[i].coordinates, {
      balloonContentHeader: pins[i].title,
      balloonContentBody: pins[i].description,
      balloonContentFooter: `Тип иконки: ${pins[i].type}`,
    }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: pins[i].img,
      iconImageSize: [45, 45],
      iconImageOffset: [-20, -30],
    });
    clusterer.add(pin);
  }
  map.geoObjects.add(clusterer);
};

// Убирает класс active с элемента
export const removeActiveState = (buttons) => {
  buttons.forEach((button) => {
    button.classList.remove('active');
  });
};

// Добавляет класс active элементу
export const addActiveState = (button) => {
  button.classList.add('active');
};

// Дает скроллить при нажатом control
export const crtlZoom = (mapData, map) => {
  const overlay = document.querySelector('.map__overlay');

  // Добавляет overlay при скролле (без нажатия control)
  document.getElementById(mapData.center.id).addEventListener('wheel', () => {
    if (window.innerWidth > 1024) {
      overlay.style.display = 'flex';
      removeScroll(map);
    }
  });

  // Убирает overlay, когда мышка не на карте
  overlay.addEventListener('mouseleave', () => {
    overlay.style.display = 'none';
    removeScroll(map);
  });

  // Убирает overlay и добавляет скролл при нажатии на control
  window.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 17) {
      document.getElementById(mapData.center.id).addEventListener('wheel', () => {
        if (window.innerWidth > 1024) {
          overlay.style.display = 'none';
          addScroll(map);
        }
      });
    }
  });

  // Добавляет overlay и убирает скролл при отпускании control
  window.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 17) {
      overlay.style.display = 'flex';
      removeScroll(map);

      document.getElementById(mapData.center.id).addEventListener('wheel', () => {
        if (window.innerWidth > 1024) {
          overlay.style.display = 'flex';
          removeScroll(map);
        }
      });
    }
  });
};
