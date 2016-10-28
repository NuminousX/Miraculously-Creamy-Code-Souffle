$(document).ready(function(){

	$("#search").keyup(function(){
		let data = {
			search: $("#search").val()
		}
		$("#browser").empty();
		console.log(data)
		$.post("/form2", data, function(data, status){
			console.log(data)
			for (var i = 0; i < data.length; i++) {
				$("#browser").append("<option value=" + data[i].firstname + ">")

			}
		})
	})
})