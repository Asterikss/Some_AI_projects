class Sensor{
    constructor(car){
        this.car = car;
        this.rayCount = 5;
        this.length = 150;
        this.rayspread = Math.PI/4;

        this.ray_endings = [];
        this.sensor_readings = [];  // for each ray

    }

    update(roadBorders, traffic){
        this.#castRays();

        this.sensor_readings = [];

        this.ray_endings.forEach(ray_ending => {
            this.sensor_readings.push(
                this.#getSensorReadings(ray_ending, roadBorders, traffic)
            );
        });
    }

    #getSensorReadings(ray_ending, roadBorders, traffic){
        let touches = [];

        roadBorders.forEach(boarder => {
            const touch = get_intersection(
                {x:this.car.x, y:this.car.y},
                ray_ending,
                boarder[0],
                boarder[1]
            );

            if(touch){
                touches.push(touch);
            }

        });

        traffic.forEach(traffic_obj => {
            const poly = traffic_obj.polygon;
            for (let i = 0; i < poly.length; i++) {
                const touch = get_intersection(
                    {x:this.car.x, y:this.car.y},
                    ray_ending,
                    poly[i],
                    poly[(i+1)%poly.length]
                );

                if(touch){
                    touches.push(touch);
                }
            }
        });

        if(touches.length == 0){
            return null;
        }else{

            const offsets=touches.map((item) => {
                return item.offset;
            });

            const min_offset = Math.min(...offsets);
            
            return touches.find((touch) => {
                return touch.offset == min_offset
            });
        }

    }

    #castRays(){
        this.ray_endings = [];

        for (let i = 0; i < this.rayCount; i++) {
            // rayCount is reduced by one, because we want the total number of gaps in beetween the boarder rays
            // to be rayspread minus one. e.g. with rayspread = 3: | | | - two gaps. Also check if rayCount == 1
            const rayAngle = this.rayspread
                + ((-this.rayspread  - this.rayspread) / (this.rayCount==1?2:(this.rayCount - 1)))
                * (this.rayCount==1?1:i)
                + this.car.angle;

            this.ray_endings.push({
                x: this.car.x - Math.sin(rayAngle) * this.length,
                y: this.car.y - Math.cos(rayAngle) * this.length
            });

        }
    }


    draw(ctx){

        for (let i = 0; i < this.rayCount; i++) {

            let end = this.ray_endings[i];
            if(this.sensor_readings[i]){
                end = this.sensor_readings[i];
            }

            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.car.x, this.car.y);

            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";

            ctx.moveTo(end.x, end.y);
            ctx.lineTo(this.ray_endings[i].x, this.ray_endings[i].y);
            ctx.stroke();
        }
    }
}
