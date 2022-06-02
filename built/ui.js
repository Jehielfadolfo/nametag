"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chooseBackgroundImage = void 0;
const SCREEN_HEIGHT = 1.5;
const SCREEN_SCALE = 0.5;
const BACKGROUND_IMAGES = ["tile03.png"];
const BACKGROUND_TEXTURE_SCALE = { x: 4, y: 2 }; // sets how often the pattern repeats--bigger is more tiles. Tiles are square but screen is ~2:1
const BACKGROUND_WIDTH = 7.8;
const BACKGROUND_HEIGHT = 4.38;
const BACKGROUND_DEPTH = 0.02;
let backgroundImage;
let backgroundImageBrightness = 0.3; // remember to update the README
function chooseBackgroundImage(params) {
    let index = Number(params.bg);
    let total = BACKGROUND_IMAGES.length;
    let brightness = Number(params.brt);
    if (index > 0 && index < total)
        backgroundImage = BACKGROUND_IMAGES[index - 1];
    else // randomly choose one by default
        backgroundImage = BACKGROUND_IMAGES[Math.floor(Math.random() * BACKGROUND_IMAGES.length)];
    if (brightness > 0 && brightness < 1)
        backgroundImageBrightness = brightness;
}
exports.chooseBackgroundImage = chooseBackgroundImage;
//# sourceMappingURL=ui.js.map