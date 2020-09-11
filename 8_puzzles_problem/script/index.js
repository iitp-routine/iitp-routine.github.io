
const PUZZLE_SIZE= 3 ;// (nXn-1)-puzzle will be created; e.g. for n=3, 8-puzzle...

var data_matrix= [];

var tile_size= null;
var tile_starting_pos= {x:null, y:null};
var game_started= false;

var stored_moves= [];
var currently_storing= false;


let game_container= document.getElementById("game_container");


function get_tile_position_for_position_index(position_index) {
    return {
        x: (tile_starting_pos.x+(position_index.x*tile_size)),
        y: (tile_starting_pos.y+(position_index.y*tile_size)),
    }
}

function get_current_pos_from_id(id) {
    for(let i=0; i<data_matrix.length; i++) {
        let tile= data_matrix[i];
        if(tile.id == id) {
            return {
                x: tile.current_pos.x,
                y: tile.current_pos.y,
            };
        }
    }
    console.error("something happend... couldnot find tile from id "+id);
    return null;
}

function get_tile_id_from_current_pos(position_index) {

    for(let i=0; i<data_matrix.length; i++) {
        let tile= data_matrix[i];
        if(tile.current_pos.x== position_index.x && tile.current_pos.y== position_index.y) {
            return tile.id;
        }
    }
    console.error("something happend... couldnot find tile from pos ",position_index);
    return null;
}

function get_index_from_xy(position_index) {
    return position_index.x*PUZZLE_SIZE+position_index.y;
}

function create_tile(tile_id, content, extra_classname) {

    let tile= document.createElement("div");
    tile.className= extra_classname?`game_tile ${extra_classname}`: `game_tile`;
    tile.style.position= "fixed";
    tile.style.width= tile_size+"px";
    tile.style.height=tile_size+"px";
    tile.id= "tile_"+tile_id;
    tile.innerText= content==undefined?"":content;
    game_container.appendChild(tile);
    return tile;
}

function set_global_sizes() {
    let w= window.innerWidth>window.innerHeight?window.innerHeight:window.innerWidth;
    tile_size= w/(2*PUZZLE_SIZE);
    tile_starting_pos.x= parseInt((window.innerWidth - (tile_size*PUZZLE_SIZE))/2);
    tile_starting_pos.y= game_container.getBoundingClientRect().y+20;
}

function create_data_matrix() {
    for(let k=0; k<(PUZZLE_SIZE*PUZZLE_SIZE)-1; k++) {
        let i= parseInt(k/PUZZLE_SIZE);
        let j= k%PUZZLE_SIZE;
        data_matrix.push({
            id: i*PUZZLE_SIZE+j,
            original_pos: {x:j, y:i},
            current_pos: {x:j, y:i},
            tile: create_tile(i*PUZZLE_SIZE+j, i*PUZZLE_SIZE+j, "non_empty_tile"), // +1 (i*PUZZLE_SIZE+j+1) for starting from 1
            type:"tile",
        })
    }
    data_matrix.push({
        id: PUZZLE_SIZE*PUZZLE_SIZE-1,
        original_pos: {x:PUZZLE_SIZE-1, y:PUZZLE_SIZE-1},
        current_pos: {x:PUZZLE_SIZE-1, y:PUZZLE_SIZE-1},
        tile: create_tile(PUZZLE_SIZE*PUZZLE_SIZE-1, "", "empty_tile"),
        type:"blank",
    });
}

function show_wining_animation() {
    setTimeout(() => {
        console.log("\n\nWINING_MOVE_PLAYED\n\n");
    }, 500);
}

function render() {
    data_matrix.forEach(box => {
        let render_position= get_tile_position_for_position_index(box.current_pos);
        box.tile.style.top= render_position.y+"px";
        box.tile.style.left= render_position.x+"px";
    })


    if(game_started && cheak_win()) {
        show_wining_animation();
    }
}

function store_move(move) {
    stored_moves.push(move)
}

