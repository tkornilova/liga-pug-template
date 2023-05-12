export const mapData1 = {
  id: 'map-1',
  center: [40.76767820708949,-73.97180998839444],
  zoom: 16,
};

export const initMap = (data) => {
  let map = new ymaps.Map(data.id, {
    center: data.center,
    zoom: data.zoom,
  });

  let baloon = new ymaps.Placemark(data.center, {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/content/baloon.png',
    iconImageSize: [60, 60],
    iconImageOffset: [-29, -56],
  });

  map.geoObjects.add(baloon);
};
