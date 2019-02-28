let Miner = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = /*wheels.pick([false, false, false, true]) ? game.icons.minerb :*/ game.icons.miner
    this.head = {task: 'surveying', nearestRock: null}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.info = `A miner named ${this.name}. Miners make their living breaking up desert rocks hoping to find treasures inside.`
    this.money = Math.floor(Math.random() * 200) + 20
    this.interval = setInterval(this.act.bind(this), 500)
    this.verbs = ['trade']
    this.values = {
        'fruit': Math.random() * 3.2,
        'poison root': Math.random() * 2.4,
    }
}
wheels.inherits(Miner, Person)

Miner.prototype.act = function () {
    if (this.head.task === 'traveling' && wheels.pick([true, false, true])) {
        this.moveOnBearing()
        if (wheels.pick([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,])) {
            this.head.task = 'surveying'
        }
    }
    if (this.head.task === 'surveying') {
        let counts = this.survey()
        let oldBearing = this.head.bearing
        this.head.bearing = wheels.pick(['north-east', 'north-west', 'south-east', 'south-west'])
        let choice = 'traveling'
        if (!this.head.highestEverRockCount || this.head.highestEverRockCount < counts.rock || (counts.rock > 0 && wheels.pick([1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))) {
            this.head.highestEverRockCount = counts.rock
            choice = 'mining'
        }
        if (!this.head.lowestEverRockCount || this.head.lowestEverRockCount > counts.rock) {
            this.head.lowestEverRockCount = counts.rock
            while (this.head.bearing === oldBearing) {
                this.head.bearing = wheels.pick(['north-east', 'north-west', 'south-east', 'south-west'])
            }
        }
        this.head.task = choice
    }
    if (this.head.task === 'mining') {
        let adjacents = this.getAdjacents()
        if (adjacents.map(ob => { return ob.name }).includes('rock')) {
            let rock = adjacents.filter(ob => {
                return ob.name === 'rock'
            })[0]
            rock.mine(this)
        } else {
            if (!this.head.nearestRock || !this.head.nearestRock.pos || !game.grid[this.head.nearestRock.pos.x][this.head.nearestRock.pos.y].entity) {
                this.survey()
                if (!this.head.nearestRock || !this.head.nearestRock.pos || wheels.pick([1, 0, 0, 0, 0, 0])) {
                    this.head.task = 'traveling'
                }
            } else if (wheels.pick([true, false])) {
                if (this.head.nearestRock.pos.x > this.pos.x) {
                    this.move(1, 0)
                } else {
                    this.move(-1, 0)
                }
            } else {
                if (this.head.nearestRock.pos.y > this.pos.y) {
                    this.move(0, 1)
                } else {
                    this.move(0, -1)
                }
            }
        }
    }
    this.head.justBumped = false
}

Miner.prototype.moveRandomly = function () {
    let directions = {
        east: [1, 0],
        south: [0, 1],
        west: [-1, 0],
        north: [0, -1]
    }
    let direction = wheels.pick(directions)
    this.move(direction[0], direction[1])
}

Miner.prototype.moveOnBearing = function () {
    let directions = {
        east: [1, 0],
        south: [0, 1],
        west: [-1, 0],
        north: [0, -1]
    }
    let direction = 'x'
    if (!this.head.bearing) {
        this.head.task = 'surveying'
    } else {
        while (!this.head.bearing.includes(direction)) {
            direction = wheels.pick(['north', 'south', 'east', 'west'])
        }
        this.move(directions[direction][0], directions[direction][1])
    }
}

Miner.prototype.survey = function () {
    let counts = {}
    let i = -6
    while (i <= 6) {
        let j = -6
        while (j <= 6) {
            let x = i + this.pos.x
            let y = j + this.pos.y
            if (game.grid[x][y].entity) {
                let name = game.grid[x][y].entity.name
                counts[name] = counts[name] ? counts[name] : 0
                counts[name] += 1
                if (name === 'rock') {
                    if (
                        !this.head.nearestRock ||
                        !this.head.nearestRock.pos ||
                        wheels.distanceBetween(this.pos, this.head.nearestRock.pos) >
                        wheels.distanceBetween(this.pos, game.grid[x][y].entity.pos)
                    ) {
                        this.head.nearestRock = game.grid[x][y].entity
                    }
                }
            }
            j++
        }
        i++
    }
    return counts
}

Miner.prototype.bump = function () {
    if (!this.head.justBumped) {
        this.moveRandomly()
        this.head.justBumped = true
    }
}
