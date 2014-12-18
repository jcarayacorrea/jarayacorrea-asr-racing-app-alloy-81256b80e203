function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "nl.fokkezb.infiniteScroll/" + s : s.substring(0, index) + "/nl.fokkezb.infiniteScroll/" + s.substring(index + 1);
    return path;
}

module.exports = [ {
    isClass: true,
    priority: 10000.0002,
    key: "is",
    style: {
        top: "0dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE
    }
}, {
    isClass: true,
    priority: 10000.0003,
    key: "isCenter",
    style: {
        height: "50dp",
        bottom: "0dp"
    }
}, {
    isClass: true,
    priority: 10000.0004,
    key: "isIndicator",
    style: {
        style: Ti.UI.ActivityIndicatorStyle.DARK
    }
}, {
    isClass: true,
    priority: 10000.0006,
    key: "isText",
    style: {
        wordWrap: false,
        color: "#777",
        font: {
            fontSize: "13dp"
        }
    }
}, {
    isClass: true,
    priority: 10101.0005,
    key: "isIndicator",
    style: {
        style: Ti.UI.iPhone.ActivityIndicatorStyle.DARK
    }
} ];