function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "com.mcongrove.slideMenu/" + s : s.substring(0, index) + "/com.mcongrove.slideMenu/" + s.substring(index + 1);
    return path;
}

function Controller() {
    function handleClick(_event) {
        "undefined" != typeof _event.index && $.setIndex(_event.index);
    }
    new (require("alloy/widget"))("com.mcongrove.slideMenu");
    this.__widgetId = "com.mcongrove.slideMenu";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.Wrapper = Ti.UI.createView({
        width: "200dp",
        top: "50dp",
        left: "-200dp",
        backgroundColor: "#000",
        heigth: 200,
        id: "Wrapper"
    });
    $.__views.Wrapper && $.addTopLevelView($.__views.Wrapper);
    $.__views.Nodes = Ti.UI.createTableView({
        top: "0dp",
        backgroundColor: "#111",
        separatorColor: "#222",
        separatorStyle: Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE,
        id: "Nodes"
    });
    $.__views.Wrapper.add($.__views.Nodes);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var nodes = [];
    var color;
    $.init = function(_params) {
        sections = [];
        nodes = [];
        color = "undefined" != typeof _params.color ? _params.color : null;
        for (var i = 0; _params.nodes.length > i; i++) {
            var tab = Ti.UI.createTableViewRow({
                id: _params.nodes[i].id,
                height: "47dp",
                backgroundcolor: "#111",
                backgroundSelectedColor: "#222",
                selectedBackgroundColor: "#222"
            });
            var label = Ti.UI.createLabel({
                text: _params.nodes[i].title,
                top: "0dp",
                left: "47dp",
                right: "13dp",
                height: "46dp",
                font: {
                    fontSize: "16dp",
                    fontFamily: "HelveticaNeue-Light"
                },
                color: "#FFF",
                touchEnabled: false
            });
            if (_params.nodes[i].image) {
                var icon = Ti.UI.createImageView({
                    image: _params.nodes[i].image,
                    width: "21dp",
                    height: "21dp",
                    top: "13dp",
                    left: "13dp",
                    touchEnabled: false,
                    preventDefaultImage: true
                });
                tab.add(icon);
            }
            tab.add(label);
            if (sections.length > 0) {
                sections[currentSection].add(tab);
                i + 1 !== _params.nodes.length ? _params.nodes[i + 1].menuHeader && $.Nodes.appendSection(sections[currentSection]) : $.Nodes.appendSection(sections[currentSection]);
            } else nodes.push(tab);
        }
        nodes.length > 0 && $.Nodes.setData(nodes);
        $.Nodes.removeEventListener("click", handleClick);
        $.Nodes.addEventListener("click", handleClick);
    };
    $.clear = function() {
        $.Nodes.setData([]);
        $.Nodes.removeAllChildren();
    };
    $.setIndex = function(_index) {
        $.Nodes.selectRow(_index);
    };
    true && parseInt(Ti.Platform.version.split(".")[0], 10) >= 7 && ($.Nodes.top = "20dp");
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;