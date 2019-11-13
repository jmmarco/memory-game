(() => {

  const deck = document.getElementById('deck')
  const icons = ['person', 'build', 'android', 'face', 'directions_car', 'emoji_events', 'fitness_center', 'flight']

  // Create elements

  const li = document.createElement('li')
  const i = document.createElement('i')
  i.classList.add('material-icons')

  icons.concat(icons).forEach(icon => {
    let li = document.createElement('li')
    li.classList.add('card')
    let i = document.createElement('i')
    i.classList.add('material-icons', 'md-60')
    console.log(i)
    console.log(icon)
    console.log(li)
    i.innerText = icon
    li.appendChild(i)

    deck.appendChild(li)
  })

  console.log('fired')

})()