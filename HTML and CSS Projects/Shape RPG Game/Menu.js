function Menu(game){
    this.game = game;
    this.isOpen = true;
    this.menuType;
    this.loadEmpty = false;
    this.pauseButtons    =  {
                                quitGameBtn: {x: 200, y:235, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:325, y:265, color:"#000000", msg:"Quit Game"}], name: "QuitGameBtn"},
                                saveGameBtn:{x: 200, y:310, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:320, y:345, color:"#000000", msg:"Save Game"}], name: "saveGameBtn"},
                                loadGameBtn:{x: 200, y:385, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:320, y:420, color:"#000000", msg:"Load Game"}], name: "loadGameBtn"},
                                controlBtn: {x: 200, y:460, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:335, y:495, color:"#000000", msg:"Controls"}], name: "controlsBtn"},
                                closeBtn:   {x: 570, y:150, w:30,  h:30, color: "#ff0000", textArr:[{font: "25px Arial", x:577, y:175, color:"#000000", msg:"X"}], name: "closeBtn"}
                            
                            }
    this.startButtons    =  {
                                newGameBtn: {x: 200, y:235, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:325, y:265, color:"#000000", msg:"New Game"}], name: "newGameBtn"},
                                loadGameBtn:{x: 200, y:310, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:320, y:345, color:"#000000", msg:"Load Game"}], name: "loadGameBtn"},
                                controlBtn: {x: 200, y:385, w:350, h:50, color: "#aaaaaa", textArr:[{font: "20px Arial", x:335, y:420, color:"#000000", msg:"Controls"}], name: "controlsBtn"},
                            
                            }
    this.loadGameButtons =  {
                                backBtn:   {x: 160, y:150, w:30,  h:30, color: "#55ff55", textArr:[{font: "25px Arial", x:167, y:175, color:"#000000", msg:"<"}], name: "backBtn"}
                            };

    this.getLoadGameBtns = ()=>{
        let loadString = window.localStorage.getItem('shapeTasticLoad') || "empty";
        let loadArr = loadString != "empty" ? loadString.split(",") : "empty";
        
        if(loadArr !== "empty"){
            for(let i = 0; i < loadArr.length ;i++){
                loadedObj = JSON.parse(loadArr[i]) 
                this.loadGameBtn[loadArr[i].id] = loadArr[i]
            }
        }else{
            this.loadEmpty = true
        }
    }                    
    
    this.createBtns = (buttonArr)=>{
        for(let j = 0; j < buttonArr.length; j++){
            let {x,y,w,h,color,textArr} = buttonArr[j]
            ctx.fillStyle = color
            ctx.fillRect(x, y, w, h)
            for(let i = 0; i < textArr.length; i++){
                ctx.fillStyle = textArr[i].color
                ctx.font = textArr[i].font
                ctx.fillText(textArr[i].msg, textArr[i].x, textArr[i].y)
            }
        }
    }

    this.pauseMenu = ()=>{
        ctx.fillText("Game Paused", 275, 190)
        this.createBtns(Object.values(this.pauseButtons))
        ctx.restore()
    }

    this.controlInfo = ()=>{
        ctx.save();

    }

    this.loseMenu = ()=>{

    }

    this.loadMenu = ()=>{
        ctx.fillText("Load Menu", 285, 190)
        this.getLoadGameBtns()
        if(this.loadEmpty){
            ctx.font = "15px Arial"
            ctx.fillStyle = "#ff0000"
            ctx.fillText("no games found", 300, 250)
        }
        this.createBtns(Object.values(this.loadGameButtons));
        ctx.restore()
    }

    this.startMenu = ()=>{
        ctx.fillText("ShapeTastic", 285, 190)
        this.createBtns(Object.values(this.startButtons))
        ctx.restore()
    }

    this.render= ()=>{
        ctx.save();
        ctx.fillStyle = "#888888"
        ctx.fillRect(125,125,500,500)
        ctx.fillStyle = "#000000"
        ctx.font = "30px Arial"
        if(!this.game.noMenu){
            if(this.menuType === "pause"){
                this.pauseMenu()
            }else 
            if(this.menuType === "startMenu"){
                this.startMenu()
            }else 
            if(this.menuType === "loadMenu"){
                this.loadMenu()
            }
        }
    }
}