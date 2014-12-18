function Controller() {
    function changeView(view) {
        var conView = Alloy.Globals.contentView;
        var currentView = Alloy.createController(view).getView();
        conView.removeAllChildren();
        conView.add(currentView);
    }
    function searchMarca(e) {
        var openshift = Alloy.CFG.openshift, restMarcas = Alloy.CFG.marcas, texto = escape(e.value), APIurl = openshift + restMarcas + texto.toLowerCase();
        var request = Ti.Network.createHTTPClient();
        var request = Titanium.Network.createHTTPClient();
        request.open("GET", APIurl);
        request.send();
        request.onload = creaTabla;
        request.onerror = errorAlert;
    }
    function creaTabla() {
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var data = [];
        var marcas = resp.marcas;
        for (var i = 0; marcas.length > i; i++) {
            var row = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                selectedBackgroundColor: "yellow",
                backgroundFocusedColor: "blue",
                _marca: marcas[i]
            });
            var titleLabel = Ti.UI.createLabel({
                text: marcas[i],
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
        $.tblMarca.setData(data);
        $.tblMarca.setVisible(true);
    }
    function tblClick(e) {
        Alloy.Globals.marca = e.rowData._marca;
        changeView("modelWindow");
    }
    function errorAlert() {
        var dialog = Alloy.Globals.mensajeError;
        var showError = Ti.UI.createAlertDialog(dialog);
        showError.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "searchWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.searchView = Ti.UI.createView({
        top: 50,
        id: "searchView"
    });
    $.__views.searchView && $.addTopLevelView($.__views.searchView);
    $.__views.searchText = Ti.UI.createTextField({
        hintText: "Ingrese marca a buscar",
        top: 10,
        id: "searchText"
    });
    $.__views.searchView.add($.__views.searchText);
    searchMarca ? $.__views.searchText.addEventListener("return", searchMarca) : __defers["$.__views.searchText!return!searchMarca"] = true;
    $.__views.tblMarca = Ti.UI.createTableView({
        top: 50,
        id: "tblMarca"
    });
    $.__views.searchView.add($.__views.tblMarca);
    tblClick ? $.__views.tblMarca.addEventListener("click", tblClick) : __defers["$.__views.tblMarca!click!tblClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    __defers["$.__views.searchText!return!searchMarca"] && $.__views.searchText.addEventListener("return", searchMarca);
    __defers["$.__views.tblMarca!click!tblClick"] && $.__views.tblMarca.addEventListener("click", tblClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;