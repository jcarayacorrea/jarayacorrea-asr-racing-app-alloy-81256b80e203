function Controller() {
    function creaTabla() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var tipos = resp.tipos;
        var data = [];
        for (var i = 0; tipos.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                _tipoAuto: tipos[i].categoria,
                _autoId: tipos[i].id
            });
            var titleLabel = Ti.UI.createLabel({
                text: tipos[i].categoria,
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
        $.tblTipos.setData(data);
        $.tblTipos.setVisible(true);
    }
    function tblClick(e) {
        Alloy.Globals.idAuto = e.rowData._autoId;
        changeView("detailWindow");
    }
    function changeView(view) {
        var conView = Alloy.Globals.contentView;
        var currentView = Alloy.createController(view).getView();
        conView.removeAllChildren();
        conView.add(currentView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tiposWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.tiposView = Ti.UI.createView({
        top: 50,
        id: "tiposView"
    });
    $.__views.tiposView && $.addTopLevelView($.__views.tiposView);
    $.__views.tiposLabel = Ti.UI.createLabel({
        text: "Seleccione Categoria",
        top: 10,
        id: "tiposLabel"
    });
    $.__views.tiposView.add($.__views.tiposLabel);
    $.__views.tblTipos = Ti.UI.createTableView({
        top: 40,
        id: "tblTipos"
    });
    $.__views.tiposView.add($.__views.tblTipos);
    tblClick ? $.__views.tblTipos.addEventListener("click", tblClick) : __defers["$.__views.tblTipos!click!tblClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var openshift = Alloy.CFG.openshift, restInfo = Alloy.CFG.info, marca = Alloy.Globals.marca, modelo = Alloy.Globals.modelo, annio = Alloy.Globals.anho, APIurl = openshift + restInfo + marca + "/" + modelo + "/" + annio;
    var request = Ti.Network.createHTTPClient();
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", APIurl);
    request.send();
    request.onload = creaTabla;
    __defers["$.__views.tblTipos!click!tblClick"] && $.__views.tblTipos.addEventListener("click", tblClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;