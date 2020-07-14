var GameStatusPanel = (function () {
  var balanceText, betText, winText, blackRectangle;
  var balance = 200;
  var bet = 5;
  var win = 0;
  var selectedUserNumber = null;
  var wheelNumber = null;

  function updateBalance() {
    switch (selectedUserNumber) {
      case 1:
        win = bet * 2;
        break;
      case 3:
        win = bet * 4;
        break;
      case 5:
        win = bet * 6;
        break;
      default:
        win = 0;
    }
    if (win > 0) {
      balance = balance + win;
    }
  }

  function setBet() {
    balance -= 5;
    win = 0;
  }

  function addGameStatusComponent(
    appStage,
    bgImgWidth,
    rendererWidth,
    rendererHeight
  ) {
    balanceText = createTextTexture("Balance: " + balance, (rendererWidth - 800) / 2 + 170, 740);
    betText = createTextTexture("Bet: " + bet, (rendererWidth - 800) / 2 + 490, 740);
    winText = createTextTexture("Win: " + win, (rendererWidth - 800) / 2 + 670, 740);
    blackRectangle = new PIXI.Graphics();
    blackRectangle.beginFill(0x00000);
    blackRectangle.drawRect(0, 0, bgImgWidth, 100);
    blackRectangle.endFill();
    blackRectangle.alpha = 0.5;
    blackRectangle.position.set(
      (rendererWidth - 800) / 2,
      (rendererHeight + 490) / 2
    );

    appStage.addChild(blackRectangle);
    appStage.addChild(balanceText);
    appStage.addChild(betText);
    appStage.addChild(winText);
  }

  function updateWinBalanceText() {
    balanceText.text = "Balance: " + balance;
    winText.text = "Win: " + win;
  }

  function setUserNumber(value) {
    selectedUserNumber = value;
  }

  function setWheelNumber(value) {
    wheelNumber = value;
  }

  function processGameResult() {
    if (selectedUserNumber === wheelNumber) {
      updateBalance();
      updateWinBalanceText();
    }
    if (balance >= 5) {
      return false;
    } else {
      return true;
    }
  }

  return {
    processGameResult: processGameResult,
    setWheelNumber: setWheelNumber,
    setUserNumber: setUserNumber,
    updateWinBalanceText: updateWinBalanceText,
    addGameStatusComponent: addGameStatusComponent,
    setBet: setBet,
  };
})();
