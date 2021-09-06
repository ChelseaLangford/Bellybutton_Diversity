function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var result = sampleArray[0];
      console.log(result);

    // 6. Create variables that hold the otu_ids, otu_labels, sample_values, and washing frequency.
    var id = result.otu_ids;
    var label = result.otu_labels;
    var values = result.sample_values;
    
    // 3. Create a variable that holds the samples array. 
    var meta = data.metadata;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var metaArray = meta.filter(metaObj => metaObj.id == sample);
    //  5. Create a variable that holds the first sample in the array.
    var metaResult = metaArray[0];
    var freq = parseFloat(metaResult.wfreq);
      console.log(freq);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are first. 
    var xticks = values.slice(0,10).reverse();
    var yticks = id.slice(0, 10).map(function(otu_id) {
      return "OTU " + otu_id;
    }).reverse();

    // 8. Create the trace for the bar chart. 
    var trace = {
      x: xticks,
      y: yticks,
      type: "bar",
      orientation: "h"
     };
     var barData = [trace];

     // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "<b>Top 10 Bacteria Cultures Found</b>",
      paper_bgcolor: "#CBC3E3",
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
 

    // 1. Create the trace for the bubble chart.
    var trace1 = {
      x: id,
      y: values,
      text: label,
      mode: 'markers',
      marker: {
        size: values,
        color: id,
        colorscale: "Picnic"
      }
     };
    
    
    var bubbleData = [trace1];
    console.log(bubbleData)

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "<b>Bacteria Cultures Per Sample</b>",
      xaxis: {title: "OTU ID"},
      hovermode: 'closest',
      paper_bgcolor: "#CBC3E3",
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    // 4. Create the trace for the gauge chart.
    var trace2 = {
        domain: { x: [0, 1], y: [0, 1] },
        value: freq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "black" },
          bar: { color: "black" },
          bgcolor:"#CBC3E3",
          borderwidth: 2,
          bordercolor: "black",
          steps: [
            { range: [0, 2], color: "lightskyblue" },
            { range: [2, 4], color: "cornflowerblue" },
            { range: [4, 6], color: "dodgerblue" },
            { range: [6, 8], color: "mediumslateblue"},
            { range: [8, 10], color: "darkslateblue"}
          ]
        }
      };
    
    var gaugeData = [trace2];
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 400,
      paper_bgcolor: "#CBC3E3",
      font: { color: "black", family: "Arial" }
    };
    console.log(gaugeData);
    console.log(gaugeLayout);

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);

  });
}

