class NauralNetwork{
    construcotr(neuron_counts){
        this.layers = [];
        for (let i = 0; i < neuron_counts.length - 1; i++) {
            this.layers.push(new Layer(neuron_counts[i], neuron_counts[i + 1]));
        }
    }

    static feed_forward(given_inputs, network){
        let outputs = Layer.feed_forward(given_inputs, network.layers[0]);
        for (let i = 1; i < network.layers.length; i++) {
            outputs = Layer.feed_forward(outputs, network.layers[1]);
            
        }

        return outputs;
    }
}

class Layer{
    construcotr(input_count, output_count){
        this.inputs = new Array(input_count);
        this.outputs = new Array(output_count);
        this.biases = new Array(output_count);

        this.weights = [];
        for (let i = 0; i < input_count; i++) {
            this.weights[i] = new Array(output_count);
            
        }

        Layer.#randomize(this);
    }

    static #randomize(layer){
        for (let i = 0; i < layer.inputs.length; i++) {
            for (let j = 0; j < layer.outputs.length; j++) {
                layer.weights[i][j] = (Math.random() * 2) - 1;
                
            }
        }

        for (let i = 0; i < layer.biases; i++) {
            layer.biases[i] = (Math.random() * 2) - 1;
            
            
        }
        
    }

    static feed_forward(given_inputs, layer){
        for (let i = 0; i < layer.inputs.length; i++) {
            layer.inputs[i] = given_inputs[i];
        }

        for (let i = 0; i < layer.outputs.length; i++) {
            const result = 0;
            for (let j = 0; j < layer.inputs.length; j++) {
                // result += (layer.inputs[j] * layer.weights[i][j]) + layer.biases[i];
                result += (layer.inputs[j] * layer.weights[j][i]) - layer.biases[i];
            }
            
            if(result > 0){
                layer.outputs[i] = 1;
            }eles{
                layer.outputs[i] = 0;
            }
            
        }

        return layer.outputs;
    }

}


