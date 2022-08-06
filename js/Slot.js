import * as PIXI from "./pixi.min.mjs";
import { Container, Graphics, Text} from "./pixi.min.mjs";
import { Column } from "./Column.js";
export class Slot extends Container{
    #columns;
    #width;
    #spinning = 0;
    constructor(app, width, position={}){
        super();
        this.app=app;
        this.#width = width
        this.position.set(position.x||0,position.y||0);
        this.#columns=[];
        for(let i = 0; i<5;i++){
            this.#columns.push(Column.generate(app,110,{x:width*i}))
        }
        this.#columns.forEach(el=>{this.addChild(el)})
        this.addText(position)
        window["slot"]=this

    }

    addText(position){
        let cont = new Container()
        cont.position.set(this.#width*5+(position.x||0),0+(position.y||0));
        let graphics = new Graphics().beginFill(0x880000).drawRect(0,0,this.#width,this.#width*3).endFill()
        let text = new PIXI.Text('S\nP\nI\nN',{fontFamily : 'Arial', fontSize: 50, fill : 0xffffff, align:'center'})
        text.position.set(this.#width*0.5,this.#width*1.5)
        text.anchor.set(0.5)
        cont.addChild(graphics,text)
        cont.on('pointerdown', this.start, this)
        cont.interactive = true;
        this.addChild(cont)
    }
    static generate(app, width, position={}){
        return new Slot(app, width, position)
    }

    start(){
        if(!this.#spinning){
            this.#columns.forEach((el,i) => {
                setTimeout(()=>{el.start()}, i*200)            
            });
            this.#spinning = 1;
            setTimeout(()=>{this.stop(); this.#spinning=0}, 3000)
        }
    }
    stop(){
        this.#columns.forEach((el,i) => {
            setTimeout(()=>{el.stop()}, i*200)            
        });
    }
}