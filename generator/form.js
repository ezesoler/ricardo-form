window.onload = function(){
	let form = document.querySelector("#{name}");
	form.addEventListener("submit",function(e){
		e.preventDefault();
		let formData = new FormData(e.target);
		document.querySelector("#btnSend").disabled = true;
		let respond = document.querySelector("#messages");
		respond.style.display = "block";
		respond.innerHTML = "Enviando<span></span>";

		let options = {
		    method: 'POST',
		    mode: 'cors',
		    body: formData
		}

		let req = new Request(e.target.action, options);
		
		fetch(req)
		.then(function(response) {
				return response.json();
			})
			.then(function(data) {
				if(data.status == "ok"){
					e.target.reset();
				}else{
					document.querySelector("#btnSend").disabled = false;
				}
				respond.innerHTML = data.msg;
			});
	})
}

