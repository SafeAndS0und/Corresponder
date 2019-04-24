export default parentElement =>{

  if(!parentElement.children[0]) // if user is not logged in yet, don't do anything
    return

  const children = parentElement.childNodes

  let mouseY = 0
  let isMoving = {}

  children.forEach(element =>{

    element.addEventListener('mousedown', event =>{

      if(event.button !== 0) // if not LMB
        return

      isMoving[element.attributes[0]] = true

      mouseY = event.y  // where the mouse was when first clicked the element

      let difference


      const mouseMoveListener = event =>{

        if(isMoving[element.attributes[0]]){
          difference = event.y - mouseY // calculate difference to move the element

          // If its dragged at least 3px
          if(Math.abs(difference) > 3){
            element.style.transform = `translateY(${difference}px) scale(1.05)`
            element.style.boxShadow = '6px 6px 10px 0px #111319'
            element.style.zIndex = '66'
          }
        }
      }

      const mouseUpListener = event =>{

        if(event.button !== 0) // if not LMB
          return

        isMoving = {}
        const fromTop = element.offsetTop + difference // sum up the translateY value with the offset it had before

        element.style.boxShadow = 'none'
        element.style.transform = 'translateY(0) scale(1)'
        element.style.zIndex = '1'

        window.removeEventListener('mousemove', mouseMoveListener)
        window.removeEventListener('mouseup', mouseUpListener)

        if(isNaN(fromTop))
          return

        const eSorted = [{offset: fromTop, element}]

        children.forEach(e =>{
          if(e !== element)
            eSorted.push({offset: e.offsetTop, element: e})
        })

        // sort elements by offsetTop
        eSorted.sort((a, b) =>{
          return a.offset - b.offset
        })

        // its sorted so we can change the gridRow value of them
        eSorted.forEach((e, index) =>{
          e.element.style.gridRow = ++index
        })

      }

      window.addEventListener('mousemove', mouseMoveListener)
      window.addEventListener('mouseup', mouseUpListener)

    })
  })
}

