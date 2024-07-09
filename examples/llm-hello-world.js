/* 
   This program implements a very simple LLM application. 
   
   This app reads a prompt from the user (stdin) and prints out 
   the response from the LLM.

   Play around with the program. Change the system prompt. 
   Ask the LLM to act like your favorite fictional character inside the system prompt.
   
   Notice how this program is not a chat session with the LLM.
   Every time you use the program, your conversation starts from scratch.
   
   Can you think of a way to allow a user to have an entire conversation, where the LLM 
   remembers previous messages?.
*/

const { ChatOpenAI } = require("@langchain/openai");
const { HumanMessage, SystemMessage } = require("@langchain/core/messages");
const { StringOutputParser } = require("@langchain/core/output_parsers");

/* 
    We are using dotenv to load the OpenAI API key.
*/

const dotenv = require("dotenv");
dotenv.config();

const readline = require('node:readline');

/*
    Here, we configure the model that we want to use. 
    We will be using gpt-3.5-turbo, a very powerful model which 
    is great for LLM project prototyping.
*/
const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0
});

function runPrompt(prompt) {

    /* 
        This is the list of messages that will be sent to the LLM.
        The SystemMessage acts as the core instructions for our system.
        The HumanMessage is the message sent by the user and will include whatever is inside the "prompt" variable.
    */

    const messages = [
        new SystemMessage(`You are a helpful bot. You answer all messages with excitement and joy.`),
        new HumanMessage(prompt)
    ];


    model.invoke(messages).then((response) => {
        const parser = new StringOutputParser(response);

        const output = parser.invoke(response).then((output) => {
            console.log(`LLM: ${output}`);
        });
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

/* 
    Readline is a node.js module that provides an interface for reading data from streams (such as stdin).
    Here, we are using it to read the prompt from the user.
*/

rl.question(`Enter your prompt: `, (prompt) => {
    console.log(`Prompt: ${prompt}`);
    runPrompt(prompt);
    rl.close();
});
