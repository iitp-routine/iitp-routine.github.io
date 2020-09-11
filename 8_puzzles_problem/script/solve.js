let total_calls= 0;

function convert_index_to_xy(index, size) {
	return {
		x: index%size,
		y: parseInt(index/size),
	}
}

function convert_xy_to_index(position, size) {
	return position.x + position.y*size;
}

function render_from_simple_puzzle(puzzle_arr) {
	for(let i=0; i<puzzle_arr.length; i++) {
		data_matrix[i].current_pos= convert_index_to_xy(puzzle_arr[i], PUZZLE_SIZE);
	}
	render();
}

function get_heuristic_distance(puzzle_arr, size) {
	let heuristic_distance= 0;
	for(let i=0; i<size*size-1; i++) {
		let current_pos= convert_index_to_xy(i, size);
		let original_pos= convert_index_to_xy(puzzle_arr[i], size);
		heuristic_distance+= Math.abs(current_pos.x- original_pos.x) + Math.abs(current_pos.y- original_pos.y);
	}
	return heuristic_distance;
}

function is_equals(puzzle_arr1, puzzle_arr2) {
	for(let i=0; i<puzzle_arr1.length; i++)
		if(puzzle_arr1[i]!= puzzle_arr2[i])
			return false;
	return true;
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

function alrady_solved(puzzle_arr) {
	for(let i=0; i<puzzle_arr.length; i++) {
		if(i != puzzle_arr[i]) {
			return false;
		}
	}

	return true;
}

function push_into_new_arr(old_arr, item){
	console.log(typeof old_arr);
	let res= [];
	old_arr.forEach(i => res.push(i));
	res.push(item);
	return res;
}


function solve_using_heuristic(size, puzzle_arr, steps_for_solving) {
	total_calls++;
	if(total_calls > 500) {
		return;
	}
	steps_for_solving= steps_for_solving?steps_for_solving:[];


	console.log(steps_for_solving)


	console.log("current- ",puzzle_arr);

	if(alrady_solved(puzzle_arr)) {
		console.log("\n\n-------SOLVED--------\n\n");
		console.log(steps_for_solving);
		return "solved";
	}

	let moves= ["up", "down", "left", "right"];

	let minimum_move=[];
	let minimum_heuristics= get_heuristic_distance(puzzle_arr, size);

	moves.forEach(move => {
		let new_arr= move_blank(move, puzzle_arr, size);
		let new_heurestics= get_heuristic_distance(new_arr, size);
		console.log(new_arr, "huristics = ", new_heurestics);

		let flag= true;
		new_arr.forEach((item, index) => {
			if(item != puzzle_arr[index]) {
				flag= false;
			}
		})
		if(flag) {
			// console.log("no move "+move);
			return;
		}

		if(new_heurestics == minimum_heuristics) {
			if(!is_equals(new_arr, puzzle_arr)) {
				minimum_move.push(move);
			}
		} else if(new_heurestics< minimum_heuristics) {
			minimum_move= [];
			minimum_move.push(move);
			minimum_heuristics= new_heurestics;
		}
	})

	console.log(minimum_move);
	// console.log("-----", move_blank(minimum_move[0], puzzle_arr, size))

	let solved= undefined;
	minimum_move.forEach(move => {
		
		if(!solved) {
			console.log("-0-0-0-0---", steps_for_solving);
			solved= solve_using_heuristic(size, move_blank(move, puzzle_arr, size), push_into_new_arr(steps_for_solving, move));
		}
	});


}


function make_simple_puzzle_array() {
	let res= [];
	for(let i=0; i<PUZZLE_SIZE*PUZZLE_SIZE; i++) {
		let current_element= data_matrix[i].current_pos.x+ data_matrix[i].current_pos.y*PUZZLE_SIZE;
		res[current_element]= i;
	}
	return res;
}



function doit() {

	let puzzle_arr= make_simple_puzzle_array();

	console.log("puzzle_arr- ", puzzle_arr)

	solve_using_heuristic(PUZZLE_SIZE, puzzle_arr, []);



}
