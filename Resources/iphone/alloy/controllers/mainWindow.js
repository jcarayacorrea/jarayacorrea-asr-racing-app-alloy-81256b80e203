function Controller() {
    function createSection() {
        var section = Ti.UI.createTableViewSection();
        var customView = Ti.UI.createView({
            height: "auto",
            backgroundColor: "#EEE",
            backgroundGradient: {
                type: "linear",
                startPoint: {
                    x: "0%",
                    y: "0%"
                },
                endPoint: {
                    x: "0%",
                    y: "100%"
                },
                colors: [ {
                    color: "#EEE",
                    offset: 0
                }, {
                    color: "#CCC",
                    offset: 1
                } ]
            }
        });
        var customLabel = Ti.UI.createLabel({
            top: 8,
            bottom: 8,
            left: 10,
            right: 10,
            height: "auto",
            text: "HEADER",
            font: {
                fontSize: 12,
                fontWeight: "bold"
            },
            color: "#666666"
        });
        customView.add(customLabel);
        section.headerView = customView;
        for (var j = 0; slideMenu.length > j; j++) {
            var args = slideMenu[j];
            section.add(Alloy.createController("menurow", args).getView());
        }
        return section;
    }
    function rowSelect(e) {
        var currentView = $.ds.contentview.getChildren();
        if (currentView.id != e.row.customView) {
            $.ds.contentview.removeAllChildren();
            currentView = Alloy.createController(e.row.customView).getView();
            $.ds.contentview.add(currentView);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "mainWindow";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.win = Ti.UI.createWindow({
        id: "win"
    });
    $.__views.win && $.addTopLevelView($.__views.win);
    $.__views.ds = Alloy.createWidget("ds.slideMenu", "widget", {
        id: "ds",
        __parentSymbol: $.__views.win
    });
    $.__views.ds.setParent($.__views.win);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var leftData = [];
    var slideMenu = Alloy.Globals.slideMenu;
    exports.loadView = function(view) {
        var currentView = Alloy.createController(view).getView();
        Alloy.Globals.contentView = $.ds.contentview;
        $.ds.contentview.add(currentView);
    };
    leftData[0] = createSection();
    $.ds.leftTableView.data = leftData;
    exports.loadView("searchWindow");
    $.ds.leftTableView.addEventListener("click", function(e) {
        rowSelect(e);
        $.ds.toggleLeftSlider();
    });
    var storedRowTitle = null;
    $.ds.leftTableView.addEventListener("touchstart", function(e) {
        storedRowTitle = e.row.customTitle;
        storedRowTitle.color = "#FFF";
    });
    $.ds.leftTableView.addEventListener("touchend", function() {
        storedRowTitle.color = "#666";
    });
    $.ds.leftTableView.addEventListener("scroll", function() {
        null != storedRowTitle && (storedRowTitle.color = "#666");
    });
    Ti.App.addEventListener("sliderToggled", function(e) {
        "right" == e.direction ? $.ds.leftMenu.zIndex = 2 : "left" == e.direction && ($.ds.leftMenu.zIndex = 1);
    });
    $.win.addEventListener("android:back", function() {});
    "iphone" === Ti.Platform.osname ? $.win.open({
        transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
    }) : $.win.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;