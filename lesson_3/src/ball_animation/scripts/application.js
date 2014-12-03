window.onload = function() {
  // You've seen this bit before, it'll be pretty standard from here on out
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  // The ball object that will keep track of the ball's state
  var ball = {
    x: 0,
    y: 0,
    radius: 50
  };

  function render() {
    // Step 1: Clear existing shapes
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Step 2: Draw shape using its existing data (state)
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2); // Notice here that the (x,y) coordinates and radius come from the ball object
    context.closePath();
    context.fill();

    // Step 3: Transform the shape's data to make it move diagonally
    ball.x = ball.x + 1;
    ball.y = ball.y + 1;

    // Step 4: Repeat!
    window.requestAnimationFrame(render);
  };

  //Finally, call our render function to start the animation
  render();
}