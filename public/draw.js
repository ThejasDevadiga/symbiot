window.addEventListener("load", async() => {
  // Get the canvas element and its context
  var canvas = document.getElementById("drawCanva");
  var context = canvas.getContext("2d");

  // Set the canvas width and height
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Set the stroke style
  context.strokeStyle = "black";
  context.lineWidth = 5;

  // Define the mouse and touch event handlers
  var isDrawing = false;
  var lastX, lastY;

  canvas.addEventListener("mousedown", function (e) {
    isDrawing = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  canvas.addEventListener("mousemove", function (e) {
    if (isDrawing) {
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      lastX = e.clientX;
      lastY = e.clientY;
    }
  });

  canvas.addEventListener("mouseup", function (e) {
    isDrawing = false;
  });

  canvas.addEventListener("touchstart", function (e) {
    isDrawing = true;
    lastX = e.touches[0].clientX;
    lastY = e.touches[0].clientY;
  });

  canvas.addEventListener("touchmove", function (e) {
    if (isDrawing) {
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
      context.stroke();
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
    }
  });

  canvas.addEventListener("touchend", function (e) {
    isDrawing = false;
  });
  
  
  
  
  
  
});


