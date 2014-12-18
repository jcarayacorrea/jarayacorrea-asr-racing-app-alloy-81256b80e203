function Controller() {
    function creaTabla() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var data = [];
        var annio = resp.Annio;
        for (var i = 0; annio.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                _annio: parseInt(annio[i])
            });
            var titleLabel = Ti.UI.createLabel({
                text: parseInt(annio[i]),
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
        $.tblAnho.setData(data);
        $.tblAnho.setVisible(true);
    }
    function tblClick(e) {
        Alloy.Globals.anho = e.rowData._annio;
        changeView("tiposWindow");
    }
    function changeView(view) {
        var conView = Alloy.Globals.contentView;
        var currentView = Alloy.createController(view).getView();
        conView.removeAllChildren();
        conView.add(currentView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "anhoWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.anhoView = Ti.UI.createView({
        id: "anhoView"
    });
    $.__views.anhoView && $.addTopLevelView($.__views.anhoView);
    $.__views.anhoLabel = Ti.UI.createLabel({
        text: "Seleccione Año",
        top: 10,
        id: "anhoLabel"
    });
    $.__views.anhoView.add($.__views.anhoLabel);
    $.__views.tblAnho = Ti.UI.createTableView({
        top: 40,
        id: "tblAnho"
    });
    $.__views.anhoView.add($.__views.tblAnho);
    tblClick ? $.__views.tblAnho.addEventListener("click", tblClick) : __defers["$.__views.tblAnho!click!tblClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var openshift = Alloy.CFG.openshift, restAnho = Alloy.CFG.annio, marca = Alloy.Globals.marca, modelo = Alloy.Globals.modelo, APIurl = openshift + restAnho + marca + "/" + modelo;
    var request = Ti.Network.createHTTPClient();
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", APIurl);
    request.send();
    request.onload = creaTabla;
    __defers["$.__views.tblAnho!click!tblClick"] && $.__views.tblAnho.addEventListener("click", tblClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;