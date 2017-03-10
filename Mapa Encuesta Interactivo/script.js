$(document).ready(function () {

    console.log(identificadores.provincia);

    var colores =["ForestGreen","MidnightBlue","DarkRed","DarkMagenta","DarkViolet","BurlyWood"];

    var Graficador = function(canvas, arreglo, radio, posX, posY, colores) {
        var tamanio = arreglo.length;
        var total = 0;
        for (var i=0; i<tamanio; i++) {
            total += arreglo[i];
        }
        var angulos = [];
        var porcentaje;
        for (i=0; i<tamanio; i++) {
            porcentaje = arreglo[i] / total;
            angulos[i] = 360 * porcentaje * Math.PI / 180;
            if (i != 0) {
                angulos[i] += angulos[i-1];
            }
        }
        var puntos = "";
        var x, y, x2, y2;
        this.secciones = [];
        for (i=0; i<tamanio; i++) {
            x = Math.cos(angulos[i]) * radio;
            y = Math.sin(angulos[i]) * radio;
            if (i < tamanio - 1) {
                x2 = Math.cos(angulos[i + 1]) * radio;
                y2 = Math.sin(angulos[i + 1]) * radio;
            } else {
                x2 = Math.cos(angulos[0]) * radio;
                y2 = Math.sin(angulos[0]) * radio;
            }
            puntos += "M " + posX + " " + posY + " ";
            puntos += "l " + x + " " + y + " ";
            puntos += "A " + radio + " " + radio + " " + 0 + " " + 0 + " " + 1 + " " + (x2 + posX) + " " + (y2 + posY) + " ";
            puntos += "M " + posX + " " + posY + " ";
            puntos += "Z";
            this.secciones[i] = canvas.path(puntos).attr({
                stroke: "rgba(0,0,0,0)",
                fill: "rgba(0,0,0,0)",
                transform: "S3 T50 50",
                fillOpacity: "0.7"
            });
            puntos = "";
        }
        this.mostrarGrafico(colores);
    };

    Graficador.prototype.mostrarGrafico = function(colores) {
        var seccionesAnimables = [];
        seccionesAnimables[0] = this.secciones[this.secciones.length-1];
        for (var i=1; i<this.secciones.length-1;i++) {
            seccionesAnimables[i] = this.secciones[i-1];
        }
        seccionesAnimables[this.secciones.length-1] = this.secciones[this.secciones.length-2];
        function animar(indice) {
            if (indice < seccionesAnimables.length) {
                seccionesAnimables[indice].animate({
                    stroke: "#000",
                    fill: colores[indice],
                    transform: "T0 0"
                }, 1000, mina.bounce, function() {animar(indice + 1)});
            }
        }
        animar(0);
    };

    Graficador.prototype.borrar = function() {
        for (var i=0; i<this.secciones.length; i++) {
            this.secciones[i].remove();
        }
    };

    Graficador.prototype.appendTo = function(g) {
        g.append(this.secciones[this.secciones.length-1]);
        for (var i=0; i<this.secciones.length-1; i++) {
            g.append(this.secciones[i]);
        }
    };

    var $contenedor = $("#contenedor");

    $contenedor.css("background-color","#6ABFEE");

    var dimensionar = function() {
        $contenedor.css({
            width: $(window).width(),
            height: $(window).height()
        });
        if (g != null) {
            var altoNuevo = parseFloat($(window).height());
            var anchoNuevo = parseFloat($(window).width());
            g.transform("S1");
            var altoMapa = parseFloat(g.getBBox().height);
            var anchoMapa = parseFloat(g.getBBox().width);
            console.log("ALTO MAPA: " + altoMapa);
            console.log("ANCHO MAPA: " + anchoMapa);
            console.log("ALTO NUEVO: " + altoNuevo);
            console.log("ANCHO NUEVO: " + anchoNuevo);
            if (anchoMapa >= anchoNuevo || altoMapa >= altoNuevo) {
                var porcentajeDeConversionY = altoNuevo / altoMapa;
                var porcentajeDeConversionX = anchoNuevo / altoMapa;
                if (porcentajeDeConversionX < porcentajeDeConversionY) {
                    porcentajeDeConversion = porcentajeDeConversionX;
                } else {
                    porcentajeDeConversion = porcentajeDeConversionY;
                }
                console.log("PORCENTAJEX: " + porcentajeDeConversionX);
                console.log("PORCENTAJEY: " + porcentajeDeConversionY);
                console.log("PORCENTAJE: " + porcentajeDeConversion);
                g.transform("S" + porcentajeDeConversion + " " + porcentajeDeConversion + " " + "0 0");
                cajaVisibleMapa.attr({
                    width: $(window).width() / porcentajeDeConversion
                });
            }
        }
    };

    $(window).resize(dimensionar);

    var animarTexto = function(arregloTextos,i) {
        if (i < arregloTextos.length) {
            arregloTextos[i].animate({
                transform: "s3 t0 0",
                fillOpacity:1
            },1000,mina.backout,function() {
                animarTexto(arregloTextos,i+1);
            });
        }
    };

    var mostrarDatosProvincia = function(provincia) {
        if (provinciaSeleccionada != null) {
            provinciaSeleccionada.animate({transform:"t0 0",fill:provinciaSeleccionada.color},1000,mina.bounce);
        }
        if (provinciaElegida != null) {
            provinciaElegida.remove();
            grafico.borrar();
            nombreProvincia.remove();
            for (var i=0; i<nombresPartidos.length; i++) {
                nombresPartidos[i].remove();
            }
        }
        provincias.append(provincia);
        provinciaSeleccionada = provincia;
        provinciaSeleccionada.color = provinciaSeleccionada.attr("fill");
        console.log(provincia);
        console.log(provincia.attr("id"));
        provincia.animate({transform:"t15 15",fill:"blue",stroke: "black"},1000,mina.bounce, function() {
            provinciaElegida = provincia.clone();
            var anchoprovincia = parseInt(provinciaElegida.getBBox().width);
            var altoProvincia = parseInt(provinciaElegida.getBBox().height);
            var posX = parseInt(provinciaElegida.getBBox().x);
            var posY = parseInt(provinciaElegida.getBBox().y);
            var altoCaja = parseInt(cajaVisibleMapa.attr("height"));
            var anchoCaja = parseInt(cajaVisibleMapa.attr("width"));
            var letra = provinciaSeleccionada.attr("id").split("AR-")[1];
            console.log("LETRA: " + letra);
            var nomProvincia = jQuery.grep(identificadores.provincia, function(obj) {
                return obj.identificador === letra;
            })[0].nombre;
            var resultadosDistrito = jQuery.grep(resultados, function(obj) {
                return obj.distrito === letra;
            })[0].resultados;
            var transformacion = "t"+Math.round(anchoCaja/2-anchoprovincia/2-posX/2)+" "+Math.round(altoCaja/2-altoProvincia-posY);
            transformacion += " s3";
            console.log(transformacion);
            provinciaElegida.attr({transform:transformacion});
            var posTextoX = provinciaElegida.getBBox().x+provinciaElegida.getBBox().width/2;
            var posTextoY = provinciaElegida.getBBox().y+provinciaElegida.getBBox().height/2+300;
            if (posTextoY < provinciaElegida.getBBox().y+provinciaElegida.getBBox().height) {
                posTextoY = provinciaElegida.getBBox().y+provinciaElegida.getBBox().height + 50;
            }
            nombreProvincia = canvas.text(posTextoX,posTextoY,nomProvincia);
            g.append(nombreProvincia);
            var nuevaPosTextoX = nombreProvincia.getBBox().x - nombreProvincia.getBBox().width/2;
            nombreProvincia.attr({
                x: nuevaPosTextoX,
                fillOpacity: 0
            });
            provinciaElegida.attr({transform:"t15 15"});
            provinciaElegida.animate({
                fill: "gold",
                stroke: "black"
            },500,mina.easein, function () {
                nombreProvincia.animate({
                    transform:"s4 4",
                    fillOpacity: 1
                },1000,mina.elastic);
                provinciaElegida.animate({transform:transformacion},1000,mina.elastic, function() {
                    var posGraficoX = provinciaElegida.getBBox().x+provinciaElegida.getBBox().width/2;
                    var posGraficoY = provinciaElegida.getBBox().y+provinciaElegida.getBBox().height/2;
                    for (var i=0; i<resultadosDistrito.length; i++) {
                        if (i == 0) {
                            nombresPartidos[i] = canvas.text(posGraficoX + 400,posGraficoY - 200,resultadosDistrito[i].partido+": "+resultadosDistrito[i].porcentaje+"%");
                        } else {
                            nombresPartidos[i] = canvas.text(posGraficoX + 400,nombresPartidos[i-1].getBBox().y+100,resultadosDistrito[i].partido+": "+resultadosDistrito[i].porcentaje+"%");
                        }
                    }
                    for (i=0; i<nombresPartidos.length; i++) {
                        g.append(nombresPartidos[i]);
                        nombresPartidos[i].attr({transform: "t0 -200",fillOpacity:0,textAnchor:"left",fill:colores[i]});
                    }
                    animarTexto(nombresPartidos,0);
                    grafico = new Graficador(canvas,[resultadosDistrito[0].porcentaje,resultadosDistrito[1].porcentaje,resultadosDistrito[2].porcentaje,resultadosDistrito[3].porcentaje],250,posGraficoX,posGraficoY,colores);
                    grafico.appendTo(g);
                });
            });
        });
    };

    var canvas = Snap($contenedor[0]);
    var provincias, provinciaSeleccionada, provinciaElegida, porcentajeDeConversion, cajaVisibleMapa, grafico, nombreProvincia;
    var nombresPartidos = [];
    var g = canvas.group();

    Snap.load("Argentina_politico.svg", function(fragmento) {
        g.append(fragmento);
        cajaVisibleMapa = canvas.select("[id=\"mapa\"]");
        provincias = g.select("#provincias");
        var listaProvincias = provincias.selectAll("[id^=\"AR\"]");
        listaProvincias.forEach(function(provincia) {
            provincia.click(function() {
                mostrarDatosProvincia(provincia);
            });
        });
        dimensionar();
    });

});