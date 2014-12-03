window.onload = function() {
  // You've seen this bit before, it'll be pretty standard from here on out
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;


  // Here is our ball object, with its initial state
  // We define it outside of the render function because if it were inside of the function, it would reset every time a new frame rendered.
  // That's a bad thing, because this object is going to keep track of the important data!
  var ball = {
    x: 0,
    y: 0,
    radius: 50
  };

  function render() {
    // Step 1: Clear existing shapes
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Step 2: Draw and make transformations
    // This draw stuff should look familiar
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2); // Notice here that the (x,y) coordinates come from the ball object
    context.closePath();
    context.fill();

    // This will be our transformation
    // This changes the ball object so that its x and y coordinates are now one more than they were before
    // This makes it so that when the next frame is drawn, the circle is drawn in a new position
    ball.x = ball.x + 1;
    ball.y = ball.y + 1;

    // Step 3: Redraw!
    window.requestAnimationFrame(render);
  };

  render();
}