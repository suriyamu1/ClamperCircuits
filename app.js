function incrementStep() {
    
    let count = document.getElementById("count").innerText;

    if(count<6) {
        document.getElementById("count").innerText++
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


// function reset(){
//     document.getElementById("count_num_display").innerText=0
// }