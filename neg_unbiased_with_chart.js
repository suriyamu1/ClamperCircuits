const context = document.getElementById("output_graph");
// get the canvas element from html
let clamperGraph = new Chart(context, {
    type:"line",
    data: {
        labels: ["&#960;/2", "&#960;", "3&#960;/4", "2&#960;"]
    }
});