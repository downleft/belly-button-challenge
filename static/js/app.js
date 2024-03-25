// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// let belly_button_data = {}
// let names = []

// Fetch the JSON data
d3.json(url).then(function(data) {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    console.log(samples)

    // Populate dropdown menu
    for (let j = 0; j < names.length; j++) {
        d3.select("select").append("option").text(names[j]);
      }

    // Create function to set up graph
    
});

function optionChanged() {
    let dropdownMenu = d3.select("#selDataset");
    let dataset = dropdownMenu.property("value");
    for (let i = 0, i < names.length, i++){
        if (dataset == names[i]) {
            d3.select("#sample-metadata").append(metadata[i])
    }
    }
};

//console.log(belly_button_data)