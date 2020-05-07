const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext('2d');

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_UP = 38;

const HEAD_WIDTH = 15;
const HEAD_HEIGHT = 15;

const EAST = 'E';
const WEST = 'W';
const SOUTH = 'S';
const NORTH = 'N';

class Snake {
    constructor() {
        const { width, height } = canvas.getBoundingClientRect();
        this.x = width / 2
        this.y = height / 2;
        this.direction = WEST;
        this.tail = [];
    }
}

function handleKeyDown(event, snake) {
    switch (event.keyCode) {
        case KEY_RIGHT:
            if (snake.direction !== WEST) {
                snake.direction = EAST;
            }
            break;
        case KEY_LEFT:
            if (snake.direction !== EAST) {
                snake.direction = WEST;
            }
            break;
        case KEY_DOWN:
            if (snake.direction !== NORTH) {
                snake.direction = SOUTH;
            }
            break;
        case KEY_UP:
            if (snake.direction !== SOUTH) {
                snake.direction = NORTH;
            }
            break;
        default:
    }
}

function moveSnake(snake) {
    switch (snake.direction) {
        case EAST:
            snake.x += 1;
            break;
        case WEST:
            snake.x -= 1;
            break;
        case SOUTH:
            snake.y += 1;
            break;
        case NORTH:
            snake.y -= 1;
            break;
        default:
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(snake.x, snake.y, HEAD_WIDTH, HEAD_HEIGHT);
}

function init() {
    const snake = new Snake();
    window.addEventListener("keydown", event => { handleKeyDown(event, snake) });
    let move = setInterval(() => {
        moveSnake(snake);
        if (snake.x < 0 || snake.y < 0
            || snake.x + HEAD_WIDTH > canvas.width
            || snake.y + HEAD_HEIGHT > canvas.height) {
            clearInterval(move);
        }
    }, 10);
}

init();