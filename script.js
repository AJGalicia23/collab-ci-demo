// Sample data
const destinations = [
    { id: 1, name: "Bali", image: "https://source.unsplash.com/random/600x400/?bali", rating: 4.8 },
    { id: 2, name: "Paris", image: "https://source.unsplash.com/random/600x400/?paris", rating: 4.7 },
    { id: 3, name: "Tokyo", image: "https://source.unsplash.com/random/600x400/?tokyo", rating: 4.9 },
    { id: 4, name: "New York", image: "https://source.unsplash.com/random/600x400/?newyork", rating: 4.6 }
];

// DOM Elements
const cardsContainer = document.getElementById('cards');
const tripList = document.getElementById('trip-list');
const searchBtn = document.getElementById('search-btn');

// Render destination cards
function renderCards() {
    cardsContainer.innerHTML = destinations.map(dest => `
        <div class="card" data-id="${dest.id}">
            <img src="${dest.image}" alt="${dest.name}">
            <div class="card-content">
                <h3>${dest.name}</h3>
                <div class="rating">${'★'.repeat(Math.floor(dest.rating))}${'☆'.repeat(5-Math.floor(dest.rating))}</div>
                <button class="add-trip">Add to My Trips</button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to buttons
    document.querySelectorAll('.add-trip').forEach(btn => {
        btn.addEventListener('click', addToMyTrips);
    });
}

// Add to My Trips
function addToMyTrips(e) {
    const card = e.target.closest('.card');
    const destId = parseInt(card.dataset.id);
    const destination = destinations.find(d => d.id === destId);
    
    const tripItem = document.createElement('li');
    tripItem.innerHTML = `
        ${destination.name}
        <span class="remove-trip" data-id="${destId}">×</span>
    `;
    
    tripList.appendChild(tripItem);
    saveToLocalStorage(destination);
    
    // Add remove event listener
    tripItem.querySelector('.remove-trip').addEventListener('click', removeTrip);
}

// Local Storage functions
function saveToLocalStorage(destination) {
    let trips = JSON.parse(localStorage.getItem('myTrips')) || [];
    trips.push(destination);
    localStorage.setItem('myTrips', JSON.stringify(trips));
}

function loadFromLocalStorage() {
    const trips = JSON.parse(localStorage.getItem('myTrips')) || [];
    trips.forEach(trip => {
        const tripItem = document.createElement('li');
        tripItem.innerHTML = `
            ${trip.name}
            <span class="remove-trip" data-id="${trip.id}">×</span>
        `;
        tripList.appendChild(tripItem);
        tripItem.querySelector('.remove-trip').addEventListener('click', removeTrip);
    });
}

// Remove trip
function removeTrip(e) {
    const tripId = parseInt(e.target.dataset.id);
    e.target.parentElement.remove();
    
    let trips = JSON.parse(localStorage.getItem('myTrips')) || [];
    trips = trips.filter(trip => trip.id !== tripId);
    localStorage.setItem('myTrips', JSON.stringify(trips));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
    loadFromLocalStorage();
    
    // Search functionality
    searchBtn.addEventListener('click', () => {
        const query = document.getElementById('destination').value.toLowerCase();
        const filtered = destinations.filter(dest => 
            dest.name.toLowerCase().includes(query)
        );
        // Implement actual search logic here
        console.log(`Searching for: ${query}`);
    });
});

// map.js - New file
class MapManager {
    constructor(apiKey) {
      this.mapboxKey = apiKey;
      this.maps = new Map();
    }
  
    initMap(containerId, coordinates) {
      mapboxgl.accessToken = this.mapboxKey;
      
      const map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 12
      });
      
      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);
      
      this.maps.set(containerId, map);
      return map;
    }
  
    resizeMap(containerId) {
      const map = this.maps.get(containerId);
      if (map) map.resize();
    }
  }
  
  // Export for testing
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = MapManager;
  }
  