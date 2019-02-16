let Gardener = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = game.icons.herbseller
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.inventory[0] = new (wheels.random([Fruit, Fruit, Cactusseed])) ()
    this.inventory[1] = new (wheels.random([Fruit, Fruit, Fruit, Cactusseed, Gem])) ()
    this.inventory[2] = new (wheels.random([Fruit, Cactusseed, Cactusseed])) ()
    this.inventory[3] = new (wheels.random([Fruit, Cactusseed, Cactusseed])) ()
    this.inventory[4] = new (wheels.random([Fruit, Cactusseed, Poisonroot])) ()
    this.inventory[4] = new (wheels.random([Fruit, Poisonroot])) ()
    this.inventory[4] = new (wheels.random([Cactusseed, Poisonroot])) ()
    this.info = `A gardener named ${this.name}.`
    this.money = Math.floor(Math.random() * 70) + 20
    this.verbs = ['trade']
    this.interval = setInterval(this.act.bind(this), 500)
    this.values = {
        'cactus seed': Math.random() * 2 + .5
    }
}
wheels.inherits(Gardener, Person)

Gardener.prototype.act = function () {}
