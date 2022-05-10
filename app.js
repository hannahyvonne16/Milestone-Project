//canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

console.log(context)
canvas.width = 1176
canvas.height = 730

//gravity
const gravity = 0.5

//images (definitely a better way to do this)
const platformImage = new Image()
platformImage.src = './assets/ground1.png'
const smallplatformImage = new Image()
smallplatformImage.src = './assets/ground3.png'
const levelImage = new Image()
levelImage.src = './assets/ground2.png'
const backgroundImage = new Image()
backgroundImage.src = './assets/sky.png'
const hillsImage = new Image()
hillsImage.src = './assets/hills1.png'

// cat sprite sheets from Beviuliin on Graphic Driver: https://graphicriver.net/item/cute-and-cubby-cat-sprites-game-character/36907693
const idleRight = new Image()
idleRight.src = './assets/idleRight.png'
const idleLeft = new Image()
idleLeft.src = './assets/idleLeft.png'
const runRight = new Image()
runRight.src = './assets/runRight.png'
const runLeft = new Image()
runLeft.src = './assets/runLeft.png'
const jumpRight = new Image()
jumpRight.src = './assets/jumpRight.png'
const jumpLeft = new Image()
jumpLeft.src = './assets/jumpLeft.png'
const fallRight = new Image()
fallRight.src = './assets/fallRight.png'
const fallLeft = new Image()
fallLeft.src = './assets/fallLeft.png'

// cat
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 220
        this.height = 150

        this.image = idleRight
        this.frames = 0
        this.sprites = {
           idle: {
               right: idleRight,
               left: idleLeft
           },
           run: {
               right: runRight,
               left: runLeft
           }
        }
        this.currentSprite = this.sprites.idle.right

    }
    
    character() {
        context.drawImage(
            this.currentSprite,
            1268 * this.frames,
            0,
            1268,
            819,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }


// From Christopher Lis: https://youtu.be/4q2vvZn5aoo?t=742
// Code that makes the character affected by gravity
    fall() {
        this.frames++
        if (this.frames > 17 && (this.currentSprite === this.sprites.idle.right || this.currentSprite === this.sprites.idle.left)) {
            this.frames = 0
        }
        else if (this.frames > 11 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
            this.frames = 0
        }
        this.character()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(
            this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
    }
}
// creates platforms
class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y,
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}

// creates background items
class BackgroundStuff {
    constructor({ x, y, image }) {
        this.position = {
            x: x,
            y: y,
        }

        this.image = image
        this.width = image.width
        this.height = 20
    }

    draw() {
        context.drawImage(this.image, this.position.x, this.position.y)
    }
}


// base (before restart if lose scenario)
let player = new Player()

// places the platforms (probably a better way to do this)
let platforms = [
    new Platform({
        x:-1,
        y:620,
        image: platformImage,
    }),
    new Platform({
        x:platformImage.width * 5 + 275, 
        y:280,
        image: levelImage
    }),  
    new Platform({
        x:platformImage.width * 10 + 275, 
        y:470,
        image: levelImage
    }),  
    new Platform({
        x:platformImage.width - 3, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 2 - 5, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 3 + 400, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 4 - 9, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 5 - 11, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 5 - 11, 
        y:495,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 7 + 50, 
        y:620,
        image: platformImage
    }), 
    new Platform({
        x:platformImage.width * 9 - 100, 
        y:620,
        image: smallplatformImage
    }), 
    new Platform({
        x:platformImage.width * 10, 
        y:620,
        image: platformImage
    }),
    new Platform({
        x:platformImage.width * 12, 
        y:620,
        image: platformImage
    })
]

// creates sky and yarn balls
let BackgroundThing = [
    new BackgroundStuff({
        x:-1,
        y:-1,
        image: backgroundImage,
    }),
    new BackgroundStuff({
        x:0,
        y:200,
        image: hillsImage,
    }),
]

// creates theKey that allows for sprites to change depending on their direction
let theKey

// creates key constants
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

