

let sticky_notes= [];

function create_note() {

	let div = document.createElement("div");
	div.style.width = "200px";
	div.style.height = "200px";
	div.className= 'sticky_note';


	let cross_btn= document.createElement('a');
	cross_btn.className= 'sticky_note_cross';
	cross_btn.innerHTML= "X";

	div.appendChild(cross_btn);


	div.innerHTML += "Hello";



	document.getElementById("notes").appendChild(div);

}

create_note()