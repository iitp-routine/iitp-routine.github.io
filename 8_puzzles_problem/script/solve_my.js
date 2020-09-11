let total_visited_states= 0;
let currently_solving= false;

function convert_index_to_xy(index, size) {
	return {
		x: index%size,
		y: parseInt(index/size),
	}
}

function convert_xy_to_index(position, size) {
	return position.x + position.y*size;
}

function make_simple_puzzle_array() {
	let res= [];
	for(let i=0; i<PUZZLE_SIZE*PUZZLE_SIZE; i++) {
		let current_element= data_matrix[i].current_pos.x+ data_matrix[i].current_pos.y*PUZZLE_SIZE;
		res[current_element]= i;
	}
	return res;
}

function get_manhatan_distance(puzzle_arr, size) {
	let heuristic_distance= 0;
	for(let i=0; i<size*size-1; i++) {
		let current_pos= convert_index_to_xy(i, size);
		let original_pos= convert_index_to_xy(puzzle_arr[i], size);
		heuristic_distance+= Math.abs(current_pos.x- original_pos.x) + Math.abs(current_pos.y- original_pos.y);
	}
	return heuristic_distance;
}

function get_misplaced_tiles_number(puzzle_arr, size) {
	let heuristic_distance= 0
	for(let i=0; i<size*size-1; i++) {
		if(puzzle_arr[i]!= i) {
			heuristic_distance++;
		}
	}
	return heuristic_distance;
}

function set_to_this_simple_array(arr) {
	for(let i=0; i<PUZZLE_SIZE*PUZZLE_SIZE; i++) {
		data_matrix[arr[i]].current_pos= convert_index_to_xy(i, PUZZLE_SIZE);
	}
}

class old_state_history {
	constructor() {
		this.old_states= [];
	}

	add(state) {
		state= parseInt(state);
		this.old_states[state]= true;
		total_visited_states++;
	}

	has_seen(state) {
		state= parseInt(state);
		return this.old_states[state]?true:false;
	}
}

function move_blank(direction, puzzle_arr, size) {
	let new_arr= [];
	puzzle_arr.forEach(e => new_arr.push(e));
	switch(direction) {
		case "up":
			var current_blank_pos= convert_index_to_xy(puzzle_arr.indexOf(size*size-1), size);
			var new_blank_pos= {x: current_blank_pos.x, y:current_blank_pos.y-1,};
			if(new_blank_pos.y<0) return new_arr;
			var current_blank_index= puzzle_arr.indexOf(size*size-1);
			var new_blank_index= convert_xy_to_index(new_blank_pos, size);
			new_arr[current_blank_index]= new_arr[new_blank_index];
			new_arr[new_blank_index]= size*size-1;
			break;
		case "down":
			var current_blank_pos= convert_index_to_xy(puzzle_arr.indexOf(size*size-1), size);
			var new_blank_pos= {x: current_blank_pos.x, y:current_blank_pos.y+1,};
			if(new_blank_pos.y>=size) return new_arr;
			var current_blank_index= puzzle_arr.indexOf(size*size-1);
			var new_blank_index= convert_xy_to_index(new_blank_pos, size);
			new_arr[current_blank_index]= new_arr[new_blank_index];
			new_arr[new_blank_index]= size*size-1;
			break;
		case "left":
			var current_blank_pos= convert_index_to_xy(puzzle_arr.indexOf(size*size-1), size);
			var new_blank_pos= {x: current_blank_pos.x-1, y:current_blank_pos.y,};
			if(new_blank_pos.x<0) return new_arr;
			var current_blank_index= puzzle_arr.indexOf(size*size-1);
			var new_blank_index= convert_xy_to_index(new_blank_pos, size);
			new_arr[current_blank_index]= new_arr[new_blank_index];
			new_arr[new_blank_index]= size*size-1;
			break;
		case "right":
			var current_blank_pos= convert_index_to_xy(puzzle_arr.indexOf(size*size-1), size);
			var new_blank_pos= {x: current_blank_pos.x+1, y:current_blank_pos.y,};
			if(new_blank_pos.x>=size) return new_arr;
			var current_blank_index= puzzle_arr.indexOf(size*size-1);
			var new_blank_index= convert_xy_to_index(new_blank_pos, size);
			new_arr[current_blank_index]= new_arr[new_blank_index];
			new_arr[new_blank_index]= size*size-1;
			break;
		default:
			console.error("something went wrong... request to move ", direction);
	}

	return new_arr;
}

