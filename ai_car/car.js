class Car{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxspeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.damaged = false;

        this.sensor = new Sensor(this);
        this.controls = new Controls();


    }

    update(roadBorders){
        this.#move();
        this.polygon = this.#create_polygon();
        this.damaged = this.#assess_damage(roadBorders);
        this.sensor.update(roadBorders);
    }

    #assess_damage(roadBorders){
        roadBorders.forEach(boarder => {
            if(poly_intersecting(this.polygon, boarder)){
                return true;
            }
        });
        return false;
    }

    #create_polygon(){
        const points = [];
        const half_radious = Math.hypot(this.width, this.height) / 2;

        // console.log("half_radious " + half_radious);
        const sin_alfa = this.width / (half_radious * 2);
        // console.log("sin_alfa " + sin_alfa);
        const angle_rad = Math.asin(sin_alfa);
            // const alpha = Math.atan2(this.width, this.height);
        // console.log(angle_rad);
        // console.log(alpha);
    
        // top right
        points.push({
            x: this.x - Math.sin(this.angle - angle_rad) * half_radious,
            y: this.y - Math.cos(this.angle - angle_rad) * half_radious
        })
        // top left
        points.push({
            x: this.x - Math.sin(this.angle + angle_rad) * half_radious,
            y: this.y - Math.cos(this.angle + angle_rad) * half_radious
        })
        // bottom left
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - angle_rad) * half_radious,
            y: this.y - Math.cos(Math.PI + this.angle - angle_rad) * half_radious
        })
        // bottom right
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + angle_rad) * half_radious,
            y: this.y - Math.cos(Math.PI + this.angle + angle_rad) * half_radious
        })

        return points;


    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration
        }

        if(this.speed > this.maxspeed){
            this.speed = this.maxspeed;
        }
        if(this.speed < -this.maxspeed/2){
            this.speed = -this.maxspeed/2;
        }

        if(this.speed > 0){
            this.speed -= this.friction;
        }
        if(this.speed < 0){
            this.speed += this.friction;
        }
        if(Math.abs(this.speed) < this.friction){
            this.speed = 0;
        }


        if(this.speed != 0){
            // const flip = this.speed > 0?1:-1;
            if(this.controls.left){
                // this.angle += 0.03*flip;
                this.angle += 0.03;
            }
            if(this.controls.right){
                // this.angle -= 0.03*flip;
                this.angle -= 0.03;
            }
        }

        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;
    }

    draw2(ctx){
        ctx.save();
        // translates the canvas origin point (0, 0) to the coordinates
        // moves the drawing position
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }

    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
            
        }
        ctx.fill();
        this.sensor.draw(ctx);

    }
}
