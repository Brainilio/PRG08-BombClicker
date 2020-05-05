/// <reference path="gameObject.ts" />


class Bomb extends gameObject {

    private duration: number;
    private speedx: number; 
    private speedy: number; 

    constructor(posx: number, posy: number, speedy: number) {
        super(posx, posy)

        // Get duration from the constructor that is being called 
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
    }

    private moveBomb() {

        // If position Y is smaller than the bottom offset of the window, let the y position iterate so it drops.
        if (this.posy < window.innerHeight) {
            this.posy += this.speedy;
        } else {
            // If Y position hits bottom of screen, set y position back at 0 and randomize X-position
            this.posy = 0;
            this.posx = Math.floor(Math.random() * window.innerWidth);
        }

    }
    private drop() {
        // Styling to make bombs drop
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
        // this.style.transitionDuration = `${this.duration}s`

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
