$(document).ready( function() {

    var apiGoogleMaps = function() {
        var barraDeBusqueda = $("#buscar")[0];
        var autocomplete = new google.maps.places.Autocomplete(barraDeBusqueda);
        var opciones = {
            zoom: 10,
            center: new google.maps.LatLng(-34.567469, -59.114876),
            mapTypeControl: true,
            panControl: true,
            zoomControl: true,
            streetViewControl: false
        };
        function setearMarcador(posicion) {
            marker.setPosition(posicion);
        }
        function onPlaceChanged() {
            var place = autocomplete.getPlace();
            if (place.geometry) {
                map.panTo(place.geometry.location);
                //console.log(place.geometry.location);
                apiFlickr(place.geometry.location.A,place.geometry.location.F);
                setearMarcador(map.getCenter());
            } else {
                $("#buscar")[0].placeholder = "Ingresa una ubicación";
            }
        }
        function clickEnMapa(evento) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': evento.latLng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        //console.log(results);
                        barraDeBusqueda.value = results[1].formatted_address;
                        autocomplete.set("place",results[1]);
                    } else {
                        alert("No se encontraron resultados");
                    }
                } else {
                    alert("Geocoder fallo debido a " + status);
                }
            });
        }
        var map = new google.maps.Map($("#mapa")[0], opciones);
        var places = new google.maps.places.PlacesService(map);
        google.maps.event.addListener(autocomplete, "place_changed", onPlaceChanged);
        google.maps.event.addListener(map, "click", clickEnMapa);
        var marker = new google.maps.Marker({
            position: map.getCenter(),
            map: map
        });
    };

    var apiFlickr = function(latitud,longitud) {
        var apiSearch = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var apiKey = "f4365304f9ffa9c553ee3e309579e565";
        var query = apiSearch + "&api_key=" + apiKey + "&lat=" + latitud + "&lon=" + longitud + "&format=json&jsoncallback=?";
        $.getJSON(query, function(data) {
            if (data.photos.photo.length > 0) {
                //console.log(data);
                //console.log(data.stat);
                //console.log(data.photos.photo[0].id);
                //console.log(data.photos.photo[0].secret);
                //console.log(data.photos.photo[0].server);
                //console.log(data.photos.photo[0].farm);
                //console.log("https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg");
                var flickrID, flickrFARM, flickrSERVER, flickrSECRET, fuente;
                $("#slider").children().remove();
                $("#imagenes").children().remove();
                $.each(data.photos.photo, function (indice, foto) {
                    flickrID = foto.id;
                    flickrFARM = foto.farm;
                    flickrSERVER = foto.server;
                    flickrSECRET = foto.secret;
                    fuente = "https://farm" + flickrFARM + ".staticflickr.com/" + flickrSERVER + "/" + flickrID + "_" + flickrSECRET + ".jpg";
                    //console.log(fuente);
                    $("<img>").attr("src", fuente).appendTo("#imagenes");
                });
                if (data.photos.photo.length < 3) {
                    var foto = data.photos.photo[0];
                    for (var i = 0; i < 2; i++) {
                        flickrID = foto.id;
                        flickrFARM = foto.farm;
                        flickrSERVER = foto.server;
                        flickrSECRET = foto.secret;
                        fuente = "https://farm" + flickrFARM + ".staticflickr.com/" + flickrSERVER + "/" + flickrID + "_" + flickrSECRET + ".jpg";
                        //console.log(fuente);
                        $("<img>").attr("src", fuente).appendTo("#imagenes");
                    }
                }
            } else {
                $("#slider").children().remove();
                $("#imagenes").children().remove();
                for (i=0; i<3; i++) {
                    $("<img>").attr("src", "./NoHayFotos.png").appendTo("#imagenes");
                }
            }
            carrousel();
        });
    };

    var carrousel = function() {
        var $slider = $("#slider");
        var $imagenes = $("#imagenes");
        var $botonDerecho = $("#botonDerecho");
        var $botonIzquierdo = $("#botonIzquierdo");
        var $botones = $("div.boton");
        $botones.fadeTo("fast",0.5);
        $botonDerecho.data("habilitado",1);
        $botonIzquierdo.data("habilitado",1);
        $imagenes.children().css({maxWidth:"100%",marginLeft:0,marginRight:0});
        $slider.append($imagenes.children().first());
        $slider.append($imagenes.children().first());
        $slider.append($imagenes.children().first());
        var ancho = $slider.width()+10;
        console.log(ancho);
        $slider.children().first().css({marginLeft:-ancho+"px"});
        $slider.children().last().css({marginRight:-ancho+"px"});
        $botones.mouseenter(function(e) {
            $(e.target).stop(true,true).fadeTo("fast",1);
            $(e.target).children().stop(true,true).fadeTo("fast",1);
        }).mouseleave(function(e){
            $(e.target).fadeTo("fast",0.5);
            $(e.target).children().fadeTo("fast",0.5);
        });
        $botones.children().mouseenter(function(e) {
            $(e.target).parent().stop(true,true).fadeTo("fast",1);
        }).mouseleave(function(e){
            $(e.target).parent().fadeTo("fast",0.5);
        });
        $botonIzquierdo.click(function() {
            if ($botonIzquierdo.data("habilitado") == 1) {
                $botonDerecho.data("habilitado",0);
                $botonIzquierdo.data("habilitado",0);
                ancho = $slider.width()+10;
                $imagenes.append($slider.children().last().css({marginRight: 0}));
                $slider.children().first().animate({marginLeft: 0}, 1000);
                $slider.children().eq(1).animate({marginRight: -ancho + "px"}, 1000, function () {
                    $botonDerecho.data("habilitado",1);
                    $botonIzquierdo.data("habilitado",1);
                });
                $slider.children().first().before($imagenes.children().first().css({marginLeft: -ancho + "px"}));
            }
        });
        $botonDerecho.click(function() {
            if ($botonDerecho.data("habilitado") == 1) {
                $botonDerecho.data("habilitado",0);
                $botonIzquierdo.data("habilitado",0);
                ancho = $slider.width()+10;
                $imagenes.prepend($slider.children().first().css({marginLeft: 0}));
                $slider.children().first().animate({marginLeft: -ancho + "px"}, 1000);
                $slider.children().last().animate({marginRight: 0}, 1000, function () {
                    $botonDerecho.data("habilitado",1);
                    $botonIzquierdo.data("habilitado",1);
                });
                $slider.append($imagenes.children().last());
                $slider.children().last().css({marginRight: -ancho + "px"});
            }
        });
    };

    apiGoogleMaps();
    apiFlickr(-34.567469, -59.114876);

});
