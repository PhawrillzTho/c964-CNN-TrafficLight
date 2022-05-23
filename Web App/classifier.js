//classifier.js
var model;
var predResult = document.getElementById("result");
var predOther = document.getElementById("other");
async function initialize() {
    model = await tf.loadLayersModel('/jsweights/model.json');
}
async function predict(predict_image) {
  // action for the submit button
let image = document.getElementById(predict_image)  
let tensorImg =   tf.browser.fromPixels(image).resizeNearestNeighbor([25, 25]).toFloat().expandDims();
  prediction = await model.predict(tensorImg).data();
  document.getElementById("result_label").style.display = "block";
  document.getElementById("result").style.display = "block";
  document.getElementById("plotly_result").style.display = "block";
  predResult.innerHTML = String("Stop: " + Math.round(prediction[0]*100) + "% " + " Go: " + Math.round(prediction[1]*100) + "% ")

  var data = [
    {
      x: ['Stop', 'Go'],
      y: [Math.round(prediction[0]*100), Math.round(prediction[1]*100)],
      type: 'bar'
    }
  ];
  
  Plotly.newPlot('plotly_result', data);
  
}
initialize();