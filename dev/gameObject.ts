abstract class gameObject extends HTMLElement {
    protected posx : number; 
    protected posy : number; 

    constructor(posx: number, posy: number) {
        super();
        this.posx = posx; 
        this.posy = posy; 
    }

    // Children must have update function
    abstract update() : void
} 