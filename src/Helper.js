function createTextTexture(textValue, posX, posY) {
  var basicText = new PIXI.Text(textValue, { fill: "white" });
  basicText.anchor.set(0.5, 0.5);
  basicText.position.set(posX, posY);

  return basicText;
}

function getWheelNumberText(textValue, posX, posY, rotation) {
  var numText = new PIXI.Text(textValue, { fill: "black" });
  numText.anchor.set(0.5, 0.5);
  numText.position.set(posX, posY);
  numText.rotation = rotation + Math.PI / 2;

  return numText;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}

function degToRadians(deg) {
  return deg * (Math.PI / 180);
}
