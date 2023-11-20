class NeuralDNA{
    constructor(neuralNetwork){
        this.weightDNA = [];
        this.biasDNA = [];

        for(let x = 0; x < neuralNetwork.layers.length - 1; x++){
            for(let y = 0; y < neuralNetwork.layers[x].neurons.length; y++){
                for(let n = 0; n < neuralNetwork.layers[x].neurons[y].weights.length; n++){
                    this.weightDNA.push(neuralNetwork.layers[x].neurons[y].weights[n]);
                }
                
                this.biasDNA.push(neuralNetwork.layers[x].neurons[y].bias)
            }
        }
    }

    randomizeDNA(){
        for(let i = 0; i < this.weightDNA.length; i++){
            this.weightDNA[i] = random(-5, 5);
        }
        for(let i = 0; i < this.biasDNA.length; i++){
            this.biasDNA[i] = random(-1, 1);
        }
    }

    mutateDNA(){
        const odds = 0.05; //5% of the DNA will be changed

        for(let i = 0; i < this.weightDNA.length; i++){
            if(random() < odds){
                this.weightDNA[i] = random(-5, 5);
            }
        }
        for(let i = 0; i < this.biasDNA.length; i++){
            if(random() < odds){
                this.biasDNA[i] = random(-1, 1);
            }
        }
    }
}