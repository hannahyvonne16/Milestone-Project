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
        this.position.y += this.velocity.y

        if(
            this.position.y + this.height + this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
        else this.velocity.y = 0
    }
}

const player = new Player()

function movement() {
    requestAnimationFrame(movement)
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.fall()
}
movement()


//moving



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