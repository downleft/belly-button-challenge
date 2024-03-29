// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;

    // Populate dropdown menu
    // for (let j = 0; j < names.length; j++) {
    //     d3.select("select").append("option").attr("value", j).text(names[j]);
    //   }

    // Establish default graph
    optionChanged()
});

// Trigger New Graphs when Dropdown Menu changed
d3.selectAll("#selDataset").on("change", optionChanged);

// Function to creat graphs
function optionChanged() {

    // Determine value chosen from Dropdown Menu
    let dropdownMenu = d3.select("#selDataset").property("value");
    
    var gaugeInfo = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: metadata[dropdownMenu]["wfreq"],
          title: { text: "Speed" },
          type: "indicator",
          mode: "gauge",
          // delta: { reference: 380 },
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              { range: [0, 1], color: "white" },
              { range: [1, 2], color: "tan" },
              { range: [2, 3], color: "beige" },
              { range: [3, 4], color: "lightbrown" },
              { range: [4, 5], color: "lime" },
              { range: [5, 6], color: "lightgreen" },
              { range: [6, 7], color: "green" },
              { range: [7, 8], color: "darkgreen" },
              { range: [8, 9], color: "olive" },
            ],
            // threshold: {
            //   line: { color: "red", width: 4 },
            //   thickness: 0.75,
            //   value: 490
            // }
          }
        }
      ];
      
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', gaugeInfo, layout);

};