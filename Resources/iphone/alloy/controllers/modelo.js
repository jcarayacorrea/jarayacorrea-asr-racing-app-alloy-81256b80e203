function Controller() {
    function modeloOpen() {
        var marca = Alloy.CFG.selMarca;
        var openshift = Alloy.CFG.openshift, restModelo = Alloy.CFG.modelo, APIurl = openshift + restModelo + marca;
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
                _modelo: resp[i].name
            });
            var titleLabel = Ti.UI.createLabel({
                text: resp[i].name,
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
        $.tablaModelo.setData(data);
        $.tablaModelo.setVisible(true);
    }
    function tablaModeloClick(e) {
        Alloy.CFG.selModelo = e.rowData._modelo;
        Alloy.createController("annio").getView().open();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modelo";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.modelo = Ti.UI.createView({
        id: "modelo"
    });
    $.__views.modelo && $.addTopLevelView($.__views.modelo);
    modeloOpen ? $.__views.modelo.addEventListener("focus", modeloOpen) : __defers["$.__views.modelo!focus!modeloOpen"] = true;
    $.__views.labelDesc = Ti.UI.createLabel({
        top: 20,
        id: "labelDesc",
        text: "Seleccione Modelo"
    });
    $.__views.modelo.add($.__views.labelDesc);
    $.__views.tablaModelo = Ti.UI.createTableView({
        top: 50,
        id: "tablaModelo",
        visible: "false"
    });
    $.__views.modelo.add($.__views.tablaModelo);
    tablaModeloClick ? $.__views.tablaModelo.addEventListener("click", tablaModeloClick) : __defers["$.__views.tablaModelo!click!tablaModeloClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.modelo!focus!modeloOpen"] && $.__views.modelo.addEventListener("focus", modeloOpen);
    __defers["$.__views.tablaModelo!click!tablaModeloClick"] && $.__views.tablaModelo.addEventListener("click", tablaModeloClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;