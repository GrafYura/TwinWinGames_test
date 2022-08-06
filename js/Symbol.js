import { Container, Graphics, Sprite, Texture } from "./pixi.min.mjs";
export class Symbol extends Container{
    #size;
    #moveOffset;
    #moveSpeedCoef;
    getRandomInt(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }
	constructor(app, size){
        super();
        this.app = app;
        this.#size = size
        this.sprite = new Sprite();
        this.changeTexture();
        this.sprite.width=size-10;
        this.sprite.height=size-10;
        this.sprite.position.set(5,5);
		this.addChild(this.sprite);
        this.#moveOffset=4;
        this.#moveSpeedCoef=1
	}
    static generate(app, size){
        return new Symbol(app, size)
    }
    changeTexture(){
        this.sprite.texture=Texture.from(`symbol${this.getRandomInt(0,11)}`);
    }
    restart(){
        this.changeTexture();
        this.position.set(0, -this.#size);
    }
    start(){
        this.app.ticker.add(this.cb=()=>{this.moveDown()})
    }
    stop(){
        this.app.ticker.remove(this.cb);
        this.position.y=this.position.y-this.position.y%1;
        this.app.ticker.add(this.cb=()=>{this.moveUp()})

    }
    moveDown(){
        let y0 = (this.position.y-this.position.y%1)%this.#size
        this.position.y+=this.#moveOffset*this.#moveSpeedCoef;
            if(this.#moveSpeedCoef<3)
            this.#moveSpeedCoef+=0.05
        if(this.position.y>this.#size*3)
            this.restart();
    }
    moveUp(){
        if(Math.abs(this.position.y)%this.#size<4){
            this.position.y-=this.position.y%this.#size%4;
            this.app.ticker.remove(this.cb)
        }
        else{
            this.position.y-=this.#moveOffset;
        }
    }
    end(){
        this.app.ticker.remove(this.cb)
    }
}