function is_valid_move(move, puzzle_arr, size) {
	let blank_index= puzzle_arr.indexOf(size*size-1);
	let blank_pos= convert_index_to_xy(blank_index, size);

	switch(move) {
		case "up":
			if(blank_pos.y==0)
				return false;
			break;
		case "down":
			if(blank_pos.y==size-1)
				return false;
			break;
		case "left":
			if(blank_pos.x==0)
				return false;
			break;
		case "right":
			if(blank_pos.x==size-1)
				return false;
			break;
		default:
			console.warn("  no move is not valid move...");
			return false;
	}
	return true;
}

function alrady_solved(puzzle_arr) {
	for(let i=0; i<puzzle_arr.length; i++) {
		if(i != puzzle_arr[i]) {
			return false;
		}
	}

	return true;
}



/*
class paritally_solved_puzzle {
	constructor(_puzzle_arr, _played_moves, _last_move) {

		console.log("\n\n\n-----");
		console.log(_puzzle_arr);
		console.log(_played_moves);
		console.log(_last_move);
		console.log("-----\n\n\n");
		this.puzzle_arr= [];
		for(let i=0; i<_puzzle_arr.length; i++) {
			this.puzzle_arr.push(_puzzle_arr[i]);
		}
		this.played_moves= [];
		for(let i=0;_played_moves && i<_played_moves.length; i++) {
			this.played_moves.push(_played_moves[i]);
		}
		if(_last_move) this.played_moves.push(_last_move);
		this.last_move= _last_move;
	}
}


function breath_first(heuristic_algorithm, puzzle_arr, size) {


	let moves= ["up", "down", "left", "right"];

	let puzzle_queue= [];
	puzzle_queue.push(new paritally_solved_puzzle(puzzle_arr, [], undefined));

	console.log("props_in_Q- ", puzzle_queue.length);

	while(puzzle_queue.length) {
		let current_problem= puzzle_queue.shift();

		if(alrady_solved(current_problem.puzzle_arr)) {
			console.log("solved");
			return current_problem.played_moves;
		}

		moves.forEach(move => {
			if(move == current_problem.last_move) return;

			console.log(move);
			console.log(current_problem.played_moves);
			puzzle_queue.push(new paritally_solved_puzzle(move_blank(move, current_problem.puzzle_arr, size)), current_problem.played_moves, move);
		})
	}

}
*/

class priority_queue {
	constructor(sort_function) {
		this.queue= [];
		this.sort_function= sort_function;
		this.is_sorted= false;
	}

	enque(item) {

		// if(this.length()>1000) {
		// 	throw new Error("too long");
		// }


		this.queue.push(item);
		this.is_sorted= false;
	}

	sort() {
		this.queue= this.queue.sort(this.sort_function);
	}

	deque() {
		if(!this.is_sorted) {
			this.sort();
			this.is_sorted= true;
		}

		return this.queue.shift();
	}

	length() {
		return this.queue.length;
	}

}

class puzzle_state {
	constructor(_puzzle_arr, size, _played_moves, _last_move, _heuristic_distance) {
		this.puzzle_arr= [];
		this.puzzle_array_as_string= "";
		for(let i=0; i<_puzzle_arr.length; i++) {
			this.puzzle_arr.push(_puzzle_arr[i]);
			this.puzzle_array_as_string+=_puzzle_arr[i];
		}
		this.played_moves= [];
		for(let i=0; i<_played_moves.length; i++) {
			this.played_moves.push(new String(_played_moves[i]));
		}
		if(_last_move) this.played_moves.push(new String(_last_move));
		this.last_move= new String(_last_move);

		this.heuristic_distance= _heuristic_distance?_heuristic_distance:0;
	}

	is_wining_state() {
		for(let i=0; i<this.puzzle_arr.length; i++) {
			if(this.puzzle_arr[i] != i)
				return false;
		}
		return true;
	}
}


