// $("#showmodal").on("click", function() {
//     $(".mymodal").addClass("show");
// });

$(".mymodal .closs").on("click", function() {
    $(".mymodal").removeClass("show");
    $("#formSubmit")[0].disabled = false;
    $("#formSubmit").html("send");
});

// // $(".nav li [num='1']")

// $(".nav li a.error").on("click",function() {
// 	$(".capital").html("Error!");
// 	$(".content").html("You did invalid input.");
// 	$(".mymodal").addClass("show");
// 	// $("xxxxxxx").on("click",function(){xxxx});
// })

$("#formSubmit").on("click", function(){

    $("#formSubmit")[0].disabled = true;
    $("#formSubmit").html("processing");

    let content = $("#formContent").val();
    let name = $("#formName").val();
    let from = $("#formFrom").val();
    $.post("https://handongrun0930.000webhostapp.com/sendmail.php", {
        "content": content,
        "name": name,
        "from": from
    }, 
    function(data){
        $(".capital").html("Success!");
        $(".content").html("Successfully send the infomation to the host! the infomation will be checked later.");
        $(".mymodal").addClass("show");
    });
});

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

var systemTop = 0,
    softwareTop = 0,
    hardwareTop = 0,
    externalTop = 0;

var doughnutDiagram = new Chart("doughnut_diagram",paramsdoughnut);

var barDiagram = new Chart("bar_diagram",paramsbar);

var webHeight = document.body.scrollHeight - window.screen.availHeight * 0.9;
$(window).on("scroll", function(e) {
    var percentage = $(window).scrollTop() / webHeight * 100;
    $(".sidenav-progress").css("top", percentage+"%");

    if (window.scrollY > externalTop) {
        $("#sidenav-text").html("\uf11c External");
    } else if (window.scrollY > hardwareTop) {
        $("#sidenav-text").html("\uf0a0 Hardware");
    } else if (window.scrollY > softwareTop) {
        $("#sidenav-text").html("\uf0c7 software");
    } else if (window.scrollY > systemTop) {
        $("#sidenav-text").html("\uf011 System");
    } else {
        $("#sidenav-text").html("You are here");
    }
});

$("#sidenav-text").on("click", function() {
    if (window.scrollY > externalTop) {
        navTo("External-0");
    } else if (window.scrollY > hardwareTop) {
        navTo("Hardware-0");
    } else if (window.scrollY > softwareTop) {
        navTo("Software-0");;
    } else if (window.scrollY > systemTop) {
        navTo("System-0");
    } else {
        $(".sidenav-text").html("You can search or choose a group");
    }
})

function resize() {
    webHeight = document.body.scrollHeight - window.screen.availHeight * 0.9;
    if ( $("#monitor").offset().top > $("#adjustor").offset().top ) {
        $("#adjustor").css("height", $("#monitor").offset().top - $("#adjustor").offset().top + "px");
    }

    try {
        systemTop = $("#System-0").offset().top - 300;
        softwareTop = $("#Software-0").offset().top - 300;
        hardwareTop = $("#Hardware-0").offset().top - 300;
        externalTop = $("#External-0").offset().top - 300;
    } catch (e) {}
}

$(window).on("resize", function() {
    resize();
    NavTo("scene" + currentScene);
});

function navTo(id) {
    $("body").animate({scrollTop:$("#" + id).offset().top - 100}, 600);
}

function addListener() {
    $(".listButton").on("click", function(e) {
        let target = e.target.nextElementSibling.nextElementSibling;
        if ($(target).hasClass("show")) {
            return;
        }
        let h = $(target).height();
        $(target).css("height","0px");
        console.log(target);
        $(target).addClass("show");
        $(target).animate({"height": h}, 200, function() {
            setTimeout(function(){    
                $(target).css("height","");
            },100);
            resize();
        });
    });
}

isNaving = null;
function NavTo(id) {
    let targetX = $("#" + id).offset().left;
    if (isNaving != null) {
        clearInterval(isNaving);
        isNaving = null
    }
    isNaving = setInterval(function() {
        if (targetX == window.scrollX) {
            clearInterval(isNaving);
            isNaving = null;
        }
        let scrollOffset = 0;
        if (targetX > window.scrollX) {
            scrollOffset = 10;
            if (targetX - window.scrollX < 10) scrollOffset = targetX - window.scrollX;
        } else {
            scrollOffset = -10;
            if (targetX -window.scrollX>10) scrollOffset = targetX - window.scrollX;
        }
        window.scrollTo(window.scrollX + scrollOffset, window.scrollY);
    }, 5);
    resize();
}

var currentScene = 1;
$("#toHome").on("click", function() {
    NavTo("scene1");
    $("#toHome").addClass("active");
    $("#toSolution").removeClass("active");
    $("#sidenav").removeClass("show")
    currentScene = 1;
})

$("#toSolution").on("click", function() {
    NavTo("scene2");
    $("#toHome").removeClass("active");
    $("#toSolution").addClass("active");
    $("#sidenav").addClass("show")
    currentScene = 2;
})

$("#toTop").on("click", function() {
    navTo("body");
})

