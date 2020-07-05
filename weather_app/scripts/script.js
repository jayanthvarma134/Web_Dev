//<this wont work>
// let Location = document.getElementById("location");


// let items= Array('Bengaluru', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad', 'Shimla')
let items= Array('Bengaluru', 'Chennai');
var item = items[Math.floor(Math.random() * items.length)];
var celsius;
var fahrenheit;

window.addEventListener('load', ()=> {
	const api = 'https://api.weatherapi.com/v1/current.json?key=22c08d9dbf8f458db3753108200407&q='+item;
	const data =get_data(api);
	data_then= data.then(res=>{
		//Location.innerHTMl =res.location.name; wont work
		document.getElementById("location").innerHTML = res.location.name+', '+res.location.region+', '+res.location.country;
		document.querySelector(".temp_degree").innerHTML = res.current.temp_c;
		document.getElementById("weather_description").innerHTML = res.current.condition.text;
		document.getElementById("wind").innerHTML = res.current.wind_kph+'kph';
		document.getElementById("precipitation").innerHTML= res.current.precip_mm+'mm';
		document.getElementById("humidity").innerHTML = res.current.humidity;
		document.getElementById("temp_logo").src = 'https:'+res.current.condition.icon;

		celsius=    res.current.temp_c;
		fahrenheit= res.current.temp_f;
	});
});


// for the visitors location:(map marker)
document.getElementById("map_marker_button").onclick =function(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
			longits=position.coords.longitude;
			latits = position.coords.latitude;

			const api = 'https://api.weatherapi.com/v1/current.json?key=22c08d9dbf8f458db3753108200407&q='+latits+','+longits;
			const data= get_data(api);
			data_then= data.then(res=>{
				document.getElementById("location").innerHTML = res.location.name+', '+res.location.region+', '+res.location.country;
				document.querySelector(".temp_degree").innerHTML = res.current.temp_c;
				document.getElementById("weather_description").innerHTML = res.current.condition.text;
				document.getElementById("wind").innerHTML = res.current.wind_kph+'kph';
				document.getElementById("precipitation").innerHTML= res.current.precip_mm+'mm';
				document.getElementById("humidity").innerHTML = res.current.humidity;
				document.getElementById("temp_logo").src = 'https:'+res.current.condition.icon;

				celsius=    res.current.temp_c;
				fahrenheit= res.current.temp_f;
			});
		});
	}
	else{
		console.log("some error popped up");
	}
};

//for the search location
document.getElementById("search_button").onclick =function(){
	let SearchQuery = document.getElementById("search_query").value;
	const api = 'https://api.weatherapi.com/v1/current.json?key=22c08d9dbf8f458db3753108200407&q='+SearchQuery;
	const data =get_data(api);
	data_then= data.then(res=>{
		document.getElementById("location").innerHTML = res.location.name+', '+res.location.region+', '+res.location.country;
		document.querySelector(".temp_degree").innerHTML = res.current.temp_c;
		document.getElementById("weather_description").innerHTML = res.current.condition.text;
		document.getElementById("wind").innerHTML = res.current.wind_kph+'kph';
		document.getElementById("precipitation").innerHTML= res.current.precip_mm+'mm';
		document.getElementById("humidity").innerHTML = res.current.humidity;
		document.getElementById("temp_logo").src = 'https:'+res.current.condition.icon;

		celsius=    res.current.temp_c;
		fahrenheit= res.current.temp_f;
	});
};


//to change the measure of temperature
document.getElementById("celsius_button").onclick= function(){
	document.getElementById("fahrenheit_button").style.color = "blue";
	document.getElementById("celsius_button").style.color = "black"
	document.querySelector(".temp_degree").innerHTML = celsius;
}

document.getElementById("fahrenheit_button").onclick= function(){
	document.getElementById("celsius_button").style.color = "blue";
	document.getElementById("fahrenheit_button").style.color = "black";
	document.querySelector(".temp_degree").innerHTML = fahrenheit;
}

//the godly async fetch fuction.
async function get_data(api){
	const response= await fetch(api);
	const data = await response.json();
	return data;
}