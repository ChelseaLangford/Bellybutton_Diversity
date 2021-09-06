# Belly Button Biodiversity

The purpose of this project was to build interactive charts to explore the bacteria types and sample size of bacteria present in the belly button's of test subjects. The data can then be used to explore the presence of bacteria types with the capability to synthesize proteins that taste like beef. This could present important data for the ability to generate synthesized meat products at scale. 

## Manipulating the Data File 
 In order to build charts based specific test subjects, the .json data was manipulated in the Javascript file to filter the samples for the object with the desired sample number.
 Example code here: 
 
 ```
 // Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleArray = samples.filter(sampleObj => sampleObj.id == sample);
    //  Create a variable that holds the first sample in the array.
    var result = sampleArray[0];

    // Create variables that hold the otu_ids, otu_labels, sample_values, and washing frequency.
    var id = result.otu_ids;
    var label = result.otu_labels;
    var values = result.sample_values;
```

## Building Charts
Charts could then be built utilizing the variables defined for the bacteria data based on the test subject ID.
1. A bar chart shows the top 10 bacteria cultures found for the defined test subject ID based on the sample size of the bacteria.
2. A gauge chart shows the frequency of belly button washes per week
3. A bubble chart shows the relative size of bacteria samples found per test subect ID.

<b>You can view the interactive charts at this website: https://chelsealangford.github.io/Bellybutton_Diversity/</b>

## Modifying the Website 
To make the website more visitor friendly and visually appealing, certain adjustments were made to the HTML code:
1. A background image was added to the jumbotron, and font colors were updated to compliment the image.
2. The website body background color was adjusted to compliment the jumbotron image color themes.
3. An additioal body paragraph was added for futher instructions on how to use the charts 
4. Chart colors were adjusted to match the color themes defined in the jumbotron image and body background.
    
