﻿
window.addEventListener("load", function(){
	document.querySelector("#exportJSON").addEventListener("click", exportJSON);
	document.querySelector("#importJSON").addEventListener("click", importJSON);
}, false);

//Filter Import/Export
function exportJSON()
{
	var textJson = document.querySelector("#exportedJSON");
	textJson.value = b.exportJson();
}

function importJSON()
{
	var textJson = document.querySelector("#exportedJSON");
	b.importJson(textJson.value);
	b.saveAll();
}