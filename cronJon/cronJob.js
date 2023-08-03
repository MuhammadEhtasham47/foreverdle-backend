const totalWordsArray = require("../SortedWordsData");
const gameArray = require("../model/gameArray.model");

function getRandomWords(wordArray, numWords) {
  const shuffledArray = wordArray.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, numWords);
}

const arrayUpdateScenario = async () => {
  const numWordsToChoose = 20;

  try {
    // Fetch the document with wordsArray
    let array = await gameArray.findOne({});

    if (!array) {
      console.log(`Document not found.`);
      return;
    }

    const randomWords = getRandomWords(totalWordsArray, numWordsToChoose);

    // Update the document with the new words array
    await gameArray.updateOne({}, { $set: { wordArray: randomWords } });

    console.log(`Words updated successfully.`);
  } catch (error) {
    console.error(`Error updating words:`, error);
  }
};

module.exports = { arrayUpdateScenario };
