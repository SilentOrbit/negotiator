"use strict";
var filterFromToSeparator = " > ";
function exportJSON() {
    return JSON.stringify(exportAll(false), null, "\t");
}
function exportAll(includeEtag) {
    var list = {};
    list.settings = JSON.parse(JSON.stringify(settings));
    for (var a in actions)
        list[syncActionPrefix + a] = JSON.parse(JSON.stringify(actions[a]));
    var fd = filters.direct;
    for (var f in fd) {
        exportAllTo(f, fd[f], list);
    }
    var fw = filters.wild;
    for (var f in fw) {
        exportAllTo("*" + f, fw[f], list);
    }
    if (includeEtag !== true) {
        for (var k in list) {
            var i = list[k];
            delete i.etag;
            delete i.version;
            delete i.sync;
        }
    }
    return list;
}
function exportAllTo(from, filters, list) {
    if (filters == null)
        return;
    var fd = filters.direct;
    for (var f in fd) {
        var filter = fd[f];
        if (filter == null)
            continue;
        list[from + filterFromToSeparator + f] = generateExportItem(filter);
    }
    var fw = filters.wild;
    for (var f in fw) {
        var filter = fw[f];
        if (filter == null)
            continue;
        list[from + filterFromToSeparator + "*" + f] = generateExportItem(filter);
    }
}
function generateExportItem(f) {
    var i = {
        filter: f.filter
    };
    if (f.etag)
        i.etag = f.etag;
    if (f.sync)
        i.sync = f.sync;
    if (f.track)
        i.track = true;
    return i;
}
