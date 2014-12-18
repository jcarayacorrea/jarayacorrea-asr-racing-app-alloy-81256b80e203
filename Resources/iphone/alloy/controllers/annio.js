function Controller() {
    function annioOpen() {
        var marca = Alloy.CFG.selMarca, modelo = Alloy.CFG.selModelo;
        var openshift = Alloy.CFG.openshift, restAnnio = Alloy.CFG.annio, APIurl = openshift + restAnnio + marca + "/" + modelo;
        var request = Ti.Network.createHTTPClient();
        var request = Titanium.Network.createHTTPClient();
        request.open("GET", APIurl);
        request.send();
        request.onload = creaTabla;
    }
    function creaTabla() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var data = [];
        for (var i = 0; resp.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                selectedBackgroundColor: "yellow",
                backgroundFocusedColor: "blue",
                _annio: resp[i].year
            });
            var titleLabel = Ti.UI.createLabel({
                text: resp[i].year,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: 50,
                top: 10,
                height: 20,
                width: 210,
                color: "black"
            });
            row.add(titleLabel);
            data.push(row);
        }
        $.tablaAnnio.setData(data);
        $.tablaAnnio.setVisible(true);
    }
    function tablaAnnioClick() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "annio";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.annio = Ti.UI.createWindow({
        id: "annio"
    });
    $.__views.annio && $.addTopLevelView($.__views.annio);
    annioOpen ? $.__views.annio.addEventListener("open", annioOpen) : __defers["$.__views.annio!open!annioOpen"] = true;
    $.__views.labelDesc = Ti.UI.createLabel({
        top: 20,
        id: "labelDesc",
        text: "Seleccione Año"
    });
    $.__views.annio.add($.__views.labelDesc);
    $.__views.tablaAnnio = Ti.UI.createTableView({
        top: 50,
        id: "tablaAnnio",
        src: "nl.fokkezb.infiniteScroll",
        visible: "false"
    });
    $.__views.annio.add($.__views.tablaAnnio);
    tablaAnnioClick ? $.__views.tablaAnnio.addEventListener("click", tablaAnnioClick) : __defers["$.__views.tablaAnnio!click!tablaAnnioClick"] = true;
    $.__views.__alloyId0 = Ti.UI.createView({
        o: "o",
        id: "__alloyId0"
    });
    $.__views.annio.add($.__views.__alloyId0);
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.annio!open!annioOpen"] && $.__views.annio.addEventListener("open", annioOpen);
    __defers["$.__views.tablaAnnio!click!tablaAnnioClick"] && $.__views.tablaAnnio.addEventListener("click", tablaAnnioClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;