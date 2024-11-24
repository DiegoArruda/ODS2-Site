document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("slider");
  const slides = slider.querySelectorAll("a");
  let currentIndex = 0;


  const controls = document.createElement("div");
  controls.classList.add("slider-controls");

  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&larr;";
  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&rarr;";

  controls.appendChild(prevButton);
  controls.appendChild(nextButton);
  slider.appendChild(controls);


  function updateSlides(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
  }


  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
    updateSlides(currentIndex);
  });


  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
    updateSlides(currentIndex);
  });


  setInterval(() => {
    nextButton.click();
  }, 5000);

  updateSlides(currentIndex);
});



function scrollToSection(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert('Rota cadastrada com sucesso!');
});

let map, marker, routes = [];


function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -23.55052, lng: -46.633308 },
    zoom: 13,
  });


  map.addListener("click", (event) => {
    if (marker) marker.setMap(null);
    marker = new google.maps.Marker({
      position: event.latLng,
      map,
    });
  });
}


function loadRoutes() {
  const storedRoutes = localStorage.getItem("donationRoutes");
  if (storedRoutes) {
    routes = JSON.parse(storedRoutes);
    renderRoutes();
  }
}


function saveRoute(route) {
  routes.push(route);
  localStorage.setItem("donationRoutes", JSON.stringify(routes));
  renderRoutes();
}

function renderRoutes() {
  const routesList = document.getElementById("routes-list");
  routesList.innerHTML = "";

  routes.forEach((route, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <strong>Doação de:</strong> ${route.items}<br>
      <strong>Doado por:</strong> ${route.name} (${route.email})<br>
      <strong>Local:</strong> [${route.location.lat.toFixed(5)}, ${route.location.lng.toFixed(5)}]
      <button onclick="deleteRoute(${index})">Remover</button>
    `;
    routesList.appendChild(listItem);
  });
}

function deleteRoute(index) {
  routes.splice(index, 1);
  localStorage.setItem("donationRoutes", JSON.stringify(routes));
  renderRoutes();
}

document.getElementById("route-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("donor-name").value.trim();
  const email = document.getElementById("donor-email").value.trim();
  const items = document.getElementById("donation-items").value.trim();

  if (!marker) {
    alert("Por favor, selecione um local no mapa.");
    return;
  }

  const route = {
    name,
    email,
    items,
    location: {
      lat: marker.getPosition().lat(),
      lng: marker.getPosition().lng(),
    },
  };

  saveRoute(route);
  alert("Rota salva com sucesso!");
  document.getElementById("route-form").reset();
  marker.setMap(null);
  marker = null;
});

window.onload = loadRoutes;
