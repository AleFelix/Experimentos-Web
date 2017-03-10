$(document).ready(function () {

    var anchoVentana = $(window).width();
    var altoVentana = $(window).height();

    var lienzo = document.getElementById("lienzo");

    lienzo.style.width = anchoVentana + "px";
    lienzo.style.height = altoVentana + "px";
    lienzo.style.backgroundColor = "gold";

    $(window).resize(function() {
        anchoVentana = $(window).width();
        altoVentana = $(window).height();
        lienzo.style.width = anchoVentana + "px";
        lienzo.style.height = altoVentana + "px";
    });

    var canvas = Snap(lienzo);

    var circulos = [];

    var mover = function (dirX, dirY, circulo, repeticion) {
        if (dirX != 0 && dirY != 0) {
            if (repeticion == 100) {
                if (dirX == Math.abs(dirX)) {
                    dirX = dirX - 1;
                } else {
                    dirX = dirX + 1;
                }
                if (dirY == Math.abs(dirY)) {
                    dirY = dirY - 1;
                } else {
                    dirY = dirY + 1;
                }
                repeticion = 0;
            }
            repeticion++;
            var cx = circulo.attr("cx");
            var cy = circulo.attr("cy");
            var radio = circulo.attr("r");
            if (cx >= (parseInt(lienzo.style.width) - parseInt(radio))) {
                dirX = -Math.abs(dirX);
            } else if (cx <= parseInt(radio)) {
                dirX = Math.abs(dirX);
            }
            if (cy >= (parseInt(lienzo.style.height) - parseInt(radio))) {
                dirY = -Math.abs(dirY);
            } else if (cy <= parseInt(radio)) {
                dirY = Math.abs(dirY);
            }
            circulo.animate({
                cx: "+=" + dirX,
                cy: "+=" + dirY
            }, 1, function () {
                mover(dirX, dirY, circulo, repeticion)
            });
        }
    };

    var dividir = function (circulo, velocidad) {
        var cx = circulo.attr("cx");
        var cy = circulo.attr("cy");
        var radio = circulo.attr("r");
        circulos.splice(circulos.indexOf(circulo), 1);
        circulo.remove();
        var circuloHijo1 = canvas.circle(cx, cy, radio / 2).attr({
            fill: "brown"
        });
        var circuloHijo2 = canvas.circle(cx, cy, radio / 2).attr({
            fill: "brown"
        });
        circuloHijo1.click(function () {
            dividir(circuloHijo1, velocidad * 2);
        });
        circuloHijo2.click(function () {
            dividir(circuloHijo2, velocidad * 2);
        });
        circulos.push(circuloHijo1);
        circulos.push(circuloHijo2);
        mover(velocidad * 2, -velocidad * 2, circuloHijo1, 0, false);
        mover(-velocidad * 2, velocidad * 2, circuloHijo2, 0, false);
        console.log(circulos);
    };

    var circulo1 = canvas.circle(anchoVentana / 2, altoVentana / 2, 200).attr({
        fill: "brown"
    });

    circulos.push(circulo1);

    circulo1.click(function () {
        dividir(circulo1, 2);
    });

});