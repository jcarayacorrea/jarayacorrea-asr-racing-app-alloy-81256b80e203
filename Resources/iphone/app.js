var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

Alloy.Globals.isMenuOpen = false;

Alloy.Globals.marca = "";

Alloy.Globals.modelo = "";

Alloy.Globals.anho = "";

Alloy.Globals.idAuto = "";

Alloy.Globals.slideMenu = [ {
    title: "Buscar Auto",
    customView: "searchWindow"
}, {
    title: "Categoria",
    customView: "tiposWindow"
}, {
    title: "Caracteristicas",
    customView: "detailWindow"
}, {
    title: "Imagenes",
    customView: "imagenWindow"
} ];

Alloy.Globals.mensajeError = {
    title: "Error",
    buttonNames: "OK",
    message: "No se pudo conectar con el servidor"
};

Alloy.createController("index");