/* function isBetween (val, range) { return (val - range[0]) * (val - range[1]) < 0 }
function gradient (gd, stops) {
  for (const objColor of stops) {
    let [stop] = Object.entries(objColor)
    let [color, offset] = stop
    gd.addColorStop(offset, color)
  }
  return gd
}
(function () {
  if (innerWidth < 1366) { }
  function initPianoCanvas () {
    const piano = document.getElementById('piano')
    const pianoPrev = piano.previousElementSibling
    const pianoPrevHeight = +getComputedStyle(pianoPrev).height.split('px')[0]
    const pianoParent = piano.parentElement
    piano.style.top = pianoPrev.offsetTop + pianoPrevHeight + 'px'
    piano.height = pianoParent.offsetHeight - pianoPrevHeight
    piano.width = pianoParent.offsetWidth
    return piano.getContext('2d')
  }
  const pianoKeys = []
  function createKeyboard () {
    const ratio = 1.5
    const whiteWidth = 22 * ratio
    const height = 147 * ratio
    const top = piano.height - height
    const blackWidth = 11 * ratio
    const allKeys = 21
    const offsetX = (piano.width - allKeys * whiteWidth) / 2
    c.textAlign = 'center'
    for (let i = 0; i < allKeys; i++) {
      const x = whiteWidth * i + 1
      const octave = ((i / 7 | 0) + 4) + ''
      const note = String.fromCharCode(65 + (i + 2) % 7) + octave

      if (!(i % 1)) {
        const Hz = frquency(i + 40)
        pianoKeys.push(new PianoKey({
          top,
          left: offsetX + x,
          width: whiteWidth,
          height,
          note,
          type: 'white',
          Hz
        }))
      }
      const m7 = i % 7
      if (m7 - 2 && m7 - 6) {
        const Hz = frquency(i + 41)
        pianoKeys.push(new PianoKey({
          top,
          left: offsetX + x + blackWidth * 1.5,
          width: blackWidth,
          height: 97,
          note: note + '#',
          type: 'black',
          Hz
        }))
      }
    }
    return pianoKeys
  }
  function frquency (n) {
    const fixed = 10 ** 4
    return (Math.pow(2, (n - 49) / 12) * 440 * fixed | 0) / fixed
  }
  const tabBoook = document.getElementById('list-book-list')
  let c
  let keyboard
  function keydownHandler (e) {
    if (keyboardEvtOnce) {
      gtag('event', 'piano', {
        'event_category': 'interactive',
        'event_label': 'keydown'
      })
      keyboardEvtOnce = false
    }
    const keyPairs = {
      'q': 'C4',
      '2': 'C4#',
      'w': 'D4',
      '3': 'D4#',
      'e': 'E4',
      'r': 'F4',
      '5': 'F4#',
      't': 'G4',
      '6': 'G4#',
      'y': 'A4',
      '7': 'A4#',
      'u': 'B4',

      'i': 'C5',
      '9': 'C5#',
      'o': 'D5',
      '0': 'D5#',
      'p': 'E5',
      '[': 'F5',
      '=': 'F5#',
      'z': 'G5',
      's': 'G5#',
      'x': 'A5',
      'd': 'A5#',
      'c': 'B5',

      'v': 'C6',
      'g': 'C6#',
      'b': 'D6',
      'h': 'D6#',
      'n': 'E6',
      'm': 'F6',
      'k': 'F6#',
      ',': 'G6',
      'l': 'G6#',
      '.': 'A6',
      ';': 'A6#',
      '/': 'B6'
    }
    const musicalNote = keyPairs[e.key.toLocaleLowerCase()]

    const activate = keyboard.filter(key => {
      return key.note === musicalNote
    })
    activate.length && activate.pop().play()
  }
  let mouseEvtOnce = true
  let keyboardEvtOnce = true
  tabBoook.addEventListener('shown.bs.tab', function (e) {
    let activateKey
    c = initPianoCanvas()
    keyboard = createKeyboard().sort((a, b) => {
      if (a.type > b.type) { return -1 }
      if (a.type < b.type) { return 1 }
      return 0
    })
    keyboard.forEach(key => key.draw(c))

    piano.addEventListener('mousedown', function (e) {
      const trigX = e.x - piano.offsetLeft
      const trigY = e.y - piano.offsetTop
      activateKey = keyboard.filter(key => {
        const matchX = isBetween(trigX, [key.left, key.right])
        const matchY = isBetween(trigY, [key.top, key.bottom])
        return matchX && matchY
      }).pop()
      if (activateKey) {
        activateKey.play().update()
        c.clearRect(0, 0, piano.width, piano.height)
        keyboard.forEach(key => key.draw(c))
      }
      if (mouseEvtOnce) {
        gtag('event', 'piano', {
          'event_category': 'interactive',
          'event_label': 'click'
        })
      }
    })

    piano.addEventListener('mouseup', function (e) {
      if (activateKey) {
        activateKey.update()
        c.clearRect(0, 0, piano.width, piano.height)
        keyboard.forEach(key => key.draw(c))
        mouseEvtOnce = false
      }
    })
  }, { once: true })

  tabBoook.addEventListener('show.bs.tab', function (e) {
    window.addEventListener('keydown', keydownHandler)
  })

  tabBoook.addEventListener('hide.bs.tab', function (e) {
    window.removeEventListener('keydown', keydownHandler)
  })
}
)() */
