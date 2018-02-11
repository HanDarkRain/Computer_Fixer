var mySolutionsData = null;

function generateTable(name,data) {
	var html = `<div class="row transparent solutionList">`;
        
    html += `<div class="col-md-12 solutionListHead">${name}</div>`

	for (var i = 0; i < data.count; i++) {
        html += `<div id="${name}-${i}" class="col-md-10 listButton">${data.data[i].title}</div><div class="col-md-2">${data.data[i].date}</div>`;
        html += `<div class="col-md-12 listContent">${data.data[i].content}</div>`
	}
	html += `</div>`
	return html;
}

function loadSolutionsData() {
	$.get("solutions.json", function(e) {
		mySolutionsData = e;
		if (typeof e == "string") mySolutionsData = JSON.parse(mySolutionsData);
		var html = "";
		$.each(mySolutionsData, function(key,value) {
			html += generateTable(key,value);
		})
		$("#solutionList").html(html);
		addListener();
		resize();
	});
}

loadSolutionsData();

$("#searchInput").on("keyup", function(e) {
	let text = $("#searchInput").val().toLocaleLowerCase().trim();
	let items = searchForItems(text);
	let html = generateSearchBox(items);
	$("#searchBox").html(html);
	$(".searchItem").on("click", function(e) {
		let target = e.target;
		if (!$(target).hasClass("searchItem")) {
			target = target.parentElement;
		}
		console.log(target);
		let targetid = $(target).attr("data-toggle");
		$("#searchBox").html("");
		navTo(targetid);
		$(`#${targetid}`).click();
	});
});

function searchForItems(text) {
	if (mySolutionsData == null || text == "") return [];
	var result =[];

	$.each(mySolutionsData, function(key, data) {
		for (var i = 0; i < data.count; i++) {
			if (data.data[i].title.toLocaleLowerCase().indexOf(text) >= 0 ||
				data.data[i].content.toLocaleLowerCase().indexOf(text) >= 0) {
					result.push({
						id: key + "-" + i,
						title: data.data[i].title,
						content: data.data[i].content.split("<br>")[0]
					});
			}
		}
	});
	return result;
}

function generateSearchBox(items) {
	var html = ""
	for (var i=0; i < items.length; i++) {
		html += `<div data-toggle="${items[i].id}" class="searchItem">`;
		html += `<div class="searchHeader">【${items[i].id.split("-")[0]}】 ${items[i].title}</div>`
		html += `<div class="searchContent">${items[i].content}</div>`
		html += `</div>`
	}
	return html;
}