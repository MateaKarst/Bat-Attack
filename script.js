// to state that this is a canvas project 
// to get the built in methods suggested
/** @type {HTMLCanvasElement} */

// this.speed = Math.random() * 4 - 2;
// random number between 2 and -2
// bc -2 sets the start n 4 the range
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width = 500;
const canvasHeight = canvas.height = 1000;

const enemyImage = new Image();
const enemiesArray = [];
let gameFrame = 0;

let numberOfEnemies = 10;
let enemyToCreate = 4;

let enemyImagesArray = [
    {
        number: 1,
        constructor: {
            speedRange: 4,
            speedMin: -2,
            spriteWidth: 293,
            spriteHeight: 155,
            sizeFactor: 2.5,
            flapRange: 3,
            flapMin: 1,
            angle: 0,
            angleSpeed: 0,
            angleSpeedMin: 0,
            curve: 0,
            curveMin: 0,
        },
        update: {
            xMin: - 2.5,
            xRange: 5,
            xOperator: "+=",
            yMin: -2.5,
            yRange: 5,
            yOperator: "+=",
        },
    },
    {
        number: 2,
        constructor: {
            speedRange: 4,
            speedMin: 1,
            spriteWidth: 266,
            spriteHeight: 188,
            sizeFactor: 2.5,
            flapRange: 3,
            flapMin: 1,
            angle: 0,
            angleSpeed: 0.2,
            angleSpeedMin: 0,
            curve: 7,
            curveMin: 0,
        },
        update: {
            xMin: - 2.5,
            xRange: 5,
            yMin: -2.5,
            yRange: 5,
        },
    },
    {
        number: 3,
        constructor: {
            speedRange: 4,
            speedMin: 1,
            spriteWidth: 218,
            spriteHeight: 177,
            sizeFactor: 2.5,
            flapRange: 3,
            flapMin: 1,
            angle: 0,
            angleSpeed: 1.5,
            angleSpeedMin: 0.5,
            curve: 200,
            curveMin: 50,
        },
        update: {
            xMin: - 2.5,
            xRange: 5,
            yMin: -2.5,
            yRange: 5,
        },
    },
    {
        number: 4,
        constructor: {
            speedRange: 4,
            speedMin: 1,
            spriteWidth: 213,
            spriteHeight: 213,
            sizeFactor: 2.5,
            flapRange: 3,
            flapMin: 1,
            angle: 0,
            angleSpeed: 1.5,
            angleSpeedMin: 0.5,
            curve: 200,
            curveMin: 50,
        },
        update: {
            xMin: - 2.5,
            xRange: 5,
            yMin: -2.5,
            yRange: 5,
        },
    },
];

class Enemy {
    constructor(i) {
        this.animationIndex = i; // Store the animation index
        this.init(); // Initialize the enemy properties based on the animation
    }

    init() {
        const config = enemyImagesArray[this.animationIndex].constructor;

        this.image = new Image();
        this.image.src = `images/enemy${enemyImagesArray[this.animationIndex].number}.png`;
        this.speed = Math.random() * config.speedRange + config.speedMin;
        this.spriteWidth = config.spriteWidth;
        this.spriteHeight = config.spriteHeight;
        this.width = this.spriteWidth / config.sizeFactor;
        this.height = this.spriteHeight / config.sizeFactor;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * config.flapRange - config.flapMin);
        this.angle = Math.random() * config.angle;
        this.angleSpeed = Math.random() * config.angleSpeed + config.angleSpeedMin;
        this.curve = Math.random() * config.curve + config.curveMin;
        this.newX = Math.random() * this.width;
        this.newY = Math.random() * this.height;
        this.interval = Math.floor(Math.random() * 200 + 50);

        if (this.animationIndex === 0 || this.animationIndex === 2 || this.animationIndex === 3) {
            this.x = Math.random() * (canvasWidth - this.width);
            this.y = Math.random() * (canvasHeight - this.height);
        } else if (this.animationIndex === 1) {
            this.x = Math.random() * (canvasWidth + this.width);
            this.y = Math.random() * (canvasHeight - this.height);
        }
    }

    update() {
        const config = enemyImagesArray[this.animationIndex].update;

        switch (this.animationIndex) {
            case 0:
                this.x += Math.random() * config.xRange + config.xMin;
                this.y += Math.random() * config.yRange + config.yMin;
                break;

            case 1:
                this.x -= this.speed;
                this.y += this.curve * Math.sin(this.angle);
                this.angle += this.angleSpeed;

                if (this.x + this.width < 0) {
                    this.x = canvas.width;
                }
                break;

            case 2:
                this.x = canvasWidth / 2 * Math.sin(this.angle * Math.PI / 90) + (canvasWidth / 2 - this.width / 2);
                this.y = canvasHeight / 2 * Math.cos(this.angle * Math.PI / 360) + (canvasHeight / 2 - this.height / 2);
                this.angle += this.angleSpeed;

                if (this.x + this.width < 0) {
                    this.x = canvas.width;
                }
                break;

            case 3:
                if (this.x + this.width < 0) {
                    this.x = canvas.width;
                }
                if (gameFrame % this.interval === 0) {
                    this.newX = Math.random() * (canvasWidth - this.width);
                    this.newY = Math.random() * (canvasHeight - this.height);
                }

                let dx = this.x - this.newX;
                let dy = this.y - this.newY;

                this.x -= dx / 20;
                this.y -= dy / 20;

                if (this.x + this.width < 0) {
                    this.x = canvas.width;
                }
                break;
        }

        //animate sprites
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }

    draw() {
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height,)
    }
}

const enemyCreateing = enemyImagesArray.findIndex(obj => obj.number === enemyToCreate);
for (let i = 0; i < numberOfEnemies; i++) {
    enemiesArray.push(new Enemy(enemyCreateing));
};

function animate() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    enemiesArray.forEach(enemy => {
        enemy.update(enemyCreateing);
        enemy.draw(enemyCreateing);
    });

    gameFrame++;
    requestAnimationFrame(animate);
}
animate();

const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
    enemyToCreate = +e.target.value;
    enemiesArray.length = 0; // Clear the existing enemies
    const enemyCreating = enemyImagesArray.findIndex(obj => obj.number === enemyToCreate);
    for (let i = 0; i < numberOfEnemies; i++) {
        enemiesArray.push(new Enemy(enemyCreating));
    }
    animate(); // Call animate again to update the display
});