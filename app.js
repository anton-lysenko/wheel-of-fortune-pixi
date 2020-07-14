"use strict";

var ctx = document.getElementById("mycanvas");
var app = new PIXI.Application({
  view: ctx,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "0x00000",
});
var loader = PIXI.Loader.shared;
var ticker = PIXI.Ticker.shared;
//used in classes
var rendererWidth = app.renderer.width,
    rendererHeight = app.renderer.height;
var rouletCenterX = (app.renderer.width - 300) / 2;
var rouletCenterY = (app.renderer.height - 300) / 2;

loader
  .add("bg", "assets/background.jpg")
  .add("extCircle", "assets/external_circle.png")
  .add("intCircle", "assets/internal_circle.png")
  .add("bottomImg", "assets/bottom.png")
  .add("yellowBtn", "assets/round-yellow.png")
  .add("spinner", "assets/spinner.png")
  .load(handleLoadComplete);

loader.onProgress.add(handleLoadProgress);
loader.onError.add(handleLoadError);
loader.onLoad.add(handleLoadAsset);

function handleLoadProgress(loader, resource) {
  console.log(loader.progress + "% loaded");
}

function handleLoadAsset(loader, resource) {
  console.log("asset loaded " + resource.name);
}

function handleLoadError() {
  console.error("load error");
}

function handleLoadComplete() {
  var backgroundImg = new PIXI.Sprite(loader.resources.bg.texture);
  var bgImgWidth = backgroundImg.width;
  backgroundImg.x = (rendererWidth - 800) / 2;
  backgroundImg.y = (rendererHeight - 600) / 2;
  app.stage.addChild(backgroundImg);

  FortuneWheel.init(app.stage, rendererWidth, rendererHeight);
  GameStatusPanel.addGameStatusComponent(app.stage, bgImgWidth, rendererWidth, rendererHeight);
  var buttonManager = new ButtonManager();
  buttonManager.initButtons(app.stage, rouletCenterX, rouletCenterY);

  ticker.autoStart = false;
  ticker.add(FortuneWheel.play);
}
