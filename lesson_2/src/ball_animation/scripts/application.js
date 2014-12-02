window.onload = function() {
  // This is why we added the id attribute to the canvas HTML element, because we can now grab it using this simple, built-in function.
  // Create a variable that contains the canvas element.
  var canvas = document.getElementById("canvas");

  // getContext is a method of the canvas element that provides an interface to allow drawing to the cavas.
  // The context variable is what you will use for all your drawing
  var context = canvas.getContext("2d");

  // Now let's make the canvas fit the entire browser window
  // window contains a lot of information about the browser window, including dimensions
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  // Time to draw a circle! Canvas doesn't exactly have a circle drawing function, but it does have an arc.
  // It's important to remember here that a circle contains PI*2 radians (360 degrees)
  // The arc function takes 5 paramters:
  //   x coordinate of center
  //   y coordinate of center
  //   radius
  //   the start angle of the arc
  //   the end angle of the arc
  // More information here: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.arc
  // The next important thing to remember is that any functions that create a shape need to be between beginPath() and closePath() function calls
  context.beginPath();

  // Create an arc at (0,0) with a radius of 100 pixels. The angle starts at 0 and ends at PI*2 (since that's a full circle)
  context.arc(0, 0, 100, 0, Math.PI*2);

  context.closePath();

  // Alright, now we just need to fill the path we just created using arc. Piece of cake
  context.fill();
}
