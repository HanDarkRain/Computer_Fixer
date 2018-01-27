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

$()