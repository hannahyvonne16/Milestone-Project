//https://www.youtube.com/watch?v=4q2vvZn5aoo&t=278s

//canvas
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

console.log(context)
canvas.width = document.body.clientWidth
canvas.height = document.body.clientHeight

//gravity
const gravity = 0.5

//character
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

        this.width = 50
        this.height = 50
        }
    
    character() {
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    fall() {
        this.character()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(
            this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
        else this.velocity.y = 0
    }
}
//platform
class Platform {
    constructor() {
        this.position = {
            x: 300,
            y: 500,
        }

        this.width = 200
        this.height = 20
    }

    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

//consts
const player = new Player()
const platform = new Platform()

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
//    up: {
//        pressed: false
//    }
}

//movement function
function movement() {
    requestAnimationFrame(movement)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.fall()
    platform.draw()

//left right movement
    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = 5
    }
    else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -5
    }
//    else if (keys.up.pressed) {
//        player.velocity.y -= 20
//    }
    else {
        player.velocity.x = 0

        if (keys.right.pressed) {
            platform.position.x -= 5
        }
        else if (keys.left.pressed) {
            platform.position.x += 5
        }
    }
//remove double jump?

//platform landing
    if (player.position.y + player.height <= 
        platform.position.y && 
        player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
        player.position.x + player.width >=
        platform.position.x &&
        player.position.x <=
        platform.position.x + platform.width) {
        player.velocity.y = 0

        console.log('fall')
    }
}
movement()

//key movements
addEventListener('keydown', ({ keyCode }) => {
    console.log(keyCode)
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = true
            break;
        
        case 83:
            console.log('down')
            break
        
        case 68:
            console.log('right')
            keys.right.pressed = true
            break;

        case 87:
            console.log('up')
//            keys.up.pressed = true
            player.velocity.y -= 20
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
 //           keys.up.pressed = false
            break
    }
})


//add images part
//function newImage(url, left, bottom) {
//    let object = document.createElement('img')
//    object.src = url
//    object.style.position = 'fixed'
//    object.style.left = left + 'px'
//    object.style.bottom = bottom + 'px'
//    document.body.append(object)
//    return object
//}

//function newItem(url, left, bottom) {
//    let item = newImage(url, left, bottom)

//    item.addEventListener('dblclick', function(){
//        item.remove()
//    })
    
//    return item
//}

//newImage('assets/catrun1.png', 150, 500)