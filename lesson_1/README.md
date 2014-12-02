#Creating the correct project structure and wiring everything up
When you write a javascript application, you should follow a project directory structure that makes keeping track of things easy. I stick to a simple, easy to follow structure. Our project will look like this:

```
- ball_animation
|- index.html
|- scripts
 |- application.js
```

1. This means you will have a folder (from here on out to be referred to as a directory) named `ball_animation`.
2. That directory will have an html file named `index.html`, and a *subdirectory* named `scripts`.
3. And finally, the `scripts` directory will contain a file named `application.js`



####index.html
---
This file is what brings everything together for your application to work properly. It will include all of your JavaScript files that do all the work.

There are two ways to include JavaScript in an HTML page. You can use the `script` tag to either grab an external JavaScript file, or you can place inline javascript right between the tags.

**Inline JavaScript:**
```
<script>
  for(var i = 0; i < 10; i++) {
    //Do something
  }
</script>
```

**External JavaScript:**
```
<script type="text/javascript" src="scripts/application.js"></script>
```


