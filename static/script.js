$(document).ready(function(){

	let lastTime = 0

	$("#search").keyup(function(event){
		event.preventDefault()
		let data = {
			search: $("#search").val()
		}
		let currentTime = Date.now() 

		console.log(currentTime)

		$("#browser").empty();
		//currrent time moet 300 groter zijn dan lasttime

		if ((currentTime - lastTime) > 10000) {

			$.post("/form2", data, function(data, status){
				console.log(data)
				for (var i = 0; i < data.length; i++) {
					$("#browser").append("<option value=" + data[i].firstname + ">")

				}
				lastTime= Date.now()
				console.log(lastTime)
			})
		}

		
		
		
	})
})


// currenttime is each time i press a key into #search
// lasttime is the last time the user made a request