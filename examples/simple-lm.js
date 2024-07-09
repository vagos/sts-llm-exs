const tf = require('@tensorflow/tfjs');

/* Training Data Collection */
const text = 'hello world!$';
const chars = Array.from(new Set(text));

/* Whenever this model generates this character, inference will stop. */
const endChar = '$';

/* Tokenization */
/* In this model, each character in the training set is considered a single token.  */
const charToIndex = {};
chars.forEach((char, idx) => {
    charToIndex[char] = idx;
});

const indexToChar = {};
Object.keys(charToIndex).forEach(key => {
    indexToChar[charToIndex[key]] = key;
});

/* Model definition */
function creaateModel(contextSize, vocabSize) {
    const xs = [];
    const ys = [];

    for (let i = 0; i < text.length - contextSize; i++) {
        const inputChars = text.slice(i, i + contextSize);
        const outputChar = text[i + contextSize];
        xs.push(inputChars.split('').map(c => charToIndex[c]));
        ys.push(charToIndex[outputChar]);
    }

    const X = tf.oneHot(tf.tensor2d(xs, [xs.length, contextSize], 'int32'), vocabSize);
    const Y = tf.oneHot(tf.tensor1d(ys, 'int32'), vocabSize);

    const model = tf.sequential();
    model.add(tf.layers.lstm({ units: 20, inputShape: [contextSize, vocabSize], returnSequences: false }));
    model.add(tf.layers.dense({ units: vocabSize, activation: 'softmax' }));
    model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy' });

    model.contextSize = contextSize;
    model.vocabSize = vocabSize;

    return { X, Y, model };

}

function __showPredictionmap(prediction) {

    const predictionMap = {};
    prediction.dataSync().forEach((val, idx) => {
        predictionMap[indexToChar[idx]] = val;
    });
    console.error(predictionMap);
    console.error(`Most likely next character: '${indexToChar[prediction.argMax(1).dataSync()[0]]}'`);
}

/* Model Inference */
function generateText(model, seedText, length) {
    let output = seedText;
    let inputSeq = seedText.split('').map(c => charToIndex[c]);

    for (let i = 0; i < length; i++) {
        const inputTensor = tf.oneHot(tf.tensor2d([inputSeq], [1, model.contextSize], 'int32'), model.vocabSize);
        const prediction = model.predict(inputTensor);

        __showPredictionmap(prediction);

        const nextCharIndex = prediction.argMax(1).dataSync()[0];
        const nextChar = indexToChar[nextCharIndex];
        if (nextChar === endChar) {
            break;
        }
        output += nextChar;
        inputSeq = [...inputSeq.slice(1), nextCharIndex];
    }

    return output;
}

async function main() {

    const contextSize = 4;
    const vocabSize = chars.length;
    const { X, Y, model } = creaateModel(contextSize, vocabSize);

    model.summary();

    /* Model Training */
    await model.fit(X, Y, {
        epochs: 500,
        callbacks: {
            onEpochEnd: (epoch, log) => {
                if (epoch % 100 == 0) {
                    console.error(`Epoch ${epoch}: loss = ${log.loss}`);
                }
            }
        }
    });

    /* Here, we actually use the model to generate text. */
    const seedText = 'hell';
    console.log(`Generated text: ${generateText(model, seedText, 20)}`);
}

main();
