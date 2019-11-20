(() => {

  'use strict'

  const deck = document.getElementById('deck')
  const icons = ['fa-apple', 'fa-aviato', 'fa-aws', 'fa-android', 'fa-react', 'fa-angular', 'fa-vuejs', 'fa-airbnb']
  let stopWatchEl = document.getElementById('stopwatch')
  let movesEl = document.getElementById('moves')
  let starIcons = document.getElementsByClassName('fa-star')
  const restartBtn = document.querySelector('.restart')
  let pairOfcards = []

  // Create elements

  const li = document.createElement('li')
  const i = document.createElement('i')
  const div = document.createElement('div')

  const shuffledIcons = shuffle(icons.concat(icons))

  let timerId = null
  let pairs = icons.length
  let moves = 0


  function clearNodes(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }


  function initGame() {

    stopWatch(false)
    clearNodes(deck)

    shuffledIcons.forEach(icon => {
      let li = document.createElement('li')
      li.classList.add('card')
      let i = document.createElement('i')
      i.classList.add('fab')
      i.classList.add(icon)
      li.appendChild(i)
      deck.appendChild(li)
      li.addEventListener('click', handleClick)
    })

    movesEl.innerText = '0'
    stopWatchEl.innerText = '00:00:00'

    restartBtn.addEventListener('click', initGame)
  }


  function checkPair(cards) {
    if (cards[0].firstChild.classList.value === cards[1].firstChild.classList.value) {
      cards[0].classList.add('match')
      cards[1].classList.add('match')
      return true
    } else {
      setTimeout(() => {
        cards[0].classList.remove('show', 'open')
        cards[1].classList.remove('show', 'open')
      }, 500)
      return false
    }

  }

  // Non-mutating Fisher-Yates Algorithm Shuffle https://bost.ocks.org/mike/shuffle/
  function shuffle(array) {
    const arrayToShuffle = [...array]
    let m = arrayToShuffle.length, t, i
    while (m) {
      i = Math.floor(Math.random() * m--)
      t = arrayToShuffle[m];
      arrayToShuffle[m] = arrayToShuffle[i];
      arrayToShuffle[i] = t;
    }

    return arrayToShuffle
  }


  function stopWatch(command, stopWatchEl) {

    /* 
      command: 'on' or 'off'
      stopWatchEl: the destination HTML node
    */

    let clock = {
      h: 0, m: 0, s: 0, display: null
    }

    function makeTwoDigits(number) {
      return number < 10 ? `0${number}` : number
    }


    if (command) {
      console.info('Stopwatch on.')
      timerId = setInterval(() => {
        clock.s++
        if (clock.s == 60) {
          clock.s = 0
          clock.m++
        }

        if (clock.m == 60) {
          clock.m = 0
          clock.h++
        }

        if (clock.h == 24) {
          clock.h = 0
        }

        clock.display = `${makeTwoDigits(clock.h)}:${makeTwoDigits(clock.m)}:${makeTwoDigits(clock.s)}`
        stopWatchEl.innerText = clock.display
      }, 1000)
    } else if (!command) {
      console.info('Stopwatch off.');
      clearInterval(timerId);
    }

    return timerId
  }



  function handleClick(e) {

    console.log('target is: ', e.target)

    let card = e.target


    if (!timerId) {
      timerId = stopWatch(true, stopWatchEl)
    }

    if (!card.classList.contains('show') && card.classList.contains('card') && pairOfcards.length < 2) {
      card.classList.add('show', 'open')
      console.log('card now has', card)
      pairOfcards.push(card)
    }

    if (pairOfcards.length === 2) {
      countMatch(checkPair(pairOfcards))
      pairOfcards = []
    }

    checkWin(pairs)

  }


  function countMatch(outcome) {
    console.log('inside countMatch', outcome)
    moves++
    if (outcome) {
      pairs--
    }
    updateMoves(moves, movesEl)
    setRating(starIcons, moves)
  }

  function checkWin(pairs) {
    if (pairs === 0) {
      stopWatch(false, stopWatchEl)
      launchModal()
    }
  }

  function updateMoves(moves, target) {
    target.innerText = moves
  }

  function setRating(stars, moves) {
    switch (moves) {
      case 10:
        stars[2].classList.remove('fas')
        stars[2].classList.add('far')
        break
      case 20:
        stars[1].classList.remove('fas')
        stars[1].classList.add('far')
        break
      default:
        break
    }
  }



  function launchModal() {
    document.querySelector('.modal').classList.toggle('hidden')
    document.querySelector('.container').classList.toggle('fade')
    const modalTime = document.getElementById('modal-time')
    const modalMoves = document.getElementById('modal-moves')

    const scorePanelMoves = document.getElementById('moves').cloneNode(true)
    const scorePanelStopWatch = document.getElementById('stopwatch').cloneNode(true)
    modalTime.appendChild(scorePanelStopWatch)
    modalMoves.appendChild(scorePanelMoves)
    document.getElementById('modal-dismiss').addEventListener('click', launchModal)
    document.getElementById('modal-play-again').addEventListener('click', initGame)
  }


  initGame()
})()

