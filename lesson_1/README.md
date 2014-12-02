#Creating the correct project structure and wiring everything up

**At any point in the lesson, you can navigate to the `src` directory to see what you should have at the end of this lesson**

When you write a JavaScript application, you should follow a project directory structure that makes keeping track of things easy. I stick to a simple, easy to follow structure. Our project will look like this:

```
- ball_animation
|- index.html
|- scripts
 |- application.js
```

1. This means you will have a folder (from here on out to be referred to as a directory) named `ball_animation`.
2. That directory will have an HTML file named `index.html`, and a *subdirectory* named `scripts`.
3. And finally, the `scripts` directory will contain a file named `application.js`. This directory should contain all the scripts that you write for the given project

Create this structure on your computer now, it should be easiest using Sublime Text.



####index.html
---
This file is what brings everything together for your application to work properly. It will include all of your JavaScript files that do all the work.

There are two ways to include JavaScript in an HTML page. You can use the `script` tag to either grab an external JavaScript file, or you can place inline JavaScript right between the tags.

**Inline JavaScript:**
```
<html>
  <head>
    <script>
      for(var i = 0; i < 10; i++) {
        //Do something
      }
    </script>
  </head>
</html>
```

**External JavaScript:**
```
<html>
  <head>
    <script type="text/javascript" src="scripts/application.js"></script>
  </head>
</html>
```


It is generally a good idea to keep things as separate as possible, so to keep from having a bunch of JavaScript inside of your HTML, it is generally best to include from an external file.

It is important that the `src` *attribute* of that `script` tag be relative to the position of the `index.html` file. So, for example, if the `application.js` file was in the same directory as `index.html`, and not in a separate scripts directory, it would look like this instead:
```
<script type="text/javascript" src="application.js"></script>
```

Your `index.html` file should look exactly like this:
```
<html>
  <head>
    <script type="text/javascript" src="scripts/application.js"></script>
  </head>
  <body>
  </body>
</html>
```

You'll notice here that I added an empty `body` tag to the file. This is because an HTML file should contain, at the bare minimum, the `html`, `head`, and `body` tags. Put these into every HTML file you create. 


####application.js
---
This is the file that is going to contain all of your JavaScript code. For now, we are just going to print "Hello World!" to the page to make sure everything is wired up correctly.

Your `application.js` file should look only like this for now:

```
document.write("Hello World!");
```
