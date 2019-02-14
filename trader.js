let Trader = function (x, y) {
    this.instantiate(x, y)
    this.name = nameMumbler.mumble()
    this.icon = game.icons.trader
    this.head = {}
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
    this.info = `A trader named ${this.name}. Traders in the great desert barter with scavengers and tradesmen for survival goods.`
    this.interval = setInterval(this.act.bind(this), 500)
}
wheels.inherits(Trader, Person)

Trader.prototype.act = function () {}
