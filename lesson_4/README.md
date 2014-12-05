#Object-Oriented JavaScript

You're ball should now be bouncing around the canvas.

Now we want to make this program cleaner and more structured. This is where object-oriented programming (OOP) comes into play. OOP is a very widespread paradigm, so get comfortable with it.

The general idea behind OOP is to model your program after real-life things. Let's use a car as an example. A car has both *attributes* and *actions* it can perform.

Attributes of a car might be:
- Color
- Top speed
- Make
- Model
- etc.

Anything that describes something about a car would be considered an attribute.

Actions a car might perform:
- Turn left/right
- Accelerate
- Brake
- Turn on/off

This is the kind of the OOP handles very well.

In our example, we could make a *class* to represent the car. A class is a collection of attributes and actions that describe the model. The actions that the class can perform are called *methods*. A class can be thought of as a template for an object.

Let's make a car class:
```javascript
var Car = function() {
  this.color = "blue";
  this.topSpeed = 120;
  this.startCar = function() {
    return "Zoom Zoom";
  };
}
```

You simply create a variable containing a function that is the name of your class. The function name should be capitalized. This function is what's known as a *constructor*, because it *constructs* an object of a certain type. In this case, a Car.

This is your first real exposure to `this`. What it means in this context is: "the color of `this` car is blue". `this` is simply a reference to the Car.

You can now create any number of cars based off of this "template":
```javascript
var myCar = new Car();
var otherCar = new Car();
```

>Keep in mind, you can try all of these things right in your browser's console (developer tools)

This creates two *instances* of the Car class. Each instance has a `color` and `topSpeed` attribute, as well as a `startCar` method.

The `new` is something you probably haven't seen before. What it essentially means is "give me a new instance of the class I want." `myCar` and `otherCar` are two different objects and can be modified independently, but they were built using the same template, or class.

To make the class more useful, you can modify your constructor so that you may create different instances with different attributes. Say that you wanted to make the car a different color than blue when you create it. You could define your constructor to take an argument like this:
```javascript
var Car = function(color) {
  this.color = color;
  this.topSpeed = 120;
  this.startCar = function() {
    return "Zoom Zoom";
  };
};
```

So now instead of every car instance having a "blue" color attribute, you can make a car any color you want:
```javascript
var myCar = new Car("red");
```

The point of having these classes is having structured data that you can manage more easily.

####So how does this help with the bouncing-ball program?
First, we need to identify the different attributes and actions for the ball. We already know we have a few attributes:
- radius
- x
- y
- x velocity
- y velocity

Since every ball we will want to create will have all of these attributes, this is the perfect use-case for a class. So we need to create a ball constructor:
```javascript
var Ball = function(x, y, radius, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
};
```

We could now create a ball with any arguments we wanted. So let's place a ball at (100, 150) with a radius of 30, with both velocities being 5:
```javascript
var myBall = new Ball(100, 150, 30, 5, 5);
// myBall is now an object that looks like: Ball {x: 100, y: 150, radius: 30, xVelocity: 5, yVelocity: 5}
```

Now, the existing program could look similar, but more structured:
```javascript
// This defines our class, to be used as a sort of template
var Ball = function(x, y, radius, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
};
window.onload = function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.canvas.width = window.innerWidth;
  context.canvas.height = window.innerHeight;

  // Now we create an instance of the class
  var ball = new Ball(100, 100, 30, 5, 5);


  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
    context.closePath();
    context.fill();

    if (ball.x - ball.radius < 0 || ball.x + ball.radius > context.canvas.width) {
      ball.xVelocity = -ball.xVelocity;
    }
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > context.canvas.height) {
      ball.yVelocity = -ball.yVelocity;
    }
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    window.requestAnimationFrame(render);
  };

  //Finally, call our render function to start the animation
  render();
}
```

> Put your class definition at  the top of the file.

But that doesn't really seems to clean things up a whole lot. The real power comes in when you start adding methods to your class. In our `render` function, we have a lot of stuff going on that messes with the ball. It changes the position and handles bouncing and also the drawing.

By moving that functionality to the ball itself, our `render` function will be cleaner. Let's create a method on the ball that handles its movement, we'll call it `stepForward`. Remember that at every step, the ball's position increases by its velocity:
```javascript
var Ball = function(x, y, radius, xVelocity, yVelocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.stepForward = function() {
      // Here's `this` again
      // This simply means: "take this ball and increase its x and y by the respective velocities"
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
    };
  };
```

Now we can take the code in `render` that moved the ball and just replace it with a call to our method:
```javascript
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  context.closePath();
  context.fill();

  if (ball.x - ball.radius < 0 || ball.x + ball.radius > context.canvas.width) {
    ball.xVelocity = -ball.xVelocity;
  }
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > context.canvas.height) {
    ball.yVelocity = -ball.yVelocity;
  }
  ball.stepForward();
  window.requestAnimationFrame(render);
};
```

So now our `Ball` class is modifying its own data. This is part of what OOP aims to accomplish. We can continue to take this even further. We still have the code that makes the ball bounce inside our `render` function. Let's take the bounce code and put it in `stepForward` as well:
```javascript
var Ball = function(x, y, radius, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.stepForward = function() {
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
// ...
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  context.closePath();
  context.fill();
  ball.stepForward();
  window.requestAnimationFrame(render);
};
```

If you try this, you'll notice an error. That's because in `stepForward` you are trying to access `context.canvas.width` and `context.canvas.height`, but `context` hasn't been defined yet! You can fix this simply by passing that variable to the method:
```javascript
var Ball = function(x, y, radius, xVelocity, yVelocity) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.stepForward = function(context) {
    // Now you have the context variable, so you can use it in the conditionals here
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
// ...
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  context.closePath();
  context.fill();
  ball.stepForward(context);
  window.requestAnimationFrame(render);
};
```

Now look at how much cleaner the render function is. And look at the ball class and see how it is maintaining its own data, as opposed to it all being modified directly from the `render` function. Next, I want you to move the code from `render` that draws the ball into the ball class. Done correctly, the `render` function could contain as few as three lines.


I know this is a bit of a tough concept, but once you get the hang of it, you'll feel so much more comfortable. MDN does a great job of doing a tutorial [HERE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript) as well if you want to look over theirs.