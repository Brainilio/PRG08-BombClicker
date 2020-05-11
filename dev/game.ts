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

    constructor() {
        this.textfield = document.getElementsByTagName("textfield")[0] as HTMLElement
        this.statusbar = document.getElementsByTagName("bar")[0] as HTMLElement
        this.foreground = document.getElementsByTagName('foreground')[0] as HTMLElement

        // New array out of bombs
        this.bombs = new Array();

        // push 5 bombs into new array
        for (let i = 0; i < 5; i++) {
            // Bomb(position x, posistion y, speed y)
            this.bombs.push(new Bomb(0, Math.floor(Math.random() * window.innerWidth), Math.random() * 5))
        }

        // Car(position x, position y, speed x)
        this.car = new Car(0, window.innerHeight - 95, 5)

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

        // Update the buildingposition 

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

        // Check if destroyedbuildings is on 4 
        if (this.destroyed == 4) {
            // If buildings destroyed equals 5, call emptyscreen method 
            this.scoreBool = true;
            this.emptyScreen();
        }

        // add request animation frame
        requestAnimationFrame(() => this.gameLoop())
    }

    public destroyBuilding() {
        this.destroyed++

        // Decrease position from background to display destroyed buildings.
        this.backPos -= 72;

        if (this.backPos == -288) {
            // To avoid background image from getting ugly, set the emptyscreen method when 4 buildings already destroyed
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

        // Check if game is over
        if (this.scoreBool == true) {
            console.log("Game is officially over.");

            // Empty out the elements 
            this.bombs = [];
            this.textfield.innerHTML = 'Score: 0';
          
            // Set records on 0 
            this.destroyed = 0;
            this.score = 0;
            

        }

        this.car.addEventListener('click', () => {
            // Upon starting the car, clear the foreground and start a new game.

            this.backPos = 0;

            // Restart new game
            console.log("Restarting game...");
            this.foreground.innerHTML = ''
            new Game();
        })

    }

}

window.addEventListener("load", () => new Game())