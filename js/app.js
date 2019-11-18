(() => {

  const deck = document.getElementById('deck')
  const icons = ['fa-apple', 'fa-aviato', 'fa-aws', 'fa-android', 'fa-react', 'fa-angular', 'fa-vuejs', 'fa-airbnb']

  let pairOfcards = []

  // Create elements

  const li = document.createElement('li')
  const i = document.createElement('i')
  const div = document.createElement('div')

  const shuffledIcons = shuffle(icons)


  shuffledIcons.concat(shuffledIcons).forEach(icon => {
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

  // Non-mutating Fisher-Yates Algorithm Shuffle https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    const shuffledArray = [...array]
    let m = shuffledArray.length, t, i
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = shuffledArray[m];
      shuffledArray[m] = shuffledArray[i];
      shuffledArray[i] = t;
    }

    return shuffledArray
  }

  // function shuffleArray(array) {
  //   const shuffledArray = array.slice()
  //   for (let i = shuffledArray.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  //   }
  //   return shuffledArray
  // }

  // console.log(shuffleArray(icons))



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