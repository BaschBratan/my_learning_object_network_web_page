$(document).ready(function(){
	/*--- Sticky Header ---*/ 
	/*window.onscroll = function() {scrollFunction()};
	var header = document.getElementById("myHeader");
	var sticky = header.offsetTop;
	function scrollFunction() {
		if (window.pageYOffset >= sticky) {
			header.classList.add("sticky");
		} else {
			header.classList.remove("sticky");
		}
	}*/ 
	
	if (typeof(Storage) !== "undefined") {
		if(localStorage.getItem("path") === null){
			var path = JSON.stringify([]);
			localStorage["path"] = path;
			console.log("initiated Storage");
		}
	} else {
        alert("Your browser doesn't support localStorage!");
    }
});
