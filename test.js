// map.test.js - New test file
const MapManager = require('./map');
const mapboxgl = require('mapbox-gl');

jest.mock('mapbox-gl');

describe('MapManager', () => {
  let manager;

  beforeAll(() => {
    manager = new MapManager('test_api_key');
  });

  test('initializes map with correct parameters', () => {
    manager.initMap('test-container', [-74.5, 40]);
    
    expect(mapboxgl.Map).toHaveBeenCalledWith({
      container: 'test-container',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 12
    });
  });

  test('stores map instances', () => {
    expect(manager.maps.size).toBe(1);
  });
});