function best_first(heuristic_distance_algo, puzzle_arr, size) {

	let moves= ["up", "left", "down", "right"];

	let initial_state= new puzzle_state(puzzle_arr, size, [], "", heuristic_distance_algo(puzzle_arr, size));

	let q= new priority_queue((a, b) => {
		return a.heuristic_distance-b.heuristic_distance;
	});

	let visit_history= new old_state_history();

	q.enque(initial_state);

	while(q.length) {
		let current_state= q.deque();


		if(visit_history.has_seen(current_state.puzzle_array_as_string)) {
			continue;
		}

		visit_history.add(current_state.puzzle_array_as_string);

		if(current_state.is_wining_state()) {
			console.log("\n\n--- WON ---\n\n");
			console.log(current_state);
			// console.log(current_state.played_moves);
			let moves_str= "";
			current_state.played_moves.forEach(e => moves_str+=e+', ');
			console.warn("\n", moves_str, "\n\n");
			console.log("\nTotoal_moves: ", current_state.played_moves.length);
			play_moves_from_array(current_state.played_moves);
			return;
		}

		console.log(q.length());

		moves.forEach((move, move_index) => {
			if(moves[(move_index+2)%4] == current_state.last_move) {
				return;
			}
			if(!is_valid_move(move, current_state.puzzle_arr, size)) {
				return;
			}

			let next_puzzle_array= move_blank(move, current_state.puzzle_arr, size);
			let new_state= new puzzle_state(next_puzzle_array, size, current_state.played_moves, move, heuristic_distance_algo(next_puzzle_array, size));
			q.enque(new_state);
		})
	}


}


function run_best_first_with(heuristic_algorithm_name) {

	currently_solving= true;

	try {
		if(heuristic_algorithm_name == "md") {
			best_first(get_manhatan_distance, make_simple_puzzle_array(), PUZZLE_SIZE);
		}
		else if(heuristic_algorithm_name == "mtc") {
			best_first(get_misplaced_tiles_number, make_simple_puzzle_array(), PUZZLE_SIZE);
		}
		else console.error("unkmown heuristics algo- ",heuristic_algorithm_name);
	}
	catch(e) {
		console.warn(e);
		console.log("\n\n\n___________________________\nDIDN'T Work...");
	}

	currently_solving= false;
}



function a_strics(heuristic_distance_algo, puzzle_arr, size) {



	let moves= ["up", "left", "down", "right"];

	let initial_state= new puzzle_state(puzzle_arr, size, [], "", 0+heuristic_distance_algo(puzzle_arr, size));

	let q= new priority_queue((a, b) => {
		return a.heuristic_distance-b.heuristic_distance;
	});

	let visit_history= new old_state_history();

	q.enque(initial_state);

	while(q.length) {
		let current_state= q.deque();


		if(visit_history.has_seen(current_state.puzzle_array_as_string)) {
			continue;
		}

		visit_history.add(current_state.puzzle_array_as_string);

		if(current_state.is_wining_state()) {
			console.log("\n\n--- WON ---\n\n");
			console.log(current_state);
			// console.log(current_state.played_moves);
			let moves_str= "";
			current_state.played_moves.forEach(e => moves_str+=e+', ');
			console.warn("\n", moves_str, "\n\n");
			console.log("\nTotoal_moves: ", current_state.played_moves.length);
			play_moves_from_array(current_state.played_moves);
			return;
		}

		console.log(q.length());

		moves.forEach((move, move_index) => {
			if(moves[(move_index+2)%4] == current_state.last_move) {
				return;
			}
			if(!is_valid_move(move, current_state.puzzle_arr, size)) {
				return;
			}

			let next_puzzle_array= move_blank(move, current_state.puzzle_arr, size);
			let goal_distance= heuristic_distance_algo(next_puzzle_array, size)+current_state.played_moves.length;
			let new_state= new puzzle_state(next_puzzle_array, size, current_state.played_moves, move, goal_distance);
			q.enque(new_state);
		})
	}


}


function run_a_strics_with(heuristic_algorithm_name) {

	currently_solving= true;

	try {
		if(heuristic_algorithm_name == "md") {
			a_strics(get_manhatan_distance, make_simple_puzzle_array(), PUZZLE_SIZE);
		}
		else if(heuristic_algorithm_name == "mtc") {
			a_strics(get_misplaced_tiles_number, make_simple_puzzle_array(), PUZZLE_SIZE);
		}
		else console.error("unkmown heuristics algo- ",heuristic_algorithm_name);
	}
	catch(e) {
		console.warn(e);
		console.log("\n\n\n___________________________\nDIDN'T Work...");
	}

	currently_solving= false;
}




function main() {

	// breath_first(undefined, make_simple_puzzle_array(), PUZZLE_SIZE);

	// best_first(get_misplaced_tiles_number, make_simple_puzzle_array(), 3);
	


	try{



		best_first(get_manhatan_distance, make_simple_puzzle_array(), 3);




	} catch(e){

		console.warn(e);
		console.log("\n\n\n___________________________\nDIDN'T Work...");
	}
}
