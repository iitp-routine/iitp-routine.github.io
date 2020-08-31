

let selected_subjects= [];
let all_aviable_subjects= [];

let pallet_colors= ['#cfffe8', '#e9ffcf', '#ffdfc9', '#c7effc', '#c7cafc', '#ffc2df', '#ffbdf9', '#c3bdff', '#9effad', '#faff9e', 'ff9ca9', '#f292f7', '#89fa93', '#fcab8d', '#ff8c8c', '#849efa', '#b682fa', '#82fa9e', '#f78393', '#f5c47f'];

function add_available_subjects_to_selection(show_sub_name) {
    let available_subjects= [];
    for(let day in ROUTINE) {
        let todays_routine= ROUTINE[day];
        for(let current_hour in todays_routine) {
            let current_hour_subjects= todays_routine[current_hour];
            for(let i=0; i<current_hour_subjects.length; i++) {
                let subject_name= current_hour_subjects[i].split('+')[0];
                if(!available_subjects.includes(subject_name)) {
                    available_subjects.push(subject_name);
                }
            }
        }
    }

    available_subjects.sort((a, b) => a.localeCompare(b))

    let selection_area= document.getElementById("add_subject_selection");
    selection_area.innerHTML= "";

    var choose_option= document.createElement("option");
    choose_option.text= "Choose a Subject";
    choose_option.disabled= `disabled`;
    choose_option.selected= `selected`;
    selection_area.add(choose_option);

    available_subjects.forEach((subject_code) => {

        var option= document.createElement("option");
        if(show_sub_name && COURSE_NAMES[subject_code] ) {
            option.text= `${subject_code} - ${COURSE_NAMES[subject_code].name}`;
        } else {
            option.text= subject_code;
        }
        option.value= subject_code;
        selection_area.add(option);

    })
    return available_subjects;
}





function render_selected_subjects() {

    let selected_subjects_div= document.getElementById("selected_subjects");
    selected_subjects_div.innerHTML= "";

    selected_subjects.forEach((subject_code) => {
        let subject_div= document.createElement('span');
        subject_div.className= "selected_subjects";
        subject_div.innerText= subject_code;

        selected_subjects_div.appendChild(subject_div);

    })

}


function create_new_routine_array() {

    let routine_array= [];

    let days= ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    let times= ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6'];

    days.forEach(day => {
        let todays_routine= [];
        times.forEach(time => {
            let selected_subjects_this_hour= [];
            selected_subjects.forEach(subject_code => {
                let all_subjects_this_hour= ROUTINE[day][time];

                all_subjects_this_hour.forEach(subject_this_hour => {
                    let special_time_of_subject_code= subject_this_hour.split('+')[1];
                    if(special_time_of_subject_code) {
                        subject_this_hour= subject_this_hour.split('+')[0];
                    }
                    if(subject_code == subject_this_hour) {
                        if(special_time_of_subject_code) {
                            selected_subjects_this_hour.push(subject_code+'+'+special_time_of_subject_code);
                        } else {
                            selected_subjects_this_hour.push(subject_code);
                        }
                    }
                })
            });
            todays_routine.push(selected_subjects_this_hour);
        })
        routine_array.push(todays_routine)
    })

    return routine_array;

}



function render_new_routine(routine_array) {

    let days= ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let times= ['8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6'];

    let table_str= "";

    table_str+=`<tr><th></th>`;
    times.forEach(time => {
        table_str+= `<th> ${time}-${time}:55 </th>`;
    })
    table_str+= `</tr>`;

    for(let i=0; i<days.length; i++) {

        let this_line_str= "";
        let no_of_subjects_today= 0;

        this_line_str+=`<tr><th>${days[i]}</th>`;

        for(let j=0; j<times.length; j++) {
            let no_of_subs_this_hour= 0;
            let subjects_name_this_hour= "";
            
            let all_subjects_now= routine_array[i][j];
            let subject_code_this_hour="";
            let special_timing=undefined;
            all_subjects_now.forEach(subject_code => {
                no_of_subjects_today++;
                if(subject_code.split('+')[1]) {
                    special_timing= subject_code.split('+')[1];
                    subject_code= subject_code.split('+')[0]
                }
                if(no_of_subs_this_hour > 0) {
                    subjects_name_this_hour+=',';
                }
                subject_code_this_hour= subject_code;
                subjects_name_this_hour+=`&nbsp;${subject_code}&nbsp;`;
                no_of_subs_this_hour++;
            })

            if(no_of_subs_this_hour == 0) {
                this_line_str+= `<td class="sub"></td>`;
            } else if(special_timing) {
                this_line_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code_this_hour)} sub special_timing ${special_timing}">${subjects_name_this_hour}</td>`;
            } else if(no_of_subs_this_hour == 1) {
                this_line_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code_this_hour)} sub ">${subjects_name_this_hour}</td>`;
            } else {
                this_line_str+= `<td class="multiple_subjects sub">${subjects_name_this_hour}</td>`;
            }
            
        }
        this_line_str+='</tr>';

        if(days[i] == 'Sun' || days[i] == 'Sat') {
            if(no_of_subjects_today>0) {
                table_str+= this_line_str;
            }
        } else {
            table_str+= this_line_str;
        }
    }

    let routine_table_container= document.getElementById("routine_table_container");

    routine_table_container.innerHTML=`<table>${table_str}</table>`;


}


