"use strict"
import { Container, Graphics } from "./pixi.min.mjs";
import { Symbol } from "./symbol.js";

export class Column extends Container{
    #width;
    #Symbols;
    constructor(app, width, position={}){
        super();
        this.app=app;
        this.#width = width
        this.position.set(position.x||0,position.y||0);
        this.#Symbols=[];
        for(;this.#Symbols.length<4;)
        {
            this.#Symbols.push(Symbol.generate(app, this.#width))
        }
        this.addChild(new Graphics().beginFill(0xaaaaff).drawRect(0,0,this.#width,this.#width*3).endFill())
        this.#Symbols.forEach((s,i)=>{
            s.position.set(0, this.#width*i-this.#width);
            this.addChild(s);
        })
        this.mask = new Graphics().beginFill().drawRect(position.x||0,position.y||0,this.#width,this.#width*3).endFill();
    }


    static generate(app, width, position={}){
        return new Column(app, width, position)
    }

    start(){
        this.#Symbols.forEach(s=>{
            s.start()
        })
    }
    stop(){
        let s0 = this.#Symbols[0];
        let f;
        this.app.ticker.add(f = ()=>{
            let y0 = (Math.abs(s0.position.y)-Math.abs(s0.position.y)%1)
            if(y0<=25){
                this.#Symbols.forEach(s=>{
                    s.stop();
                    this.app.ticker.remove(f)
                })
            }
        })
    }
}