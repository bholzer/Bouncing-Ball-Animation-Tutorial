window.onload = function() {
  // You've seen this bit before, it'll be pretty standard from here on out
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  // The ball object that will keep track of the ball's state
  var ball = {
    x: context.canvas.width/2,
    y: context.canvas.height/2,
    dx: 5,
    dy: 5,
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

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > context.canvas.width) {
      ball.dx = -ball.dx;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > context.canvas.height) {
      ball.dy = -ball.dy;
    }
    ball.x = ball.x + ball.dx;
    ball.y = ball.y + ball.dy;

    // Step 4: Repeat!
    window.requestAnimationFrame(render);
  };

  //Finally, call our render function to start the animation
  render();
}