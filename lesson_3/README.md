#Animation

**At any point in the lesson, you can navigate to the `src` directory to see what you should have at the end of this lesson**

At this point, you are now drawing shapes to the canvas. The next step is getting them to move! Animations are performed in incremental steps, known from here on out as *frames*. At each frame, there are a few steps to perform:

1. Clear any shapes that have already been drawn. Without this step, things would appear to blur, as their previously drawn state would remain.
2. Draw shapes in their current states.
3. Make transformations as necessary, like moving the ball forward in x and/or y positions.
4. Repeat

The general idea is to have one function called for every frame. This function will complete the 4 steps listed above. We will use a function called `render`.


###Step 1
---
So for step 1 (clearing existing shapes), we will use a method of `context` called `clearRect`. This method clears the canvas using a specified rectangle. The four parameters to the method are:

1. Top-left x-coordinate of the rectangle
2. Top-left y-coordinate of the rectangle
3. Bottom-right x-coordinate of the rectangle
4. Bottom-right y-coordinate of the rectangle

To bring this together to clear the entire canvas:
```javascript
function render() {
  // Clear from the top-left of the canvas to the bottom-right
  // Step 1: Clear existing shapes
  context.clearRect(0, 0, canvas.width, canvas.height);
};
```

###Step 2
---
Step 2 is to draw the shapes in their current states. Animations often work be relying on their previous state, so for this reason, we have to create a data structure to hold the *state* of the ball that is going to be bouncing around. If you remember lesson 2, you will recall that when drawing the circle, there are x and y coordinates as well as a radius. These are *attributes* of the ball, that together make up the ball's *state*. 

 You will need to create an initial ball state for the animation to begin with, this is exactly the kind of thing a JavaScript object is used for:

```javascript
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
};
```

Note here that the ball object is defined outside of the `render` function. This is because the `render` function will repeat infinitely during the animation. If ball were defined inside that function, the data would reset every time `render` was called. For an animation to be interesting, these values have to change over the duration of the animation. Otherwise you just have a picture!


###Step 3
---
Step 3 is to transform the data of the object that is being animated. A ball in this case. If we want to make the ball move diagonally across the screen, we simply increase its x and y values by the same amount every time a new frame is rendered. 
```javascript
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
};
```

###Step 4
---
Now, you simply have to repeat the same process over and over again. 

Modern browsers have a built-in function that handles sequencing new frames. This function is called `requestAnimationFrame`. This function takes as an argument your function that is to be executed when you want to render a new frame. So we will pass our `render` function to `requestAnimationFrame` to draw each frame. This concept of using a function as an argument can be kind of tricky, so I've gone into more detail [here](https://github.com/bholzer/Bouncing-Ball-Animation-Tutorial/tree/master/lesson_3/first_class.md).
```javascript
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
```

The call to `window.requestAnimationFrame(render)` essentially schedules a new call to `render` when a new frame is ready to be rendered. This is what makes the animation loop infinitely: a call to `render` will schedule another call to `render` etc.

###All together now!
---
The only thing left to do is call `render` to initiate the infitite looping.

If we put everything together, we now have a perfectly working animation:

```javascript
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
```






