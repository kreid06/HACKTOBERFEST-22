function Controller(player, menu, game){
    this.player = player
    this.menu = menu
    this.game = game
    this.previousMenu =  'startMenu';

    this.boundaryTest = (e,{x, y, w, h})=>{
        if(e.offsetX > x && e.offsetX < x + w && e.offsetY > y && e.offsetY < y + h){
            return true
        }else{
            return false
        }
    }

    this.closeMenu = ()=>{
        
    }

    this.addKeyControls = ()=>{
        
        addEventListener('keydown', (e)=>{
            
            if(e.keyCode===40||e.code==='KeyS'){
                console.log("Guy go backwards")

            }else if(e.keyCode===38||e.code==='KeyW'){
                console.log("Guy go fowards") 

                this.player.keystate.w = true
            }

            if(e.code=== 'Escape' && this.game.gamePlaying){
                console.log('escaped')
                this.previousMenu = "pause"
                if(!this.menu.isOpen){
                    this.game.noMenu = false
                    this.menu.isOpen = true;
                    this.menu.menuType = "pause"
                }else{
                    this.game.noMenu = true;
                    this.menu.isOpen = false;
                }
            }
            
        })
        
        addEventListener('keyup', (e)=>{
            //console.log(e.keyCode)
            if(e.code==='KeyW'){//UP
                this.player.keystate.w = false

            }
            if(e.keyCode===40){//DOWN
            }
            // if(e.keyCode===39){//Right
            //     diamond.x += 50
            // }
            // if(e.keyCode===37){//Left
            //     diamond.x -= 50
            // }
                // this.vectorPhysics()
        })
        addEventListener('mousedown', (e)=>{
            let {offsetX, offsetY} = e
            if(this.game.noMenu){
                this.player.createBullet()
            }
            if(this.menu.isOpen){
                if(this.menu.menuType === "pause"){
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.pauseButtons.closeBtn)){
                        console.log('escaped')
                            this.game.noMenu = true;
                            this.menu.isOpen = false;
                    }
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.pauseButtons.quitGameBtn)){
                        this.game.noMenu = false;
                        this.menu.isOpen = false;
                        this.game.gamePlaying = false;
                        this.previousMenu = "startMenu"
                        this.game.newGame()
                    }
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.pauseButtons.loadGameBtn)){
                        this.menu.menuType = "loadMenu"
                        console.log("load menu")
                    }
                }else 
                if(this.menu.menuType === "startMenu"){
                    // if(this.boundaryTest({offsetX,offsetY}, this.menu.startButtons.closeBtn)){
                    //     console.log('escaped')
                    //         this.game.noMenu = true;
                    //         this.menu.isOpen = false;
                    // }
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.startButtons.newGameBtn)){
                        console.log("new Game")
                        this.game.gamePlaying = true;
                        this.game.noMenu = true;
                        this.menu.isOpen = false;
                        
                    }
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.startButtons.loadGameBtn)){
                        this.menu.menuType = "loadMenu"
                        console.log("load menu")
                    }
                }else
                if(this.menu.menuType === "loadMenu"){
                    if(this.boundaryTest({offsetX,offsetY}, this.menu.loadGameButtons.backBtn)){
                        this.menu.menuType = this.previousMenu
                        console.log("load menu")
                    }
                }
            }
        })
    }
    this.addMouseControls = ()=>{
        var mouse = (e)=> {
            this.player.mouse.position = {x:e.offsetX, y:e.offsetY}
            this.player.updateAngle()
        }
        canvas.onmousemove = mouse
    }

    this.start = ()=>{
        this.addKeyControls()
        this.addMouseControls()
    }
}