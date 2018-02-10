var myData = null;

function generateRow(data,date) {
	return `<div class="col-md-10"><span>${data}</span></div>
			<div class="col-md-2"><span>${date}</span></div>`;
}

function loadData() {
	$.get("data.json", function(e) {
		myData = e;
		if (typeof e == "string") myData = JSON.parse(myData);
		quickSolveHtml = "";
		newProblemsHtml = "";
		for (var i = 0 ; i < myData.count; i++){
			quickSolveHtml += generateRow(myData.content.quickSolve[i], myData.content.quickSolveDate[i]);
			newProblemsHtml += generateRow(myData.content.newProblems[i], myData.content.newProblemsDate[i]);
		}
		$("#quicksolution").html(quickSolveHtml);	
		$("#newproblems").html(newProblemsHtml);
		resize();
		});
}

loadData();
