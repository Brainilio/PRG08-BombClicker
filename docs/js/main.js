"use strict";
class gameObject extends HTMLElement {
    constructor(posx, posy) {
        super();
        this.posx = posx;
        this.posy = posy;
    }
}
class Bomb extends gameObject {
    constructor(posx, posy, speedy) {
        super(posx, posy);
        this.speedy = speedy;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
    }
    update() {
        this.moveBomb();
        this.drop();
        this.returnYPosition();
    }
    moveBomb() {
        if (this.posy < window.innerHeight) {
            this.posy++;
        }
        else {
            this.posy = -300;
            this.posx = Math.floor(Math.random() * window.innerWidth);
        }
    }
    drop() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
    clicked() {
        console.log("Bomb clicked.");
        this.posy = -500;
    }
    returnYPosition() {
        return this.posy;
    }
}
window.customElements.define("bomb-component", Bomb);
class Car extends gameObject {
    constructor(posx, posy, speedx) {
        super(posx, posy);
        this.speedx = speedx;
        let foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this);
    }
    update() {
        if (this.posx < window.innerWidth) {
            this.posx += this.speedx + 2;
        }
        else {
            this.posx = setTimeout(function () { Math.floor(Math.random() * window.innerWidth); }, 8000);
        }
        this.drive();
    }
    drive() {
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`;
    }
}
window.customElements.define("car-component", Car);
class Game {
    constructor() {
        this.score = 0;
        this.destroyed = 0;
        this.backPos = 0;
        this.scoreBool = false;
        this.BOMBS = 5;
        this.textfield = document.getElementsByTagName("textfield")[0];
        this.statusbar = document.getElementsByTagName("bar")[0];
        this.foreground = document.getElementsByTagName('foreground')[0];
        this.bombs = new Array();
        for (let i = 0; i < this.BOMBS; i++) {
            this.bombs.push(new Bomb(0, Math.floor(Math.random() * window.innerWidth), 1 + Math.random() * 5));
        }
        this.car = new Car(0, window.innerHeight - 120, 5);
        for (let i = 0; i < this.bombs.length; i++) {
            this.bombs[i].addEventListener('click', () => {
                this.bombs[i].clicked();
                this.scorePoint();
            });
        }
        console.log("Game starting..");
        this.gameLoop();
    }
    gameLoop() {
        this.car.update();
        for (let i = 0; i < this.bombs.length; i++) {
            let bombPosition = this.bombs[i].returnYPosition();
            if (bombPosition == window.innerHeight) {
                this.destroyBuilding();
            }
            this.bombs[i].update();
        }
        if (!this.scoreBool) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }
    destroyBuilding() {
        this.destroyed++;
        this.backPos -= 72;
        if (this.destroyed == 4) {
            this.score = 0;
            this.scoreBool = true;
            this.emptyScreen();
        }
        this.statusbar.style.backgroundPositionX = `${this.backPos}px`;
        console.log("buildings destroyed " + this.destroyed);
    }
    scorePoint() {
        this.score++;
        this.textfield.innerHTML = "Score: " + this.score;
    }
    emptyScreen() {
        if (this.scoreBool) {
            console.log("Game is officially over.");
            this.backPos = 0;
        }
        this.car.addEventListener('click', () => {
            console.log("Restarting game...");
            this.foreground.innerHTML = '';
            new Game();
        });
    }
}
window.addEventListener("load", () => new Game());
//# sourceMappingURL=main.js.map