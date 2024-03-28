// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
    let names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    // Populate dropdown menu
    for (let j = 0; j < names.length; j++) {
        d3.select("select").append("option").attr("value", j).text(names[j]);
      }

    // Establish default graph
    optionChanged()
});

// Trigger New Graphs when Dropdown Menu changed
d3.selectAll("#selDataset").on("change", optionChanged);

// Function to creat graphs
function optionChanged() {

    // Determine value chosen from Dropdown Menu
    let dropdownMenu = d3.select("#selDataset").property("value");
    let labels = [];
    let values = [];

    // Limit to top 10 for Horizontal Bar Chart
    for (let k = 0; k < 10; k++) {
        if (samples[dropdownMenu]["otu_ids"][k]) {
            labels.push("OTU " + String(samples[dropdownMenu]["otu_ids"][k]));
            values.push(samples[dropdownMenu]["sample_values"][k]);
        };
    };
    
    // Set up Horizontal Bar Chart parameters
    let trace1 = {
        x: values,
        y: labels,
        type: "bar",
        orientation: "h",
        // Organize in descending order reference: https://community.plotly.com/t/horizontal-bar-automatically-order-by-numerical-value/7183
        transforms: [{
            type: "sort",
            target: "y",
            order: "descending"
            }]
        };

    let hbarInfo = [trace1];

    let layout1 = {
        height: 600,
        width: 800
        };

    // Render Horizontal Bar Chart to the div tag with id "bar"
    Plotly.newPlot("bar", hbarInfo, layout1);

    // Set up Bubble Chart parameters
    let textbox = []
    for (let j = 0; j < samples[dropdownMenu]["otu_ids"].length; j++) {
        textbox.push("OTU ID: " + String(samples[dropdownMenu]["otu_ids"][j]));
    };
    let trace2 = {
        x: samples[dropdownMenu]["otu_ids"],
        y: samples[dropdownMenu]["sample_values"],
        hovertemplate: textbox,
        // text: textbox,
        mode: "markers",
        marker: {
            colorscale: [
                [0.000, "rgb(68, 1, 84)"],
                [0.111, "rgb(72, 40, 120)"],
                [0.222, "rgb(62, 74, 137)"],
                [0.333, "rgb(49, 104, 142)"],
                [0.444, "rgb(38, 130, 142)"],
                [0.556, "rgb(31, 158, 137)"],
                [0.667, "rgb(53, 183, 121)"],
                [0.778, "rgb(109, 205, 89)"],
                [0.889, "rgb(180, 222, 44)"],
                [1.000, "rgb(253, 231, 37)"]
              ],
            size: samples[dropdownMenu]["sample_values"],
            color: samples[dropdownMenu]["otu_ids"],
        },
    };

    let bubbleInfo = [trace2];

    let layout2 = {
        height: 600,
        width: 1200
        };

    // Render Bubble Chart to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleInfo, layout2);

    // Display Demographic Info
    // Code pulled from https://stackoverflow.com/questions/71697825/how-can-i-pretty-print-keys-and-values-of-a-javascript-object-on-web-page
    const str = Object.entries(metadata[dropdownMenu]).map(([key, value]) => `<dd>${key}: ${value}</dd>`).join('');
    document.getElementById("sample-metadata").innerHTML = str
};