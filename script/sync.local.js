"use strict";
function saveAllLocal() {
    chrome.storage.local.set({ "settings": exportAll(true) }, function () {
        console.log("Save successful, deleting legacy");
        localStorage.removeItem("filter-list");
    });
}
function loadLocalFilters(callback) {
    filters = { wild: {}, direct: {} };
    fixAll();
    var json = localStorage.getItem("filter-list");
    if (json != null) {
        console.log("Legacy settings found: localstorage[filter-list]");
        var list = JSON.parse(json);
        importAll(list);
        callback();
        return;
    }
    console.log("No legacy settings found");
    chrome.storage.local.get("settings", function (json) {
        importAll(json.settings);
        callback();
    });
}
