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
    let trace2 = {
        x: samples[dropdownMenu]["otu_ids"],
        y: samples[dropdownMenu]["sample_values"],
        mode: "markers",
        marker: {size: samples[dropdownMenu]["sample_values"]},
        };

    let bubbleInfo = [trace2];

    let layout2 = {
        height: 600,
        width: 1200
        };

    // Render Bubble Chart to the div tag with id "bubble"
    Plotly.newPlot("bubble", bubbleInfo, layout2);
//     // d3.select(".sample-metadata").append(metadata[dropdownMenu])
};

//console.log(belly_button_data)