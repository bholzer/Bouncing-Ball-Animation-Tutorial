#Using functions as arguments/parameters of other functions.
---
This is a weird concept, but it will change the way you think about JavaScript. It's a very important concept to try and grasp.

Functions can be called with arguments like you would expect: with numbers, strings, booleans, etc. Think about a function that takes two arguments and returns their sum:
```javascript
function add(num1, num2) {
  return num1 + num2;
};
```

Now for the weird part: functions are just like any other object and can be passed to a function just as easily as numbers or strings.

A function is known as a *callback* if it is passed to another function and called from within that function. Here is an example:
```javascript
// Here, the function "add" is being passed as an argument to the function "compute"
compute(5, 10, add);

// This function simply acts as a middle-man 
function compute(num1, num2, callback) {
  // The "callback" variable here is a reference to the function "add"
  // So consider this equivalent to "return add(num1, num2)"
  return callback(num1, num2);
};

function add(num1, num2) {
  return num1 + num2;
};
```
`compute(5, 10, add)` will return 15