function replay_stored_moves(delay_between_moves_ms) {
    delay_between_moves_ms= delay_between_moves_ms>=0?delay_between_moves_ms:300;
    setTimeout(() => {
        let move= stored_moves.pop();
        switch (move) {
            case "up":
                move_tile_up();
                break;
            case "down":
                move_tile_down();
                break;
            case "left":
                move_tile_left();
                break;
            case "right":
                move_tile_right();
                break;
            default:
                console.error("no/weird content in stored moves -...", "stored_moves-> ");
                console.log(stored_moves);
                console.warn("currently_storing Switch is turned "+currently_storing+"...");
                return;
        }
        stored_moves.length? replay_stored_moves(delay_between_moves_ms): console.log("Done replaying...");
    }, delay_between_moves_ms);
}

function play_moves_from_array(moves_array, delay_between_moves_ms) {
    delay_between_moves_ms= delay_between_moves_ms>=0?delay_between_moves_ms:300;
    setTimeout(() => {
        let move= moves_array.shift();

        if(move == "up") {
            move_tile_up();
        } else if(move == "down") {
            move_tile_down();
        } else if(move == "left") {
            move_tile_left();
        } else if(move == "right") {
            move_tile_right();
        } else {
            console.log("weird value in move_arr");
        }
        moves_array.length? play_moves_from_array(moves_array, delay_between_moves_ms): console.log("Done replaying...");
    }, delay_between_moves_ms);
}

function move_tile_up(tile_id) {
    tile_id= tile_id>-1?tile_id:PUZZLE_SIZE*PUZZLE_SIZE-1;
    let cur_tile_pos= get_current_pos_from_id(tile_id);
    let top_tile_pos= {
        x: cur_tile_pos.x,
        y: cur_tile_pos.y-1,
    };

    if(top_tile_pos.y<0) {
        return -1;
    };
    let top_tile_index= get_tile_id_from_current_pos(top_tile_pos);

    data_matrix[tile_id].current_pos.y= top_tile_pos.y;
    data_matrix[top_tile_index].current_pos.y= cur_tile_pos.y;

    render();

}

function move_tile_down(tile_id) {
    tile_id= tile_id>-1?tile_id:PUZZLE_SIZE*PUZZLE_SIZE-1;
    let cur_tile_pos= get_current_pos_from_id(tile_id);
    let bottom_tile_pos= {
        x: cur_tile_pos.x,
        y: cur_tile_pos.y+1,
    };

    if(bottom_tile_pos.y>=PUZZLE_SIZE) {
        return -1;
    };
    let down_tile_index= get_tile_id_from_current_pos(bottom_tile_pos);

    data_matrix[tile_id].current_pos.y= bottom_tile_pos.y;
    data_matrix[down_tile_index].current_pos.y= cur_tile_pos.y;

    render();
}

function move_tile_left(tile_id) {
    tile_id= tile_id>-1?tile_id:PUZZLE_SIZE*PUZZLE_SIZE-1;
    let cur_tile_pos= get_current_pos_from_id(tile_id);
    let left_tile_pos= {
        x: cur_tile_pos.x-1,
        y: cur_tile_pos.y,
    };

    if(left_tile_pos.x<0) {
        return -1;
    };
    let left_tile_index= get_tile_id_from_current_pos(left_tile_pos);
    
    data_matrix[tile_id].current_pos.x= left_tile_pos.x;
    data_matrix[left_tile_index].current_pos.x= cur_tile_pos.x;

    render();
}

function move_tile_right(tile_id) {
    tile_id= tile_id>-1?tile_id:PUZZLE_SIZE*PUZZLE_SIZE-1;
    let cur_tile_pos= get_current_pos_from_id(tile_id);
    let right_tile_pos= {
        x: cur_tile_pos.x+1,
        y: cur_tile_pos.y,
    };

    if(right_tile_pos.x>=PUZZLE_SIZE) {
        return -1;
    };
    let right_tile_index= get_tile_id_from_current_pos(right_tile_pos);
    
    data_matrix[tile_id].current_pos.x= right_tile_pos.x;
    data_matrix[right_tile_index].current_pos.x= cur_tile_pos.x;

    render();
}

