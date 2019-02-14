let Miner = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = game.icons.miner
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.info = `A miner named ${this.name}. These craftsmen and traders make their living breaking up desert rocks hoping to find treasures inside.`
    this.interval = setInterval(this.act.bind(this), 500)
}
wheels.inherits(Miner, Entity)

Miner.prototype.act = function () {
    if (!Math.floor(Math.random() * 4)) {
        this.moveRandomly()
    }
}

Miner.prototype.moveRandomly = function () {
    let directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    let direction = wheels.random(directions)
    this.move(direction[0], direction[1])
}

Miner.prototype.survey = function () {
    let i = -6
    while (i <= 6) {
        let j = -6
        while (j <= 6) {
            if (game.grid[i][j].entity) {
                console.log(game.grid[i][j].entity.name)
            }
            j++
        }
        i++
    }
}
