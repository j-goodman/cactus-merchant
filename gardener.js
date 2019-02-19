let Gardener = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = game.icons.herbseller
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.inventory[0] = new (wheels.random([Fruit, Flowerseed, Cactusseed])) ()
    this.inventory[1] = new (wheels.random([Fruit, Flowerseed, Cactusseed, Gem])) ()
    this.inventory[2] = new (wheels.random([Cactusseed, Poisonroot, Flowerseed])) ()
    this.inventory[2] = new (wheels.random([Flowerseed, Flower])) ()
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
