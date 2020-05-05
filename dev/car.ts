class Car extends gameObject {
    
    private speedx: number
    constructor(posx: number, posy: number, speedx: number) {
        super(posx, posy)

        this.speedx = speedx;

        let foreground  = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this);
    }

    update():void {
 
        // If position X is smaller than the window's right offset, make x increment
        if(this.posx < window.innerWidth) { 
            this.posx += this.speedx + 2;
            } else { 
            // If position X hits offset of right screen, set x-position on random
                this.posx = setTimeout(function() {Math.floor(Math.random() * window.innerWidth);}, 8000);
            }

        // Drive the car with the incrementing x position
        this.drive();
    }

    private drive() {
        // Set style to make car move
        this.style.transform = `translate(${this.posx}px, ${this.posy}px)`
    }


}

window.customElements.define("car-component", Car as any)
