// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
    let names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    console.log(samples)

    // Populate dropdown menu
    for (let j = 0; j < names.length; j++) {
        d3.select("select").append("option").attr("value", j).text(names[j]);
      }

    // Establish default graph
    //init(samples[0])
    // function init() {
    //     let labels = []
    //     let values = []
    //     for (let k = 0; k < 10; k++) {
    //         labels.push(String(samples[k]["otu_ids"]))
    //         values.push(samples[k]["sample_values"])
    //     }
        
    //     let trace = {
    //         values: values,
    //         labels: labels,
    //         type: "bar",
    //         // orientation: "h",
    //         // sort: false // Ensure sectors are not reordered
    //     }
    
    //     // Data Array
    //     let startinfo = [trace];

    //     // Layout object
    //     let layout = {
    //         height: 600,
    //         width: 800
    //     };

    // // Render the plot to the div tag with id "bar"
    // Plotly.newPlot("bar", startinfo, layout);
    // };
    // init()
});


d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
    let dropdownMenu = d3.select("#selDataset").property("value");
    let labels = [];
    let values = [];
    for (let k = 0; k < 10; k++) {
        if (samples[dropdownMenu]["otu_ids"][k]) {
            labels.push("OTU " + String(samples[dropdownMenu]["otu_ids"][k]));
            values.push(samples[dropdownMenu]["sample_values"][k]);
        };
    };
    
    let trace = {
        x: values,
        y: labels,
        type: "bar",
        orientation: "h",
        transforms: [{
            type: "sort",
            target: "y",
            order: "descending"
        }]
        
        //         // sort: false // Ensure sectors are not reordered
        };
    let startinfo = [trace];

    // Layout object
    let layout = {
        height: 600,
        width: 800
        };

    // Render the plot to the div tag with id "bar"
    Plotly.newPlot("bar", startinfo, layout);
//     Plotly.restyle("pie", "values", [newdata])
//     // d3.select(".sample-metadata").append(metadata[dropdownMenu])
};

//console.log(belly_button_data)