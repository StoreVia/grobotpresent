function ghostCursor(options){
    let hasWrapperEl = options && options.element
    let element = hasWrapperEl || document.body
    let width = window.innerWidth
    let height = window.innerHeight
    let cursor = { x: width / 2, y: width / 2 }
    let particles = []
    let canvas, context
    let baseImage = new Image()
    baseImage.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAZCAQAAACMPFaRAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQflBw4DGjvbwiYUAAABYnpUWHRSYXcgcHJvZmlsZSB0eXBlIGljYwAAOI2dVFuOgzAM/M8p9gh+mxyHBiLt/S+wDiQUVlTd7iCKNHbs8SNN36WkrwY1SNBADIIiQqJAuFG22OripCQuRKCTZp0JwEtt5ngZTkiGxs4egRQUpAyDrVbjVfgDamRtinAQC9NyKPsQ6UP/OfSDk0vX0itgSiamzrbXi6Nse7hHh6AfwNwPoBiF7eAfMPgU7ZRoaA9UeiZYzc/88uQv/uvBt0DbPHZDlSOzn3iC6anozOOhNHkrbRo1AwhbDenZybK5hYWAkXN7KGYbrahRnsZCcHhxO2+LcwpjjjG34+TQfg03Yw996eEBxEvI2LXUlo2mnnOi/G5sr/Dp+P8f6LgaJ1TWtsRjkREtLt2d4x1iETW6aL9ojHu69S+9c3hnH0IupeWC275Infe7JrXcKWaZlvadgfY9qllvSyNj7GnbXwY81lzSD3dD5+EuTNuGAAAC0klEQVQ4y43U22tcVRjG4XeSSVVEsFJPhGKNVou2VC1WpRprQuKpWg21oNCixYJeeOFFwb/BywqCBnohVBQsWCJ4KJ4QKxSr1qRNMK0xSqoxMZlJJ5mZ/a31/byYNdtYEu237tZ+H9bi3ZutP4VM1Svifp6nBaHlpvGMnbG/1h6FStJZBVUvD69SY5wdFJbjNFYvw1h8o3aVa0YqCdkeXwBgjCeX5ol2cwoAC/tGChWpLJTdGj+lMWd4DJ3PE93KYCPkx7LNaE4q6y+hbH38IvFRHv43T/Q+fkj0W7sLlXROquhjZULZxvhV4iP0/sMTvYfjiX5vW1CmWVWlaaFsTVznyu6IRxM/SRdatDZzLNEfrRPFG7K1qCJF1TviAEfZhLI7PYUY5P6cbuKbRE/aA4h1HImfZ+tdqt8UDwHwNbchu9vT9fiOjQhxPakNH7EexFo+AohHstsV+okp/iUbkG3xRjGBXQjRRRnAR+0hRAcfpDThsKw7Pws+4xZknT4IGLvTuy2Bn7FtiDUcbkZ92PqE7F4/kfNPuBlZl58i5njOx+0JxGoO5XTUHkGqCNlWH8r5h9yIrMeHeBYhenzIdiDaeRdP9Gd7XFqQqg3e7cM5H6ADWW/sNAXFDbYNcS0Hc/qL9Q0UFlSTpKrmhexB/ynn73MdKhXRvCqtiKt5q1mr/2pPDTapJNUa/FE/nfP3WO2qK8rFlRwgJDphT4+1VFVf/Oknvt3Hmo3wDu0IsYo3sbT5e9g1cT5t8AXtV+jz8Zwf5BpW8npOJ8NzU61L0CY/Xgg7/bfEI2/TTz3RqbB3plhTttyPpq6qThfCM342P73Z8HR4cfa/aJNPtITd/geLxmfCS+W2/6GSlKmqydawxydzWgovz624ANrgNU0Xw16fAvBy2HfuorrsQmiTzxbDCz7NXHilcvFytLjU5gpluiTMH7h0pS6rv9ZWa1HbkvhvgOg763eepbgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjEtMDctMTRUMDM6MjY6NTArMDA6MDCiRaWRAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIxLTA3LTE0VDAzOjI2OjUwKzAwOjAw0xgdLQAAADd0RVh0aWNjOmNvcHlyaWdodABDb3B5cmlnaHQgMTk5OSBBZG9iZSBTeXN0ZW1zIEluY29ycG9yYXRlZDFs/20AAAAgdEVYdGljYzpkZXNjcmlwdGlvbgBBZG9iZSBSR0IgKDE5OTgpsLrq9gAAAABJRU5ErkJggg=="
    function init(){
      canvas = document.createElement("canvas")
      context = canvas.getContext("2d")
      canvas.style.top = "0px"
      canvas.style.left = "0px"
      canvas.style.pointerEvents = "none"
      if(hasWrapperEl){
        canvas.style.position = "absolute"
        element.appendChild(canvas)
        canvas.width = element.clientWidth
        canvas.height = element.clientHeight
      } else {
        canvas.style.position = "fixed"
        document.body.appendChild(canvas)
        canvas.width = width
        canvas.height = height
      }
      bindEvents()
      loop()
    }
    function bindEvents(){
      element.addEventListener("mousemove", onMouseMove)
      element.addEventListener("touchmove", onTouchMove)
      element.addEventListener("touchstart", onTouchMove)
      window.addEventListener("resize", onWindowResize)
    }
    function onWindowResize(e){
      width = window.innerWidth
      height = window.innerHeight
      if(hasWrapperEl){
        canvas.width = element.clientWidth
        canvas.height = element.clientHeight
      } else {
        canvas.width = width
        canvas.height = height
      }
    }
    function onTouchMove(e){
      if(e.touches.length > 0){
        for (let i = 0; i < e.touches.length; i++){
          addParticle(e.touches[i].clientX, e.touches[i].clientY, baseImage)
        }
      }
    }
    function onMouseMove(e){
      if(hasWrapperEl){
        const boundingRect = element.getBoundingClientRect()
        cursor.x = e.clientX - boundingRect.left
        cursor.y = e.clientY - boundingRect.top
      } else {
        cursor.x = e.clientX
        cursor.y = e.clientY
      }
      addParticle(cursor.x, cursor.y, baseImage)
    }
    function addParticle(x, y, image){
      particles.push(new Particle(x, y, image))
    }
    function updateParticles(){
      context.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++){
        particles[i].update(context)
      }
      for (let i = particles.length - 1; i >= 0; i--){
        if(particles[i].lifeSpan < 0){
          particles.splice(i, 1)
        }
      }
    }
    function loop(){
      updateParticles()
      requestAnimationFrame(loop)
    }
    function Particle(x, y, image){
      const lifeSpan = 13
      this.initialLifeSpan = lifeSpan //ms
      this.lifeSpan = lifeSpan //ms
      this.position = { x: x, y: y }
  
      this.image = image
  
      this.update = function(context){
        this.lifeSpan--
        const opacity = Math.max(this.lifeSpan / this.initialLifeSpan, 0)
  
        context.globalAlpha = opacity
        context.drawImage(
          this.image,
          this.position.x,
          this.position.y
        )
      }
    }
    init()
  }
  new ghostCursor();