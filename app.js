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
    console.log("In Change ckt function..");
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

function validate() 
{
    console.log("validate function is called.");
    var input_v_value = document.getElementById("V_in").value;
    // var  bias_v_value = document.getElementById("bias_v").value;
    var res_val = document.getElementById("resistance_value").value;



    // if(input_v_value.value == "" || bias_v_value == "" || res_val == "") {
    //     document.getElementById("check_design").innerHTML = "<h5>Fill all the entries.</h5>"; 
    // }

    if(input_v_value == "" || res_val == "") {
        document.getElementById("check_design").innerHTML = "<h5>Fill all the entries.</h5>"; 
        return;
    }

    if(input_v_value < 0 || res_val < 0) {
        document.getElementById("check_design").innerHTML = "<h5>Values cannot be negative. </h5>"; 
        return;
    }

    // Verifying if correct diode is chosen
    if(input_v_value > 335.875) {
        document.getElementById("check_design").innerHTML = "<h5>Peak voltage = (Rms voltage)/1.414.<br>The peak output voltage will be 2 times peak voltage. The diodes we have can withstand PIV upto 1000V. Hence, taking 2*Vm = 950V. ==> Vm = 475V ==> Vrms = 335.875V. Vin rms < 335.875V </h5>";
        return;
    }

    else {
        document.getElementById("check_design").innerHTML = "<h5>Input voltage chosen is correct.</h5>"
        var diode_name = document.getElementById("diode_name").value;
        console.log(diode_name);

        if(input_v_value > 268.7) {
            if(diode_name == "6A10") {
                console.log("input voltage larger than 268");
                document.getElementById("check_design").innerHTML = "<h5>Diode is chosen correctly</h5>"
            }
            else {
                document.getElementById("check_design").innerHTML = "<h5>Diode is not chosen correctly</h5>";
                return;
            }
        }
        else if(input_v_value > 134.35) {
            if(diode_name == "6A10" || diode_name == "6A8") {
                document.getElementById("check_design").innerHTML = "<h5>Diode is chosen correctly</h5>"
            }
            else {
                document.getElementById("check_design").innerHTML = "<h5>Diode is not chosen correctly</h5>";
                return;
            }
        }

        else if(input_v_value > 33.58) {
            if(diode_name == "1n4004" || diode_name == "6A10" || diode_name == "6A8") {
                document.getElementById("check_design").innerHTML = "<h5>Diode is chosen correctly</h5>"
            }
            else {
                document.getElementById("check_design").innerHTML = "<h5>Diode is not chosen correctly</h5>";
                return;
            }
        }
        else {
            document.getElementById("check_design").innerHTML = "<h5>Diode is chosen correctly</h5>"
        }
    }

    var capacitance = document.getElementById("cap_value").value;
    if(res_val == 500) {
        console.log("Res is 500");
        if(capacitance=="470 uF") {
            document.getElementById("check_design").innerHTML = "<h5>Cap is chosen correctly</h5>";
        }
        else {
            document.getElementById("check_design").innerHTML = "<h5>Cap is not chosen correctly</h5>";
        }
    }
    else {
        if(res_val == 1000) {
            document.getElementById("check_design").innerHTML = "<h5>Cap is chosen correctly</h5>";
        }
    }

}