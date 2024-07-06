/*
    Some guidance:

1. Start by explanding from the llm-hellow-world.js example and simply change the system prompt to solve math equations.
2. If you're feeling ambitious, you can try to implement the second option.
3. For the second option, start by asking the LLM to implement a javascript function that implements what the user asked for.
4. You can then use the Function constructor to create a new function in memory.
5. After you have the function, you can ask the user again for some arguments to the function.
6. Finally, you can call the function with the arguments and print the result.
*/

/* 
    Example of creating a function with the Function constructor 
    Inside the function you will pass the name of the arguments and the function body as a string.
*/
const myFunction = new Function('a', 'b', 'return a + b');
console.log(myFunction(2, 3)); // 5
