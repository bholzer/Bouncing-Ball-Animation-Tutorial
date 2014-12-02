#Creating a canvas and drawing stuff

**At any point in the lesson, you can navigate to the `src` directory to see what you should have at the end of this lesson**

Now you have your JavaScript and HTML files wired together and ready to communicate, so it's time to get to drawing.

####Adding a canvas to your `index.html` file

A `canvas` element is an HTML element that allows you to draw just about anything using JavaScript. It's a relatively new technology, but it's pretty powerful stuff. All you need to do to your HTML file to get started is add the element inside of the `body` tag:
```
<body>
  <canvas id="canvas"></canvas>
</body>
```

You'll notice the `id` attribute on the `canvas` element. This is not necessary, but it makes grabbing that element from JavaScript much simpler. You'll see how it works when we get to the JavaScript part.

[Learn more about the canvas element here](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> A quick note about the link above: MDN is the Mozilla Developer Network. Mozilla used to be something else, but they are the original creators of the JavaScript language. MDN is an excellent resource. If you need to know something about JavaScript, search for it there before anywhere else.

####Making your first drawing using JavaScript

In your `application.js` file, you will now start drawing to the canvas! There are going to be a couple things here that you may not understand at first, but I will try to explain them. Your file should look like this (with comments added to explain what is happening):
```
window.onload = function() {
  // This is why we added the id attribute to the canvas HTML element, because we can now grab it using this simple, built-in function.
  // Create a variable that contains the canvas element.
  var canvas = document.getElementById("canvas");

  // getContext is a method of the canvas element that provides an interface to allow drawing to the cavas.
  // The context variable is what you will use for all your drawing
  var context = canvas.getContext("2d");

  // Now let's make the canvas fit the entire browser window
  // window is a built-in object that contains a lot of information about the browser window, including dimensions
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
```

The most confusing part here may be the `window.onload = function() {}` looking thing. This is necessary to understand. When the JavaScript file is included in the `head` of the HTML, the rest of the HTML hasn't finished loading yet. Your JavaScript code will executed before the `canvas` element even exists. This is a problem, because when you try to do `var canvas = document.getElementById("canvas");`, you are trying to grab an element that isn't there! `window.onload` solves this by delaying the execuction of a function until the entire document has loaded.

So by wrapping your code in a function that runs when the entire HTML document has loaded, you can now get the `canvas` element like you want.

Open your `index.html` file. You should now see a circle at the top left! Now, I want you to try and center this circle on the page. You know the height and width of the canvas, and you know how to put the circle wherever you want by changing the x and y parameters of the arc. Put that circle right in the center. When you have finished this, put `application.js` your code at https://gist.github.com/ and send me the link.
