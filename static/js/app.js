// Get the Belly Button Data endpoint
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// let belly_button_data = {}
// let names = []

// Fetch the JSON data
d3.json(url).then(function(data) {
    belly_button_data = data;
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    console.log(samples)
});

// async function main() {
//     await fetchData;
//     var names = belly_button_data.names;
//     console.log(names)

// }
// main() 

// Populate dropdown menu

  
  //var dropdownContent = document.querySelector('.dropdown-content');
  
  //for (i = 0; i < areaNames.length; i++) {
  
//     var element = areaNames[i];
  
//     var htmlToAppend = document.createElement('a');
//     htmlToAppend.innerHTML = element.B;
//     htmlToAppend.href = element.C;
    
//     dropdownContent.appendChild(htmlToAppend);
//   }
//console.log(belly_button_data)