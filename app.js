// data pulled in automatically from data.js
var UfoData = data;
console.log(UfoData);


// Input controls: 
// mouse click & keyboard input + enter 
// Both will do the same thing
var DateFilterField = d3.select("#datetime");
DateFilterField.on("change", HandleDateFilterInput);

var filterbutton = d3.select("#filter-btn");
filterbutton.on("click", HandleDateFilterInput);
// for debug...
// filterbutton.on("click", logclick("filter button"));
// Reference: Unit14.Session3.03-Evr_D3_Table
// function logclick(logtext) {
//   console.log(`Button clicked: ${logtext}`);
//   console.log(d3.event.target);
// }

var tbody = d3.select("tbody");

function initialize() {
  writedata(UfoData,tbody);
}

function writedata(what2write, where2write) {
  where2write.html(""); // clear previous data
  what2write.forEach((lineitem) => {
    var row = where2write.append("tr");
    Object.entries(lineitem).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}

//
// ALL BELOW IS FOR SORT ON DATE...
//
function HandleDateFilterInput() {
  // grab the value of the input field
  var inputText = d3.event.target.value; // gets input text automatically?
  console.log(`Date filter field changed to: ${inputText}`);
  //
  // this next event.preventDefault();
  // is the one that matters.
  // I wish I knew why.
  event.preventDefault(); // Importtant to prevent refresh of the screen
  if (inputText.length >= 1) {
    let FilteredReports = [];
    FilteredReports = UfoData.filter(lineitem=>{
      return (lineitem.datetime == inputText); 
    });
    writedata(FilteredReports, tbody);
  }
}

initialize();