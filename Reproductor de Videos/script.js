$(document).ready(function () {

    var $contenedorVideo = $("video");

    var $listaVideos = $("#listaVideos");

    var clickListener = function (e) {
        var $clicked = $(e.target);
        if (!$clicked.is("p")) {
            $clicked = $clicked.find("p");
        }
        var fuente = $clicked.data("fuente");
        var tipo = $clicked.data("tipo");
        var descripcion = $clicked.text();
        console.log(descripcion);
        var etiquetaVideo = "<source src=\"" + fuente + "\" type=\"" + tipo + "\" data-descr=\"" + descripcion + "\"></video>";
        console.log(etiquetaVideo);
        var $videoElegido = $(etiquetaVideo);
        var $videoActual = $contenedorVideo.children().first();
        var fuenteActual = $videoActual.attr("src");
        var tipoActual = $videoActual.attr("type");
        var descripcionActual = $videoActual.data("descr");
        $contenedorVideo.children().first().remove();
        $contenedorVideo.append($videoElegido);
        var etiquetaListaVideoActual = "<p data-fuente=\"" + fuenteActual + "\" data-tipo=\"" + tipoActual + "\">" + descripcionActual + "</p>";
        $clicked.parent().remove();
        $listaVideos.find("ul").append("<li></li>");
        $listaVideos.find("li").last().append(etiquetaListaVideoActual);
        $contenedorVideo.load();
        $listaVideos.find("li").off("click");
        $listaVideos.find("li").click(clickListener);
    };

    $listaVideos.find("li").click(clickListener);

});