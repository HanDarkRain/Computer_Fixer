var myData = null;

function generateTable(name,data) {
	var html = `<div class="row transparent solutionList">`;
        
    html += `<div class="col-md-12 solutionListHead">${name}</div>`

	for (var i = 0; i < data.count; i++) {
        html += `<div class="col-md-10">${data.data[i].title}</div><div class="col-md-2">${data.data[i].date}</div>`;
	}
	html += `</div>`
	return html;
}

function loadData() {
	$.get("solutions.json", function(e) {
		myData = e;
		if (typeof e == "string") myData = JSON.parse(myData);
		var html = "";
		$.each(myData, function(key,value) {
			html += generateTable(key,value);
		})
		$("#solutionList").html(html);
		resize();
	});
}

loadData();
