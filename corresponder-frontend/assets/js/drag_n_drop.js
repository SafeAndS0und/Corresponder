export default elements =>{

  if(!elements[0]) // if user is not logged in yet, don't do anything
    return

  let mouseY = 0
  let isMoving = {}

  elements.forEach(element =>{
    //establish whats the other element
    console.dir(element)
    const otherElement = element.className.includes('rooms') ? elements[1] : elements[0]

    element.addEventListener('mousedown', event =>{
      if(event.button !== 0) // if not LMB
        return

      isMoving[element.attributes[0]] = true
      element.style.boxShadow = '6px 6px 10px 0px black'
      element.style.zIndex = '66'

      mouseY = event.y  // where the mouse was when first clicked the element

      let difference

      const mouseMoveListener = event =>{
        console.log('moving')
        if(isMoving[element.attributes[0]]){
          difference = event.y - mouseY // calculate difference to move the element
          element.style.transform = `translateY(${difference}px)`
        }

      }

      const mouseUpListener = event =>{

        if(event.button !== 0) // if not LMB
          return

        isMoving = {}
        const fromTop = element.offsetTop + difference // sum up the translateY value with the offset it had before

        element.style.boxShadow = 'none'
        element.style.transform = 'translateY(0)'

        window.removeEventListener('mousemove', mouseMoveListener)
        window.removeEventListener('mouseup', mouseUpListener)

        if(isNaN(fromTop))
          return

        if(fromTop > otherElement.offsetTop){ // move it up or down acc
          element.style.gridRow = 2
          otherElement.style.gridRow = 1
        }
        else{
          element.style.gridRow = 1
          otherElement.style.gridRow = 2
        }
      }


      window.addEventListener('mousemove', mouseMoveListener)
      window.addEventListener('mouseup', mouseUpListener)


    })
  })
}

