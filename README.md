# Introduction

Before devling into the projects, take some time to study 
the code in `llm-hello-world.js`. 
It's a very simple program that takes input from a user (a prompt),
and passed it to an LLM, finally printing the LLM's response to the console.

To run the program you need to have Node.js installed.
Then, you can run the following commands:

```bash
npm install
node llm-hello-world.js
```

This is the basis for all LLM-based applications!
Try and play around with the promopt, by asking the LLM to perform different tasks.
Then, use the code (and expand it), to implement one of the following exercises/projects.

# Exercises

Pick one of the following exercises. Please submit your solutions to XXX before XXX (deadline).

For some of the exercises, stencil code has been provided.
Try and be creative with your solutions.
Its okay if functionality is not completely finished.

Prepare a short report (~200-250 words) where you need to include:

1. The project you picked
2. How you designed and implemented your system
3. Describe a possible future evaluation plan. Mention experiments you would run.

## Dynamic Calculator

Let's build a calculator, but with a twist. 
This time, we won't implement any math functions.
Instead we'll have an LLM do it for us.

You can build your application in two alternative ways:

1. The user enters a math equation and the LLM responds with the numerical answer (easier).
2. The user explains a mathematical function they want to add to their calculator. 
   The LLM implements it and create a Javascript function with the given functionality.
   The user can then provide the arguments to that function and the end result will be printed. (harder).


## Convert Unstructured Input into Structured Data

LLMs are very powerful "translators".
They can both translate text from one natural language to another,
but also "translate" (transform) text from one form to another.
Your task is to create a program which will take as input a paragraph
from a character spearking from a play and will output a JSON object
with the following schema:

```json
{
    "subject": "...",
    "object": "...",
    "action": "..."
}
```

For example, given this snippet:

```
We are accounted poor citizens, the patricians good.
```

Your program will output this:

```json
{
    "subject": "We",
    "object": "poor citizens",
    "action": "are accounted"
}
```

Note down how accurate the LLM is at doing this transformation.

Use the `unstructured2structured.js` file as a stencil.

## Generate Incorrect Shell Code

LLMs can be great sources of training or testing data.
Your taks is to create an application that produces slightly incorrect **shell scripts**.
A user will be able to give as an argument how many lines the shell script should be.

## Markov Chains

A very primitive form of a language model is one using a [markov chain](https://en.wikipedia.org/wiki/Markov_chain) behind the scenes.
This kind of model generates the next token based only the current token in the sequence.
You can use the [`Tiny Shakespeare`](https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt) dataset to train your model.

1. Build your markov model inside the `markov.js` file. Alternatively, you can use the `llm` cli utility and download the `llm-markov` plugin.
2. Start generating text using that model.
3. Write a program where two markov models talk to each-other.
   Some approaches to this:
    * Have a single Markov model that generates the entire conversation.
    * Have two Markov models taking turns producing text.

## Chat Time Travel using Version Control

__Note: This project requires familiarity with `git`__

Create an app that allows the user to strike a conversation with an LLM.
Whenever a message is exchanged, append it to a file.
Your app, when starting should create a git repository using `git init`
and commit the file using `git commit`.

Using this, you will be able to traverse the timeline of the conversation between the user 
and the LLM. 
A user will be able to branch-off the conversation (using `git branch`) and see where it goes.
An implementation of this project can later become a fault-tolerrant LLM-based 
system, where mistakes in the LLM's sequence of actions could be reverted
and replaced.
