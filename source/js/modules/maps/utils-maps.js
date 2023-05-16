export const removeScroll = (mapName) => {
  mapName.behaviors.disable('scrollZoom');
  mapName.behaviors.disable('drag');
};

export const addScroll = (mapName) => {
  mapName.behaviors.enable('scrollZoom');
  mapName.behaviors.enable('drag');
};

export const addPlacemark = (pinData, layout, placemarks) => {
  let ymaps = window.ymaps;

  let pin = new ymaps.Placemark(pinData.coordinates, {
    balloonContent: pinData.title,
  }, {
    iconLayout: 'default#imageWithContent',
    iconImageHref: pinData.img,
    iconImageSize: [45, 45],
    iconImageOffset: [-20, -30],
    iconContentLayout: layout,
  });

  placemarks.add(pin);
};

export const removeActiveState = (buttons) => {
  buttons.forEach((button) => {
    button.classList.remove('active');
  });
};

export const addActiveState = (button) => {
  button.classList.add('active');
};
