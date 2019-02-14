window.game = {}
game.grid = {}
game.check = (x, y) => {
    game.grid[x] = game.grid[x] ? game.grid[x] : {}
    game.grid[x][y] = game.grid[x][y] ? game.grid[x][y] : new Square ()
}
game.worldbuilder = {}
game.worldbuilder.clear = (x, y) => {
    game.grid[x][y].entity = null
}
game.icons = {}
game.intervals = []

window.addEventListener('load', () => {
    // Load canvas and images
    game.canvas = document.getElementById('canvas')
    game.ctx = game.canvas.getContext('2d')
    game.icons.cactus = document.getElementById('cactus')
    game.icons.rock = document.getElementById('rock')
    game.icons.key = document.getElementById('key')
    game.icons.gem = document.getElementById('gem')
    game.icons.ore = document.getElementById('ore')
    game.icons.fruit = document.getElementById('fruit')
    game.icons.miner = document.getElementById('miner')
    game.icons['miner-b'] = document.getElementById('miner-b')
    game.icons.trader = document.getElementById('trader')
    game.icons.windshrine = document.getElementById('windshrine')
    game.icons.skull = document.getElementById('skull')

    // Instantiate world
    game.worldbuilder.scatter(
        Cactus,
        200, // radius
        50, // rareness
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.worldbuilder.scatter(
        Rock,
        200, // radius
        8, // rareness
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.worldbuilder.scatter(
        Rock,
        100, // radius
        3, // rareness
        (Math.floor(Math.random() * 70) + 40) * (wheels.random([1, -1])), // x
        (Math.floor(Math.random() * 70) + 40) * (wheels.random([1, -1])), // y
    )
    game.worldbuilder.scatter(
        Cactus,
        50, // radius
        16, // rareness
        (Math.floor(Math.random() * 70) + 80) * (wheels.random([1, -1])), // x
        (Math.floor(Math.random() * 70) + 80) * (wheels.random([1, -1])), // y
    )
    new Key (
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    new Gem (
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    new Ore (
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.worldbuilder.scatter(
        Miner,
        200, // radius
        1400, // rareness
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.worldbuilder.scatter(
        Windshrine,
        200, // radius
        3000, // rareness
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.worldbuilder.scatter(
        Skull,
        200, // radius
        900, // rareness
        Math.floor(Math.random() * 120) - 60, // x
        Math.floor(Math.random() * 120) - 60, // y
    )
    game.trader = new Trader (
        Math.floor(Math.random() * 70) - 45, // x
        Math.floor(Math.random() * 70) - 45, // y
    )
    game.player = new CactusMerchant (0, 0)
    game.player.name = 'player'
    game.player.icon = document.getElementById('merchant')
    game.worldbuilder.clear(0, 1)
    game.worldbuilder.clear(0, -1)
    game.worldbuilder.clear(1, 0)
    game.worldbuilder.clear(-1, 0)
    game.worldbuilder.clear(1, 1)
    game.drawGrid(game.player.pos)
    game.updateSidebar()
})

window.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        game.player.move(-1, 0)
    } else if (event.key === 'ArrowDown') {
        game.player.move(0, 1)
    } else if (event.key === 'ArrowRight') {
        game.player.move(1, 0)
    } else if (event.key === 'ArrowUp') {
        game.player.move(0, -1)
    }
})

let Entity = function (x, y) {
    this.instantiate(x, y)
    this.info = ''
}

let Item = function (x, y) {
    this.instantiate(x, y)
}
wheels.inherits(Item, Entity)

let Person = function (x, y) {
    this.instantiate(x, y)
    this.name = 'person'
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
}
wheels.inherits(Person, Entity)

let CactusMerchant = function (x, y) {
    this.instantiate(x, y)
    this.name = 'person'
    this.actions = ['get', 'harvest']
    this.inventory = []
    this.inventory.length = 8
    this.inventory.fill(null)
}
wheels.inherits(CactusMerchant, Person)

let Cactus = function (x, y) {
    this.instantiate(x, y)
    game.worldbuilder.waterGround(x, y)
    this.icon = game.icons.cactus
    this.name = 'cactus'
    this.info = `A sweet life-giving cactus.`
    this.verbs = ['harvest']
}
wheels.inherits(Cactus, Entity)

let Rock = function (x, y) {
    this.instantiate(x, y)
    this.icon = game.icons.rock
    this.name = 'rock'
    this.info = `It's an arid desert rock.`
    this.verbs = ['mine']
}
wheels.inherits(Rock, Entity)

let Windshrine = function (x, y) {
    this.instantiate(x, y)
    this.icon = game.icons.windshrine
    this.name = 'wind shrine'
    this.info = `It's some kind of abandoned shrine.`
}
wheels.inherits(Windshrine, Entity)

let Key = function (x, y) {
    this.instantiate(x, y)
    this.name = 'key'
    this.icon = game.icons.key
    this.info = `It's a bent-up old key.`
    this.walkover = 'get'
    this.verbs = ['get']
}
wheels.inherits(Key, Item)

let Gem = function (x, y) {
    this.instantiate(x, y)
    this.name = 'gem'
    this.icon = game.icons.gem
    this.info = `It's a glimmering gemstone.`
    this.walkover = 'get'
    this.verbs = ['get']
}
wheels.inherits(Gem, Item)

let Ore = function (x, y) {
    this.instantiate(x, y)
    this.name = 'ore'
    this.icon = game.icons.ore
    this.info = `It's a lump of raw iron ore.`
    this.walkover = null
    this.verbs = ['get']
}
wheels.inherits(Ore, Item)

let Skull = function (x, y) {
    this.instantiate(x, y)
    this.name = 'skull'
    this.icon = game.icons.skull
    this.info = `A human's skull.`
    this.walkover = null
    this.verbs = ['get']
}
wheels.inherits(Skull, Item)

let Fruit = function (x, y) {
    this.instantiate(x, y)
    this.name = 'fruit'
    this.icon = game.icons.fruit
    this.info = `A sour watery cactus fruit.`
    this.walkover = 'get'
    this.verbs = ['get']
}
wheels.inherits(Fruit, Item)

Entity.prototype.instantiate = function (x, y) {
    this.pos = {
        x: x,
        y: y
    }
    game.check(x, y)
    game.grid[x][y].entity = this
}

game.worldbuilder.waterGround = function (x, y) {
    let i = -6
    while (i <= 6) {
        let j = -6
        while (j <= 6) {
            game.check(x + i, y + j)
            game.grid[x + i][y + j].moisture += (1 - wheels.distanceBetween(
                {x: x, y: y},
                {x: x + i, y: y + j}
            ) / 5) / 1.25
            game.grid[x + i][y + j].moisture += Math.random() / 8
            game.grid[x + i][y + j].moisture = wheels.floor(game.grid[x + i][y + j].moisture, Math.random() / 10)
            game.grid[x + i][y + j].moisture = wheels.ceiling(game.grid[x + i][y + j].moisture, 1 - Math.random() / 10)
            j++
        }
        i++
    }
}

let Square = function () {
    this.entity = null
    this.moisture = Math.random() / 10
}

Person.prototype.addToInventory = function (item) {
    let added = false
    this.inventory.forEach((slot, index) => {
        if (!slot && !added) {
            this.inventory[index] = item
            added = true
        }
    })
    return added
}

Person.prototype.drop = function (index) {
    let dropped = false
    let nums = [1, 0, -1]
    nums.forEach(i => {
        nums.forEach (j => {
            let y = this.pos.y + i
            let x = this.pos.x + j
            if ((i || j) && !(i && j) && !game.grid[x][y].entity && !dropped) {
                game.grid[x][y].entity = this.inventory[index]
                this.inventory[index].pos = {
                    y: y,
                    x: x
                }
                this.inventory[index] = null
                dropped = true
            }
        })
    })
    game.drawGrid(game.player.pos)
    if (this === game.player) {
        game.updateSidebar()
    }
}

game.worldbuilder.scatter = (Object, radius, rareness, x, y) => {
    let i = -radius
    while (i <= radius) {
        let j = -radius
        while (j <= radius) {
            game.check(x + i, y + j)
            let odds = 1 - (wheels.distanceBetween(
                {x: x, y: y},
                {x: x + i, y: y + j}
            ) / 100)
            if (odds > Math.random() * rareness) {
                if (!game.grid[x + i][y + j].entity) {
                    new Object (x + i, y + j)
                }
            }
            j++
        }
        i++
    }
}

game.drawGrid = center => {
    game.ctx.clearRect(0, 0, canvas.width, canvas.height)
    let x = center.x - 5
    let relX = 0
    while (x <= center.x + 5) {
        let y = center.y - 5
        let relY = 0
        while (y <= center.y + 5) {
            game.check(x, y)
            let moist = game.grid[x][y].moisture
            game.ctx.fillStyle = `rgba(${
                wheels.spectrum(moist, 250, 125)} ${
                wheels.spectrum(moist, 240, 115)} ${
                wheels.spectrum(moist, 200, 60)
            })`
            game.ctx.fillRect(relX * 100, relY * 100, 100, 100);
            if (game.grid[x][y].entity) {
                game.ctx.drawImage(game.grid[x][y].entity.icon, relX * 100, relY * 100, 100, 100)
            }
            relY++
            y++
        }
        relX++
        x++
    }
}

Entity.prototype.move = function (xMove, yMove) {
    let dir = {x: xMove, y: yMove}
    let x = this.pos.x
    let y = this.pos.y
    game.grid[x + dir.x] = game.grid[x + dir.x] ? game.grid[x + dir.x] : {}
    game.grid[x + dir.x][y + dir.y] = game.grid[x + dir.x][y + dir.y] ? game.grid[x + dir.x][y + dir.y] : new Square ()
    let entity = game.grid[x + dir.x][y + dir.y].entity
    if (entity) {
        if (entity.walkover) {
            entity[entity.walkover](this)
        }
        if (this.bump) {
            this.bump()
        }
    } else {
        game.grid[x][y].entity = null
        game.grid[x + dir.x][y + dir.y].entity = this
        this.pos = {
            x: x + dir.x,
            y: y + dir.y
        }
    }
    game.drawGrid(game.player.pos)
    if (this === game.player) {
        game.updateSidebar()
    }
}

Cactus.prototype.harvest = function (person) {
    let fruit = new Fruit (this.pos.x, this.pos.y)
    if (person.addToInventory(fruit)) {
        game.grid[this.pos.x][this.pos.y].entity = null
        this.pos = null
        fruit.pos = null
    }
    game.drawGrid(game.player.pos)
    game.updateSidebar()
}

Rock.prototype.mine = function (person) {
    if (wheels.random([1, 0, 0, 0, 0, 0, 0])) {
        let prize = new (wheels.random([true, true, true, false]) ? Ore : Gem) (this.pos.x, this.pos.y)
        if (person.addToInventory(prize)) {
            game.grid[this.pos.x][this.pos.y].entity = null
            this.pos = null
            prize.pos = null
        }
        game.drawGrid(game.player.pos)
        if (person === game.player) {
            game.updateSidebar()
        }
    }
}

Item.prototype.get = function (person) {
    if (person.addToInventory(this)) {
        game.grid[this.pos.x][this.pos.y].entity = null
        this.pos = null
        game.drawGrid(game.player.pos)
        game.updateSidebar()
    }
}

Person.prototype.getAdjacents = function () {
    let adjacents = []
    let nums = [-1, 0, 1]
    nums.forEach(i => {
        nums.forEach (j => {
            let x = this.pos.x + i
            let y = this.pos.y + j
            if ((i || j) && !(i && j) && game.grid[x][y].entity) {
                adjacents.push(game.grid[x][y].entity)
            }
        })
    })
    return adjacents
}

game.updateSidebar = () => {
    let inventory = document.getElementById('inventory')
    Array.from(inventory.childNodes).forEach(child => {
        inventory.removeChild(child)
    })
    game.player.inventory.forEach((item, index) => {
        if (!item) {
            let slot = document.createElement('img')
            slot.src = 'icons/square.png'
            slot.className = 'inventory-item'
            inventory.appendChild(slot)
        } else {
            let icon = document.createElement('img')
            icon.src = item.icon.src
            icon.className = 'inventory-item cursor'
            icon.addEventListener('click', () => {
                game.player.drop(index)
            })
            inventory.appendChild(icon)
        }
    })
    let adjacents = game.player.getAdjacents()
    Array.from(sidebar.childNodes).forEach((child, index) => {
        if (index > 1) {
            sidebar.removeChild(child)
        }
    })
    adjacents.forEach(ent => {
        let sidebar = document.getElementById('sidebar')
        let object = document.createElement('div')
        let label = document.createElement('div')
        let name = document.createElement('div')
        let icon = document.createElement('img')

        object.className = 'object'
        label.className = 'label'
        name.className = 'title'
        name.innerText = ent.name
        icon.src = ent.icon.src
        label.appendChild(icon)
        label.appendChild(name)
        object.appendChild(label)

        let button = document.createElement('div')
        button.className = 'button'
        button.innerText = 'look'
        object.appendChild(button)
        button.addEventListener('click', function () {
            this.innerText = this.innerText === 'look' ? ent.info : 'look'
        })

        if (ent.verbs) {
            ent.verbs.forEach(verb => {
                if (game.player.actions.includes(verb)) {
                    let button = document.createElement('div')
                    button.className = 'button'
                    button.innerText = verb
                    object.appendChild(button)
                    button.addEventListener('click', function () {
                      this[verb](game.player)
                    }.bind(ent))
                }
            })
        }

        sidebar.appendChild(object)
    })
}
