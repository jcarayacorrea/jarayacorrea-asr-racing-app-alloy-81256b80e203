function Controller() {
    function creaTabla() {
        var data = [];
        var responseData = this.responseText;
        var resp = JSON.parse(responseData);
        var motor = resp.motor;
        var trans = resp.transmision;
        var colores = resp.colores;
        seccionInfo(resp, data);
        seccionMotor(motor, data);
        seccionTransmision(trans, data);
        seccionColores(colores, data);
        $.tblAdvance.sections = data;
        $.tblAdvance.setVisible(true);
    }
    function seccionMotor(motor, data) {
        var section = Ti.UI.createTableViewSection({
            headerTitle: "Motor"
        });
        var infoJSON = [ {
            title: "T. Compresor:",
            info: motor.compresor
        }, {
            title: "Cilindros:",
            info: motor.cilindrada
        }, {
            title: "Válvulas:",
            info: motor.valvulas
        }, {
            title: "Torsión:",
            info: motor.torsion
        }, {
            title: "Tamaño",
            info: motor.tamano
        }, {
            title: "Compresión:",
            info: motor.radioCompresion
        }, {
            title: "T.Combustible:",
            info: motor.bencina
        }, {
            title: "Desplazamiento:",
            info: motor.desplazamiento
        }, {
            title: "Configuración:",
            info: motor.config
        }, {
            title: "Cab. de Fuerza:",
            info: motor.caballoDeFuerza
        } ];
        for (var i = 0; infoJSON.length > i; i++) {
            var rowConfig = Ti.UI.createTableViewRow({
                hasChild: true,
                className: "recipe-row",
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                width: "100%",
                height: 20
            });
            var columnaConfig = Ti.UI.createView({
                left: 0,
                height: 20,
                top: 0
            });
            var columnaDesc = Ti.UI.createView({
                left: "50%",
                height: 20,
                top: 0
            });
            var labelConfig = Ti.UI.createLabel({
                text: infoJSON[i].title,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: "10%",
                color: "black"
            });
            var labeldescConfig = Ti.UI.createLabel({
                text: infoJSON[i].info,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: 0,
                color: "black"
            });
            columnaConfig.add(labelConfig);
            columnaDesc.add(labeldescConfig);
            rowConfig.add(columnaConfig);
            rowConfig.add(columnaDesc);
            section.add(rowConfig);
        }
        data.push(section);
    }
    function seccionInfo(resp, data) {
        var section = Ti.UI.createTableViewSection({
            headerTitle: "Información"
        });
        var infoJSON = [ {
            title: "Nº Puertas:",
            info: resp.numPuertas
        }, {
            title: "Ruedas Motrices:",
            info: resp.ruedasMotrices
        } ];
        for (var i = 0; infoJSON.length > i; i++) {
            var rowConfig = Ti.UI.createTableViewRow({
                hasChild: true,
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                width: "100%",
                height: 20
            });
            var columnaConfig = Ti.UI.createView({
                left: 0,
                height: 20,
                top: 0
            });
            var columnaDesc = Ti.UI.createView({
                left: "50%",
                height: 20,
                top: 0
            });
            var labelConfig = Ti.UI.createLabel({
                text: infoJSON[i].title,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: "10%",
                color: "black"
            });
            var labeldescConfig = Ti.UI.createLabel({
                text: infoJSON[i].info,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: 0,
                color: "black"
            });
            columnaConfig.add(labelConfig);
            columnaDesc.add(labeldescConfig);
            rowConfig.add(columnaConfig);
            rowConfig.add(columnaDesc);
            section.add(rowConfig);
        }
        data.push(section);
    }
    function seccionTransmision(trans, data) {
        var section = Ti.UI.createTableViewSection({
            headerTitle: "Transmisión"
        });
        var infoJSON = [ {
            title: "Velocidades:",
            info: trans.velocidades
        }, {
            title: "T.Transmisión:",
            info: trans.tipoTransmision
        } ];
        for (var i = 0; infoJSON.length > i; i++) {
            var rowConfig = Ti.UI.createTableViewRow({
                hasChild: true,
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                width: "100%",
                height: 20
            });
            var columnaConfig = Ti.UI.createView({
                left: 0,
                height: 20,
                top: 0
            });
            var columnaDesc = Ti.UI.createView({
                left: "50%",
                height: 20,
                top: 0
            });
            var labelConfig = Ti.UI.createLabel({
                text: infoJSON[i].title,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: "10%",
                color: "black"
            });
            var labeldescConfig = Ti.UI.createLabel({
                text: infoJSON[i].info,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: 0,
                color: "black"
            });
            columnaConfig.add(labelConfig);
            columnaDesc.add(labeldescConfig);
            rowConfig.add(columnaConfig);
            rowConfig.add(columnaDesc);
            section.add(rowConfig);
        }
        data.push(section);
    }
    function seccionColores(colores, data) {
        var section = Ti.UI.createTableViewSection({
            headerTitle: "Colores"
        });
        for (var i = 0; colores.length > i; i++) {
            var rowConfig = Ti.UI.createTableViewRow({
                hasChild: true,
                backgroundColor: "white",
                backgroundSelectedColor: "yellow",
                backgroundFocusedColor: "blue",
                width: "100%",
                height: 20
            });
            var columnaConfig = Ti.UI.createView({
                left: 0,
                height: 20,
                top: 0
            });
            var columnaDesc = Ti.UI.createView({
                left: "80%",
                height: 20,
                top: 0,
                backgroundColor: "#" + colores[i].color
            });
            var labelConfig = Ti.UI.createLabel({
                text: colores[i].nombre,
                font: {
                    fontSize: 14,
                    fontWeight: "bold"
                },
                left: "10%",
                color: "black"
            });
            columnaConfig.add(labelConfig);
            rowConfig.add(columnaConfig);
            rowConfig.add(columnaDesc);
            section.add(rowConfig);
        }
        data.push(section);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "detailWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.detailView = Ti.UI.createView({
        id: "detailView"
    });
    $.__views.detailView && $.addTopLevelView($.__views.detailView);
    $.__views.barView = Ti.UI.createView({
        top: 0,
        height: 50,
        id: "barView"
    });
    $.__views.detailView.add($.__views.barView);
    $.__views.btnBasic = Ti.UI.createButton({
        left: "25%",
        title: "Basica",
        id: "btnBasic"
    });
    $.__views.barView.add($.__views.btnBasic);
    $.__views.btnAdvance = Ti.UI.createButton({
        left: "75%",
        title: "Detallada",
        id: "btnAdvance"
    });
    $.__views.barView.add($.__views.btnAdvance);
    $.__views.advView = Ti.UI.createView({
        top: 50,
        id: "advView"
    });
    $.__views.detailView.add($.__views.advView);
    $.__views.tblAdvance = Ti.UI.createTableView({
        top: 0,
        id: "tblAdvance"
    });
    $.__views.advView.add($.__views.tblAdvance);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var openshift = Alloy.CFG.openshift, restDetalle = Alloy.CFG.detalle, idAuto = Alloy.Globals.idAuto;
    var APIurl = openshift + restDetalle + idAuto;
    var request = Titanium.Network.createHTTPClient();
    request.open("GET", APIurl);
    request.send();
    request.onload = creaTabla;
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;