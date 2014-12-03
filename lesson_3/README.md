#Animation

**At any point in the lesson, you can navigate to the `src` directory to see what you should have at the end of this lesson**

At this point, you are now drawing shapes to the canvas. The next step is getting them to move! Animations are performed in incremental steps, known from here on out as *frames*. At each frame, there are a couple steps to perform:

1. Clear any shapes that have already been drawn. Without this step, things would appear to blur, as their previously drawn state would remain.
2. Draw and make transformations as necessary, like moving the ball forward in x and/or y positions.
3. Redraw, this time with the new transformations applied.

Animations often work be relying on their previous state, so for this reason, we have to create a data structure to hold the *state* of the ball that is going to be bouncing around. This is exactly the kind of thing a JavaScript object is used for.

If you remember lesson 2, you will recall that when drawing the circle, there are x and y coordinates as well as a radius. These are *attributes* of the ball, that together make up the ball's *state*. In JavaScript, this structure will look like this:
```javascript
var ball = {
  x: 0,
  y: 0,
  radius: 50
};
```
For an animation to be interesting, these values have to change over the duration of the animation. Otherwise you just have a picture!

####Animating new frames
---
The general idea is to have one function called for every frame. This function will complete the 3 steps listed above. We will use a function called `render`.

Modern browsers have a built-in function that handles sequencing new frames. This function is called `requestAnimationFrame`. This function takes as an argument your function that is to be executed when you want to render a new frame. So we will pass our `render` function to `requestAnimationFrame` to draw each frame. This concept of using a function as an argument can be kind of tricky, so I've gone into more detail [here](https://github.com/bholzer/Bouncing-Ball-Animation-Tutorial/tree/master/lesson_3/first_class.md).

So for step 1 (clearing existing shapes), we will use a method of `context` called `clearRect`. This method clears the canvas using a specified rectangle. The four parameters to the method are:

1. Top-left x-coordinate of the rectangle
2. Top-left y-coordinate of the rectangle
3. Bottom-right x-coordinate of the rectangle
4. Bottom-right y-coordinate of the rectangle

To bring this together to clear the entire canvas:
```javascript
function render() {
  // Clear from the top-left of the canvas to the bottom-right
  // Step 1 from above
  context.clearRect(0, 0, canvas.width, canvas.height);

  // This is that tricky bit that I wrote a little extra about.
  // You are passing the render function, which you are already inside of, to requestAnimationFrame
  // When requestAnimationFrame is ready to render the next frame, it will call the render function, which will then clear the canvas again and request another animation frame.
  // This will go on infinitely unless something external stops it.
  // This is what performs step 3, the redraw.
  window.requestAnimationFrame(render);
};
```

You'll notice that in the above code snippet, there's nothing to accomplish step 2, the transfomations. This is where the actual movement goes on, but will be easiest to see with everything put together:

```javascript
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
```






