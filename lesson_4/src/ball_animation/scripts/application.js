var Ball = function(x, y, radius, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.stepForward = function(context) {
   if (this.x - this.radius < 0 || this.x + this.radius > context.canvas.width) {
     this.xVelocity = -this.xVelocity;
   }
   if (this.y - this.radius < 0 || this.y + this.radius > context.canvas.height) {
     this.yVelocity = -this.yVelocity;
   }
   this.x = this.x + this.xVelocity;
   this.y = this.y + this.yVelocity;
  };
};


window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;


  // Now we create an instance of the class
  var ball = new Ball(100, 150, 30, 5, 5);


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    context.closePath();
    context.fill();
    ball.stepForward(context);

    window.requestAnimationFrame(render);
  };

  //Finally, call our render function to start the animation
  render();
}