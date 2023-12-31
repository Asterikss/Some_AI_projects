class Visualizer{

    static draw_network(ctx, network){
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = ctx.canvas.width - margin * 2;
        const height = ctx.canvas.height - margin * 2;

        // console.log(network.layers);
        const layer_height_diff = height/(network.layers.length);
        // console.log(layer_height_diff)

        // won't be pretty for drawing just 1 layer
        // for (let i = 0; i < network.layers.length; i++) {
        let counter = 0;
        for (let i = network.layers.length - 1; i > -1; i--) {
            const layer_height = top + (layer_height_diff * counter);

            // const labels_array = i==(network.layers.length - 1)?["←", "↑", "→", "↓"]:[];
            const labels_array = i==(network.layers.length - 1)?["up", "left", "right", "down"]:[];
            // const labels_array = i==(network.layers.length - 1);

            ctx.setLineDash([7, 3]);

            Visualizer.draw_layer(
                ctx, network.layers[i], left, layer_height, width, layer_height_diff, labels_array);
            counter++;
        }

        // const layer_height = top + (layer_height_diff * i);

        // Visualizer.draw_layer(ctx, network.layers[1], left, layer_height, width, layer_height_diff);

        // Visualizer.draw_layer(ctx, network.layers[1], left, top, width, height);
    }

    // won't be pretty for drawing 1 perceptron layers
    static draw_layer(ctx, layer, left, top, width, height, labels_array){
        const right = left + width;
        const bottom = top + height;

        // const {inputs, outputs} = layer;

        const perceptron_radius = 19;
        const gap_bottom = width/(layer.inputs.length - 1);
        const gap_top = width/(layer.outputs.length - 1);

        for (let i = 0; i < layer.inputs.length; i++) {
            for (let j = 0; j < layer.outputs.length; j++) {
                ctx.beginPath();
                ctx.lineWidth = 2;

                ctx.strokeStyle = get_rgba_weight(layer.weights[i][j]);

                ctx.moveTo(left + (gap_bottom * i), bottom);
                ctx.lineTo(left + (gap_top * j), top);
                ctx.stroke()
            }
        }

        for (let i = 0; i < layer.inputs.length; i++) {
            const x = left + gap_bottom * i;

            ctx.beginPath();
            ctx.arc(x, bottom, perceptron_radius, 0, Math.PI*2);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, bottom, perceptron_radius * 0.6, 0, Math.PI*2);
            ctx.fillStyle = get_rgba_weight(layer.inputs[i]);
            ctx.fill();
        }

        for (let i = 0; i < layer.outputs.length; i++) {
            const x = left + gap_top * i;
            ctx.beginPath();
            ctx.arc(x, top, perceptron_radius, 0, Math.PI*2);
            ctx.fillStyle = "black";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, top, perceptron_radius * 0.6, 0, Math.PI*2);
            ctx.fillStyle = get_rgba_weight(layer.outputs[i]);
            ctx.fill();

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.arc(x, top, perceptron_radius * 0.8, 0, Math.PI*2);
            ctx.strokeStyle = get_rgba_weight(layer.biases[i]);
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            if(labels_array[i]){
                ctx.beginPath();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                // ctx.fillStyle = "orange";
                ctx.strokeStyle = "orange";
                ctx.font = (perceptron_radius * 1.0)+"px Arial";
                ctx.lineWidth = 3.10;
                // ctx.fillText(labels_array[i], x, top - 35);
                ctx.lineWidth = 1.5;
                ctx.strokeText(labels_array[i], x, top - 33);
            }
        }
            
    }

}
