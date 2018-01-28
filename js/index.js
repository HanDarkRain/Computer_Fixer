$("#showmodal").on("click", function() {
    $(".mymodal").addClass("show");
});

$(".mymodal .closs").on("click", function() {
    $(".mymodal").removeClass("show");
});

// $(".nav li [num='1']")

$(".nav li a.error").on("click",function() {
	$(".capital").html("Error!");
	$(".content").html("You did invalid input.");
	$(".mymodal").addClass("show");
	// $("xxxxxxx").on("click",function(){xxxx});
})


var diagramLabels = ["System problems", 
					"Common software problems", 
					"Hardware problems", 
					"external device problems"];

var diagramData = [0.10, 0.30, 0.44, 0.16];

var paramsdoughnut = {
	type: "doughnut",
	data: {
       labels: diagramLabels,
        datasets: [{
            label: 'Distribution of problems',
            data: diagramData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
	}
}

var paramsbar = {
	type: "horizontalBar",
	data: {
       labels: diagramLabels,
        datasets: [{
            label: 'Distribution of problems',
            data: diagramData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
        }]
	}
}

var doughnutDiagram = new Chart("doughnut_diagram",paramsdoughnut);

var barDiagram = new Chart("bar_diagram",paramsbar)

var webHeight = document.body.scrollHeight - window.screen.availHeight * 0.9;
$(window).on("scroll", function(e) {
    var percentage = $(window).scrollTop() / webHeight * 100;
    $(".sidenav-progress").css("top", percentage+"%");
})