// how far we go
let scrollOffset = 0

// restart if lose scenario
function init() {
    player = new Player()
    platforms = [
        new Platform({
            x:-1,
            y:620,
            image: platformImage,
        }),
        new Platform({
            x:platformImage.width * 5 + 275, 
            y:280,
            image: levelImage
        }),  
        new Platform({
            x:platformImage.width * 10 + 275, 
            y:470,
            image: levelImage
        }),  
        new Platform({
            x:platformImage.width - 3, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 2 - 5, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 3 + 400, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 4 - 9, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 5 - 11, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 5 - 11, 
            y:495,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 7 + 50, 
            y:620,
            image: platformImage
        }), 
        new Platform({
            x:platformImage.width * 9 - 100, 
            y:620,
            image: smallplatformImage
        }), 
        new Platform({
            x:platformImage.width * 10, 
            y:620,
            image: platformImage
        }),
        new Platform({
            x:platformImage.width * 12, 
            y:620,
            image: platformImage
        })
    ]

    BackgroundThing = [
        new BackgroundStuff({
            x:-1,
            y:-1,
            image: backgroundImage,
        }),
        new BackgroundStuff({
            x:0,
            y:200,
            image: hillsImage,
        }),
    ]
    
    scrollOffset = 0
}

// movement function
function movement() {
    requestAnimationFrame(movement)
    context.fillStyle = 'white'
    context.fillRect(0, 0, canvas.width, canvas.height)

    BackgroundThing.forEach(BackgroundStuff => {
        BackgroundStuff.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.fall()

// left + right movement
    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 8
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -8
    }
    else {
        player.velocity.x = 0

// From Christopher Lis: https://youtu.be/4q2vvZn5aoo?t=2667
// Code that creates background scrolling as character moves
        if (keys.right.pressed) {
            scrollOffset += 8
            platforms.forEach((platform) => {
                platform.position.x -= 8
            })
            BackgroundThing.forEach(BackgroundStuff => {
                BackgroundStuff.position.x -= 6
            })
        }
        else if (keys.left.pressed) {
            scrollOffset -= 5
            platforms.forEach((platform) => {
                platform.position.x += 8
            })
            BackgroundThing.forEach(BackgroundStuff => {
                BackgroundStuff.position.x += 6
            })
        }
    }


// platform landing
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= 
            platform.position.y && 
            player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
            player.position.x + player.width >=
            platform.position.x &&
            player.position.x <=
            platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })
// changes to sprites depending on their direction
    if (keys.right.pressed && theKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
    }
    else if (!keys.right.pressed && theKey === 'right' && player.currentSprite !== player.sprites.idle.right) {
        player.frames = 1
        player.currentSprite = player.sprites.idle.right
    }
    else if (keys.left.pressed && theKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.frames = 1
        player.currentSprite = player.sprites.run.left
    }
    else if (!keys.left.pressed && theKey === 'left' && player.currentSprite !== player.sprites.idle.left) {
        player.frames = 1
        player.currentSprite = player.sprites.idle.left
    }

// win scenario
    if (scrollOffset > 7000) {
        
    }
// lose scenario
    if (player.position.y > canvas.height) {
        init()
    }
}

// initiates movement
movement()

// from Kirupa: https://www.kirupa.com/canvas/moving_shapes_canvas_keyboard.htm
// key movements
addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            theKey = 'left'
            break;
        
        case 83:
            console.log('down')
            break;
        
        case 68:
            console.log('right')
            keys.right.pressed = true
            theKey = 'right'
            break;

        case 87:
            console.log('up')
// from Stackoverflow: (can't currently find the question again, looking for it, sorry)
// this bit of code prevents infinite jumping 
            if (event.repeat) {
                return
            }
            player.velocity.y -= 15
            break
    }
})

addEventListener('keyup', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            break
        
        case 83:
            console.log('down')
            break
        
        case 68:
            console.log('right')
            keys.right.pressed = false
            break;

        case 87:
            console.log('up')
            break
    }
})