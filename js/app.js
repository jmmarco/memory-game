(() => {

  const deck = document.getElementById('deck')
  const icons = ['fa-apple', 'fa-aviato', 'fa-aws', 'fa-android', 'fa-react', 'fa-angular', 'fa-vuejs', 'fa-airbnb']

  let pairOfcards = []

  // Create elements

  const li = document.createElement('li')
  const i = document.createElement('i')
  const div = document.createElement('div')


  icons.concat(icons).forEach(icon => {
    let li = document.createElement('li')
    li.classList.add('card')
    document.createElement('div')
    let i = document.createElement('i')
    i.classList.add('fab')
    i.classList.add(icon)
    // li.classList.add('hide')
    li.appendChild(i)
    deck.appendChild(li)
    li.addEventListener('click', handleClick)
  })


  function checkPair(cards) {
    if (cards[0].firstChild.classList.value === cards[1].firstChild.classList.value) {
      cards[0].classList.add('match')
      cards[1].classList.add('match')
    } else {
      setTimeout(() => {
        cards[0].classList.remove('show', 'open')
        cards[1].classList.remove('show', 'open')
      }, 500)
    }

  }

  function handleClick(e) {
    let card = e.target

    console.log(card)
    console.log('pair', pairOfcards.length)

    console.log(!card.classList.contains('show'))

    if (pairOfcards.length < 2 && !card.classList.contains('show') ) {
      card.classList.add('open', 'show')
      pairOfcards.push(card)
    }
    

    if (pairOfcards.length == 2) {
      console.log(pairOfcards[0], pairOfcards[1])
      checkPair(pairOfcards)
      pairOfcards = []
    }

    // setTimeout(() => {
    //   card.classList.remove('open', 'show')
    // }, 500)
    // card.classList.add('animated', 'flipInX')

  }


})()