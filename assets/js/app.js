
const fiver_form_counter = document.getElementById('fiver_form_counter'); 
const wtch_time = document.querySelector('.count_time');
const msg = document.querySelector('.msg');

fiver_form_counter.onsubmit = ( (e) => {
    e.preventDefault();

    // get form data...
    const fiver_counter_data = new FormData(e.target);
    const {date, time} = Object.fromEntries(fiver_counter_data.entries());
    
    if (!date || !time ) {
        msg.innerHTML = set_msg('Need to fillup all of those', 'red')
    } else {
        let stop_count = setInterval(() => {

                // get start time and end time 
                let start_time = Date.now()
                let end_time = new Date(date + ' ' + time)
    
                // get total time
                let order_time = Math.floor(Math.abs(end_time.getTime() - start_time));  
    
                // get time day, hours, min, sec
                let total_sec = Math.floor( order_time / 1000 );
                let total_min = Math.floor( total_sec  / 60 );
                let total_hours = Math.floor( total_min  / 60 );
                let total_days = Math.floor( total_hours  / 24 );
    
                
                let hours = total_hours - ( total_days * 24 );
                let min = total_min - ( total_days * 24 * 60 ) - (hours * 60 ) ;
                let sec = total_sec - ( total_days * 24 * 60 * 60 ) - (hours * 60 * 60 ) - ( min * 60) ;
    
    
                if (sec <= 0 && min <= 0 && hours <= 0 && total_days <= 0 ) {
                    clearInterval(stop_count)
                    msg.innerHTML = set_msg('Done.....', 'red')
                    
                }
    
                wtch_time.innerHTML = `
            
                <span class="day">${total_days}</span> <span>:</span> <span class="hours">${hours}</span> <span>:</span> <span class="min">${min}</span> <span>:</span> <span class="sec">${sec}</span>
                
                `
    
            },1000);
    }
})