function render_routine_details() {
    let table_str= `<tr><th class="details_th">Subject Code</th><th class="details_th">Subject Name</th><th class="details_th">Teacher</th></tr>`;
    let total_subs_details_found= 0;
    selected_subjects.forEach((subject_code => {
        if(COURSE_NAMES[subject_code]) {
            total_subs_details_found++;

            let new_str= `<tr>`;
            new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_sub_code details_td">${subject_code}</td>`;

            if(COURSE_NAMES[subject_code].name) {
                new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_sub_name_${total_subs_details_found%2==0?"even":"odd"} details_td">${COURSE_NAMES[subject_code].name}</td>`;
            } else {
                new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_sub_name_${total_subs_details_found%2==0?"even":"odd"} details_td"></td>`;
            }

            if(COURSE_NAMES[subject_code].teacher_name) {
                if(COURSE_NAMES[subject_code].teacher_email) {
                    new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_teacher_name_${total_subs_details_found%2==0?"even":"odd"} details_td"><a class="teacher_mail" href="mailto:${COURSE_NAMES[subject_code].teacher_email}">${COURSE_NAMES[subject_code].teacher_name}</a></td>`;
                } else {
                    new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_teacher_name_${total_subs_details_found%2==0?"even":"odd"} details_td">${COURSE_NAMES[subject_code].teacher_name}</td>`;
                }
            } else {
                new_str+= `<td class="pallet_${selected_subjects.indexOf(subject_code)} details_teacher_name_${total_subs_details_found%2==0?"even":"odd"} details_td"></td>`;
            }
            
            new_str+= `</tr>`;

            table_str+= new_str;
        }
    }))

    let routine_details_container= document.getElementById("routine_details_container");

    if(total_subs_details_found) {
        routine_details_container.innerHTML=`<br /><div class="descript_title">Subject details</div><table class="details_table">${table_str}</table>`;
    } else {
        routine_details_container.innerHTML= "";
    }
}



function fix_color_for_special_timings() {
    let special_timing_components= document.getElementsByClassName('special_timing');
    for(let i=0; i<special_timing_components.length; i++) {
        let element= special_timing_components[i];
        let pallet_name= element.className.split(' ')[0];
        let special_time= element.className.split(' ')[3];
        let pallet_id= parseInt(pallet_name.split('_')[1]);

        if(special_time == '_0-5_') {
            element.style.background= `linear-gradient(to right, ${pallet_colors[pallet_id]} 48%, #777 50%, #dedede 51%)`
            element.style.textAlign= `left`;
        } else if(special_time == '_5-0_') {
            element.style.background= `linear-gradient(to right, #dedede 50%, #777 51%, ${pallet_colors[pallet_id]} 53%)`
            element.style.textAlign= `right`;
        }  
    }
}



function render_everything() {

    selected_subjects.sort((a, b) => a.localeCompare(b));

    render_selected_subjects();

    let routine_array= create_new_routine_array();
    render_new_routine(routine_array);

    render_routine_details();

    fix_color_for_special_timings();

}


document.getElementById("add_subject_selection").addEventListener('change', (e) => {
    // console.log(e.target.value);
    let subject_code= e.target.value;
    if(!selected_subjects.includes(subject_code)) {
        selected_subjects.push(subject_code);
    }

    add_subject_to_url(subject_code);

    render_everything();

})


document.addEventListener('click', (e)=> {
    if(e.target && e.target.className== 'selected_subjects'){
        let removed_index= selected_subjects.indexOf(e.target.innerText);
        selected_subjects.splice(removed_index, 1);
        remove_subject_from_url(e.target.innerText);
        render_everything();
    }
});


function add_subject_to_url(sub) {
    let subs_str= new URLSearchParams(window.location.search).get("subs");
    let subs_arr= [];
    if(subs_str) {
        subs_arr= subs_str.split('_');
    }
    if(subs_arr.indexOf(sub)>-1) {
        return;
    }
    subs_arr.push(sub);
    subs_arr.sort((a, b) => a.localeCompare(b));
    let new_url_subs= "";
    subs_arr.forEach(item => {
        new_url_subs+=`${item}_`;
    })
    new_url_subs= new_url_subs.slice(0, new_url_subs.length-1);

    let refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + `?subs=${new_url_subs}`;    
    window.history.pushState({ path: refresh }, '', refresh);
}

function remove_subject_from_url(sub) {
    let subs_str= new URLSearchParams(window.location.search).get("subs");
    let subs_arr= [];
    if(subs_str) {
        subs_arr= subs_str.split('_');
    }

    if(subs_arr.indexOf(sub)<0) {
        return;
    }
    
    subs_arr.splice(subs_arr.indexOf(sub), 1);
    subs_arr.sort((a, b) => a.localeCompare(b));
    let new_url_subs= "";
    subs_arr.forEach(item => {
        new_url_subs+=`${item}_`;
    })
    new_url_subs= new_url_subs.slice(0, new_url_subs.length-1);

    let refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + `?subs=${new_url_subs}`;    
    window.history.pushState({ path: refresh }, '', refresh);
}


document.getElementById("show_subject_name_in_add").addEventListener("change", e=> {
    if(e.target.checked) {
        all_aviable_subjects= add_available_subjects_to_selection(true);
    } else {
        all_aviable_subjects= add_available_subjects_to_selection(false);
    }

})


window.addEventListener('load', (e)=> {

    console.log(update_date);
    
    all_aviable_subjects= add_available_subjects_to_selection();

    let subs_str= new URLSearchParams(window.location.search).get("subs");
    let subs_arr= [];
    if(subs_str) {
        subs_arr= subs_str.split('_');
    }

    subs_arr.forEach(sub => {
        if(all_aviable_subjects.indexOf(sub)>-1) {
            
            if(!selected_subjects.includes(sub)) {
                selected_subjects.push(sub);
            }
        }
    })

    render_everything();
})