function get_neighbour_blank_tile_direction(tile_id) {
    let cur_tile_pos= get_current_pos_from_id(tile_id);
    let black_tile_pos= get_current_pos_from_id(PUZZLE_SIZE*PUZZLE_SIZE-1); // blank tile id;

    if(cur_tile_pos.x == black_tile_pos.x) {
        if(cur_tile_pos.y== black_tile_pos.y-1) {
            return "down";
        }
        else if(cur_tile_pos.y== black_tile_pos.y+1) {
            return "up";
        }
    }
    else if(cur_tile_pos.y == black_tile_pos.y) {
        if(cur_tile_pos.x== black_tile_pos.x-1) {
            return "right";
        }
        else if(cur_tile_pos.x== black_tile_pos.x+1) {
            return "left";
        }
    }
    return undefined;
}

function enable_listeners() {
    game_container.addEventListener("click", e => {
        // console.log(e.target);
        let id= e.target.id.split('_');
        if(id[0] != "tile") {
            return;
        }
        let clicked_tile_id= parseInt(id[1]);

        let neighbour_blank= get_neighbour_blank_tile_direction(clicked_tile_id);
        switch(neighbour_blank) {
            case "up":
                move_tile_up(clicked_tile_id);
                break;
            case "down":
                move_tile_down(clicked_tile_id);
                break;
            case "left":
                move_tile_left(clicked_tile_id);
                break;
            case "right":
                move_tile_right(clicked_tile_id);
                break;
            default:
                // console.log(clicked_tile_id+1+ " -currently un-movable");
                break;
        }

        if(currently_storing && ["up", "down", "left", "right"].indexOf(neighbour_blank)>-1) {
            store_move(neighbour_blank);
        }

    }, false);

    window.addEventListener("resize", () => {
        set_global_sizes();
        let tiles= document.getElementsByClassName("game_tile");
        for(let i=0; i<tiles.length; i++) {
            let tile= tiles[i];
            tile.style.width= tile_size+"px";
            tile.style.height=tile_size+"px";
        }
        render();
    }, false);
}

function cheak_win() {
    for(let i=0; i<PUZZLE_SIZE*PUZZLE_SIZE-1; i++) {
        let tile= data_matrix[i];
        if(tile.current_pos.x == tile.original_pos.x && tile.current_pos.y == tile.original_pos.y) {
            continue;
        } else {
            return false;
        }
    }
    return true;
}

function randomize(iteration_count) {
    iteration_count= iteration_count?iteration_count:52;

    for(let i=0; i<iteration_count; i++) {
        let r= Math.random();
        if(r<.25) {
            move_tile_up();
        } else if(r<.5) {
            move_tile_down();
        } else if(r<.75) {
            move_tile_right();
        } else {
            move_tile_left();
        }
    }

    // game_started= true;
}

function set_from_input(input) {
    let ip_arr= input.split(",");
    let puzzle= [];
    if(ip_arr.length != PUZZLE_SIZE*PUZZLE_SIZE) {
        return console.error("Cannot set to IP ",input, "\nplease input array elements seperate by comma");
    }
    ip_arr.forEach((e, index) => {
        e= parseInt(e.trim());
        data_matrix[e].current_pos.x= index%PUZZLE_SIZE;
        data_matrix[e].current_pos.y= parseInt(index/PUZZLE_SIZE);
    })
    render();
}


function set_button_listeners() {
    let run_btn= document.getElementById("run_btn");

    run_btn.addEventListener("click", () => {

        let algo= document.getElementById("algo").value;
        let heuristics= document.getElementById("heuristics").value;

        console.log(heuristics);

        if(algo== "bf") {
            run_best_first_with(heuristics);
        } else {
            alert("didnot implemented yet...");
        }


    },false);

    let randomize_btn= document.getElementById("randomize_btn");

    randomize_btn.addEventListener("click", () => {

        if(currently_solving) {
            return;
        }

        randomize();

    }, false)
}


function init() {
    set_global_sizes();
    create_data_matrix();
    enable_listeners();
    render();

    set_button_listeners();
}

init();