const unstructuredSnippets = [
    `HASTINGS:
On what occasion, God he knows, not I,
The queen your mother, and your brother York,
Have taken sanctuary: the tender prince
Would fain have come with me to meet your grace,
But by his mother was perforce withheld.`,

    `LUCENTIO:
Tell me thine first.`,

    `MERCUTIO:
That's as much as to say, such a case as yours
constrains a man to bow in the hams.`,

    `MARIANA:
Neither, my lord.`,

    `ANTONIO:
Do you not hear me speak?`,

    `Second Lady:
And why so, my lord?`,

    `BENVOLIO:
Come, he hath hid himself among these trees,
To be consorted with the humorous night:
Blind is his love and best befits the dark.`,

    `ROMEO:
How well my comfort is revived by this!`,

    `Nurse:
And from my soul too;
Or else beshrew them both.`,

    `COMINIUS:
Well, well, no more.`
]

/* 
    Modify the below function to use an LLM model to convert the unstructured text to structured text.

    The schema for the structured text is as follows:
{
    "subject": "...",
    "object": "...",
    "action": "..."
}

Try and analyse the snippets yourself and compare the LLM's answers to what you come up with.

*/

function unstructured2structured(snippet) {
    return snippet;
}

for (snippet of unstructuredSnippets) {
    console.log(snippet)
    console.log('---')
    console.log(unstructured2structured(snippet))
}
