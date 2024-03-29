// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Set up initial variables
let names = []
let metadata = []
let samples = []

// Fetch the JSON data
d3.json(url).then(function(data) {
    names = data.names;
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
    // Set up Hovertext element - textbox
    let textbox = []
    for (let j = 0; j < samples[dropdownMenu]["otu_ids"].length; j++) {
        textbox.push("OTU ID: " + String(samples[dropdownMenu]["otu_ids"][j]));
    };

    // Set up remianing Bubble Chart parameters
    let trace2 = {
        x: samples[dropdownMenu]["otu_ids"],
        y: samples[dropdownMenu]["sample_values"],
        hovertemplate: textbox,
        mode: "markers",
        marker: {
            // Colorscale setup from following link: https://stackoverflow.com/questions/67635512/plotly-colorscale-in-scatter-data-plot
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

    var gaugeInfo = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata[dropdownMenu]["wfreq"],
          title: { text: "Belly Button Weekly Wash Frequency" },
          type: "indicator",
          mode: "gauge+needle",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
                // Colors pulled from following: https://htmlcolorcodes.com/color-chart/
              { range: [0, 1], color: "#F9FBE7" },
              { range: [1, 2], color: "#F0F4C3" },
              { range: [2, 3], color: "#E8F8F5" },
              { range: [3, 4], color: "#DCE775" },
              { range: [4, 5], color: "#D4E157" },
              { range: [5, 6], color: "#CDDC39" },
              { range: [6, 7], color: "#C0CA33" },
              { range: [7, 8], color: "#7CB342" },
              { range: [8, 9], color: "#689F38" },
            ],
          }
        }
      ];
      
      var layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', gaugeInfo, layout3);
};