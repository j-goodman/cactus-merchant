let Trader = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = game.icons.trader
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.inventory[0] = new (wheels.random([Gem, Skull, Gem])) ()
    this.inventory[1] = new (wheels.random([Fruit, Fruit, Fruit, Cactusseed, Skull, Gem])) ()
    this.info = `A trader named ${this.name}. Traders in the great desert barter with scavengers and tradesmen for survival goods. ${this.name} will buy cactus fruits and other goods off of you or sell you items you might want.`
    this.interval = setInterval(this.act.bind(this), 500)
    this.money = Math.floor(Math.random() * 150) + 150
    this.verbs = ['trade']
    this.values = {
        'fruit': .35 + Math.random() * .35 + Math.random() * .35 + Math.random() * .35,
        'gem': Math.random() * 2.5 + .5,
        'skull': Math.random() * 2,
        'poison root': 1.6,
    }
}
wheels.inherits(Trader, Person)

Trader.prototype.act = function () {}
