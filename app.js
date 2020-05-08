const canvas = document.querySelector(".js-canvas");
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.getBoundingClientRect().width;
const CANVAS_HEIGHT = canvas.getBoundingClientRect().height;

const KEY_RIGHT = 39;
const KEY_LEFT = 37;
const KEY_DOWN = 40;
const KEY_UP = 38;

const HEAD_WIDTH = 15;
const HEAD_HEIGHT = 15;
const FOOD_WIDTH = 5;
const FOOD_HEIGHT = 5;

const EAST = 'E';
const WEST = 'W';
const SOUTH = 'S';
const NORTH = 'N';

let gameOver = false;

class Snake {
    constructor() {
        this.x = CANVAS_WIDTH / 2
        this.y = CANVAS_HEIGHT / 2;
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
}

function draw(snake, foods) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    for (let { x, y, isActive } of foods) {
        if (isActive) {
            ctx.fillRect(x, y, FOOD_WIDTH, FOOD_HEIGHT);
        }
    }
    ctx.fillRect(snake.x, snake.y, HEAD_WIDTH, HEAD_HEIGHT);
}

function checkCollision(snake, foods) {
    for (const food of foods) {
        if (food.isActive) {
            if (food.x <= snake.x) {
                if (food.y <= snake.y) {
                    if ((snake.x - food.x >= FOOD_WIDTH)
                        || (snake.y - food.y >= FOOD_HEIGHT)) {
                        continue;
                    }
                } else {
                    if ((snake.x - food.x >= FOOD_WIDTH)
                        || (food.y - snake.y >= HEAD_HEIGHT)) {
                        continue;
                    }
                }
            } else {
                if (food.y <= snake.y) {
                    if ((food.x - snake.x >= HEAD_WIDTH)
                        || (snake.y - food.y >= FOOD_HEIGHT)) {
                        continue;
                    }
                } else {
                    if ((food.x - snake.x >= HEAD_WIDTH)
                        || (food.y - snake.y >= HEAD_HEIGHT)) {
                        continue;
                    }
                }
            }
            // console.log("snake", snake.x, snake.y);
            // console.log("food", foodX, foodY);
            // console.log("Collision!");
            food.isActive = false;
        }
    }
}

function init() {
    const foods = new Array(500);
    for (let i = 0; i < foods.length; i++) {
        foods[i] = {
            x: 0,
            y: 0,
            isActive: false
        };
    }
    const snake = new Snake();

    setInterval(() => {
        checkCollision(snake, foods);
        draw(snake, foods);
    }, 1);

    const foodCreation = setInterval(() => {
        if (gameOver) {
            clearInterval(foodCreation);
            return;
        }

        for (const food of foods) {
            if (!food.isActive) {
                food.x = Math.ceil(Math.random() * (CANVAS_WIDTH - FOOD_WIDTH));
                food.y = Math.ceil(Math.random() * (CANVAS_HEIGHT - FOOD_HEIGHT));
                food.isActive = true;
                break;
            }
        }
    }, 1000);


    window.addEventListener("keydown", event => { handleKeyDown(event, snake) });
    const move = setInterval(() => {
        moveSnake(snake);
        if (snake.x < 0 || snake.y < 0
            || snake.x + HEAD_WIDTH > CANVAS_WIDTH
            || snake.y + HEAD_HEIGHT > CANVAS_HEIGHT) {
            gameOver = true;
            clearInterval(move);
        }
    }, 10);
}

init();