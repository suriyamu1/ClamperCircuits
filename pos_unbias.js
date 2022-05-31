// global variables
var vpeak_value = 0



function incrementStep() {
    
    let count = document.getElementById("count").innerText;

    if(count<6) {
        document.getElementById("count").innerText++;
    }
    change_Circuit_Graph_Explanation();
}

function decrementStep() {
    let count = document.getElementById("count").innerText;

    if(count>1) {
        document.getElementById("count").innerText--;
    }
    change_Circuit_Graph_Explanation();
}

function resetToOne() {
    document.getElementById("count").innerText = 1;
    change_Circuit_Graph_Explanation();  
}


function change_Circuit_Graph_Explanation() {

    const count = document.getElementById("count").innerText;

    //changing circuit diagram
    document.getElementById("diagram").innerHTML = '<img src="images/Pos_unbiased_clamper/Circuit_pics/Slide'+count+'.JPG" alt="">';

    //changing graph_image
    document.getElementById("output_graph").src="images/Pos_unbiased_clamper/Graph_pics/Slide"+count+".JPG";


    //changing explanation "text"
    if(count==1) {
        document.getElementById("explanation").innerHTML = '<h2>Click "Next" button to begin! </h2>';
    }

    if(count==2) {
        document.getElementById("explanation").innerHTML = '<h2><span class="bolder_black">During the First Positive Half Cycle, </span>the diode is reverse biased and so acts as an open circuit. The current flows from supply to the load via capacitor. Since time constant is more than 10 times time period,  capacitor does not even start to charge and output voltage is almost equal to input voltage.</h2>';
    }

    if(count==3) {
        document.getElementById("explanation").innerHTML = '<h2><span class="bolder_black">During the first negative half cycle, </span>the diode is forward biased, hence acts as a short circuit. Now the output voltage is equal to zero. Due to the short circuit, large current flows and hence charging the capacitor to peak value.</h2>';
    }

    if(count==4) {
        document.getElementById("explanation").innerHTML = '<h2><span class="bolder_black">When first negative peak is reached, </span>the voltage across the diode is zero. This turns off the diode. Now the output voltage is the sum of input voltage and capacitor votlage. The capacitor now acts like a DC source, thus shifting the waveform above by a DC value of +peak voltage.</h2>';
    }

    if(count==5) {
        document.getElementById("explanation").innerHTML = '<h2><span class="bolder_black">After first negative peak, </span>the voltage across the diode will always be lesser than or equal to zero. Hence, the diode will be reverse biased always hereafter. Hence output voltage will be the sum of input AC voltage and capacitor voltage.</h2>';
    }

    if(count==6) {
        document.getElementById("explanation").innerHTML = '<h2>After first negative peak is reached, the output voltage will be in <span class="bolder_black">steady state condition.</span> The capacitor will also maintain the same votlage as it is continuously connected to supply and has no other path to discharge.</h2>';
    }
        
}

// this function is used inside validate() function
function getPIV(name_of_diode) {
    if(name_of_diode == "1n4002")
        return 100;
    else if(name_of_diode == '1n4004')
        return 400;
    else if(name_of_diode == '6A8')
        return 800;
    else
        return 1000;
}

//this function is used inside validate() function
function getCapVal(capacitance) {
    if(capacitance=="220 uF")
        return 220;
    if(capacitance == "470 uF")
        return 470;
}

