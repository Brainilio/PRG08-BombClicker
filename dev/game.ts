class Game {

    private score: number = 0
    private destroyed: number = 0
    private backPos: number = 0;
    private textfield: HTMLElement
    private statusbar: HTMLElement
    private foreground: HTMLElement
    private scoreBool: boolean = false;
    private bombs: Array<Bomb>
    private car: Car
    // Constant for amount of bombs
    private readonly BOMBS: number = 5; 

    constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
        this.foreground = document.getElementsByTagName('foreground')[0] as HTMLElement

        // New array out of bombs
        this.bombs = new Array();

        // push 5 bombs into new array with constant readonly BOMBS
        for (let i = 0; i < this.BOMBS; i++) {
            // Bomb(position x, posistion y, speed y)
            this.bombs.push(new Bomb(0, Math.floor(Math.random() * window.innerWidth), 1 + Math.random() * 5))
        }

        // Car(position x, position y, speed x)
        this.car = new Car(0, window.innerHeight - 120, 5)

        // Handlers for each bomb
        for (let i = 0; i < this.bombs.length; i++) {
            this.bombs[i].addEventListener('click', () => {
                // Call click method from each bomb
                this.bombs[i].clicked();
                // Update scorepoint on clicking each bomb
                this.scorePoint();
            })
        }
        
        console.log("Game starting..");

        // call method gameLoop
        this.gameLoop();

    }

    private gameLoop(): void {
        this.car.update();

        // Call update for each bomb
        for (let i = 0; i < this.bombs.length; i++) {
            // Set bombPosition in variable using the returnYPosition method
            let bombPosition = this.bombs[i].returnYPosition();

            // Check if position of bomb hits inner height
            if (bombPosition == window.innerHeight) {

                //  Add +1 to destroyed building score.
                this.destroyBuilding();
            }
            this.bombs[i].update();
        }

        // add request animation frame
        if(!this.scoreBool) { 
        requestAnimationFrame(() => this.gameLoop())
        }
    }

    public destroyBuilding() {
        this.destroyed++

        // Decrease position from background to display destroyed buildings.
        this.backPos -= 72;

        if (this.destroyed == 4) {
            // Check if this.destroyed counter is on 4, if it is then set boolean on true
            this.score = 0; 
            this.scoreBool = true; 
            this.emptyScreen();
        }

        // When building gets destroyed change background 
        this.statusbar.style.backgroundPositionX = `${this.backPos}px`;

        console.log("buildings destroyed " + this.destroyed)
    }

    public scorePoint() {
        this.score++
        this.textfield.innerHTML = "Score: " + this.score
    }

    private emptyScreen() {

        // Double Check if game is over
        if (this.scoreBool) {
            console.log("Game is officially over.");
            this.backPos = 0;  
        }

        this.car.addEventListener('click', () => {
            // Restart new game
            console.log("Restarting game...");
            this.foreground.innerHTML = ''
            new Game();
        })

    }

}

window.addEventListener("load", () => new Game())