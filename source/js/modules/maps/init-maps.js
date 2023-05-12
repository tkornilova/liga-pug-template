export const mapData1 = {
  id: 'map-1',
  center: [40.76768409981321, -73.97185153168247],
  zoom: 16,
};

export const initMap = (data) => {
  let map = new ymaps.Map(data.id, {
    center: data.center,
    zoom: data.zoom,
  });
};
