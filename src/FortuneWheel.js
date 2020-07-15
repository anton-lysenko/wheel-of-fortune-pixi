var FortuneWheel = (function () {
  // Array, for drawing numbers on the wheel
  var wheelNumbers = [3, 1, 1, 1, 5, 3, 5, 1, 3, 3, 1, 1];
  // Array, for searching wheelNumber value
  var wheelNumbersWithOffset = [3, 1, 5, 3, 5, 1, 1, 1, 3, 1, 1, 3];
  var animationSteps = 0;
  var currentWinPosition = 0;
  var angleStep = 0;
  var extCircleImg, intCircleImg;

  function init(appStage, rendererWidth, rendererHeight) {
    var bottomImg = new PIXI.Sprite(loader.resources.bottomImg.texture);

    bottomImg.x = (rendererWidth - 207) / 2; //207 own height,
    bottomImg.y = (rendererHeight - 180) / 2 + 135; //180 own width,
    appStage.addChild(bottomImg);

    extCircleImg = new PIXI.Sprite(loader.resources.extCircle.texture);
    extCircleImg.anchor.x = 0.5;
    extCircleImg.anchor.y = 0.5;

    sectoredWheelContainer = new PIXI.Container();
    sectoredWheelContainer.width = 300;
    sectoredWheelContainer.height = 300;
    sectoredWheelContainer.pivot.set(0.5, 0.5);
    sectoredWheelContainer.angle = 15;
    for (var i = 0; i < wheelNumbers.length; i++) {
      var posX = 105 * Math.cos(degToRadians(30 * i));
      var posY = 105 * Math.sin(degToRadians(30 * i));
      var textNode = getWheelNumberText(
        String(wheelNumbers[i]),
        posX,
        posY,
        degToRadians(30 * i)
      );
      sectoredWheelContainer.addChild(textNode);
    }
    sectoredWheelContainer.position.set(0, 0);
    extCircleImg.addChild(sectoredWheelContainer);
    extCircleImg.position.set(
      rouletCenterX + 150,
      (rendererHeight - 600) / 2 + 50 + 150
    );
    appStage.addChild(extCircleImg);

    intCircleImg = new PIXI.Sprite(loader.resources.intCircle.texture);
    intCircleImg.x = (rendererWidth - 108) / 2 + 54;
    intCircleImg.y = (rendererHeight - 600) / 2 + 150 + 50; //150 radius of extCircle, 50 top padding of extCircle, 54 intCircleRadius
    intCircleImg.anchor.x = 0.5;
    intCircleImg.anchor.y = 0.5;
    appStage.addChild(intCircleImg);

    spinnerImg = new PIXI.Sprite(loader.resources.spinner.texture);
    spinnerImg.x = (rendererWidth - 40) / 2; // 40 spinner width
    spinnerImg.y = (rendererHeight - 600) / 2; //600 bg height, 80 spinner height
    appStage.addChild(spinnerImg);
  }

  function play() {
    var random = getRandomInt(1, 5);

    if (angleStep === 0) {
      extCircleImg.angle += 15;
      intCircleImg.angle += 15;
      angleStep = 30;
    } else {
      extCircleImg.angle += angleStep * random;
      intCircleImg.angle += angleStep * random;
      animationSteps += random;
    }
  }
 //lohic for searching win number on the wheel
  function getWinNumber() {
    for (var i = 0; i < animationSteps; i++) {
      if (currentWinPosition < 11) {
        currentWinPosition++;
      } else {
        currentWinPosition = 0;
      }
    }
    animationSteps = 0;
    return wheelNumbersWithOffset[currentWinPosition];
  }

  return {
    init: init,
    getWinNumber: getWinNumber,
    play: play,
  };
})();
