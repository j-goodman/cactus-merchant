window.addEventListener('load', () => {
    // Load canvas and images
    game.canvas = document.getElementById('canvas')
    game.ctx = game.canvas.getContext('2d')

    game.icons.cactus = document.getElementById('cactus')
    game.icons.cactusseed = document.getElementById('cactusseed')
    game.icons.fruit = document.getElementById('fruit')
    game.icons.gem = document.getElementById('gem')
    game.icons.herbseller = document.getElementById('herbseller')
    game.icons.key = document.getElementById('key')
    game.icons.miner = document.getElementById('miner')
    game.icons.minerb = document.getElementById('miner-b')
    game.icons.ore = document.getElementById('ore')
    game.icons.poisonroot = document.getElementById('poisonroot')
    game.icons.rock = document.getElementById('rock')
    game.icons.skull = document.getElementById('skull')
    game.icons.shriveledcactus = document.getElementById('shriveledcactus')
    game.icons.trader = document.getElementById('trader')
    game.icons.warlock = document.getElementById('warlock')
    game.icons.windshrine = document.getElementById('windshrine')

    instantiateWorld()
})
