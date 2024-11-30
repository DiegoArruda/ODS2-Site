let map, directionsService, directionsRenderer, startMarker, endMarker;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -8.0476, lng: -34.8770 }, // Recife como ponto inicial
        zoom: 13,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);


    google.maps.event.addListener(map, "click", (event) => {
        if (!startMarker) {
            startMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Ponto Inicial",
            });
        } else if (!endMarker) {
            endMarker = new google.maps.Marker({
                position: event.latLng,
                map: map,
                title: "Ponto Final",
            });
            calculateRoute();
        }
    });
}

function calculateRoute() {
    if (startMarker && endMarker) {
        const request = {
            origin: startMarker.getPosition(),
            destination: endMarker.getPosition(),
            travelMode: google.maps.TravelMode.DRIVING,
        };

        directionsService.route(request, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            } else {
                alert("Não foi possível calcular a rota.");
            }
        });
    }
}

document.getElementById("route-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("donor-name").value;
    const email = document.getElementById("donor-email").value;
    const donationItems = document.getElementById("donation-items").value;

    if (!startMarker || !endMarker) {
        alert("Por favor, selecione o ponto inicial e o ponto final no mapa.");
        return;
    }

    const route = {
        name,
        email,
        donationItems,
        start: startMarker.getPosition().toJSON(),
        end: endMarker.getPosition().toJSON(),
    };


    const routes = JSON.parse(localStorage.getItem("routes")) || [];
    routes.push(route);
    localStorage.setItem("routes", JSON.stringify(routes));

    alert("Rota salva com sucesso!");
    document.getElementById("route-form").reset();


    startMarker.setMap(null);
    endMarker.setMap(null);
    startMarker = null;
    endMarker = null;
    directionsRenderer.setDirections({ routes: [] });

    updateRouteList();
});

function updateRouteList() {
    const routesList = document.getElementById("routes-list");
    routesList.innerHTML = "";

    const routes = JSON.parse(localStorage.getItem("routes")) || [];

    routes.forEach((route, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <strong>${route.name}</strong> - ${route.donationItems}<br>
        <small>${route.email}</small>
        <div id="route-map-${index}" style="width: 100%; height: 300px; margin-top: 10px; display: none;"></div>
      `;


        listItem.addEventListener("click", () => {
            const mapContainer = document.getElementById(`route-map-${index}`);
            if (mapContainer.style.display === "none") {
                mapContainer.style.display = "block";

                // Inicializa o mapa para esta rota
                const map = new google.maps.Map(mapContainer, {
                    center: route.start,
                    zoom: 13,
                });

                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer();
                directionsRenderer.setMap(map);

                const request = {
                    origin: route.start,
                    destination: route.end,
                    travelMode: google.maps.TravelMode.DRIVING,
                };

                directionsService.route(request, (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        directionsRenderer.setDirections(result);
                    } else {
                        alert("Não foi possível exibir esta rota.");
                    }
                });
            } else {
                mapContainer.style.display = "none"; // Esconde o mapa ao clicar novamente
            }
        });

        routesList.appendChild(listItem);
    });
}


window.onload = () => {
    initMap();
    updateRouteList();
};

