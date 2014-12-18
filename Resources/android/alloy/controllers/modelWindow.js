function Controller() {
    function changeView(view) {
        var conView = Alloy.Globals.contentView;
        var currentView = Alloy.createController(view).getView();
        conView.removeAllChildren();
        conView.add(currentView);
    }
    function creaTabla() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var data = [];
        var modelo = resp.modelos;
        for (var i = 0; modelo.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                _modelo: modelo[i]
            });
            var titleLabel = Ti.UI.createLabel({
                text: modelo[i],
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
        $.tblModelo.setData(data);
        $.tblModelo.setVisible(true);
    }
    function tblClick(e) {
        Alloy.Globals.modelo = e.rowData._modelo;
        changeView("anhoWindow");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "modelWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.modelView = Ti.UI.createView({
        top: 50,
        id: "modelView"
    });
    $.__views.modelView && $.addTopLevelView($.__views.modelView);
    $.__views.modelLabel = Ti.UI.createLabel({
        text: "Seleccione Modelo",
        top: 10,
        id: "modelLabel"
    });
    $.__views.modelView.add($.__views.modelLabel);
    $.__views.tblModelo = Ti.UI.createTableView({
        top: 40,
        id: "tblModelo"
    });
    $.__views.modelView.add($.__views.tblModelo);
    tblClick ? $.__views.tblModelo.addEventListener("click", tblClick) : __defers["$.__views.tblModelo!click!tblClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var openshift = Alloy.CFG.openshift, restModelo = Alloy.CFG.modelo, marca = Alloy.Globals.marca, APIurl = openshift + restModelo + marca;
    var request = Ti.Network.createHTTPClient();
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", APIurl);
    request.send();
    request.onload = creaTabla;
    __defers["$.__views.tblModelo!click!tblClick"] && $.__views.tblModelo.addEventListener("click", tblClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;