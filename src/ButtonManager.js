function ButtonManager() {
  var yellowBtn1, yellowBtn3, yellowBtn5;

  this.initButtons = function (appStage, rouletCenterX, rouletCenterY) {
    yellowBtn1 = new Button(
      loader.resources.yellowBtn.texture,
      1,
      rouletCenterX,
      rouletCenterY + 350
    );
    appStage.addChild(yellowBtn1.button);
    yellowBtn3 = new Button(
      loader.resources.yellowBtn.texture,
      3,
      rouletCenterX + 105,
      rouletCenterY + 350
    );
    appStage.addChild(yellowBtn3.button);
    yellowBtn5 = new Button(
      loader.resources.yellowBtn.texture,
      5,
      rouletCenterX + 210,
      rouletCenterY + 350
    );
    appStage.addChild(yellowBtn5.button);
    yellowBtn1.button.on("pointerdown", (event) => onClick(yellowBtn1));
    yellowBtn1.button.on("pointerover", (event) => onPointerOver(yellowBtn1));
    yellowBtn1.button.on("pointerout", (event) => onPointerOut(yellowBtn1));
    yellowBtn3.button.on("pointerdown", (event) => onClick(yellowBtn3));
    yellowBtn3.button.on("pointerover", (event) => onPointerOver(yellowBtn3));
    yellowBtn3.button.on("pointerout", (event) => onPointerOut(yellowBtn3));
    yellowBtn5.button.on("pointerdown", (event) => onClick(yellowBtn5));
    yellowBtn5.button.on("pointerover", (event) => onPointerOver(yellowBtn5));
    yellowBtn5.button.on("pointerout", (event) => onPointerOut(yellowBtn5));
  };

  function onClick(object) {
    var isGameOver, isRestart;

    GameStatusPanel.setUserNumber(object.button.betValue);
    GameStatusPanel.setBet();
    GameStatusPanel.updateWinBalanceText();
    disableButtons()
    ticker.start();
    
    setTimeout(function () {
      ticker.stop();
      GameStatusPanel.setWheelNumber(FortuneWheel.getWinNumber());
      isGameOver = GameStatusPanel.processGameResult();
      if (!isGameOver) {
        enableButtons();
      } else {
        //Show game over popup
        isRestart = confirm("Game over. Would you like to restart?");
        if (isRestart) {
          location.reload();
        }
      }
    }, 3000);
  }

  function disableButtons() {
    yellowBtn1.disable();
    yellowBtn3.disable();
    yellowBtn5.disable();
  }

  function enableButtons() {
    yellowBtn1.enable();
    yellowBtn3.enable();
    yellowBtn5.enable();
  }

  function onPointerOver(object) {
    object.button.tint = 0x666666;
  }

  function onPointerOut(object) {
    object.button.tint = 0xffffff;
  }
}
