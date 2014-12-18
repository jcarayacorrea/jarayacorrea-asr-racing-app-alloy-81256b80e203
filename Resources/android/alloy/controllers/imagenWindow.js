function Controller() {
    function iniciaImagen() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        imagenes = resp.imagenes;
        $.imagen.image = fotoMedia + imagenes[imagenAct];
    }
    function backClick() {
        imagenAct--;
        0 > imagenAct && (imagenAct = imagenes.length - 1);
        $.imagen.image = fotoMedia + imagenes[imagenAct];
    }
    function leftClick() {
        imagenAct++;
        imagenAct > imagenes.length - 1 && (imagenAct = 0);
        $.imagen.image = fotoMedia + imagenes[imagenAct];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "imagenWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.imagenView = Ti.UI.createView({
        top: 0,
        height: "70%",
        id: "imagenView"
    });
    $.__views.imagenView && $.addTopLevelView($.__views.imagenView);
    $.__views.fotoView = Ti.UI.createView({
        id: "fotoView"
    });
    $.__views.imagenView.add($.__views.fotoView);
    $.__views.imagen = Ti.UI.createImageView({
        top: 10,
        id: "imagen"
    });
    $.__views.fotoView.add($.__views.imagen);
    $.__views.botonView = Ti.UI.createView({
        top: "70%",
        id: "botonView"
    });
    $.__views.imagenView.add($.__views.botonView);
    $.__views.btnBack = Ti.UI.createButton({
        top: "10%",
        left: "30%",
        title: "Back",
        id: "btnBack"
    });
    $.__views.botonView.add($.__views.btnBack);
    backClick ? $.__views.btnBack.addEventListener("click", backClick) : __defers["$.__views.btnBack!click!backClick"] = true;
    $.__views.btnFwd = Ti.UI.createButton({
        top: "10%",
        right: "30%",
        title: "Next",
        id: "btnFwd"
    });
    $.__views.botonView.add($.__views.btnFwd);
    leftClick ? $.__views.btnFwd.addEventListener("click", leftClick) : __defers["$.__views.btnFwd!click!leftClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var openshift = Alloy.CFG.openshift, restImagen = Alloy.CFG.imagen, fotoMedia = Alloy.CFG.fotos, idAuto = Alloy.Globals.idAuto;
    var imagenAct = 0;
    var imagenes;
    var APIurl = openshift + restImagen + idAuto;
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", APIurl);
    request.send();
    request.onload = iniciaImagen;
    __defers["$.__views.btnBack!click!backClick"] && $.__views.btnBack.addEventListener("click", backClick);
    __defers["$.__views.btnFwd!click!leftClick"] && $.__views.btnFwd.addEventListener("click", leftClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;