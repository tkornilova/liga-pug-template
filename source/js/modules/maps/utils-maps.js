export const removeScroll = (mapName) => {
  mapName.behaviors.disable('scrollZoom');
  mapName.behaviors.disable('drag');
};

export const addScroll = (mapName) => {
  mapName.behaviors.enable('scrollZoom');
  mapName.behaviors.enable('drag');
};

export const addPin = (mapName) => {
  let layout = ymaps.templateLayoutFactory.createClass('<div></div>');

  let pin = new ymaps.Placemark([40.762289496830896, -73.97395321460688], {
    hintContent: 'Башня Трампа',
    balloonContent: 'Башня Трампа',
  }, {
    iconLayout: 'default#imageWithContent',
    iconImageHref: 'img/content/building.png',
    iconImageSize: [45, 45],
    iconImageOffset: [-20, -30],
    iconContentLayout: layout,
  });

  mapName.geoObjects.add(pin);
};
