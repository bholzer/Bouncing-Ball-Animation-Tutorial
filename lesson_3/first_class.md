#Using functions as arguments/parameters of other functions.
---
This is a weird concept, but it will change the way you think about JavaScript. It's a very important concept to try and grasp.

So functions can be called with arguments like you would expect. Think about a function that takes two arguments and returns their sum:
```javascript
function add(num1, num2) {
  return num1 + num2;
};
```

Now for the weird part: functions are just like any other object and can be passed to a function just as easily as numbers or strings.

A function is known as a *callback* if it is passed to another function and called from within that function. Here is an example:
```javascript
function timesTwo(n) {
  return n * 2;
};

function add(num1, callback) {
  // Since callback is actually the function timesTwo right here,
  // this is equivalent to:
  // return num1 + timesTwo(num1);
  return num1 + callback(num1);
};

// Here, the function timesTwo is being passed to the function add
add(5, timesTwo);
```