let startedArray = [];

class RunningGames {

  static addGame(channel) {
    startedArray.push(channel);
  }

  static checkGame(channel) {
    return startedArray.indexOf(channel) > -1
  }

  static deleteGame(channel) {
    let index = startedArray.indexOf(channel);
    if (index > -1) {
      startedArray.splice(index, 1);
    }
  }

}

module.exports = RunningGames;