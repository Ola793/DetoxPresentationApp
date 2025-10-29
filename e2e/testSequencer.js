const Sequencer = require("@jest/test-sequencer").default;

class AlphabeticalSequencer extends Sequencer {
  sort(tests) {
    // Sort tests alphabetically by file path
    const copyTests = Array.from(tests);
    return copyTests.sort((testA, testB) => {
      return testA.path > testB.path ? 1 : -1;
    });
  }
}

module.exports = AlphabeticalSequencer;