function validate() 
{

    document.getElementById("v_peak").innerText= "__";


    console.log("validate function is called.");
    var input_v_value = document.getElementById("V_in").value;
    // var  bias_v_value = document.getElementById("bias_v").value;
    var res_val = document.getElementById("resistance_value").value;


    // if(input_v_value.value == "" || bias_v_value == "" || res_val == "") {
    //     document.getElementById("check_design").innerHTML = "<h5>Fill all the entries.</h5>"; 
    // }

    // Edge case - 1
    if(input_v_value == "") {
        document.getElementById("check_design").innerHTML = '<h5><span class="error">Enter the value of Input voltage (RMS value).</span></h5>'; 
        return;
    }

    // Edge case - 2
    if(input_v_value < 0) {
        document.getElementById("check_design").innerHTML = '<h5 class="error">RMS value of AC signal cannot be negative.</h5>';
        return;
    }

    if(input_v_value == 0) {
        document.getElementById("check_design").innerHTML = '<h5 class="error">Input voltage cannot be zero.</h5>';
        return;
    }

    // this is done to get the peak value with 1 decimal precision. Else we get upto 10 decimal precision which is not needed.
    vpeak_value = Math.trunc(input_v_value*Math.sqrt(2)) +"."+ Math.trunc(input_v_value*10*Math.sqrt(2))%10;
    console.log(vpeak_value);

    // Verifying if correct diode is chosen
    if(input_v_value > 353.55) {
        // (1000/2)/root 2 = 353.55
        document.getElementById("check_design").innerHTML = '<h5><span class="error">The diodes available cannot withstand this voltage.</span></h5><br><h5>Reason: V<sub>p</sub>=V<sub>rms</sub>*&radic;2 = '+ input_v_value + '*&radic;2 = ' + vpeak_value + 'V<br>The maximum peak output voltage = 2 x V<sub>p</sub>= '+vpeak_value*2 +'V (in positive unbiased clamper).<br>This voltage will be applied across the reverse biased diode. <br>The PIV of all diodes are below 1000V.<br><span class="error">Hence this voltage cannot be chosen</span></h5>';
        return;
    }

    else {
        var diode_name = document.getElementById("diode_name").value;
        console.log(diode_name);

        if(input_v_value > 282.84) {
            // (800/2)/root 2 = 282.84
            if(diode_name == "6A10") {
                document.getElementById("check_design").innerHTML = '<h5>The Diode '+ diode_name +' can withstand 2*V<sub>p</sub>= '+vpeak_value*2+ 'V since its PIV is '+ getPIV(diode_name)+'V. <span class="correct">Diode is chosen correctly.</span></h5>';
            }
            else {
                document.getElementById("check_design").innerHTML = '<h5 class="error">The diode ' + diode_name + ' can not withstand this voltage.</h5><br><h5>Reason: V<sub>p</sub>=V<sub>rms</sub>*&radic;2 = '+ input_v_value + '*&radic;2 = ' + vpeak_value + 'V<br>The maximum peak output voltage = 2 x V<sub>p</sub>= '+vpeak_value*2 +'V (in positive unbiased clamper).<br>This voltage will be applied across the reverse biased diode. <br>The PIV of this diode is '+ getPIV(diode_name)+'V.<br><span class="error">Hence this diode cannot be chosen</span></h5>';
                return;
            }
        }
        else if(input_v_value > 141.42) {
            if(diode_name == "6A10" || diode_name == "6A8") {
                document.getElementById("check_design").innerHTML = '<h5>The Diode '+ diode_name +' can withstand 2*V<sub>p</sub>= '+vpeak_value*2+ 'V since its PIV is '+ getPIV(diode_name)+'V. <span class="correct">Diode is chosen correctly.</span></h5>';

            }
            else {
                document.getElementById("check_design").innerHTML = '<h5 class="error">The diode ' + diode_name + ' can not withstand this voltage.</h5><br><h5>Reason: V<sub>p</sub>=V<sub>rms</sub>*&radic;2 = '+ input_v_value + '*&radic;2 = ' + vpeak_value + 'V<br>The maximum peak output voltage = 2 x V<sub>p</sub>= '+vpeak_value*2 +'V (in positive unbiased clamper).<br>This voltage will be applied across the reverse biased diode. <br>The PIV of this diode is '+ getPIV(diode_name)+'V.<br><span class="error">Hence this diode cannot be chosen</span></h5>';
                return;
            }
        }

        else if(input_v_value > 35.35) {
            if(diode_name == "1n4004" || diode_name == "6A10" || diode_name == "6A8") {
                document.getElementById("check_design").innerHTML = '<h5>The Diode '+ diode_name +' can withstand 2*V<sub>p</sub>= '+vpeak_value*2+ 'V since its PIV is '+ getPIV(diode_name)+'V. <span class="correct">Diode is chosen correctly.</span></h5>';

            }
            else {
                document.getElementById("check_design").innerHTML = '<h5 class="error">The diode ' + diode_name + ' can not withstand this voltage.</h5><br><h5>Reason: V<sub>p</sub>=V<sub>rms</sub>*&radic;2 = '+ input_v_value + '*&radic;2 = ' + vpeak_value + 'V<br>The maximum peak output voltage = 2 x V<sub>p</sub>= '+vpeak_value*2 +'V (in positive unbiased clamper).<br>This voltage will be applied across the reverse biased diode. <br>The PIV of this diode is '+ getPIV(diode_name)+'V.<br><span class="error">Hence this diode cannot be chosen</span></h5>';
                return;
            }
        }
        else {
            document.getElementById("check_design").innerHTML = '<h5>The Diode '+ diode_name +' can withstand 2*V<sub>p</sub>= '+vpeak_value*2+ 'V since its PIV is '+ getPIV(diode_name)+'V. <span class="correct">Diode is chosen correctly.</span></h5>';
        }
    }

    var capacitance = document.getElementById("cap_value").value;
    if(res_val == 500) {
        console.log("Res is 500");
        if(capacitance=="470 uF") {
            document.getElementById("check_design").innerHTML += '<h5>&#964; = R*C = '+ (res_val*getCapVal(capacitance))/1000 +'ms. Since &#964; is greater than 10 times time period (20 ms). <span class="correct">R and C are chosen correctly</span></h5>';
        }
        else {
            document.getElementById("check_design").innerHTML += '<h5>&#964; = R*C = '+ (res_val*getCapVal(capacitance))/1000 +'ms. Since &#964; is not greater than 10 times time period (20 ms). <span class="error">R and C are not chosen correctly</span></h5>';
            return;
        }
    }

    else {
        if(res_val == 1000) {
            document.getElementById("check_design").innerHTML += '<h5>Time constant (&#964;) = R*C = '+ (res_val*getCapVal(capacitance))/1000 +'ms. Since &#964; is greater than 10 times time period (20 ms). <span class="correct">R and C are chosen correctly</span></h5>';
        }
    }

    //this code will e executed if all the design are correct.
    document.getElementById("check_design").innerHTML += '<h5 class="acknowledgement">Your circuit design is correct.</h5>';
    //changing value of Vp below waveform
    document.getElementById("v_peak").innerText= vpeak_value;

}

