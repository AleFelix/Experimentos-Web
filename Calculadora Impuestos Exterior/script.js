//Imagen del loader en base64

var imagenLoader = "data:image;base64,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";

//Libreria de JSONP

(function(e, t) {
  var n = function(t, n, r, i) {
    t = t || "";
    n = n || {};
    r = r || "";
    i = i || function() {};
    var s = function(e) {
      var t = [];
      for (var n in e) {
        if (e.hasOwnProperty(n)) {
          t.push(n)
        }
      }
      return t
    };
    if (typeof n == "object") {
      var o = "";
      var u = s(n);
      for (var a = 0; a < u.length; a++) {
        o += encodeURIComponent(u[a]) + "=" + encodeURIComponent(n[u[a]]);
        if (a != u.length - 1) {
          o += "&"
        }
      }
      t += "?" + o
    } else if (typeof n == "function") {
      r = n;
      i = r
    }
    if (typeof r == "function") {
      i = r;
      r = "callback"
    }
    if (!Date.now) {
      Date.now = function() {
        return (new Date).getTime()
      }
    }
    var f = Date.now();
    var l = "jsonp" + Math.round(f + Math.random() * 1000001);
    e[l] = function(t) {
      i(t);
      delete e[l]
    };
    if (t.indexOf("?") === -1) {
      t = t + "?"
    } else {
      t = t + "&"
    }
    var c = document.createElement("script");
    c.setAttribute("src", t + r + "=" + l);
    document.getElementsByTagName("head")[0].appendChild(c)
  };
  e.JSONP = n
})(window);

//Fin de la libreria

var pesosImpuesto = 0;
var pesosEnvio = 0;

function calcularCosto() {
  document.getElementById("respuesta").innerHTML = "<img src='" + imagenLoader + "'>";
  if (typeof timerDeJsonp !== 'undefined') {
    clearTimeout(timerDeJsonp);
  }
  timerDeJsonp = setTimeout(function() {
    alert("No se obtuvo respuesta del servidor, probablemente se deba a que no se puede realizar la descarga de la cotizacion del dolar.");
  }, 6000);
  JSONP('https://currency-api.appspot.com/api/USD/ARS.jsonp', {
    amount: '1.00'
  }, function(response) {
    if (response.success) {
      clearTimeout(timerDeJsonp);
      var cotizacion = response.rate;
      var dolares = document.getElementById("inputDolares").value;
      var envio = document.getElementById("inputEnvio").value;
      if (envio != "") {
        pesosEnvio = Number((parseFloat(envio.replace(',', '.')) * parseFloat(cotizacion)).toFixed(2));
      }
      if (dolares != "") {
        var pesos = Number((parseFloat(dolares.replace(',', '.')) * parseFloat(cotizacion)).toFixed(2));
        if (document.getElementById("checkFranquicia").checked) {
          var franquicia = Number(25 * parseFloat(cotizacion)).toFixed(2);
          if (envio != "") {
            pesosImpuesto = Number((pesos + pesosEnvio - franquicia).toFixed(2));
          } else {
            pesosImpuesto = Number((pesos - franquicia).toFixed(2));
          }
          if (pesosImpuesto < 0) {
            pesosImpuesto = 0;
          }
        } else {
          if (envio != "") {
             pesosImpuesto = pesos + pesosEnvio;
          } else {
            pesosImpuesto = pesos;
          }
        }
        var mitad = Number((pesosImpuesto / 2).toFixed(2));
        cotizacion = Number(parseFloat(cotizacion).toFixed(2));
        document.getElementById("cotizacion").innerHTML = "<h2>US$ 1 = AR$ " + cotizacion + "</h2>";
        if (envio != "") {
          document.getElementById("respuesta").innerHTML = "<table><tr><td>Costo del Producto</td><td>AR$ " + pesos + "</td></tr><tr><td>Impuesto de Aduana (50%)</td><td>AR$ " + mitad + "</td></tr><tr><td>Costo del Producto con Impuesto</td><td>AR$ " + (pesos + mitad).toFixed(2) + "</td></tr><tr><td>Costo del Env&iacute;o</td><td>AR$ " + pesosEnvio + "</td></tr><tr><td>Costo Total</td><td>AR$ " + (pesos + mitad + pesosEnvio).toFixed(2) + "</td></tr></table>";
        } else {
          document.getElementById("respuesta").innerHTML = "<table><tr><td>Costo del Producto</td><td>AR$ " + pesos + "</td></tr><tr><td>Impuesto de Aduana (50%)</td><td>AR$ " + mitad + "</td></tr><tr><td>Costo Total</td><td>AR$ " + (pesos + mitad).toFixed(2) + "</td></tr></table>";
        }
      } else {
        document.getElementById("respuesta").innerHTML = "<p>No se ingreso ning&uacute;n precio</p>";
      }
    } else {
      clearTimeout(timerDeJsonp);
      document.getElementById("cotizacion").innerHTML = "<h2>No se pudo obtener la cotizaci&oacute;n</h2>";
    }
  });
}