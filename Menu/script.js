window.onload = function () {

    document.getElementsByTagName("html")[0].style.fontFamily = "arial, sans-serif";

    var Poligono = function (canvas, lados, radio, espaciadoX, espaciadoY, numRombo) {
        var puntos = [];
        var angulo = 2 * Math.PI / lados;
        var punto = 0;
        if (lados >= 3) {
            for (var i = 0; i < lados * 2; i = i + 2) {
                puntos[i] = radio * Math.sin(punto * angulo) + espaciadoX;
                puntos[i + 1] = -radio * Math.cos(punto * angulo) + espaciadoY;
                punto++;
            }
        }
        var polig = canvas.polygon(puntos).attr({
            stroke: "#000",
            fill: "#FFF"
        });
        if (numRombo != null) {
            polig.attr({
                "data-numRombo": numRombo
            });
        }
        polig.g = canvas.gradient("l(0, 0, 1, 1)rgb(255,0,0)-rgb(255,0,0)-rgb(255,0,0)-rgb(255,255,255)");
        return polig;
    };

    var rellenar = function (e) {
        var elemento = e.target;
        var numRombo = elemento.getAttribute("data-numRombo");
        if (numRombo != null) {
            rombos[numRombo - 1].g.stop();
            var posCursorX = e.clientX;
            var posCursorY = e.clientY;
            console.log("Cursor: " + posCursorX + " | " + posCursorY);
            var posElemento = elemento.getBoundingClientRect();
            console.log(posElemento.top, posElemento.right, posElemento.bottom, posElemento.left);
            rombos[numRombo - 1].g = canvas.gradient("l(0, 0, 1, 1)rgb(255,0,0)-rgb(255,0,0)-rgb(255,0,0)-rgb(255,255,255)");
            var x1, y1, x2, y2;
            var posMediaElementoX = posElemento.right - (posElemento.right - posElemento.left) / 2;
            var posMediaElementoY = posElemento.bottom - (posElemento.bottom - posElemento.top) / 2;
            console.log("MEDIOX: " + posMediaElementoX + " MEDIOY: " + posMediaElementoY);
            if (posCursorY <= posMediaElementoY) {
                if (posCursorX >= posMediaElementoX) {
                    x1 = 1;
                    y1 = 0;
                    x2 = 0;
                    y2 = 1;
                } else {
                    x1 = 0;
                    y1 = 0;
                    x2 = 1;
                    y2 = 1;
                }
            } else if (posCursorX >= posMediaElementoX) {
                x1 = 1;
                y1 = 1;
                x2 = 0;
                y2 = 0;
            } else {
                x1 = 0;
                y1 = 1;
                x2 = 1;
                y2 = 0;
            }
            console.log("X1: " + x1 + " Y1: " + y1 + " X2: " + x2 + " Y2: " + y2);
            rombos[numRombo - 1].attr({
                fill: rombos[numRombo - 1].g
            });
            rombos[numRombo - 1].g.attr({x1: x1, y1: y1, x2: x1, y2: y1});
            rombos[numRombo - 1].g.animate({x1: x1, y1: y1, x2: x2, y2: y2}, 150, function () {
                rombos[numRombo - 1].attr({
                    fill: "#F00"
                });
            });
        }
    };

    var vaciar = function (e) {
        var elemento = e.target;
        var numRombo = elemento.getAttribute("data-numRombo");
        if (numRombo != null) {
            rombos[numRombo - 1].g.stop();
            rombos[numRombo - 1].g = canvas.gradient("l(0, 0, 1, 1)rgb(255,255,255)-rgb(255,255,255)-rgb(255,255,255)-rgb(255,0,0)");
            var x1, y1, x2, y2;
            var posCursorX = e.clientX;
            var posCursorY = e.clientY;
            var posElemento = elemento.getBoundingClientRect();
            var posMediaElementoX = posElemento.right - (posElemento.right - posElemento.left) / 2;
            var posMediaElementoY = posElemento.bottom - (posElemento.bottom - posElemento.top) / 2;
            console.log("MEDIOX: " + posMediaElementoX + " MEDIOY: " + posMediaElementoY);
            if (posCursorY <= posMediaElementoY) {
                if (posCursorX >= posMediaElementoX) {
                    x1 = 0;
                    y1 = 1;
                    x2 = 1;
                    y2 = 0;
                } else {
                    x1 = 1;
                    y1 = 1;
                    x2 = 0;
                    y2 = 0;
                }
            } else if (posCursorX >= posMediaElementoX) {
                x1 = 0;
                y1 = 0;
                x2 = 1;
                y2 = 1;
            } else {
                x1 = 1;
                y1 = 0;
                x2 = 0;
                y2 = 1;
            }
            console.log("X1: " + x1 + " Y1: " + y1 + " X2: " + x2 + " Y2: " + y2);
            rombos[numRombo - 1].attr({
                fill: rombos[numRombo - 1].g
            });
            rombos[numRombo - 1].g.attr({x1: x1, y1: y1, x2: x1, y2: y1});
            rombos[numRombo - 1].g.animate({x1: x1, y1: y1, x2: x2, y2: y2}, 150, function () {
                rombos[numRombo - 1].attr({
                    fill: "#FFF"
                });
            });
        }
    };

    var canvas = Snap(800, 600);
    var rombo1 = new Poligono(canvas, 4, 80, 200, 100, 1);
    var texto1 = canvas.text(200,100,"Inicio");
    var rombo2 = new Poligono(canvas, 4, 80, 100, 200, 2);
    var texto2 = canvas.text(100,200,"Novedades");
    var rombo3 = new Poligono(canvas, 4, 80, 200, 300, 3);
    var texto3 = canvas.text(200,300,"Promociones");
    var rombo4 = new Poligono(canvas, 4, 100, 320, 200, null);
    var texto4 = canvas.text(320,200,"OFERTAS");
    var rombo5 = new Poligono(canvas, 4, 80, 440, 100, 4);
    var texto5 = canvas.text(440,100,"Usados");
    var rombo6 = new Poligono(canvas, 4, 80, 540, 200, 5);
    var texto6 = canvas.text(540,200,"Nuevos");
    var rombo7 = new Poligono(canvas, 4, 80, 440, 300, 6);
    var texto7 = canvas.text(440,300,"Rotos");
    var rombos = [rombo1, rombo2, rombo3, rombo5, rombo6, rombo7];
    var textos = [texto1, texto2, texto3, texto4, texto5, texto6, texto7];

    for (var t=0; t<textos.length; t++) {
        var ancho = textos[t].getBBox().width;
        var posX = textos[t].getBBox().x;
        var posY = textos[t].getBBox().y;
        var alto = textos[t].getBBox().height;
        textos[t].attr({
            pointerEvents: "none",
            x: posX - ancho / 2,
            y: posY + alto
        });
    }

    var poligonos = document.getElementsByTagName("polygon");
    for (var i = 0; i < poligonos.length; i++) {
        console.log(poligonos[i]);
        poligonos[i].addEventListener("mouseenter", function (e) {
            rellenar(e);
        });
        poligonos[i].addEventListener("mouseleave", function (e) {
            vaciar(e);
        });
    }

};