const keystrokeDelayMs = [25, 75];
const nextInputDelayMs = [500, 1500];

const inputFields = document.querySelectorAll('input');
const inputsArray = Array.from(inputFields);

console.log("input elements", inputFields);

function getRandomMsDelay(lowerBoundMs, upperBoundMs) {
    return Math.floor(Math.random() * (upperBoundMs - lowerBoundMs) + lowerBoundMs);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

async function typeCharacter(sentence, textboxElement) {
    let index = 0;
    const typingPromise = new Promise(resolve => {
        async function typeNext() {
            if (index < sentence.length) {
                textboxElement.value += sentence[index];
                index++;
                setTimeout(typeNext, getRandomMsDelay(keystrokeDelayMs[0], keystrokeDelayMs[1])); // Adjust typing speed (in milliseconds)
            } else {
                resolve(); // Resolve the promise when typing is done
            }
        }
        typeNext(); // Next character
    });
    await typingPromise;
}


async function backSpaceText(textboxElement) {
    let index = textboxElement.value.length - 1;
    const backSpacePromise = new Promise(resolve => {
        async function backSpaceNext() {
            if (index >= 0) {
                textboxElement.value = textboxElement.value.substring(0, index);
                index--;
                setTimeout(backSpaceNext, getRandomMsDelay(nextInputDelayMs[0], nextInputDelayMs[1])); // Adjust backspacing speed (in milliseconds)
            } else {
                resolve();
            }
        }
        backSpaceNext();
    });
    await backSpacePromise;
}

// 

async function mainLoop() {
    let shuffledInputs = shuffleArray(inputsArray);

    for (let i = 0; i < shuffledInputs.length; i++) {
        const input = shuffledInputs[i];
        console.log("input", input);
        await typeCharacter(input.placeholder, input);
        await new Promise((resolve) => setTimeout(resolve, getRandomMsDelay())); // Wait 3s before next


        //await backSpaceText(input);
        // await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before starting again
    }



    // await typeCharacter(myArray[Math.floor(Math.random() * myArray.length)]);
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before backspacing
    // await backSpaceText();
    // await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before starting again
    // await mainLoop(); // Recursive call
}

mainLoop();