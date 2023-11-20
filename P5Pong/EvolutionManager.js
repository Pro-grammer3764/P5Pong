class GamesManager{
    constructor(count, bound){
        this.bound = bound;
        this.games = new Array(count);
        this.globalTimer = 0;
        this.resetTime = 600; //600 frames ~ 10 seconds
    }

    innitializeGames(){
        const gridLength =  ceil(pow(this.games.length, 0.5));
        const unit = createVector(this.bound.w / gridLength, this.bound.h / gridLength);

        let paddleHeight = unit.y / 5;
        let paddleWidth = unit.x / 50;
        let paddleOffset = paddleWidth / 2;
        let ballSize = paddleWidth;

        for (let y = 0; y < gridLength; y++) {
            for (let x = 0; x < gridLength; x++) {
                if(((y * gridLength) + x) < this.games.length){
                    let m = new bound(x * unit.x, y * unit.y, unit.x, unit.y);
                    this.games[(y * gridLength) + x] = new pongGame(m, paddleWidth, paddleHeight, paddleOffset, ballSize, 256);
                }
            }
        }
    }

    showGames(){
        for(let i = 0; i < this.games.length; i++){
            this.games[i].show();
        }
    }

    updateGames(){
        this.globalTimer++;
        if(this.globalTimer < this.resetTime){
            for(let i = 0; i < this.games.length; i++){
                this.games[i].update();
            }
        }else{
            for(let i = 0; i < this.games.length; i++){
                this.games[i].setFitness(this.globalTimer); //set fitness of each game
            }

            this.sortGames(); //re-order the games based off of fitness

            let newParent = this.games[0].DNA.combine(this.games[1].DNA); //combine top two DNA's

            for(let i = 0; i < this.games.length; i++){
                this.games[i].AI.insertDNA(newParent.mutateDNA()); //place new DNA into all the neural networks and mutate all the DNA
                this.games[i].totalAccuracy = 0;
                this.games[i].rightScore = 0;
                this.games[i].leftScore = 0;
                this.games[i].reset();
            }

            this.globalTimer = 0;
        }
    }

    sortGames(){
        this.games.sort((a,b) => b.fitness - a.fitness);
    }
}