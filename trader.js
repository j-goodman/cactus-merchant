let Trader = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = wheels.pick([true, true, true, false]) ? game.icons.trader : game.icons.warlock
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.inventory[0] = new (wheels.pick([Gem, Skull, Gem])) ()
    this.inventory[1] = new (wheels.pick([Fruit, Fruit, Fruit, Cactusseed, Skull, Gem])) ()
    this.info = `A trader named ${this.name}.`
    this.interval = setInterval(this.act.bind(this), 500)
    this.money = Math.floor(Math.random() * 350) + 150
    this.verbs = ['trade']
    this.values = {
        'fruit': .35 + Math.random() * .35 + Math.random() * .35 + Math.random() * .35,
        'gem': Math.random() * 2.5 + .5,
        'skull': Math.random() * 2,
        'poison root': 1.6,
        'flower': Math.random() * 3.2,
    }
}
wheels.inherits(Trader, Person)

Trader.prototype.act = function () {}
