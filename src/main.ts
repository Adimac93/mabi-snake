import "./style.css";
import { TableRenderer } from "./Renderer";
import { settings } from "./settings";
import { Game } from "./game";
import { Controls } from "./controls";

// TODO:
// - grace move
// - game over overlay (yoink confetti effect)

let lastTick = performance.now();

const controls = new Controls();
const renderer = new TableRenderer();
const game = new Game(controls, renderer);

function gameLoop() {
    const time = performance.now();
    const timeSinceLastTick = time - lastTick;
    if (timeSinceLastTick >= settings.tickLength) {
        lastTick = time;
        game.runTick();
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (ev) => {
    game.handleInput(ev);
});

controls.setActive(true);
controls.onstart = () => {
    game.setup();
};
controls.onupdatesize = () => {
    renderer.createPlayfield();
};
controls.onupdate = () => {
    game.updateScoreSource();
};

gameLoop();
