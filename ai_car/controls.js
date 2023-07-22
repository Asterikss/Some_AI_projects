class Controls{
    constructor(car_type){
        this.forward = false;
        this.left = false;
        this.right = false;
        this.reverse = false;

        switch (car_type) {
            case "protagonist":
                // this.#addKeyboardListeners();
                break;
            case "human":
                this.#addKeyboardListeners();
                break;
            case "dummy":
                this.forward = true;
                break;
        }
    }

    #addKeyboardListeners(){
        document.onkeydown = (event)=>{
            switch(event.key){
                //hjkl
                case "ArrowLeft":
                    this.left = true;
                    break;
                case "ArrowRight":
                    this.right = true;
                    break;
                case "ArrowUp":
                    this.forward = true;
                    break;
                case "ArrowDown":
                    this.reverse = true;
                    break;
            }
        }

        document.onkeyup = (event)=>{
            switch(event.key){
                //hjkl
                case "ArrowLeft":
                    this.left = false;
                    break;
                case "ArrowRight":
                    this.right = false;
                    break;
                case "ArrowUp":
                    this.forward = false;
                    break;
                case "ArrowDown":
                    this.reverse = false;
                    break;
            }
        }
    }
}

