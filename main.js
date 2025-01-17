// define a few globals here
var stage = null;
var renderer = null;
var renderWidth = 800;
var renderHeight = 600;

var tilemap = null;
var menu = null;
var menuBarWidth = 120;

function Main(tilesPath, w, h){
  // For zoomed-in pixel art, we want crisp pixels instead of fuzziness
  PIXI.settings.SCALE_MODES = PIXI.SCALE_MODES.NEAREST;

  // Create the stage. This will be used to add sprites (or sprite containers) to the screen.
  stage = new PIXI.Container();
  // Create the renderer and add it to the page.
  // (autoDetectRenderer will choose hardware accelerated if possible)
  if(w != 0 && h != 0){
    renderWidth = w;
    renderHeight = h;
  }
  renderer = PIXI.autoDetectRenderer(renderWidth, renderHeight);

  // Set up the asset loader for sprite images with the .json data and a callback
  var tileAtlas = [tilesPath + "tiles.json"];

  var loader = PIXI.Assets;
  loader.load(tileAtlas).then(() => {
    onLoaded();
  });


  return renderer.view;
}

// called when sprites are finished loading
function onLoaded(){
  tilemap = new Tilemap(64, 50);
  tilemap.position.x = menuBarWidth;
  stage.addChild(tilemap);

  menu = new Menu();
  stage.addChild(menu);
  // zoom in on the starting tile
  tilemap.selectTile(tilemap.startLocation.x, tilemap.startLocation.y);
  tilemap.zoomIn();
  // begin drawing
  requestAnimationFrame(animate);
}

function onError() {
  console.log("Error while loading resources!");
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}
