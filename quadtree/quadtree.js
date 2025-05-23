class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xVel = Math.random() * 5 * (Math.random() < 0.5 ? -1 : 1);
        this.yVel = Math.random() * 5 * (Math.random() < 0.5 ? -1 : 1);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "MediumSeaGreen";
        ctx.fill();
    }

    update() {
        this.x += this.xVel;
        this.y += this.yVel;
    }
}

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class Quadtree {
    constructor(boundingBox, capacity) {
        // bounding box is what chunk of the screen this quadtree handles
        // capacity is how many points this box can hold before we need to subdivide
        this.boundingBox = boundingBox;
        this.capacity = capacity;
        this.points = [];
        this.isDivided = false;
        this.northwest = null;
        this.northeast = null;
        this.southwest = null;
        this.southeast = null;
    }

    // check if point is within bounding box
    isPointInBounds(point) {
        return point.x >= this.boundingBox.x 
            && point.x < this.boundingBox.x + this.boundingBox.width
            && point.y >= this.boundingBox.y
            && point.y < this.boundingBox.y + this.boundingBox.height;
    }

    // create the four subtrees
    makeSubtrees() {
        let x = this.boundingBox.x;
        let y = this.boundingBox.y;
        let width = this.boundingBox.width;
        let height = this.boundingBox.height;

        let nw = new Rectangle(x, y, width / 2, height / 2);
        let ne = new Rectangle(x + width / 2, y, width / 2, height / 2);
        let sw = new Rectangle(x, y + height / 2, width / 2, height / 2);
        let se = new Rectangle(x + width / 2, y + height / 2, width / 2, height / 2);

        this.northwest = new Quadtree(nw, this.capacity);
        this.northeast = new Quadtree(ne, this.capacity);
        this.southwest = new Quadtree(sw, this.capacity);
        this.southeast = new Quadtree(se, this.capacity);

        // pass points down to child nodes, and this parent node no longer needs to store points
        this.points.forEach(point => {
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);
        });
        this.points = [];
    }

    insert(point) {
        // don't insert if this point isn't within bounding box
        if(!this.isPointInBounds(point)) {
            return;
        }

        // only insert if not at capacity and we haven't divided
        // if divided, this quadtree's points array is empty so duplicate data isn't stored
        if(this.points.length < this.capacity && !this.isDivided) {
            this.points.push(point);
        }
        else {
            // if at capacity, divide into sub quadtrees if we haven't already divided
            if(!this.isDivided) {
                // TODO when making subtrees, pass points into those leaf nodes
                this.makeSubtrees();
                this.isDivided = true;
            }

            // then recursively attempt to add point to each subtree
            this.northwest.insert(point);
            this.northeast.insert(point);
            this.southwest.insert(point);
            this.southeast.insert(point);
        }
    }
}
