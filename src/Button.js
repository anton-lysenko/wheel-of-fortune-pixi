function Button(buttonTexture, betValue, posX, posY) {
  this.betText = createTextTexture(String(betValue), 45, 45);
  this.button = new PIXI.Sprite(buttonTexture);
  this.button.buttonMode = true;
  this.button.interactive = true;
  this.button.addChild(this.betText);
  this.button.betValue = betValue;
  this.button.position.set(posX, posY);
}

Button.prototype.disable = function () {
  this.button.buttonMode = false;
  this.button.interactive = false;
  this.button.tint = 0x333333;
  this.betText.tint = 0x333333;
};

Button.prototype.enable = function () {
  this.button.buttonMode = true;
  this.button.interactive = true;
  this.button.tint = 0xffffff;
  this.betText.tint = 0xffffff;
};