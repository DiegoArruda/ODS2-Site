let map;
let service;
let geocoder;

function initMap() {
    // Inicializa o mapa com um centro genérico
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -8.0476, lng: -34.8770 }, // Recife
        zoom: 12,
    });

    // Inicializa o geocoder
    geocoder = new google.maps.Geocoder();

    // Tenta obter a localização do usuário
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                let pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                map.setCenter(pos);

                let marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "Você está aqui",
                });

                // Busca pontos de doacao na localização atual
                buscarPontosDeDoacao(pos);
            },
            function () {
                // Erro ao obter localização, usar centro genérico
                buscarPontosDeDoacao(map.getCenter());
            }
        );
    } else {
        // Navegador não suporta geolocalização, usar centro genérico
        buscarPontosDeDoacao(map.getCenter());
    }
}

function buscarPontosDeDoacao(location) {
    let request = {
        location: location,
        radius: "10000", // Raio de busca = 10km
        type: ["point_of_interest"],
        keyword: "doar alimentos",
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let placesList = document.getElementById("places-list");
            placesList.innerHTML = "";
            for (let i = 0; i < results.length; i++) {
                let place = results[i];
                // Adiciona marcadores para cada ponto de doacao encontrado
                let marker = new google.maps.Marker({
                    position: place.geometry.location,
                    map: map,
                    title: place.name,
                });

                let li = document.createElement("li");
                li.textContent = place.name;
                placesList.appendChild(li);
            }
        }
    });
}

function searchAddress() {
    let address = document.getElementById("address").value;
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            let location = results[0].geometry.location;
            map.setCenter(location);

            // Cria um marcador para o endereço buscado
            let marker = new google.maps.Marker({
                position: location,
                map: map,
                title: "Local buscado",
            });

            buscarPontosDeDoacao(location);
        } else {
            alert("Geocode não foi bem-sucedido devido a: " + status);
        }
    });
}