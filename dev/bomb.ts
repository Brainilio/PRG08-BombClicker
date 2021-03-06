/// <reference path="gameObject.ts" />
class Bomb extends gameObject {

    private duration: number;
    private speedy: number; 

    constructor(posx: number, posy: number, speedy: number) {
        super(posx, posy)

        // Get speed from the constructor that is being called 
        this.speedy = speedy; 

        // Append the element to the dom
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
    }

    public update(): void {

        // Move the bomb
        this.moveBomb();

        // Push the y and x position into styling with drop function
        this.drop();


        // Keep tracking the Y position
        this.returnYPosition();
    }

    private moveBomb() {
        // If position Y is smaller than the bottom offset of the window, let the y position iterate so it drops.
        if (this.posy < window.innerHeight) {
            // When i add the speed, the game wont recognize when the bomb hits the bottom y offset
            // this.posy+=this.speedy;
            this.posy++;
        } else {
            // If Y position hits bottom of screen, set y position back at 0 and randomize X-position
            this.posy = -300;
            this.posx = Math.floor(Math.random() * window.innerWidth);
        }
    }

    private drop() {
        // Styling to make bombs drop
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`

    }

    public clicked() {
        // Log the eventlistener that is being called from game.ts, set position back to -500 when bomb is clicked.
        console.log("Bomb clicked.");
        this.posy = -500;
    }

    public returnYPosition() {
        // Return the Y position.
       return this.posy; 
    }

}

// Create element
window.customElements.define("bomb-component", Bomb as any)
