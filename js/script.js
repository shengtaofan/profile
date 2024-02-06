"use strict";

function between(a) {
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.floor(Math.random() * (Math.max(a, b) - Math.min(a, b) + 1)) + Math.min(a, b);
}

function isBetween(n, a, b) {
  var min = Math.min(a, b);
  var max = Math.max(a, b);
  return min < n && n < max;
}

(function () {
  function tabTrigger(hash) {
    var tab = document.getElementById("".concat(hash.split('#')[1], "-list"));
    new bootstrap.Tab(tab).show();
  }

  function anchor() {
    if (innerWidth < 992) {
      document.querySelector('.parallax').scrollTop = document.getElementById('list-tabContent').offsetTop;
    }
  }

  var _location = location,
      hash = _location.hash;

  if (hash) {
    tabTrigger(hash);
    anchor();
  }

  if (navigator.userAgent.match(/Trident|MSIE/)) {
    location = 'microsoft-edge:https://shengtaofan.github.io/profile/';
    setTimeout(function () {
      location = 'https://www.microsoft.com/zh-tw/edge'; // location = 'https://support.microsoft.com/zh-tw/topic/此網站在-microsoft-edge-中的運作效能更好-160fa918-d581-4932-9e4e-1075c4713595'
    }, 50);
  }

  document.querySelectorAll('[data-bs-toggle="list"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      anchor();
      if (location.href === this.href) return;
      location = this.href;
    });
  }); // document.getElementById('modal-carousel').addEventListener('shown.bs.modal', function (event) {
  //   gtag('event', 'modal-carousel-shown', {
  //     'event_category': 'interactive',
  //     'event_label': 'The Samurai Game'
  //   })
  //   this.addEventListener('contextmenu', function (e) { e.preventDefault() })
  // }, { once: true })

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 100; i++) {
    var div = document.createElement('div');
    var style = div.style;

    var _document$querySelect = document.querySelector('.container'),
        conL = _document$querySelect.offsetLeft,
        conW = _document$querySelect.offsetWidth,
        conT = _document$querySelect.offsetTop,
        conH = _document$querySelect.offsetHeight;

    var conR = conL + conW;
    var conB = conT + conH;
    var bubbleLeft = between(innerWidth);
    var beteenTop = between(5, 95);

    if (innerWidth < 992 || i < 50) {
      while (isBetween(bubbleLeft, conL, conR)) {
        bubbleLeft = between(innerWidth);
      }
    } else if (isBetween(bubbleLeft, conL, conR)) {
      beteenTop = between(conB * 100 / innerHeight | 0, 150);
    }

    div.classList.add('bubble');
    Object.assign(style, {
      left: bubbleLeft + 'px',
      top: innerWidth < 992 ? between(1500) + 'px' : beteenTop + 'vh',
      transform: "translateZ(".concat(innerWidth >= 992 ? between(200, -500) : between(250, -250), "px) translateY(var(--trY))")
    });
    fragment.appendChild(div);
  }

  document.querySelector('.parallax').prepend(fragment);
  window.addEventListener('resize', function (e) {
    if (innerWidth >= 992) {
      document.querySelector('.parallax').scrollTop = 0;
    }
  });
})();
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
"use strict";
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function (base64) {
  var img = new Image();
  var samurai = document.getElementById('samurai');
  var bgSamurai = document.querySelector('.bg-samurai');
  var c = samurai.getContext('2d');
  var finalImg = {};
  var frameCount = null;
  var imgData = {};
  img.addEventListener('load', function (e) {
    if (innerWidth < 992) return finished();
    var ely = bgSamurai.offsetTop,
        elx = bgSamurai.offsetLeft,
        elh = bgSamurai.offsetHeight,
        elw = bgSamurai.offsetWidth;
    var shrinkRatio = elh / this.height;
    var shrinkedWidth = shrinkRatio * this.width | 0;
    finalImg.x = elx + elw - shrinkRatio * this.width;
    finalImg.y = ely;
    samurai.width = shrinkedWidth;
    samurai.height = elh;
    c.drawImage(this, 0, 0, shrinkedWidth, elh);
    imgData = c.getImageData(0, 0, shrinkedWidth, elh);
    init(samurai, imgData);
  });
  img.src = base64;
  var pixelGroups = [];

  function init(samurai, _ref) {
    var data = _ref.data,
        height = _ref.height,
        width = _ref.width;
    var groupRow = height / 8 | 0;
    samurai.style.top = 0 + 'px'; // samurai.height = finalImg.y + height

    samurai.height = innerHeight;
    samurai.style.left = finalImg.x - 300 + 'px';
    samurai.width = innerWidth / 4 + 300;

    for (var y = 0; y < height; y++) {
      var id = y / groupRow | 0;
      !pixelGroups[id] && pixelGroups.splice(id, 0, []);

      for (var x = 0; x < width; x++) {
        var colorSet = (y * width + x) * 4;
        var red = data[colorSet];
        var green = data[colorSet + 1];
        var blue = data[colorSet + 2];
        if (!red && !green && !blue) continue;
        var color = [red, green, blue];
        var alpha = data[colorSet + 3] / 255 * 0.8; // const p1 = { x: 300 + x, y: finalImg.y + y + 3 }
        // const p0 = { x: p1.x + between(300, -300), y: innerHeight + between(100) }

        var p1 = {
          x: 300 + x,
          y: finalImg.y + y + 1
        };
        var sign = Math.sign(between(0, 1));
        var p0offset = sign ? between(0, 50) : between(0, -50);
        var p0 = {
          x: 0,
          y: samurai.height
        };
        var last = y === height - 1 && x === width - 1;
        var randomId = between(pixelGroups.length - 1 | 0);
        pixelGroups[randomId].push(new Particle({
          color: color,
          alpha: alpha,
          p0: p0,
          p1: p1,
          id: id,
          last: last
        }));
      }
    }

    setTimeout(function () {
      start = Date.now();
      then = start;
      frameCount = requestAnimationFrame(update);
    }, 1500);
  }

  var drawingGroups = [];
  var fps = 30;
  var interval = 1000 / fps;
  var start = Date.now();
  var then = start;
  var delta;
  var timer = 0;
  var done = false;
  var countingSwitch = true;
  var countUp = 0;

  function countdown(times, cb) {
    countingSwitch = false;
    cb();
    countUp += 1;
    countUp < times && setTimeout(function () {
      return countdown(times, cb);
    }, 250);
  }

  function update() {
    if (done) return;
    countingSwitch && countdown(pixelGroups.length, function () {
      return drawingGroups.push(pixelGroups[countUp]);
    });
    frameCount = requestAnimationFrame(update);
    var now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - delta % interval;
      timer = then - start | 0;
      draw();
    }
  }

  function draw() {
    // console.log(timer)
    if (timer < 5000) {
      c.clearRect(0, 0, samurai.width, samurai.height);

      var _iterator = _createForOfIteratorHelper(drawingGroups),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var group = _step.value;

          var _iterator2 = _createForOfIteratorHelper(group),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var particle = _step2.value;
              particle.draw(c).update(delta);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return;
    }

    finished();
  }

  function finished() {
    bgSamurai.style.backgroundImage = "url(".concat(base64, ")");
    samurai.remove();
    done = true;
    cancelAnimationFrame(frameCount);
    drawingGroups.splice(0, drawingGroups.length);
    pixelGroups.splice(0, pixelGroups.length);
  }
})('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKcAAADPCAYAAACQscHbAAAAAXNSR0IArs4c6QAAIABJREFUeF7svQFwG/d5L/jjLpcLrgCtAK0AQYBhwBAZmAxKGiHLkGZps9KxUln7KfbTs+tnjyYeT3Juc5n2Mq+Td+/au7z22vfay6TPl54vGV88fvFT5dOzRpXLSE+VjpHCimGoMKRhMggphDAMCAa0ArQGtNrlcpc335+Uq7h2LKVuezMmM4ooeQFCix++//f9vt/3+5qw+fXPfQeaALz3F70m+rv3fq1t/MXt/v7P/W/7B/3897sB/6An3Hzwbd8BuvfcTWB2dnY2Xb9+nVtdXW1yHKfJtm32+81n4ziOAZLn+TX6vrm5mf2ivxNFkf0+Pz9/K2jp+5u/bn1RN6+57Rf6z3XhJjj/ee78TWBy0WiUb25ubnG73ZxlWRyBckcwmDAtw99q2832ipFffOvtHL1MT1PTGs/zDtfUtFbW9dWmpiYG1Ju/3wpcuj6Xyzm3APRWoL4faP957sTP+amb4PynfUtuHt8cdu/m28Nhj6e5Odi5PXpP9BNR7PDuaGpp5nFVq3su/STtyi8vNr39dlG/er12vQXANqkFfrcHfsVtvfHjy8VVL9ZwDfBuc6+5xS1rW4QW1K+v1DLvvNNoNBo2AVkQBKelpcWhKHvp0iUC5QcB9p/2TtzGT9sE523cpI/gkltzSm737t2cJEnyjmA41dt2nxxPJmRZUSAJblgcDx4WNK0OrVZDtbSMpcwcMpkM6moBkiRh+44Wx7puNN5pxhredsCDQ+vOFsTvCmGnL3h9VdO14pvlt79bqdSuX79ucxznEFDpV2trq71lyxZnfn6eQHorUD+Cf+ZH+xSb4Pxo7+d7n+1nQEn5ZTgc5mVZlj2trQmfd+vuX/2VfVxiYBguQYDIAdlsFqZlIRKOwC17YekNqKUC0rNTmJkYR66Yg8DZkD0EYQ6GaoH+J4g82uMRhKL3OKv6jZWfZn+q5S6/fd02V9eampvWtvlkfZVvWc6+XdddLtdqoVCwN8B5E6T/uHfiF3j2TXD+AjftNh7yM9V3NBpt3rK6Kpmrq/wNnne2oCUseaTueCwo7nvoCcQ6UxDAQRSAzHwaczMX0ZHsQqKzE4Igs7JJr5WwlJ7F1NR5zM5Mg7caECQBhg5YFv2fDUWR4QsG2MtTVRVatQ7LsmDzwFahubGKrW8sadplQRBWJEmyNgB6E6T/vyuUNsF5G0i7w0vezSt3797N8zzfwgUCO3fZ9s61arWpfPWqzYtN28UtcqAjEW1q7xyEW/ZAUaIIhoJwHAfTE2fYeduRTCEQDMMyLNiOAUkQUFFLODN2DFMT47CsOiTRBV3XAdMGRECRZXg8EuqWiZqmw9AtgLNhO1htcW0tV6yV1+t164YoiuZGBLV+zvF+Kz7+ycG7Cc47RN5tXH6THuIf/sLTinBVVd6pO/EtK2s7zEoRZbWMWDSIRGcSStCHsqpDU6vwyEH4QwEkOnsgCAIW5ucg8CIikQhsOKipZciShI6uFCq5Jbx64gjGx8YQ8PGoWzYEm455G0GfDMUrAwTkWgP5chmcA1gCD5FrMUrG6vdNE3XLsgyXy7VSLpcJnBQ9b1bwt2Lig8B5K1D/0UC7Cc7bQNsdXMIoooefflgSmx1vq3hXu12uhJqvGaJpmiiUC+B5CwcfGcUjTzwNQeCgaQ2UshnMZLLIZrLwBaJIJLuJu0SplIepm3DLMhxTh1U30NXXC58vhLKawV/86Z+hqmZZWeMRRRh0DQfIkoxYIAzdtjCTnYfRIDJUgFcQzeXG6g/rpllfXV3VW1pazGq1ehOcFKxv4qFp9+7d7HviXTcqffrjB/Go720K3MEt++BLN8H5kdzGd5+Eoib3W3/yu9Eb6pVeV9H05JdLcKwGLLMOtVpDKBjE408cxMjoQbgFDo5LgijoMG0PJk6fxpGjR6EEFfT2DUH2+LA4Pw9VraAzmYQ/GER+KYtEqh+C1cDM7CyOvfxNGJYOnySBE23ojg5Tt+B1K/DIHpRVFaqqwZGEte3N229katobumXVHce5YVnWjZaWFksURargm03T5D2O02TZNrfVA9jOliaAkA1s47auNfP82kylsnKTnsrlch9ETX0k0XQTnB89OPlfPfRYJFy3ej5576flzPw0FpcuwqLKBTZckgvRYBQj+/fjwEOj0CGy4qVSUjE+fhqwavDLQTQsG5wkIRzphORyo1otwTSp8HHglt1wLAei242lmUlMTIzDLejwKX52hJuWA7VehyL7EI1Fkc7nYThNTqvgfidTuvxmsVjWHMehyGkQsW+3tnKiu8nfrBuetRs3mtyu5iavpxU872rCKtDssuARPGgRfGuF686b85ezuq7rq7fSUxuE/3s51Fuj7R3f6U1w3vEt+7kP4KnD2NfX57pHiAwou/y7Li1fbC4XsnAJPFLdQfT1JFBQBZTUAj7/xBNI5ys48tJRuATgsUOPIdU7DEUJwoGD9PQEjh49Dt0R8dgTjyPg97M80wAg8AIqy1kM7x/B2KtjmF+aQNjrgwAbummhTNFS4DE4MoLBoVGUSxp+9Len1sR2n/GXL/317PXr1vXV1VXz0+3td6eLxVCLecPTKq01U+UkmDYE4lsFDhYc6A4Q9Ero6eyD23XXjR+++ePX029lr9br9RXhxo3V6zxvNzc32xSBXS6Xc+nSpVs5VLph9Oc7/toE5x3fsg8H544dO1oisjywuuqEmlpWhP7UEJJt3ajV8hAFG3uH90J2S5ADEpYzM8hml5EafADBUBeIUjcaVcZbErk+MzmJsbETKGsWuvsGEI/EsZyZB29bsCwenE9Ae0cSh5//BkqVJbhFDvRI3bJgmBYcm4PtkuBIgKULUOQda9jOX5mf++mSaZo33G53NLidDzs3DFddM+HzSIj4/Yzs53iK9vQ4HZbtQqNRBzgLrdt2Oi1r5trqdf3yNYG7cu1Gs3a1fK1evHbNIJC2tLTYkiTZ7wHpHbdMN8H50YKTcs7mQCAg+Hxbdm1rWu0O+HzeB4YfYz9lauo4dF1DMh7H8OAA+h/YB12vwBEVZPJ5ZKemYDk6IiE/kt0DULx+5HM5jJ87hzPj56GqdSQ7ExBkDwKSDFvkoBbziHWkUCgWcfHCOAxTg0+WIdAPtG2IHg883igSnb3wRyLgJS8Wlv7WPH/+/E8ymew77Xt6wg+G7g5eWc6J+WweAu/AF/QiqCjwCxIcCNA1FYoSQVlfAnQRpqVB1XRgZcV2mtdswbXV9PvC1/Um/vJ//pvvvtnS0rJKxz6B1Ov1rm50o27NT2/rrm+C87Zu021fRODkA4FACy/zrbsk/y9Htm0L7v7Ep3jYKtxOBrFIGHpdgi2JOHjwKYAXcfbcBI4cfgVf+vwheLwKvLIXSjgAXpSglVRMjE/g8LFXkc3nkIy3oS0Ygw4LA4NDCAUVODaQz1dw9PhhZLMZcODgkgRIPgnBYBihSBs83gggOJB4N1bNd9aaAOO709NFwSMFAm7efV/bJ5ryxTxmZ2ZYpAz6A0i2t6GkFhm1FQmFoGaW0HBxMOoaHCL3JQFmQ0dD59e4pibH5RNWHNl/pXDFvJROL167ceOGRUAtl8urt9BVN/PSD72pm+D80Ft0RxfQ/eTD4bBw/fr1lh07dgSDLqFN3LJ1Ryzc1DzcG0FHxxAsS4Lj6Ojo6IXp2Dh5+jiK+SIeOTAKSVLgcbshSjIDQDaTwcnTp3Hq7DgKpQp8bjcUn4I9Q93Yv/8g5KAfHMdj/NQ5vHj4JeQLWZaPehUZ8bZ2tLen4A0FIbgUyIofvCAwThSOhQt/+zeGWsq3BLe3cp3JLrjdPqTnpjE5MQ693oDb44Zl6/DwEtoS7bCqZTi8A72uw+Y5eNweSB6FKf/KagW1ugbv9rDl39VWdYTK5f82Vy6/MT1dJ0ZAlmXr0qVLt3ajPrSi3wTnHWHvQy++KYVrVhSlheeN1p3bPe1bOCHW90vh1gOPjiLS1g+r0YAseyEKHgiCDbVQAmV3QY8HvChA5EVAlKCWVJw+NYZjY2NYzmYZWC2BeEwf/uP/8jtIDewHnd+8bWB+IYf/8NU/RXY5j3h7Aj7ZA78/gs7kEDiBh1opw7RV2A4PSVYge2UsLaSR6upANBzA0uIiRJcEwbYwcf40JmemWGdKcHh43UTqA7xlwx+U4ZN41HXq78uQFJlRV5quQXD7WLu1YRr2QOpX9GWo1776x8//aGVlhbpRKx6PZ/XSpUsURW8rem6C80PxdscXsKN9165dgq7rLbFPhu4WVz2RoU/FfaN7+8VgMA5REiDLfvCmA4HUHpbDIpFgWHB4wLYs1FQN5yYmcXxsDHPz87BNnRVJJPZQPD783peeRd/QPogwwfMcLEvAv/2D/xmzmTQGh0bQ2Zli0VeSZOj1OkoVFTWtCFGQIEgiPJIHpXIekWAQfkoNTJ19ABqaBhEcTNuEbRmo5KmrVYJaq4KoCOrf+xUPJEjwyF64vTIausZuklsOoqg2UFDz6O4eAte6Zjz/4l+es23bIIBKkrRy+fLl93akPvAGb4LzjrH3oQ9gRzv92rFjhxCNRr266PYNfDK8c/i+3Tu7Oj4pBiNxiBBgWTajkAzHgYuVxUTdWLC0BiPfXzl+HGcmJ2HqBgO0QzjWHciyG08+/igG+gYRVNwQ3QE4Dod/94dfwcWZKfT3D2LwgVEooTjAC6wIa9Rt1Bs1VuAY9RIqpTJrCOSLOdTKBfT19iGbzzDhSTQYQTgYXheWNOqYmj6PYCCIXDaLql6HR5TgV2QE5ACr6qu6BsexIcADVdNQNaqAxwev4LG2uIzMqQuZQlNrq04AvXLlCoHztqLnJjg/FGt3fMFN4Qflns2NRkNsbm5uHe5L7jrwmZF7Bu4f9tKxDFODYdjwyQRSCQJP7xkV2A50VUNuKY0TZ04jvbAInyzB65VZhUyRLRKLYbi/H5JLQiQahtsXRLFQwtdfeAFzc7PoSCSQ6htAJNGDYCTBPil0RBt6A1rDQn55FjMXz2Pv8EPIZBdg6xra420wdBVquQieFyGKEnw+H6r1OiYnzmJ4cAiW6bDIrKpl8JwFt8sFgap5y4BlEQkmghPAGg1SMIorb7/t9Hfcde35/3ruRybQoH6+LMtmLpe7tUDajJx3DLF/2APezT0pevI83/qvfuNXIvv3/lpbtK1ra6WUh2DVoXgk+CNhCLYMR7IhOg5gczDNBjS1jExmCZpWhd+vQJZ9qKh1GJaGeGcnXBaHQim3frTKARQLy5iYmsHE5BRkrw+p3j5EInHI/ihkXxgcyx5sNKoNTE2ewfSFU+jtG0QhX0AsEoHoEuATeSiKH5qpo65pULwKsrkcSoVl+HwBxKNxFEj8nM1Aq1VQr9ffpdepoqdiy+Ic1gEbHD6A2XzaadKvqf/lxPkF0zQJnDe2bNlibhztBNCfWxRtRs5/GAg/6NHvRk/KPd3BoPSbv/FgoivxifatTS3NmewSvJKA3lQbFH87OF6EIAKCRX2h9ak307Eo+QTncOw4Z9Q6L7DIZHEciktZiCJg6jpsQYKiEHh1vHr8OIqlAgYHHkA03oaK2oBbicDlVignQHoujVIhjanJCfi9bgQCYaTnM7AsA23t7UgkOlgasJBZgAiRATcYCsC2bMYc8BIPTbPg9QGVUgmlchWGrkPx+VguS/lnR1snevv2oXD9besvT/y/i5d+nFbX1tYYON1ut7EJzn8c0N3Js75LK+1yu6WnPv+vk53xtnYfq3w5yB4BAhUngsQUQ27HBG/YrBqnypiAykBKR70FSDwlshx0W2fHsO7w8IXiKOTykN0iXB4FguhCemYW8+k05EAQ8XgCut5AtlCGI8gQYWF87DSeeuZxvPrKYWSXs3j0wCOYmDzPvrcaOtykaIpEoNU1pNNppiHlPG4M7tmLZKINtXwRJVXFyN4hZLJZTE9NQS0VEW9rg0dWoKo1DI7sYyKVyTNnVr728suvA7juOM711tbWG6urq0a5XF7ZyDs3I+edIOojvJYd7bt3725ubW2VfvOpp35pqyR8AnUNIUWGS3LDNhvwyG4Igg/ReBASJ7ECiQDKWes5KJ30pLbkGDiBumXAoerYG4ZACnjTgKgo4C1SJQGNhoP8coYBy4KItkQCtVoNJ0+OgXcJqKsaI+/Hz5xGV6odkkvBxakJBP1+WOCxnFtGo1qDTuwAJ8AfoFamD+nMNMsvu/sHcOjxJxGNx9Goajhzdoyp87VqFR6PD4mOJLzBEC7+aG7NWKkZpyd+uACgsQnOjxBZH8FT/R04d+6U/vUz+5K772r7xO5tu5qCMvWtPWhoJUycOY6ZhUU8+9nPI6JEmMazLoHRTJxhgCdEcgJsFwVcHrBENGoqNDULtzcGT9ALjneBt9ywRQcEaarup6cu4uLMDJtD8kguzM7NQEIdAhfB5NQp/P6/+58AKYLjR19E/+AgEyqfHRtDvVxhkT1XIdrJDUnyoLi8jLpjwccJePYLz2DkwEHGteq2jXJpAefHJzAzOYu6VoHiDyIei+N7czMr5VLl8pvXrl1dW1u7Tr9aW1v1jch5a8W+WRB9BGD7RZ6C6+zsbK5UKi2PfWYofF9b4t72ezt2RJIJSA6d3hRBidqpQXBRBCUNkAu2bYA3LXC2A5Md8xwkxoITzykwHpS36+BcEvszDwdE5AgUOnmejW2MnzmDY0ePIZtbhmCbkCQ3ZJ+AfUMKirUYOLcXal5FqjeBGlFXmQzMuoGqVkO+WIBpmIxqGujtw8kL44gHg+jrS2F09AnG0ZrUNnCIARAwMz2Js6dPIJNZgOHUoXiDuMsXXi3Vq1e/m04XCZgUOUVRZMe6qqo3j/WfS8ZvFkS/CORu/zEMnKqqCpFIxDPU4Wnv7b2/feihpzkPr4PjOAYtEwJEx4YjumDzBnhSG8GCSeI4m0DsAngOHGeyM9+xbMDFw+YECJYNi2d5ADt2eYGHZdKg3CLGxo6jkF/CwMAw/P4gjh47AkUoQYkEEfAPsE7RhYkJ+HwiQtE4PIKCUjGPqakJLOezSHR14tFHn2D56MTZ0xjqGcXo4w9BVqgTJLDOkGFZUMtlHDv2CsbGXoXEmRCpRSopuCeQWHVt469nGzcK09PTbxuGcZ3opFvI+PdK637mzm6C8/aB9otcyX3qU5/iy+VyM8dxrs8MRNr7B4eTexg4BRiiDomNl7nhcDoTClMVZPEkeqNv15NNdrTbFmzTXp9rF+hBbtj8OvXE/jNPICaQ8tAbOk6fPMNEyIFAAEEliJnZaaTn5tiE5+iwH4HoXqg16jdxCIRiyOeXMb+wwDSjskdCZnEBsqxgeHAPSloD3375ebhsIN7ehWQqiVRqANFQFLzksEr/5GtjOHz4Reh1FS6Jg+TyQBBFbGvd7jQFWldyb2k/XlxcrtTr9VvHQ26S8e8bQTfB+YtA7vYfwyp2Gg3WNE38l7+eau/v/5WufaNPcjLjBek90cEZVJeDHdEMaQK/LnmjLyIo10sjMPkR+47+qwM26E5KYIGDzQBNVJPAKvaXv/Uiq6QVRUEsFkFQ8WI2s4RENAJdTyNAghHE0d33ADhBRKPRYBHQMk32GAKWWlFhGDrm5pYwNX0GbpcAF7VEvTLikRgeefQJxONxEK9AEfrU2BGcPH0WgLHRRVrvXJFugPcF6m++WVjO5/MlsiNxuVzmli1bVnO5HP2jbh2we/fuboLz9oH2i1z5M+D8VGd4+7/4jc+07X/w1+8OBHywJQ4umpq0aGa9Ad0SCJfgOXqvaJKdh8XT7CUgUBAlSDLU8rAcEZLEQzcMlhpwEFk1rlZVfPull3Hs2BEaaEdPRzdiJH0rV5BdSuPQk5/FYuY8JH4ZjjjAImG0LQxJ8sIyeVZMcaILgktEKb/E2pkE0mMnjiIaCDJin2R9i7ksHj14EKlUP0RRAO+YmDh3Dt84/Dz0WgUSJyLe3g5JEJEpF+ERvHjHrNev1huLhXK93Gg0rpMYRFEUa35+/iY4f0YxvwnOXwRyt/8YNvBGEjpqY+5M7Nw2fF9q93Bn7z2RSBS+iA9BOQhDMyBIFhxBgkhnOzvTRaZotymo8A4Em+lJ4LjoIF6PsjT6YVj2+uWchFKlhFNjr+HokaNYzi6iPRZDf6qHjVqkZ+fhUyQ8eegZVIo5GPUzgNAJnxJHMtkHWQnCJsKfRet1SR25j4yPn2GaUerZL2eyGOgbgGFzyOaW8MDwEPr7huFTfJDE9Yj9rcN/gVx2nqUYkVgcEeoy1YrQqzr7oDVLnurbVxqZS/m3r1D+uWXLlpVCoXBrO/Nd7nMTnLcPtDu9ks2vd3Z28qurq2KgLbKTM27cLRo3/Hf5droVJYDBwQ50dvXCrmjsqHR5ZAgiRc/12R3DMFj1Lbkl8C6RkfEC58BxqIdNZgkkFyFAOcgsZDF24gST2OWXs6yiTyQS6E11o1Qpo1yqYKCvBz00997QsZw5hkQ8DknpgKK0IxiKQ/B4WeZA0ZvidW5xGUeOvQyf7EZHvBPf/NZzCAUjCCh+CC4BoigjHInA6/Mh1haF3mjg8Le+gZmZCQiShIhPQcgfhOZYyJfz7MMlBxRcvlp//fXXcwXqGNHxfuXKFare/57zyCY47xRyt3f9Bse5vzn8YGjHysKC4pPdd1nmjcC1wmVOkT2gTlE8GUKysxtWuY5EqhNenx+yV4HL5WJFRrmsIl8qMSFFvDPBOEveMmFDYkURpQM0NpzP5/Hq4VdxdvwstGqZBT56q+PxGPaO7IHgkjA/m0ZnIgHBMVE2bFSWLuKRAwm4vP2wHQGRaAIeJc4AxPEGBU4U8iUcffUF5HNZPP7Q0/j2a9+ACxLi0Rg79gnwJIwOBgOId3YwPvb08aOYnjwPySshQu4jSohZ4uS1IoibkINBFMraG6+/vlRcXV2l0WTD5/OZ76fz3ATn7YHtTq662Vfnog8+6O7pTnRrry9Gt62ttfgUBXW9AWlDuFu3NESUABFJSKS6EY74kYh3Qg6sd2uymUWcHHsNxUIBqb4+tHV2wtqIpsRsatV1fnLm4hQmp2eY/pJ3bfThLbCuz8jICFK9veyILhQKKC6lYQguJir+/KEkvIF9oLk1JRiEO0BNAGqrmpSuopivYuzEUWSXLmLfvkfw2tnTiHh9KKhlKB4Po6/aI1EkO1NkIYL0fBpLCwtYzmbgcgvw0ywTgbNWgaYbTCPgDgTw5tu1hTfeuFQURVH/eUqlTXDeCexu71qWZ5JPUvOWnXfv/eV40lpxtnOmjfZQGKIkYi6TRj6focQRbe1xxIMR1HQdsgS0JXsRjEThccusBXlybAwL1Ip0HLjdbiZGNoz1er2hG9AbNfbG36zhqYJnBRL142UqSuIYHtqL1MAgjh05gsWZi2SwAMu08NuHuhCJj0C3fZA8MmQ5xFIIgTdhGjayuRLOnHkNLstCcqAPX//615GIhZlq/qGHH4ZpGUhE2xFvT2I+M4vjx48iu5iFRD1YptiXwHt9sEwdnC1g1dHXmr1NRr5UX8pkrlREUbxOQhDHcd5XRrcJztsD3J1cxSqX6IMPbok5W4d6OyM7CYCUv+Vp+IwH9HqNdYbqmo69g31YLqpQqyU2BlHVTSiyF5H2OLOq0TQNtWoV80sZNHQi7sk0YZ1JkqggYqka4LIcVs6Top5nbU5AkkQEgwrisXbs2bcPAu/C6RPHkc4uwyMJOHigE4nOPsjeJCusJJcMSfZAq9dRq2jIljK4cG4CMi/DFE1MjZ/DM888jfRCGqFQlJlBtCfaEYq1oVQoYvL8aczPzkByASa3/vNJc+r3hqEJHFYbVSNXUN+8XLtxlQh5ipx0tG/dunXl/TSem+C8E9h98LW33key0haCe/bce3+L+9567bI7lepjYt/0zBSiwSAi8XXSe+riRTz7zGcxNj6OXGYOAnWMyKfT5YNp6Ugmu+APhpFOz+Li9BxKjSorf0g3KQsidIOOX3KgsxgY6ahf50aJarLhFiX0difx0IGHEWtrY0Ljwy+9hOxyDqOjo8hn0xgaSCCVOoBSVQN15rWGgcVMDsV8Fun0BdR1E+3BOIb27MHhsePo7myH36swYzG3xwfHtkHhnEY5lpbTMBo6G0nmaRSFRMeyF23tvbhSWlpbLBTfvFS6evX69RXWa98oiAy/37+yQSf9DBm/Cc47B+et9+zm97f+zu3atat59L77BnZ/+v675n78QyEgiDi4/wDkSBBjp0/hzNEj8Hg9iAfb4A1E0Jlqx4XTJ5At5aBVdew/8AgGe/swM5tmXRuPJEPV66wK1qsmRF5AsiuJWq2KeTUPoarD3CDpCZ78BidKnksHDh7AM08/C9PgsZxZxnPf/Ar6uoaQnplBzazgidE4+vd8DlNTOTi8BI6zYDU0JuU7+uphVHQDow88jGR/B86dP4/KYp4GTBBPRNGTGsDpiQlMnD/DmrA0T+QjvtRlsuG8wa5+jD7zDKoNHatvft/6sxdfW5pbzF9raWnRbdsmryaikm6Kj/8eEb8JztsH560AvKl0v1n83HyWpl27dnGGYTR/8q5dn25PJEKJ3Z8QwsEIZFlmLcSxsdfgl91IdSfh2AIMpwHe5piZgqWZzPigoqqwbRrhkBFtj8FkUTeNekNHenmeCYy9ggzNbNDsAzjimJx1vpO+bG5dCuJ2SXh43yie/dLvAS4RWr6E57/+Z9BdAhsFGRrsR0Sx4HABaDqH5fwCO4ZpPFk36oiEY5icSWN2ahyy18taku1tbVA1Ff0Dg+jsSOHV469gcvIMgrKPiUuqdR2yS0LDqCHR2Y/B/r34/sKp66+eGH+rfFWrr6ys6OTTdDNqbowMv+9M0SY4bw+cN0F4E5RErN/cfnGzv0jGr01ra2tNq6urzf/9v3iq977BweDiwqyQvngBoUgQkWic2RzOpSeZtI2KlS9/+cvQSwaef+E5pLNLiEei2LNnL4rFArxuH83jwrLrLG9cmM/i1WOvMhU2kAtGAAAgAElEQVQSlfyWRsIQBwbN7ZjrY8M2pQZUNZGSSXRhdHgPvvh7X2a23iVNw5Gv/gco8SSjlUjBbOvL4C0HghTH1PQ0M24gwTHR/zT2SzQSZwAPH3wKUxNnEE90M7uccDyOUCSGqakLyGWWUKrmUa6V0B1NIZJI4uT4UTRuaGs+7/aVTO7tQqXyTt00TQLm9ZaWFhY13W63+UEEPL0tm+D8cHDeCkw+FAp57r777nu2i2LEDR5KYFfTD374g7UdLS0r89Urr1+3bao+uZ54x33d996zU96+vVmSZTRqNYQiIaZ3PHb4ZaYyolHc3/03v8tsaSbOnMZLL70ITVMx0JeC4guy/LNcKqFRryOZTLG58peOvoz88jJ4x4El2OB0h3lykgaECiIi8AXBBZuanwLQ3z+A3/3il+APRKBWqzj6ygvoGxzBxekpqJUcQn4BiYgXHrkds0s0tzQHn9sLrxJEhdqQksyaAYeefhbHTxxjBHxVU5FMxBGLd2J2Lo3JC+dYR4lATe3TSinHjMpMx1zzyVuty9W1XOUd/Z2VlRWSzr0bNT+IfH/3GPrw9+ZjfcXPAPMzAwPbtrh37G7Z6ooJLc4WkcIfL7BxhZXGDfud61fLFWflJ7ROaP+nP935G/v27WgYK80EEq1aY3lcKBJBZm4WtaqKxWwe7e1h7Bt5CJG2GNIX0zh/4QyCSgBqTYNaLcPvC0DxeqE1NJh1nfGkCwtpFEik4VjgyZKbB1wU6wRuwx1OYNU8CZf7hx7AF579HfiVCHRLx9hrx5Hq6cXLr3wbfckEQiEffFIdhZKOzFINueVFeBUfmzs3dBP58jLIpub3vvTvcfzkcSiSjFKthJ6ebsQiHZhPL+Ds+Gn2oRIEQG/U4SdJnShiYmoKLa2mI6xuyf9ouVJe2RAdU4W+ETVvnWH/e0DbjJw//7P37jEeiUTc7Yryib7uT8clyb2lVMqC4wSYgo22WAKlbBHfmxq3Az7f1aZQoHqP1xfy7wy533rrchMNjNFcDvlsiqKLWWkvzM3ArfjhWDpCwRjC0RAisXbWesyk01jOL6JYXO+qUJ7n9niQWcygoVXZK56no7RSgou0nUR6kliDoqa9HkKpuiC6qmdwAE88eogphwg0mcUso5fOnz+HPUMjLLqqpYvQamVk8w1odRvxWAyhaBu0moalxTQW80v43/79f8Krr51AwC1hOZ/D3pERhIJRZJYyeO3EccbbyrIHskdBMBRlhrYTU+NoatLXtnFSYeJS+fLqalOdqnQCZ7VavSk4vlkIbYLzDs+BdUJ9507vqsd3T5si3/Prv/prHrLETl+8CJckIV/OoivZxwqMqZlp+GQXWncFr29p5lyhSIwncrtUyEOW3HAJJBoG+vr6UFVVeBSFbcYgc4S61oDLKyFEx6+qMlBMT06xQbNgMMj84Ynq8co+uEQRx48fR7ZI+aBFKwdZjkmeSUyFx7JgDryLR0+qB48+dBDZYpEVWXRMwyH+VEVvzwjcHgn5QhqOWcDszBLyJQPhCKmUJFg2xxYgzC5cxBe++Ps4ceJVNste11SM7HkIwUgEpVIRZ8+eZEe9JEq0NY4Bk9T4ZFGzwyWsNTXbhYl5Bs531tbWGLe5Cc47ROL7XE4FcPNjQ3vvab3n7k+2rjV5ZV6AVq/BatTZHHepUmHVtqrVUKiUwAs2olHSOFrYt/9hJBJdrLrVqhWYug1Rkpi+kvJC6p9PTEywSBr0B1EqFuH1K2wHka7XMXFuAsVinvkaSS4XJFFEIp5A3dTx3HN/jnRmFg6ZvdILv5lz0vcb+k4Kn4lYnHGaHrcXJ8fPIqx4IcgKS1JpvlySBASCQehaCRfOnUe2WEI80cZGLbLZIiKxCGplFV0D/bg4NckEJcQiJDpSbPiNONfs8hJEnmPmX+epspdFZJdyqNZVhLe517g1FC8svn35xir3DuWcBM5arUaRc/NY/wUxyrSYgUBAvP/eZLLt3s7da86apObzLHLQnHiyIwnwbsxMT63PmYvAci6PSCQM2AYOPfMFdLYn2d9XayrUUpWNUciKd6MidlAqlZHJZtDVkQB0HjWTpjMVKMEQi6DUuiSPJBoaI7B5fW5oho7nv/rnGDt1Ag63AU6e2kMOBMcmcfyGmp6OcoVF6oGeAcwvZJi4WSOHEYHcir1weBPDQw+hVMwhM38Baq2GYLQNbfFuzM2loVYLkF0KRMWz3qmam2PRlF5fJBSG7POzkeSAT0K5lEe2UECyO4WjR19GLj+P9tjda/eG7tEm3pgv/ujSZfWdd9bNFVpbW82NTR43aaTNY/0OgMqMYLeGw+6e9vaeoOgNb5XEZvIPIv9KU28gEoqwI/fI8Vexf3gvK0xOnTzNjm7Z7cbnvvB5dHf1geZ96ZgrF0poaHXme0THfUAJsnmbiqbC0DSmiTQZS+RidoWUn1ZI7lYusYUEoXAMLq8I3TTxra99HS+88DwD2U31PC3KIl0dmyZmBZHAonJnIsmeqz3Rwdqhs+k5hINRKAEPM1boHdiLxWwGamEWjUYNdV1APJGCTwliMZ1eN27A+g6k9Pw8i+KJRBtzFtF1Ax2dnWhPJJDPL7K5deoKHX7pOSYMeezRJxgf+oMfTV6dGD//1lQ6f+XaxizRLW3L990it1kQfTBaeZo5X13VvPcPjfSHtoZ2CJaFQmGZcX+aWmFv/AODg5iancZvf/6LOHzkOPK5BQaOULwNvakE+vqG1x2FKZqZYO3AmlpgcjNf0M/kZ2RcQJaCldISyxU5XmDHquSh6UqgolZQL5UQ8Cvwx6Iw6w18+6Vv4flv/gVcJOukaQ0aHWaz7jY76kk4TGLlro4O7B3Zy1zm2H/VCbw2gtEk1EoGPR0JxFMD0DQdpdwFOHoJgqjAG+lELJZCvaohX8qjkivgxIlj8PhoRCOCYDyBUrkArVbC4OADrNVKtNdSdgnp+RksZqbQnUjgt3/3TwApiGJ5GdmJv1JPTc39dOJHi2qlUtEpem4o4Tem83/WnmYTnD8HnNQjtxsN3w5l56cVaYsiKzIDnlossUKA9JXJjk6WOz788MNIT8/C6+NR0ix43AosS8Ng3xA6UkkIpNE0OFjMVUtHMZ/H9MwcHh7dB8nrYyoiGgcm4yzKM8n81edfl9MRpZMrZlHXNQz09DE3Ohpe+1//7Cuw1CoccuWwHbbjiIoe2gJHk50OL7Ac9ZnPPoVoZxKZdAY8J+Lk+GvMrAu6idGHRiF43FC8AailDFQ1y0Z/ZSWBSKQdhmWwf2sxX8Lps2OwDBtemQo7gQk76MNFziL0QaU8+/T5Mzhz+hXGThw48Bj6+vfDcAw48KC0OIXvvv6Dy3/9N+ezcz/4ce3DiPhNcL4/OFm+SeMVuHHDt/f+4b49+35NsWFh6ux5pGdnUKmpEAVxPe9SFMQjIebsRvaE5FlE8zp+ti4QiEYi7NgTRJmsONmIr6UbSC9kYBkaBgdG2GyQoGvgJA9qWh31eo29MsnjZr11Eh7TXHhYkZnVzOz0FJ776p+yYotU6cRzUtQ0BBrp+Lt5OIpyTz71JAb2jCCzsISjR15AWa3iqYPPYuLieQasQimPVCqF9ngchUIGlWIWXiWO7sE9zAW5Wqni1Jkx9qTTM9N44IFBxEMxpDNk6JVnY8e9A4Oo63W8cuRFwNHx2EMH8cDexwDRgu0iab2MpXwJy5lxnD17Ln3i5ESxqamJ2SJu27ZtZVNsfPsJ57sGsE2G4Xv2Xz3V13n/L29fmF/AubEx5IvLcDiBmfpH2sNIJpKgqPrIgc/CI0tYXs7jK3/8h3jssUfZNjXyaScn485ENyuGiLt0eB5aoYwzU2fRm4wiGk5BtStQXH42G2TpNtS6Bk2vwC1J8PiCKOTzWJiZhuIO4Plvfo2p4LV6dV0g7NBhTTmnA4tyCBohZh+MKEb3jUCJxRH0BnH88CvINjLY2/cIzky8BpOsshU3UqlBDI8cgGNqmJ09DyUQwmDPflhkzlWzMH7yGOvPL84vId6ZRHbxAhqqhv7ePnT3pVDWahgfP4laKY/RkUdx4MmDjGttmAokemVSDbm0ikJ2GuN/e2Hx/zl9ofjOO+803G73jZWVlVtNZd8dctuMnO8PWFYM0coWT3Oz78Ge+3qHHv2X2yv5EmbGx5nTW2dnEh2JDrhkmRVFij/AHOHIp1LTdXzzG1+DbVo4cOAAIvEEGnUNtmMyjyTZLYPjeZQKBcYLnvz2t5DsewBzmWmM7N0PJRKBUdcRCYbYYlYqblwih0KliFe+fRhtiSh4k8dzz32VcYkiJ8ARbPbzSJFEhgscbYczHPhlL3p7e1k7MhANIuJL4OsvfRUjo8NoqIBaLqGnrwOlUg26xSESiUGtLDPN6aMHn4TbR+mJhVMnaNfRDMyqDs2sQHb7EY+0M+vEXH4RpVIOXreI3sFBPHTwcSi+CHiS84kGLMjs+7KmY+FiGm9kvv/O5A+/nx2feL1MLiAUPW8Z1bi5dWOzt/4+2GRHOinZq9WquOuuXUOuFSOwZa2ZJ/Oq4ZG9IH0mRUSyuzbggku0WSuRQgW9kZzD4/jRw9BtA7FYDKlUF5sN0huAVdcxv5TG5LlJlLUynj70LMZOvcLchHPlAhbn5phNNg2nDe99GN1dXZB9HlgCh/n0HF74xvM0+oa+1CCOv3IYqlEDdBucywWH9gVRXU2RlP5hlsXUUPSaR/eM4vjZ0xh96CCmp6Zx+tRZ/N6XP4ep8SnM57PweT0YGuxhQubZGZprJ0OFRxGPhVDnNMycX8BzX/tDjIzuQ61kguOrkGQXclQglirwygL27h3EvtFnEFSi4EWdfahMywMRGixaG8MJyJcy+MHpv26MjY3nzv3oUoVI+ZWVFeOW4ujdQbfNyPn30ckss2mX0N7f/I3un3zne/GAorj27hlGT28/gsEIJMkFZ8PswGaemhyLijQ9btgmUwBNT81Aa6hMlNsW70Syq4t1lGgP5fJSBpVyHsvZEjwyj0RnF9IXJtHzQD8zjK0UyhA9LjYy0d3Zha6ePgY42hN0+uxxFBeXUFKryJaysGs6TBah1sd5XdQeIrExHaWWxYbj+rq7MDr6MLLLJfaahoZG8crL38LnfvtLOH36FExTQzTSBssyUSxk2cw8HeteJYD9e0YYRZbLF/AHf/Bb6OhIIRYmsXSW9c+z5IxsVbF//wj2PXQQgSANydFgqGtDiEyvyGCWO2zeHjbeLubsH89MVX/w+sKVqcW31Ivj41UadHsPtUTraDa/brkD6yMW0Sjf3t6+g9vKfTohdco7tjrc8L5BNitjE8O90Y1hywXsdW8OkwwHTRMmub2LAjKZNOq1ElskQFaBkXAQ8UQC1XoDS2RdXVpGPJ7E0cOvoCeVBK1M18wC03gWckUEQn5mr+12y6wSbm9PsGnLfH6BSdfqZR3nJ88y/SQtG1hvWdKMO31E1keLyVOJeNT2jgQOPvowItEkCvlldHan8OqRl7B/7xO4MD2BYinPoiwtQghGQhAEB+XCLHMkGdr7LFPR04fqG3/+FZSqZWas4JgmytUC43vp9Y8eOIh4smtdHWULsAX60FIEJ4aCbHMs2LTihjdQtwRcrby9+lZ2+vr3Jiby33zxr/I3iflbTBacTXD+HTJZH52sY1q3b/fec/fOFP+OFnjysWebl9IXYfM2aNa8sy2BtkQHo2+Y6tziYZDmksoc4hlpspEDxs+fg8RZ8CkB1BsW9HoVSkCBS/QwV+FyYRF7944iPZvBYu4iwsE4pqcnEIvFEd1w1SAlElnEBAMB9A8NIRiJkb8hFjJpXDg3hZmZKRQreehVjUU39kVE/IYzCBmHkLYz0hbFoWcOYXBgP9sVRNK7sVdfZbnocqGE8+dPs8bCUM8waw7kFsfhNWfgC0rgQrTh+LNstfaRV15gHCYNxxEroapFKLIbDz9yEP0PDMMledY/vDT4zj4t5PNEelQbnClBJ5W9aQIC7TdyUL38Eyc9+73S4b86lv3BDwpVyj1v8YzfBOfGW8qA2R8OC55gUGkIrfd+8p5QpFG5wj3z+c9ibmaBCRuoB51oSzInC5GMDsig36GGIMWpdWc46h0KAo9Tp07C75UQDIfh2CIWlxaQyy6ygolaylREkeHAQiaDTPoCenoH0DAs6DQiIbnhljxspsi0TMgeNxIdnfBTSuEi/Am4ODWFE2NHUcwto1QqMRMEZrBAiR7lvRsVO/1dOBzAM587hJH9j8EyaK0MMDF+AS7JAsd58Nrxw8wDfrB3D5tXL2VeQ4+yiHDIg4yZQGLwt1mUP3H8RZSqBrKZSTY6rJtVxKNhPPr4IfT0D9GWYSZ2Zie4KYAX118TAZKzBGiGxiy9XR4/OFGGrlXwRvp7V4+98tJP/+rMQlmSJLJIfHdsYzNyrguuyaqQ37Jli2f31h094tbtd7XcuMqRV+XoQ/uYVYtuNmDSzDh4kJVMWyIJl4tIko1T3gZMngxfbUa4j5+bACwVsXgb3DJZC5Zw/tw45hfmEItGEI21obicY+teFMkDOUBGrRK0eoPpJ0N+PxOH0P4f6uMnOhLryiTLAq2KIdL+my88h9n5OZSKBUaoU+5rcA6rjKlaZ71NC4jFwnj22ScxOPw4cw0h/n16Jo18ZhrtiV4cPfxtphMluRsMHe2uZfQFiYznUaq6UQ4MoD31OWQyk8S8YmZmfN2mW19XTPUP70Nndx/zdiLNKAVvjyCxblbA72MGDCTlU9UqNF2FLNOItBeNhobXp79X/c8vv5A7N/2TCsdx1zfWwTA53ccdnDfFxPzD99/vusvni/CB2P0+3oWZ6ZNsujAcVJDo6oFhmetb0OoaOpLdGB4ZZU4a695CxDMCBjnH0btv2ZjP5jAzdRrJ7i60J5IM1GRsME0iEbZ9l0e5WGJqJAJosZKDrqoY3DPMBLu02qWhk1/REkJhPwaGhlnRVSvV2fiuG2ALtGYy06gUVPLbZqCgUWFS0HHkdQietUaJLXjm808h3jbI4rsg8Rg7NY5CZgp79x3EkcNHWLSnTpeWz2AwUMFAtMw2vwmWgCVeQpUbhsb7EfRHkGajJuPQKiVmiUM227LPx3Jc6mYRrSWJMiKxBBIdMXQkU4jH2qBWazB1DbIcBCeJuHal7nz/b7975f968bk3Mz99+xp5x5O57AYpb32cwXkTmBQ1XTu9W3bFvN57PbGOQD2bhdYos01otNKExBKaWmXVNlkMJpOdGB09AEHygp3rvAjLoOBVY/lUZnYSsk/G+YkJNppB5lder8LePJLYkXiChLy2XmNHclGtwi25QIqnVE+K+SIRwU6+ROQZTyLeZEeKVbr1RgONOg3DlTC/kEV2eRHFUhH57DJTy9MeI1LA86QdpT3poRBG9o4gkehEJBFBW6gDumPixZe+DdtQcfDgIZw9ex5qqYS2aASOugi5chqpkMpSBRdPs5YiMqUGFo02xPuewsIStV7PsKWttDqbxoNpPJl8lkTKuWlhq0llmcNWxzwwNIxDT38Rtq2zD44oBxitVLmqWd/5zsnSH/3RV95qaWm5/h5wfqwjJzvOqX++fft2v9hk3yfyRkCwXDBrdcQT7Tjw0D6mxpmYnGDW0jVVBScJGBjowxOPHEIimYKxkQNqFQtLmQvgDAGvnX8NyWQCbreXSdGIq+zq7mNCDMO2USqpGD9/HumZM2wLWmpwkGlDoWuYuEh7hBQ2CKf43Ej2kG4yCNntYRwkgcCn0N5MFyzNYur4XG4ex0+OIbNAC690uDaOdBIfk3xt/559yGeL8EZEjD7xDBo5FS8c+SbiwRAO7D+IbCGHo4ePIJlIoC8uQMweR0DIQ5dMuC0RginBEhvIqEAx/AympmYxPz8Hk3r5sNlMvuNYTKrHE5nFeFaS5RkwLYGlJX/0v/8nBHxeiDK5IkswbaBQUa3vnDx5+U//+I/fIvcP4jxpZHhjjv1jC853j/PB5KBb2rLabl6rd0mWATkYhyWYsGmfOJU6loZGQ2f20ht8DVs13dc3gM8eegaBcAKl0jJUtYG8WkI2PQ3ZH4GhqRgc2YuZuTRqpTJSqW4kupLMrMvRTSwuU1+6CsmtID03hWI2h77hPpTyKssTaeacagsycg2Go0zUSxs2GlWViY21uo6GZSJEw3MNEi2PY+LCeZRKhXUWgefZauzurm4MDgyz3PDMmZMYHB5hM+UvvfhNfOFLX0RfzzCjoF56/quo5pYwGKmjU16CInEMZGynh8XDETgslnnMWV2YyCyhrhnwCB5WDJIgxTLXvZCYryjbRifAJbpYK5VOhf/z//i/EQgmYLgsOBb53tv48Y/nre98568LL730X/I0y069djrWw+Hwyg9/+EP743qssy4Q0Ua/2T8StZvWemcz863Z3CJkEgPLNkyDql773fXQNz3QmcuGY6Et0YYnHnsGkXg3Tp0+gXIlj9HHnsK//R9+C4c+dwjpmSwSyQi6UymolTpzGfYoMkZGRuH1+uDiRdRtE8VsFqJjoFTVMXbqKIb37IUkuxFU1g1daWqzzqysZQQDEUgCKc5N5CvLmJ3NYO7iKbglL3KZLEqairpWY7mjI/Ks59+f6oPL40YylcL4+FnMTs8wFVJxMYsnn3oKD+zbwwqU0y99FXb2KAaDOoIyYYsMYSliWqiaFrKGhcmZCOZrVaiGycQmkuhluzpJ78mcRzZWJDIfUZpX5snYVoI35MOf/v6fIJjsQrPlXtNgoVp825n/ybR55sJ3i3/9X7+bJ4W8JEnGx71a/7uoGUm69z31yCdi0fZfUpeKOHriW5B4HVpJgyUKSMbCkNwiy91IPUT5FZkY2I6DZFsXHn3iEPyJFKbOT+KVl76K3/k3X8bE3CJ4TWMaTuq+UAxx0RIsQWJeR4LE4dDTn2fHtV2ps+ejakpwu6FmipBoDYxEIWhjYI1NbqrI5rKM1FbcHrak6ujhw3jm8c/ihaMvYmRoEBdmZpDPZFCslFGn/US2w3rz5DIX62xnzzHUvQcaKpiZKWHy5HGIQTceHz6IrgcGsHDyObjzRxD36Sxyk98SOyt4CXNlEV87W4Jatph7MhVbpKJyCy42tGfaDupWnVFkLuYaQg7JOpuj1x0DtgYcfPJxHDj4LCyusVKpFFa/Nz5z9eR/++6VcrVKQ283HMcxSEJ3q2/SxzFy3pyobP4fP/PY3Z9M9f6S4PX5jhx+AeriIpSIDEEH9j86AkWIYL4wxXYC1Y06NPJNL1WhE93SHkP/0AhMhHDm7GvguTrbzyO4Yjhx5OvoG+yDQ3taiM2xaByjgPT8HJazy6zjMzK6HwdGH0IgEETdILG8A4OWZdAbTAXGhuX2eo+cHOV05IkBSF8AkeuabrIxDhI+B/wyQoEoW7JKK/+qWp21ImWvhO7uJPpoxyUN2QludtzPzMwjpIRR1KsY7OvEUN8IilPfBkqvIOrWIRDyOMDl2CgYwCtTEiZyGgzRYmZgLo486Nd3XRLdRWkBi5y2w1zwiHQnUTP9wRSJc5UQVPzo/GTqxlzm8pVcoVS/ceMGrbm+QcCkldcETLLh3hjdYAzdxxWcvOfBT23777p6OgI3mttLP1rgFhZnGC2YiCnwuxX0DffCaUjIZqZY9csJLqY2yhcKzNxfCXmR6h1AT88IKmoV0WSS+Q+dPvsatIKK0UcfYUNgc+k0pibG18l1KmIMnXWbiDvt7UhCCUeQiCYQjYeZTQx1ohmhbnCsyNjoPTG6ikwOzhw/wZ7v8SefYHM6+0ZHMXl+AoPDe2AZPOYzaTZ2TK51siQgEgihb3Av+vuHmGuc4wg4euRl5ncUCbbhkSeegqaq0KdeQty6AJ9islxTsgQmNlmq8PjajMw8Qm1ZBq832AgybRVmRz/rjlnMlpFE0I6wvjuePpWWTbvg1y3BXR4Bu7a3XXtj6a1ySb1Wp0gpCAIDJnGboiiubCwweHfDxscRnEwOF/tkzLujxdvZYjq79XIZ1BWnwa3+ZByyz4tYtJ2tTCksF9CwahQbGAFOHCQR5UTHU7973+gBpDN5FNUyzbFtdA95mKYORZHZFrR8folRKrT3ZylLK1TcrBCanZpiuRtVs3uHR2EJFnNwI1kdcaik42S5ruUwu8RiIY/pqQuYnDyPR0ZGkcnnEfZKEGQvE2JYugldJ6c4eo0qW9nS09WL3r4eSLIPy8U8jh4+jmBQQqqjHz6fzJZizZ27gKRnAXsiKhQ37TgSmMiY5pmW6zZenAliNpvbIPXX+/cC+XgSAB19XeBBS2NJS0hfG61U09BZpDXcEmIeYS1faVouXLtxzTTNGzeBaZomA6bb7bY2Nmu8u5vo4wZOdqTTbJCorXrrrU4n71hxWTchyRziwQDa4gk4thuiYAJOHbrloEE3eWMXJb0JFEFL1Sq8ssLopGAwBpcsoZorYXI+zVadkKCYjF3JfKCs1uEYFpRAEDPpOVTLy+vbeMNBRKOdWMouo1TMsln2kYcOMCtushCk+XiKpSbxo8US0ukF2EYVjumwBa2z6Wk0tAZbX53NzkAA9azB5saJn6Q12PRBoHUt1EIMR0K4MD2Jvt4+tIdSmE2fQz6Th2TlcDBloDtIshXCngSLs6FZDmYqMk7OClgqFdiHh6Mj3+bZ66NZJzJlULwhlnrUrQY8ihe6bjK2QnMo96X8QMKDez+9dm58/sc//ekVrbm5mXJMpuMURdF8P2ASxj+24BQsy3d9bbWDt8y413IQiCjoSrQhpoRhUI6nlViyx7lEFEsV6FqdiYx9XoUVKzSjTn1inz+Evr4HUG8YULUK9LqNSCwMxa8gm6U95T7GW1bVEnNwM20Op8eOIhRWkOp7gBHzheU8M0AIekNspIHWStNkIxNwrMuNmO/l0uISZmYuMANaIuLdHsr3yF47BNNqsN3p1LqnlqEkSCz3JJ9Pr0x7NutsApTcPmh2vi81jNfGjjHifzS4jH9JtJ4AACAASURBVP6ECZ9r3RWZjmvLtlBoiBjLypjMNlCtamzfDK0/JHMxQRBZV4kTyCO+A45jMvsccqgjr07L1NCgQTuJw85tkZUtvm3lN2az5WvXrjfIyIuOdQKnJEnWhpnX39vm9rEFJ8+b2znL7li7sXKPxPNoj0cQiQQRpGWkigK9WoLbE2BysvlsBlq1zqIEjWZQW7NWr7OCRHS52KIoU+fgb4swop0iCtE54UiM2cvQ5l4SJpP7L40Fz1ycQU0rI0Iqd5uKChtKIAzFrSBL8zzdPWzmiLUgN4YWKHDn8zlMToxDdMuslcpIfb3KLonHwwycNM+UaOtkDYPF3CL7MLXRIivHwvRsGt2JFHS9xtiDIvGsAjBov4aQVICHXyfQTZE6UUCmIOO1JRfmq1VYWoOaobBcRLaTxFqG6HLgkf0IhdphWXXWK4dN6cM8LFqNJQrwxRKrem2lvHzprTIZedFxTlHzPWte3nfN4McSnGyq0rZ9rfZKB7di3SNLIpLtMQQoR+QEhCNR1npraDb+P/beP7aNw84X/GiGo6HGHI/JTMjQZFgyjBRGKiutYq9qV2tXsJ+bwC85X4Jcu0GLYIuiD327WOxibw+Lu/fuFof74/YWvTsU+xDsvqD78trnS9ebwLXXtasm69r12lXsqlIYKYoURgpNmiY1Jj0iPZrRaEaH75eSn5PXFm3atMlmDbg2UsumyO98f35+XJy+gkp1kW/G1OdTH0jocppKqQ+kbKLKKsLEWExlYRpVLt+lcoX9yduWw0IIsWiSAR0k5u+7AmpsHCXwyomwkaTqEdYTqBsmX5cIWKJGdBbmYsqFT5pGdRZgaLVsLBXn0KgbnL3pXh1N0HkUCEU0kB4obeJtooXIHetsYl3K9FCZNkP5irOzGNm3ByFFR7zyDFLCAlRJ7mRN0UfZ8HB2UcOVkoKqQRSOBsMBO44snWU7mXSl4mnImo522yAdCTiigsXqAq2aNu69L+HaXth48/W36i6lbcLsb4rGvnsyB95JC/7IlnUKzna7Hdm+4fZ3b+A+koceyCZYEpuQ4yFFRjAUw+UrlzFbWmJxVtJLb9st2Ize0Xj/SSWThlQaHjQ1DJPagUYTu/aOAJLMlAxaFdkuCSZQ7+iiMD3FK5dgUGDxhHhKh2nYiOoqMr2DKFWqfJsm7CgBjWldQwFDJ3yn1UK5WUe9VkPLMNibncqqS6YFdgu+S+soAh4L3Lf29faj1myiOD/FoOfDjz3JPW+9VITsAfsPHYDVdBE3vomsPM/SNDzNOB4myz6eXwihWpPQttqcGT3F58U8w5oFQtkryKX6ebtQbRrwPbIS9FFzzA1VDruJvnRj8tz0NSrhmz+pz7RpANp0Dt4Cdb3DuW0LYvuRzJw0ELmuG9m2sd7f5TpZ6p1SeghZPcZmpDY593pBzCzMMCiWDJ8GBnahtLjATEoC2IYjZDyqcI9nNkzmgXuCD6Nus9IF3eZptaKpEbiCC9OsdawDJZGFCig4w3T1ScSh6dQOuJCDKoqLZTTNJjy3E2y0lqHXYDk2L8bJoYJEZ4kkRxM99Y/Eg6fdK6lvtE2T3dVCIQV92X5CwKHerEDXwzjw8OfYrvroc3+DkcE8MplBNBoGcuYxpMQiRK1zoKXq/FJRwtFJYoHacCTCY7IEE/ygxKdHdtqk15LJ83qMZBEJcE0D5E1pfS2yETTqFpbdlRUSjOWVUXd3t/OuPvMnel5+5INzI6poPa5/v2Q279/wVoNhSUY2okINRyGpGoxaGw2jhmy2D3XTwr69gyiWSpicnIYi2CDvyv7+QbZ3nluqwSxXYPkmXFuD49tM/mKiGUtqu7Bch4W49IgKj5ThXBdKREMikUUqm2WNI1eQMFsswTBIj8nkTCuJ5KPe0T7SQjp6kwkM9A8gnokiGs8wIp/6W2/TvKBdr+HU+ElMTU1srnoE5jw9cugQevOHMT01hfGX/xa96Sx25w6gVCkg3/gm4lIVlkrBBdQMDeNFFWdnTKiSh5ZoddSPPblzG7dpTKNeWUI82c/m2zfaVd/bCHir611ea2PVvFldvSqK4hplzK3AdByHdplkJ7hlxvovfuv/lYnRARZT5rx582a3qqqRbXD6AnYro6ky0noEqhbmPq9Yr5EpBJ76wtOYvDwNiV0AJCzMFTl44qkY9uzeg1xuiG/gFy68zA4ZqXQGuh5HXE90NJJabfibbr/UEjgWXW+oc3MQ0yWENRJbIN/LMGauTPDJj4YYPRaDEgrzRK6HFRZWoExJ6HjPFyHKMmynzRhRonKYjgOzVuPMubi0hCXae7ouslk6YT6CPcRJb9nMbbItE0O5MdSMCiqXnkHaPoeY4qDhC4w8mq3GUDRCqLZMhCQNht+E6FqQiF7h+rDQYt93Gu4iofj6RkD0zVv2amvVu2X4rdWVmyvNgB9gfyG6lVPGvCMw79R//4nl/KOcOcmPMlCv17tFUewJWuZ92zY2BsM6ndhC0FNJmGWLRVqJkkt8oYnCHC1Q0Nvfh1K9iqW5eUQ1Fal0AkP5vVBI8KBYgBLWceHKFHzqMREhaCcPLJZpsw5mJptFKpHh6wyZl9MHT6ALqsxz5SomL1zgP5PL55HK9cL2fVhGDfGwCj2ZRhsuQh4BMnyYLiGJ/gMuFiYY9VSttSEQ+5LqskJXpiD0iIahfBoHRg/i0JHPwzAt+JIJmDo82cWFZ/9f5NwTSMY6jsXjizIuLhEaX2QDLMGltRFJybig/0VIgA5Chfho+ha2BRX/5q2u5Xrzlkn83jXfdyhbep7nBAKBtfX19bXu7u4127bXftbK6I7k8Y7ffmR7TsqcsixrAc/pFdasXp2W3p4ENRJEzTDRl04w15qgZtS3ES6TdCf37tvLfebli5PQVAnJdArDfcMwPQOCT5lNh1EvYWLmMhYWitA1HdneLKsXRxSSo7Fhexb0eAwqew5paLsSpibGIQoSa17u3bUbWiyFqZkC5hYm0debw77RMQQ5SAS4wSCOff0ovvq1/wsiK8ABoirBs4nJtAntC0oIhxSkYnEM7xnFkcee4J0sodvrpRouvvxV5FsvI8YPiYSq7WO8GMdcPc5/g0XhKBChV4aiBlEqldGSTEh2kDWYdMVDy+m6cXXFM5qtVYuCcjMw1yRJclzXdSlbSpK0HgwG13/aLvOnBeZHdVpnqJy4c+d21bJ6cWO5111d6SYkkEJHIeJ/uwIkFejP9SESzqJcL8Ftmcimstg7tgeu6ODsS+dQLZUgSSpGR/KwTBfZoX4oSKJlllGsVlGcI/nANgcPXW7ajs339f7eXqb9kv+kpOoozkwgSNbWvolDBx5Hpq+vw1EfP4HC1BVeyn/2qaeQTWZZj5MIas989Rn8zdFnIdkebNHvnBDhQqEzIk1ekoCYHkM8rCOc1PHEk5+FWTJRnBuHYlUxoi0hpXQ0RekU27RcnFgQcH4miJYp8OkSFJwKuRiTSzEYkU/sTUP08DFVWzNbXvXaDbvpdsAbzmZQrjmO44qiuC7LstvT0+O9+yz5swLyzv/vo5Q5bxPZWq3WtkgP+qUurxf+uuS5bldnfSdzySSDU8vzoZKSmt6hYoRECdl0iu/RqWyax9rjL56EJLhI9w3ic4ePQJBUOJR1Wi2WSFysFHmlRKmWhhoyZtXUKKPrae1H9/xSscja6nWjgtFDB9CbHkCBvTHnUZie5rMg7VXJkYNOoSQKVinV8MKxozh67DmIHuVKchAmMgVtAzrUXKruJJmT6+9n2u+Rg4/hwuXTGG6PI6HQmVECuWKTEweBmBdMAS9cCeJKCZDCJLGTQDSi8d/VBlC4fJFlbnQ5jJbo4obplFdMt+FubFiELKLekoKTsmV3d7cry7K3OfjcuWC/7aX+8wToRyE4t/Cb7H3ebDYDd0vSA2q3mJO6u1TqnxwyOLVdUNIkFWEySc0SOSuX56AqFCZRq9eQSUQwOJTHwOAunrTPnb3ACCEaiiJaGNl0H+w2dWftjg8lTbRUyq0GQ+KI8CWHolgqVlCcm4RNxljk7qtHMTSyF+neHBsAnD97DlooiLCqselqsVREcW6OzVrzAzmYDYc569U6eZgLfL5m8U9aVdF6XJYZnBGP6vx3EyBksC+LhXIVUZTwSKaGXFqB5Iqchclz6GIJeHlGhS1lMTw2ipG9e9hljoJ+bq6KZ49+FeViFRFdQbovi8Ls1TevVhuNTcgbW1NTYFK2rNVqt5FFm8t1CspfKDA/CmX9NomNtI9arVYgHO66e1tQHND8nniPtyEw4sdz4RCkzaNBoiOZQjbQ5JxGRW+xUoFptlh+MJeOI9vXh8FdeyAqQZw6/jws00f/8AgK0xchukSAyzPYl6QKZYRQb1RZXiaTSsBy2yhMzcNsOnAli9czjz7yBJR4GKdOnYJlNhEM6TAqRZQX5yHS7bpvgPvAc+fGmZPOIF6jxRmTACkOwdKI9bhJGSdpRtqnUkkmujHNMiRTKPkCmuUihvPA53OArvhELwfRywuGh6p2EJHUIaR7s0hmexlUTXTeS+emcXriNGZnzyORzmJjQ67Nz1+tNRqNFaJXbIE4FEVZC4fD65s+llsB+QsH5T/3aX2rIrBYws6dO6WYLN8tbLfvld3AXUogpMkBIei7NmzHQZNRO2TTJ7FEYVCiK4jLJDJf9CDIQfguoYxq0CSHM1JvPo+9oyMsVnVpYorF/QltTvLZmb5e6FoMniDDddqsJKyEVMTjUb7Fl0o15gARnTabTiMeS7LO+8SVCVQW59m6j2i07TZx1uMQhCAqS0W2f5EEBY7joFwtsyMGoZ28zZ5T8DvanMTeZJIZuWsQWwICQhEVST2O4swM4vEgvjzcQi6u8vdJW8tF00FTHYWefxxpqgR6FLbnMgRvcmEW3/z6c5irXEa4J3mzdt2sGjdvkjMGk9J+ihAXxdh7Dsx/rpnzTsqvQGV8+0bPg9tCG/eo27ruDnjoVmgdIvqwXKLSgpfuQVlhgS09HsfewX2omhVG1wxkc7za8XwFly6Mo7o4wyBePa5heGgI2f48Gm0bX/va1yAJQZhNg8EhudwIW7JQz0a4dlop0Q9F1ZnbblsGYqks0tkcHMfFXKGIaqPIfpUH9z0CWQ2hVKtgqbiIhlFHLKJBj0YxM7eEhcIUys0qZ1lav3bAvYQ39UmDhAEXVNYJuMy/3aRUZLP9mJ2ahBYBnh62MJLSIEgkFyNiqSnAih5Eau9TSGX7eXCzBVLPAyqNOv783/2vaBtzqBhdb91srd4kEIfneURIs4LB4BbX/GeeI3+ePvOf60B0u7ekbJlMJgM71ta2r3Z13a164ieCscC2qKR00cfoCyKzKclORYSEcDzO2EdiEJI+5UD/IN+Ky9UFjO0aQ44EqqQgu+O+NH4SplHmxTh7mQ/kke0dwHPPHYVlGQiqYc6eejjJShcxEk3wXbTM+iafXGS7vgjtSdm2RWCNzNnZIvRwEHtGx9hMgO7Vk9OTbJgV03X05wdhtUxcmLjCWwLTbLBJFsN7CZFO+ZnOigw979DpSVCBxGw72oxAOpFCcWEBaljC54ct7M0Q7I3WRkDZzSAy+HtIDz/CYGdqb0hqseX43NL85f/zl0B9Hudmrs607HUiDJFVIKGLVn+W8+8vGpD/3ILzzhLOEzmJvt4jCNGW5KWCXWJ8x5q3LaQHBU0O8dmtTYAN14HVtjmzZbJppFMDiKXSDOwwzAYss83gjlQsi2wuy7C4ZqOJF148hivktaMIXN6z2QzLBfINu7GE/nw/mqYFs15BsVRmdHgmrkEjhBGrajTQsAkIHEdEDaJca6HZNNBqtRHT4qzyxigg04Rt2VDVIHK9OT4rXjh/GrKkQAvHMDdbQGF+jh8oOiNSlHbc2zb1ceBBVRRmelLPycj4oMxAYDUUwoG+Nsa47xRQtCWImSeQyD8ONZy6LYxAD5XZctnR49snv71Rm3/V+t7k7Jut1dXbvSahjAzDoJaYhqCf6sb2XoL0wz6t3y7hm9lSVBR/W3eXsDNws51pSBuxiEzIQ7ovdxiQVOwIRNGy23y7pjI+MrqHjUuXSgbm5wsdliWBg7UYzLqBXH8an33yKWiRGI6fOM5BQlcePawhGYugZdkYGMwzrSMej2DPvgOQYGJ2oYjJyVlkUxpLslSqLZRLBcRTfawP3zTm0LI00OnUMCyUFitssjVXXOLMp4ej/LqJxuG4AqamryDfn2N5m9NnTmFubo4vOax76XksvS0R+43wfILAqsOaonImdcwGg5Rp9aToCqKqh8dyEnoTLi6VNOQO/TH0VD+ob43FE5AVlQeuesPC1JUpXP7ROf/SK5eW3qrcIDW4NvWbP6+f0HsJzA97z7nFouwa+PSng92e2eMW3w5KSk8yIIt5t2FyvxTXSCtSQlCQoEnqJhDYhUE9oCwjn9/NwAui3pISx/5de5DbPYpn//ovkesbxOWLF9id7enPPYlUOsfGVGT9F45ozHSMhiUeoIhikczEUaqZePKxw9g1PIx4SkVhrorZwhTS6TiCahxz8wtIxCTkenvJPgNVQ0O9RiupMsIxHUO57KZIFtiMoMSLfgXhiM5381Q6hX0ju3HmwgTOjY93zLkIu2nRCoukaAgCIBOxmJTnmfsk0gWAdDs5u8pQdOL++NifTmAwazFmc+TQF5FIJnhwS+Z6uazT5qHcbODY14/hzcUf+C/9aPb19XU6rIMGIfawvEOy8FeaNT+swfmO3vKBT30qGLtvR7KrdjN567U3lUCPEA2IYheJuSqUVDQBgkk2KEAimuic5lyrAwKOx0FDAn34pG1EmaLdaOOzX/g8nnnmWWSzcVRKBqYKk9z3kWoHMRWJohBPpJgSXFqcQ1wPswy3adGE3RHaIvT50GAW/fkRTExOoV4tYmTvKPRoEovFyyxlGFF0hBJDzB+6dPEiA5UTMRWp1CBbxZBwV6VWRblSZefg4ZHdgK9wz0kKHN84+hyWZpY61tZ00iGbF5q9yaCVpWEoVRJTkio7KR/bkEMqUrEoKuUKorqGvqSAqqXg8OEvYnBwmAUdqEJQg0CU5WqlhuMvHIXitfy/Oj4+s76+3rJt+1YwGKTMaTcaDbo73AnmeK+J8r/5ug9bWb9dxukEKcttSXpgV6a7Xn9QvFbVJCUIjRJJUGDQrxIJdQykjDbvBvviOdbQrFs1CEEVBw89iiOf/RwLdb1w/DgKV0izMoLDhx6Gafu4ePYUjjz1FZ60L106xx/48FCe4WY0jBx74UXMTV9mQ1VNiSAe9JgGSwFiOC7sVgOpTIwFrtJJHUeefBzJdB+KC5cZf2m3DUjhPIziJPygi2KJEEg2hof3cwBSXxuO5Jjd2TZL2DM2AtfyMTlxDiZpEMVjOPrMcywERiQ2clShKxEHKH3josjy4AqhkomcZgOKH8RQPovLiwXoegJW20EqmsKX/vD3maznO5RhyQSWLmUeqrUqTn7rLLztZf+vnzv1mud5FJztYDDIqPbl5eWtfvNnwt/eS8R+2IKT95YDAwNCl6LEAjdu3NPlraa6ZfEuVZag+B3so0UKPpaLcFBjAAMJDFCJov6SsiMpu8mhMHPHFUVFpi8NLRQBGRIENR0Xz55mGeml0hJ7TobDIdTrbUxOXEaJ0EeKhGgiwwvqU8e/xSIJRJ+gwThDpZEsCGmBz/wzkYG+iYTOnpiW5eHK5CXk+nQk0v3IJPvQck1USjYKl+cgiW3sGRtD1aBJXEK+f5B74EKhAFUKYnj3LtheG+fHJ3Dk8MOYWyrhxPEzGH9pnIcjHozoX2V5TpK3lRBUZaafmOSYIHqIE2WktMgPAUnwHBzby8CSTLYfSkhDzWzzkBYK63B9Cd88dhStq2/4J3/wo8L6+nr7XcG5ZU39nq5A/1yAHxSYXQ899JDwsUAgVli+PghY0bt7AoGQrHaR9rhCt0CxI2CqCDKviUyCr9GULAIhOcxcHNvzMXbwEA4ePgxbENA22pwttKQGtxWEYRlIqQQLJw1zlrJiWFuxWMbFixMd0QJiGNpt2kvh0SNH8OKJkwxOJqSRrgehx8OIa3G+shBqnZb7lB1JPV4P68gP9UKXJViIwLQ81ComSnPnoYbjSGRC0BQR7ZYGIRgCJAdLiyXYVgt7h4kCoqG0UGWKx9TMJE6eehml2Xk2S2BN9o6aDQRSWXYBNaKwzI1ZM2GLDlRFhuW56M0MM9/96ae/gEOHHkUkFGElD8sGSz7W23VGt9eKTSw3lzbWll+1vvHdHxXeKtfMOzLnRz44b+sb0f4yMdT3O2vXK8kdznogQvwa7iSpp6J9X8diT9IkOG1SQLMQocmTBU0VvuiksikcevgJ5IcJYUS6PlsTL+kg0UKEyhqhifi8wiBj0XfRMExcuHCO6RqkEUSelB6zuny03RqiWhyTk1cY4CHLHjI0lQep5/MRi5ERAGEhgVw+g97eXtZfF70mSsUGCsUlhIIWrJYNTRV5t1qtmahXqrxmIo/JbDqO3NAYVE3D/HwZF85fwMvjZ5gbTmp4VC344ur78IlXAY9tZ9SQjJCmwnQsiLbXQS0FZaSica4Oe/aPsE5nrn+QF/ktErel3twSsVCdR2mmBOJ4rq4ubbzwwrlXrl271uzp6bGo51xeXv7IBydnTUKwq5+8Jye9Zgzs8PwQZakty25SlpC8jh8QZQVaoZAEDC3bid7ALMlgBLZnoy/Xh30HDyPVS8t1iTUv6RbNGj8045LOO8nG+D5UUuyoljggaak+MzPHvuNhhTg6vQjrEZaDSaTiMIhCS0NVs8my2aQqR1M8WanoYZKflhCOajh86EDnXu7KmC1M4/LURWhqHLFoDLVqmfeqyXiSz5l0XyfeEAFIkskMP2DEeVf0KM6ceBlHv/l1PrtSv8kMd9IwkFT+vmnatxxCsLu8UfDYwYCSqsimBYocYjHbvXsGsWfvQfT153kf69kCtwCma0HVEmw/+MPvfnejXLt2/QeXXllstNsrW5ehfwnOTWuGgYEBWfLNfYGurnsi3T0B9rMQiOYvQOHVHllCi3w9iZJuJSkAU1nVqER7kFSFMwupaAzkcwxRS2fzED2F3El42CDoLpsP+C20LWB+fhZXrlxg0HE+P4zi4iKrx5E5K4F01bCGKJVs30e1XMKTX3gKzz77dYQ1DYcePsSGBfVaFcWFmU1ZGg2HDxxi04PJwhxq5SJ8B9zfkflqOKRj9/AwZFVnnSV4Fgc+4QDogVB1WsBPomq0UJgqolWvQ/IkOGILiqBCkegkScrGHV934tAvLRZRa5fgtAhaZyG0ye4Ug+SLVEO2N47HjzzFDwx5qnuiwv24aTR55eZCwuV/PLn+nZcuzdVu3Gg6Dnum09nS+ZfgBESCu921M/Sx5ZnXH9JC21RZCnZRpBG3h6i9IZlKusxU3aZZhx4KoWE5LMvCsoKCwFRWAjLIitZR4tAJJ0mXG4XXStyjtogf40KmHs0kSBtpUcp8IUrRlF6p4+TxF3Dh3DgPHulMlk1Nz5w+Cduy8IUv/h4W54tM5xjo7cPY2Bijk0hlbrG4wHwfSfRZfXixVEXTrCCuRGEQKNlrQJQiSCTjyKSyzNkhCm5EVxl4adSrGB7MsRzO8RdfxuLcPDQ5AlGUULMXoUkRqEqYMz45E/D3p4R4f1u1inCa1O92qMpBReLs2rRavA/97JOfx8FHDrP259zCPDyJIHdZtOlKZBj++HdONs+cu/AW3dQ3d5zW+3W2/LChkgK0OgpFQx9fa5QfDAuhHpJxIc1AWfT4Tk0ej3T/JmBt2TJA0zvNK52SqLBxFTEZSUqQ3C1EuqBoGpdL6uuolEpyBBcnzvIes29ggCkW6d404slsB3pGoNvCLE4dP4bpyxdZDvsgTdY1gxmPBLrI5PowSvaDsThnpUQihuHhXYjFkmiYForFeSzMTcCoVZBO5fgUmu3bhULhAkb27Oe2gqb9VJL04HWUS/NwrSYfDOrVOg6M7kPbcfGN574Jt+EiqAqsR0+ZMSJFWA6G8J2uQyIIxC3XOgOO00RYDnMP3TRLPDz5lscCCgR83rNrBE9/6SuIxdMYHz+Fy5MXEE/lEIlnsbZmexOXzl77/vdfKW/e1AnwQTd1YlJyl7t1NH0vK6Of9jUfhlUSvcYAwd7EoD+gB/wHe6RgkKzzyN6EMD+kDkdIIFqXkDxh1W5AIWkVgsCpClxPgEjTKyHQbeqjNCaPEbo8Eo2jWqrxe0tZtFxZhCipyA/mMDK8D6m+DGdaKq8koV2YLDB3nUp4KpVg9eCTZ06iXKbPjT4jiXeh5H4h014LQESjoFEYHkQ03kajxFaAycQALowfQ2/+ACavnMQTj38ZVaPO0LpoMsVMx0vnxnlJHw6H2eSA1O9mZgtYmp9HKJiEKJC3DwE0DETkGBQlygrDjm1AEEmUlhBYCj+MtuPCqJVguU2+LJGGJnsdiS57Ij31hX+D3Xv24dyFszh5/FvkteIGeu6xhFDIrl17uzF15TWDjAXa7bZFAlx3CCP8yq9DH5YLEUsWkhelIq0P3KNIuaDcE6SgJCym6HkIKyriER2iJKPVMtE0TR6IJIXIWQp7lUsEIZOp57Q7+urBIBya6kmLUtMY/EvjEKHNCcc5tHsQu3aNIhKPMYemuDiHc2fPshgXtQEL83NQgiIaRoMBIeSLToOTUa5yII7sH8HoyH4WaagSO7K6hFarwfEbYafhGIxGC6WFaejRXtSqs9i//1FcnpxANkf0igEW+bo8PcFny0Q0ieLCHJqNGoxSlQcxpuqazQ7lQ3Shh8IMySMOu+WYnQW8QmukCEKKhum5CdhNE47gcnamS5JjuWjZDhRVxtjYITxy+AgaZhvf+97JjYZRWZ16vVp782p1RRRFEnolSgZN6as/j5zML5tFPwyZk5bugVqtJscF/+Ohu3p6twW6g6ym65Bkn8CZk3Z0tKtsO2TJZyAa0dnYxJkEjQAAIABJREFUlPqxYmkJIVnhQG1T5jKa0ONRxOIptFoOC2nFkzmUynVYjoFMOo1EMod8vo8NqZpmCxfOvQwawAZHRmA027jw0jnU60to1GrYP3aI10INy2SIG+l3ju7dhb17xnj6nZspoLSwwABhsnBJ6lFImorS/AwHu9FqIyQCqdwu1KsltoXpI1UPPULLINZi8hwPFy6O8zCkyTpIfAySzQJbZsuGLwVZiYQUQBzHZ1geLT3p4aOHluq52aoxRpW2CCMjw4ircf63yTDLcQwevEb3jCHV14+6YeB6ubI28fq08Z3v/OA6abYT6n0zOO1Nqm9nX/VLgoo/zGWd7KUDhmH0fCzc/dt3dSsJeaNLsiUbvkUrI4XXNATSJcR3y2qiTgCJaBxKMMw03EqzBEWg3lOC7fhMv6BsSXhKKrV0LSFVDLMlIJVNIpXsxdTkBPaODqM3O4zC/DSvarLpHGQ1jOmpaYyfeQGm2WSeUSKVQrVYxMjYGLcJ88VF+G0Lvf0DiER0jI+f5gClFoO2X/KmgVVlYa5ze7/8ErvBZXv3IhyRGbRMu9J0tpe3BHTpmZst4syJo2jUi9xXBj2yyWqjQRpFNE8LVCUIf0W8n44TCPXOtKNtW01YfovbE1I8JqGIJ448QTsOOK6Jbxw9isLUJCsWE641Sdz5QXIqDqHw1g9X/+Nf/cc3KrXWTQrQnp4e1tXcnNJv20//slnyJ339Bz1z0utjKm/AttW79MBntAA5AYlMSCPBKV3rfJBEX6DJoGW2WSQ/To4VQR0N22CtSFJZo56T9qARPQKQbDQExJMpaJRBzSb5PmBucRpLSyRbOIiRkRHMLdKqx8HogQNoNU3Mzczy+XOpWORSvm/ffhQKU6wsZzTqeGT/YcRzWdazNKh/FTpMy1q9jnq5zJZ8NITRvZ4U6+LxJCYnyYrQhqLGoUc1xOIZhCNhZLM5Dk5CVE1MT+Lo0Weh0TlUIzU8Dc1mlT3bFYEY7R2xMUnoqA2T5JsUJLhcCKZT550ndcSjg8P4oz//n/lraFKvLlXwwgtHsVRaZLIbA0YkIJxI+/1DYxsr62sbVy99u/7NM4XXKTg3pQtv+1O+H4PQh2VaZ+tZugqJtr3jnnulg7FVtccLuiyGyj49VNKDtNsTGWBBPSWZmYZIZ1MRWVJQVgjxHWRZGAIZO2SvTCpwro+hgTwOHX4UL01cwflzJ6BrKXzpD/4AU+cmcfLMMQiKgj/70z9FMpnC0aPHcPr0GbYczKZSaDk2xg7tRyRMIOE8FIV6OQUmLUg9D41mE5MXL6JUXECzTsj6MrcaYwf3Y/fIHqRouCnMY+LSWQShoEX7SsvgfWs0rmN4dBCpVB+Crszg4mMnvkm8Y96d6koC8zMTaLpVSCTmQAAsRePXS5nTJzsWlu8O8oNA0jKy4uF//5P/Cck+us/70CRgrjCPZ499kwHFmhzk6JR7unxnzb1V97dZvzM8Gmkvn7v1f//ni6/Iskx8Ief9ntI/TMEZIGT73evrQ/fG9V47uE4qL2gbDe6ndG72Kfgk1qdkmxPfhSoEYfsy67mHZLqzi/DIw4cM76sGovEERvbuZZ6PaZgI6UlcmpjEkScOQIsP4P/8X/5HaBEFv/9Hf4p4PIvnnn0GC3PTrBdP+8ymaSCdSuLJx48gt/sA+6WLAjlH0KWJ8L4CI9NJHIGmezoJEvGBer6FOeIFlZCKp7B7ZBSLxVn2v6SHha45zLjsJYGvXgZu0EA0MzuLS+fOIhvToYWp1FM7UkDDMRlHQNuJYIhgfwIDhok1KgoKK4q4NJ3bLlzRw+OPfw59AymEoinEY2GcOfUy72zJXrBBSnaSizXbb0+XmnUxGHL6H+yV71Ms95tnphbpZEnB+fPIF/4qyvwHvazTZTsQDoeDO9fa/1303njQV4JQHBs2Ke0qArSQghB9MJQJ4cKw25AcAVpUg2U4nelcURBSWV4fbYsCxNwUH5D49h5PJ3Fo7xgi6X5cvHIeQ4OjOHHseXzli19EsncXLk6cx8lj30CtXuEVE2FAl4p1LC7NYe/oKD7/9NNsl0egZsWX4QgdsWyatmkhXq+WMTl1hU+TmVQGmhLCiZOn4Lt1KKEQcsk4Ev370Ww30Kg2Obv2ZRJIJ/oQJDOCShFnT5/BVGECkaCMqJaBFCLT1gL8tt3Z5UqkShxiNBI1tvTvUh8qKZHNMt9iCvFwLonHP/9lNKsOtGTH3LVRNhmRVK1UUJiZQDS6zd+xfcfNv3rh/NWNjQ071N1trdg2I99/HVP6hyFzbiHdux98MB7tqpoHdtwT4Y5TIocyuvQEJagUrIIEmcxR4fOFh3GNisp0W5IWpLsy9WIE73B8By2zxYZT2d4+FnqV5BCmJ6fZnZewk3QVevKzT7JvJJQwvvWN51C4dBYhOolaDpfsbF8OZqvJWu1f+f0/hBIJsw86YSooOKjFoAxGMjH0Z9qtNmr1KppGjfUsp6YnWYabSGR/9JU/Yanv2ckrPKilU1no8QSChMOkG3nNwExhEoXJCZ7m43qKd5czc+f5tdPplvpSEpIlIwGGvziEgXcgd6DxcIPU84iIxGR8+UtfgdVqQtVTeP7FY6gU5zgTd7K3hWz/ANS77r/57//iL94iEpskScxNp34zFAo570X36L1k0g9y5uTl+wO6HlRU6bc2Wk6fHFMEVZDhuWTxR7rkYkeFmLIGY5N8OJ6FEDrXHCKyKZIMT+346pBPI3E3rM0SSgSwaCoBLRpH0yADrDKzKXftOYT8UB8idO6EjKPP/S0mzp1j1woSRZi6fBHZVAbxFMnItPHoYw8jle3jG3SQwRUKCdtwdiZLavK2pP9MNjHUDhBbs2U0EE8lMTdHvuYSSktlvmqROANpyZNHpiJLMOp1zE4VsLgww56VlfIsL+hJI6neLLHHOYFfLMGDKipsVEBB6ns+bL/F3upk8cfKHhLw9O99Cbn8AFpmA0bFxPmLZzmYyYoGPsEFawin4rhn54Orf3fy29f+/vnnr20JJ7zLYW0LXPxLcdM/rHhOHobuu+8+RRf8T77trdyblmVBI5lpavhdoiMQ8qsjXy34FJwuXMGHChkWax5ZUGXCQ5IfOiFDOpZTpG9J76wc1hAMaqztTjIr2XQvxg4fgaJlEFY7Fs2WD5x76SzctgnLtnFlcgJzc7PMISIiGC3k94wMYe++hztKwzSYsRZSi0UWaHHfNOrQIzq/bpJ30aNx9rvMDe9miBz1mIukp2kayPTlWFWDkPW02qmWyeJlEguzk2xY4LZa7I4hstisBc9R4bsWTLSgCUHec9Jul/j4lJVZ00vS4MkS4nENf/hn/57dhuv1Ei4XJlApVdkbnQYn2mbQ2pJOsKn7et3xf3i+/n/8h2+8dedVaNMLnWgZFJQ/U1/zvWTLO7/mg5w5+TJ033339Wy/q6fPKFU/ocueqJD8G69KOqQthdThSEifpWRc5m1TYSNGJGlVEnWDAMEd1gKVPsoTHaGDeDaLTHqAUXepvjjSuTxSqV5YLUKPO/BsD23fR2GKzpaX+WxI1yA9RjvILKtimIaFVquCz33hS2xaQNmbXtv5s+MoTF9hg4KB/l0IRyLw7U5gGc0Wc5LolNqfyyE5MASb3TnqHUsWx+GzYjwSY8sVagdoDUWlvVktQWPahch/hpDqRGcmvXq6isk0od/+Hunx7ojeUtocGu7D01/5fRilJrNMJybPwbUow4dYiJYEFkmLfvfwKGL33OOePf13y//umW8WNzY23o1Cel/3mx/0nvO2AnEDDfnuyN13iVVrbH31RkAm3CaVME1lHCZNpXSWZAcd3+VApcAjYysOWp8meI8DVQkGGQ8pcH9KtGDyC0oxDSKTirLbBPtM2gLSSaLGyqg2muyCQZQMogJnMtQPpjrOv0EZxWIVp09/CwfH9mB0/2OcXWmnOX76BGYnJ+E5FvaPPcKvKUiKdKkcZ8JkKoWz58dx+MBBDO4fg6bocFoWaqbBAUrlnPTa6/UqWg0yxmrzAt01CdkvgUx548EwSzbSCbVNe1NVg8rfH12FOu8DZVWSlQmqCh5/8kmMjo1h9nKBHwSqGAtL1G+GuX822wZTToZ3jSK8fYd76cK55f/tmb95czM4V8nVd9ObcovQ9ssmx5/59R/UzHkb7BGLxbYFg2KmtXw9v9JoiEGP+iMNw3v3MZB3qTjNWZF6SxoeKACZEOs53H/ZZLdHbr2SgAgNT7wTJbMql2/vxDT0BAG+6yAajzJXyPIkyI4BP9QRYaAHId3XjyFya0sk+aRIEjKdrNbEqVPH0Tbm8ejjTyOeyuDS+XOYvDzB6xlSriMQLzUdlJWSySzmC5cRiSYxfvYE+rN9GBjaxYgker1UWenmXa2SC8YMFuZmecdZLRO/CAiHwpsqHyL64v1wRRel8hIspwFF0Xi5TsFJKCZqI5x2k1domd4MvvyVP+SWY/7KJMMIRUHD1Cy5wJEDBw1RFqLxOHLDu4CA7F46d275L5555nZwqqq6eu3ata2T5fta0j+owI+tKT2QHBjYFgkGewMbq73t+vUe27K7KPPt3bsfhw4fYSTQy2dehFmlkx5diDw+DTKzglBGUghtn8qzBcvxeMCRqV8TFNhkXg+Xy3MqPYBq3UA8QdcUBZVyFQZNxakMFMJy9maRGxhCWO/sFzvB7zMvvtFo4OWXz2Py3HHoySyGB3dhcWkBzZoB2zEZhUTnR13XkYpnuco22mVGJNGuk65MQTmCA4fGeFInTCqhinxGP7u83jl79jTOjZ8icjrisTi/buq9s+lh1nQiJWUGGNPWghluEusqWLaJltVmTOehQ6M48uTTHOw0yYejEVSrDTb6IjJbWNe5qpD3kazHUCyXV8e//e1r/3DmTIUyJyHfQ6GQ/VEOztuBOZrPK9s0PVVsLT+0Vr8WoApONjnZ3CAef/ILvMqhN/bMC0dRuHKWr5EkYUguZMydkXyosoaW44IKXKNFH5LC2kGUDRmNQ9O8FkImlYMS0WFUiwiFsyiWZpFMptnpYqlYQDSZxMiefXxWpKxGUoMsleh6KBaXcPyFY17t6pz9VrW+EQ2FutPZtLhjW0wQAkKX2ya99RZSJFuj6KgUi3AFE4lkloEaJNtNHivZbIrR8L4vMgeKXf4EkbGmp0+fwMunjkMgs9eozoAOCk5dS2DJWGLwS5DQ/i4B/h0+AFDloLMpUS1Ij/6JIw9jbOwIijNXEEqm+e8mQAtVHzpzkqanoqqMIV2sVnH6u9+5eeLEqbdWV1fJD52D8w5w8dZA9JEp61uBKeZTqW0DA0NpZfv2/PiP/ykoNxr8xkficTz5hT9A/64R9v0hV7ULp4/j0tljcF0DRHULBSlzkh2zjyhdTNok4i+jQYDdIDhgZcJVMt/IZ9kW4n+TtHXFcFCrlNjuJRwJojg/z+h5ksgmiZl4so9haCz/AoE/2IlLF/yXzvx9a/bNN68LgrAejcbD1nqrW1hHTyQSD96z424xTj6Xg0P8UBQmLsOxmjCdBho1k9uQTDaBAw8fQW54L+8sXZdoFnQtErBYrOLU8Rdx4exx+LbNA5UiepxtJdo0WGUohIZXZHhOZwdLgyLJ1NDZkvpNgseNDA/jyOe+iLnCHDQ9xG1MiKgY1N/W6jx2J+IpqJE4CsUZjL90snnme5cWNtU9KDhXN3ec7ysS6YM4rd8OTJrOU5HQvXfFdg719j2knBk/zgZTRCYcHh7FkS/9CWMkCXUjCkHMTE7i/MnnUJq/zLLQiiIjREtn+EgpGhEyATcE06rz5EqlSxZpD0hMSzLAktmemfCV+/c/jqn5JUwXxtEoNTCwe5RpDeXKLPuZ9+VHAIEcJgRYtoOp6cv4u//yn5zla0vXrzdbN7u6uta7uro8SZGErvXubvW++xNy+6aibYO051OfErd1b+9amp1DQo/xv0maTW7LhaiqGBvbw3wmlcqD57LekRyS0Ww2ceKFF3Dq+FG4voOIDIREQvaH0fZN3kyEBBW82vWpmRGZyGY5Td4G0H+jYVBP6fj9r/wxVDXOm4f8yDDvYDvrI3oYSFwsybqhr5Vf9157a/bGi8+9WLxTemb79u1rS0tLW8j3922/+UGZ1u+UlhHD993XM7Rjx/2etza4sq0r8PDwflyYmIRRKkLqjeLwwacwumc/l0HSuKTpgei6588cw4Wzz7ODmirKrNhruQLiIRJPJRgZ2TO3Ifq0diLhBTZbgUXMMklGOt7H4liyHmKHYKJMkCLdgSNfxNmzx1FdKuLJz3+JqcR0mSHs5PziPE5+66h37nunzVuufVUQBMfzvDXKnl1dXTwsbGxsCIFAIBD72H3JdPreexTX6g60m4KiJlEqz/MFJxFJYO+hUezadZAtCtlfkkDQm2W9bbUwfuo4jn3rb3lVRjFIy3qXAlSQWKteUsJ8tyfEv+uKcH3KmA1eQ4q0apI8xKIqnjzyOAb3P4KJ8dPIZPv4+FBeKsGwSJSsA9ZeWHrLv3zh+83zP5goVxqNFd/3b72LBrxlcPW+lvTf9ED0DklsWZYlwVvN2O21vGNboVhcQ64vB7g6iqUpHH76S8hl9wKyzrwhGgqYfw1g9vJlnDt1DKWFSTi2iXiEEO8OdC3MvZmkkE2eC9Oj06bKlxcKWFIIDkfjyOUGUa1XsFAqIpdOIz/6CI5/6wUM5rPIDo6xpuXuXeQNlGORg6bRxInxcfzD97+z2njrrYq1stIgp7JAIMAWJ4JAGnFEH/eF7u7ugCiK3dt0fUekpyeZ783d9UCuv4vKNPXMtMg/8ujnMDiyB6qoMguUKM7UcwZlCYvFCo4d+waXdUVUyLqcjvi826TvL6iQOJkMUSZBWsAk3yN6EOmEy0OSj7AmY/fuPHqzKWihOKqmA1Ek4tsScuR3RI2QrMO3BCy8Ob/6/Vd+UDt78ZXrdyLf30Vme98n9d9kcL4jME3ZlOJy/OOrN1ceXF2pB6Sg2KVBYQez9NAQUv2DODQ6BselPkuGJVibpvS0z/P5kkKcIuKAH/v6s2jVJ3hiTWnE4Q4zjYMGoIbbYINU4qKTeAL5NNIGStdkIBiDr6TQqhXw2CMjMLwoxl9+Ebv6+zGw+zDiqdSmLCBw/qXTeO65/9wuL1eqXZ5HIFy6P9vkKEGi/V1dXRv0k4JTURRxfX1dCgQC3YIgBO++W4lvD6v3kz10lAHCKv7gT/8MukYuGy5fssjhgkYuQhq9fO40nv/Ws7DKVQQpqRKJz7O459ZlHRLZGPoaoMioVis84NHf06xW2ExVCysYHurDo4eHEZFDKFbI5CDHa61a1UCsN4ewmoIrCZicO4/vnfmH+ne/e6VMLMs7z5aNRoPEE35tJf03FZy31TvS6bS498/++N63X7l4/42JK1GnZsi04KHSSwvukKwiM5THo0/+ERQSRvB9iHSOpNGd9oF06yGqoeSzQT1Rhekic/b4MSxMvoRwXEFE1CDLNCCQ9HWbNTp5J0q51/d48qYPisDFkqZAEjWcPHUUhw4/BsP24JkWRkhtODMAw6wxO/PiD85Zb7wxW2u1LHKTsMhDnPwdt2xORFH0RVHcoCTqeR4FaGBtjfyiJElRAmrirnAs1ZfTP/XQoUg6m0Yyn4RkCZCoQeYLIj1wEuZmZvD8t/4Ws1MTvNLyWG6ms8ZS1DBkweW2hdZGUiiC/oFBXlkRxI5WXgx+aZQhukvIpkIY3t2H+aKBUs1GLJJFNE4HiCZuVlY2Xl+62poovHpz5o23Wq2WTfqbBPZgvlBPT4/z61y+/6Z6zneoxP2rr30t2z79Yu9bk69E2tV6gBbm5O6gBKn0ytDEIMYePoz8I0+xK4Vlt1nnhwAWJNJPtAwGwpHDhOtCEEhT0oZRKeHYN/4SrTqBKsI8EPBdm5FMCgNF2IrFpzi3+evoJNkWXIyMHEDL0WBWpzGwZx+0CF2EIuwxSaig+ddfa82XlurNZt10HP92YBIogvx3lpeX75QD7Eqn08Lq6qq4trYW6OnpkajEd3dvKDt3Jrd/4hMjO/cf3LMzl9vH162Q58CRZIQUEUbdxLeOfgNnTx9nKUQa9OjhI2ozTT/hGMFeXDQaHvbuH8PgrjGuFmZ9CfFEAnoyg3qtjMWFAkS7it44kMnGIWgRXLgwBbPZufOnUjE4LQVvVG6alyZfM+bfemuFUEhk4ULB+S4K8PvGF/og0DRYJY5sV37r3/7bezeKxYHi5Yv6jWtv07EbQXKhjaeRSmVhGBXYZguHPvcUkvEhhFMpWK3OWoSuHPTG0g8CfzC4lzXQCdthoVpdRGWxhKkr5+EYi5wRSQbRshoMzNBoUU/gCMZc2h3JGi2GVDYPV/DwxBNfhGFbXO4bLnBl4jwqc6+uXS2Xb1aWG80Vy2o5jrMaCATIEZdsmtlDfFMO8E5TqNsPYzKZFG3bJivtgCzL5Lspp+6/f8fHD4ze99u53uhIdmRT/CEEs93E+fFTeOn0cTTrDaY8Oz6ZK3R46LRZ8EgXiidsDfvGDjM3v1ousxc8vSlknEAmsB0sQRuwCugnCxd6H9tlzMxX4JNgWSqL+SrtQxPra23XefONgvHjudnqjRXb3ILJ/bqn9N9E5rx9Lyc/oP5Dh0btxdcT16vXA3Q2o0xJi2kCYmixBFqeidL0NA4++nnIvo/U8AjcVsfGhC4nNtlC8zGk4xxBkUa/9awWFuYuIZ4aRmluCuWFK0j298JriyhMTsIoFxAULZBXD//wAPIiomyciKWgRsM4cOgImq6D8tI8qmaVOEX2javVxo3llUZrfZ1cJMh4lKbzLWMoMrff2v/d6SG+dR7mh3LTdkZcXV2VKECFbduC4fvvjwwN7Lz3t+/bfU8mlxEISDIzVWAJHOKYy77EbUhQC7JgbTSeZoidqiX5INBuGUglczDNKiSSoyGRr7kZVgch4h9doGgo8pwqMgmNK42mlvnBJKC26agYvzCFeHoMqppF6Y2Jm6/+6FTp4mvXeCD6CTC5X8sw9OvsObcyCFMuhlNKX71HGbjVbPV4LZvLbG4gj0zfwEbLcp1bnu/e9bF46NqPf9z12JN/CNdtQ4v3sksZMwZ5IrV4OCKOOQcof/YuO07MTl/C6L5HUVqaQ7U4iV2jB/lDOf/SKUycPU4C6QjJIT5zEs6RrE7abYvPnGoyDiWcIuEkrK7e8LepO9dr7eV6qbTUsCyX+jCyaabJnHxyya7Z/SmB+e598p1KeaJlWRKVeUdw5GgqEx785K7efPRerfjmjHj9WgMt34PSgy7B6+ra3h0VevODXKppkm8bJfQPjcKymuxb5PpEelMQ0hKsx1ScLzCdJJPOMUKeADKWWYWKGmdYyyxwKxNUQ6g2gJalIps/BGgJ1BZ+dGvu4snyd86/cpXEYe9Yvt9pSPC+7zh/XcF5+0OJxWLdoVgkE1m/OdjqchTXFbo0gS4wWfTlhyHLqv3qqz9uNlcsb+hTo7FId4+0a/8RxlWyVZ9ok2wxm0NRcBKdluivjEiiUKPls2VivjCN/WMPo7g0i1pxDvv3HWIU/KWzL2Di7BnYTYMzNX0NZR9KeaSq5hBARNc3VlY3VpUN3xcCrh3XH7Tmr77VuLFS44xJNs13ejxu9ph39pk/64PbOjYINAy2220pGAySYWR37uCeaBrbwlevzkl+typIoZAQ0noEQVSCkXBSfTD3cZmkYVq1JRQLl7F7ZIw5R2azhFbLQi5HfkYeyotLfGyIREn9Q4MkKjy910tT8MwK9EQY1aVptMl8lpXnIsjmRqElc2yK0KiUnDcuX7z27e8evbqysrJFzSCpwy0F41/ame3nXZC+36ik24F59913y2GC5LjNHG6uqlBcQZIV5Ad24e6d965ZlmuXr15rNa5dde7NPKDuOXh4x/3ZfolWLbRcJhU3wi/SlN0wW6yJRDs+yp58UCQgBgWa7aNRnUdfboilZYzSEoZHdqFarWNp7jJLGdKQYJkNiDKpybFUOmeqbk3d2Jm9z16uNeuS47jXb968ZaysrHqrq2ub/uG8KgoEAmQ8uuXxeCe28efJKO8I0Fu3bgW2bdsWWF1d7aaVk+d5NNQHfN8PbGxsiPFcXkn2PhDNpJJ3Z+5Jie2bdddYLAYjcR2J1AjazSJD6iIRkj3sHBlIVqdNzm6OxVI4HtGTjRIkVYbkNlEpzyOeGWYee1CJ8RnTFxSW2bactrdcvrry5uQry6XybOPSjy7VqbSTdeAm6OPOnvrnjbP39Ofez+C8HZi6rgf1xPa42N2zHw2ji42dVBl6Iouhhz7tXl9evvHKuX9s3qjVnMEHHtgx9plH7t31md8VaUdCrrwkyUe4RI80j8hwivRaSU9dVhlE61kGRMGDrMY7w1Gb9IbiWCybsIwisgM5zF2+DCnY2SFeufAS5gtXsO63/fV1eF67a31VEFw1nvS2h0Lm7Ks/NujSQxcfURRpr+5ScFIJ31wXedeuXdu6lLwXusLt9+b+++8XLMviPpRWTuvr66LneRScNNaL9Ovdg4NqKvfx6I41R7au11aTd2mR0o1KID9wQFmpzwmkoeRZVUQSOSSSKeboN0wHqhpCIpFEmzSRRBmp3iRso4zC3BJ2730YHrNZJH6wacByydhA9FhDqV2uuW+98cPl4yefe90w2ivUwmwORnearr6noPt5v+j9Cs473/yeu+J3JW81r+U3utY0cg6gTQ7J62U/MejebNRvTE1OGbXKjVW6+I2O5iOf+cxjmQf3/q5IqyUWLKa30LZZfIv1jQBUSyRqQJKGFgqTF/jqM7L/CSZ0tU2i/qZQKZdQq5aQz+9C4crLiBD9QQ1jcvI8Js+ObyxXSva6jJYkye2rV5dXPM+j6w57ha+vr9OvFJfrlClt23bJ2H7btm3rS0tLW9njvQTmnZ/NbY170zRFx3EoMIXt27cLruvSi6DgFDYDNUBBS5k1EAhIqqqG0rHYvdYh7OmDAAAgAElEQVTqdU0JRro8z0KSPZUOIz88wg90m/Q4LZPV7kIRHdleClQL5VIV8XiKwdQ0S1LjzZTiDtaQbbnJGaQ6P2X9+J+Ov3X2ez98+137zg8tEv4dpfwTuz+xUwmqI1dnp3vI17utCchFUgjn+7xm9eb1N1+dMwzDIGafT1eVQ/uG7/70w/86O7D3d0XfYSw3G4eyvajXgumICAoCZqYvIRImMpeES2fHmS90+Inf46W02agjk0mjWJyGUWshns2hNPsy9OwuhDQFP/yn723MXLxg37x27cZSvU6nR4eCcjNTrm+eIOncQ8FKdXa9u7v7J2VLPqH/vJngp/w5Vm3e/Em9qLC2tkbL+y4K0M3g3Lo0cXDSj/X19eCOHXI4EhIfEDcg+nRrJ1ZoNodDj32O/SvNlsNyNVajhnhqAJlMFFOFaQS1OFOSZV+ESHd6Ajm7DKFmx2TiTRGwxbxR9N8s/MPNY397+spvYnL/VWfO24FJKsShEFLB8PbBVKxPXZydRBtNpMI5DO7d57/dXlm+cvbs9RvlMq0rPAqCHTuigeG9Q/G9ez/1sU/s/+9FeoRFt82UW4GRRDZdxPl6QnYnQUlEOJrGxPmXYdbKeOLpf8NPf9u0kUhkMLswA8sswZMVWE2Td3qlytX1iR+cWCvOvbpsGO0bgiCsUXCKokglnAOTyvetW7e8QCDgUVB2d3f7S0tL7+4tf9mgvHOdt/U53AbCPPTQQ2RBI9i2TVmUM6nneSINUPQSNSUQuScc+HiXFN6GttlFsC3qIemBHnv4CYyOPcq6UJVaR24xnR/mijM3X0Amm4cganAFm/e9pM1EEz319h1HBwttAjo3q7h++fsrX///vv6jLcHYO3rPrffjl3w2f/qX/yqD83ZgEjHtwIHfvtfz3OG1tfXt8XgOZm0JIVFALN0H0zMrk6+8Vl9ebnLGov5OlmU8dPDhe3bv2n3fJ3J5ORRPd9wqHDA/Rg91bEe2kOW0aPfsJoNjJy5cRLU0iye/8GVWODbbLivIkZKG0TAwOTkJLSigaRuYf2OhdrW4ZKytrdESnXaV/JNKOPWToihyUMqy7JXL5Tub/zt9dn5VgfnuT+a/CdKtrEoZlYYnOoPeddddavQuZU8U6xpZs1Sbdb6AhWUNjuhh9MAT2DP2OCPcy4sLjAvgw0a1DCeoQA8lGdtKWZJvbBSTLlGJCa1FQWoz7qD69vzale/+ffXcuX9cInQSAY5/nafMX1Vw3g5MEnn9xJ7s/U6j9XGjWN2mRpSuxGA/MXGwvu5vtJ3l+sL04nXTtAgowX2dqqr45IEDH3to92hqIP9JcVv3tq4O/4XMBwSmYaQyKdiSiqBnMQqnbjTRalShBAXMzlxhWetHH/sSRCWCRq2EVKYXkzMXYFQrmLhwAr66Y6Px9vVyvXq16a/5NmVLCk4Ca0iStLbVU24G5dYi/d095fsVlD8tfWxN9vSrGIvF+Lq0LR7RQ132p2Wv3RUXsvD9Bhp0PSJmh+9g3+hh7N13mJ2PyeRqcPce6IkUE+7CMfLd9OCLGhQyziKwnUdy5cQapZMmobWCaNkNvF26tHrm+H8pzb86X9vMnASf+7Xd2X8VwXlnxhT3fPqhtGveGnBumRFfcLto6Uvyzf19u9F64zX/H2emX1tZsehmu777wL6Q3NUIhpRw6O7IzsjHPzGiDAzv78DZ2g4dgmB7AuoVwry6iKb6ePChCdNsmzz40KmjWlmEbTYxPLIPvqzAqBSR7R/CiWNfR7FQgLA94NdrjdrVt4s3VlurZMXM8DYKTDo7rq6uupt6kz9t0Pl1B+WdO+it65KYSqV6wrHYzm3hYN6rL26nHtN3JGghOt2qoKbH8i3k8yMYyO9lJiiNk7tGD7NN9czcJOKpIX4QqI8n8VumrLCWJ99+YfvEXwrCuH7Vnzj3d61Xzr1UKl1bbn4Yg/MdCKNP7Lv/wRul632ttxuhNaJpKQKSWgT53kFsdG9fn/zhPxWv1mrN1c2pOPvbw+mutfrd4ooTTCQS4t6D/1oYGj3cATAsETW2hGQyAdcN4uKFl3gK1XSdaRi25cOoFVkHiNzSqCBlMv0gxlCxOIVEug/PfO3P4agqbl29enW5Vru5urLCgUlLdDo90nrkjgn8zp7y13ai+xkN2+0hibLmo08+uVMSkV9+800FgQ1VuFntIntrE2QrKEGXSMSrM0Bq0SiSmRyi8RhS6TSyA6OwWhYq1Sb0ZC+zCDqSSqTl2YLjiXzOrVSKaDSoVYpidbnkzZz96+bxi28ubbkEv4tH9IHuOW+/eTt37uy+98FYut1oP+iurkYE3+6isxl5iieTqXVNUW/OvvHGjcVikQKTd4dra2vre/6Hzzxgzi/sNK/Xu2ktRMZR5OKbTPVCcsmJrQXLFdGby6O4UOTeKNWX73gH2R4qlQW+sRMYgvwdo9EoHNfCxfNnsdG1sXHi+H9q2bJqWuUy2TCTbPTtPpMCkxbpqqquv/nmm2yNtTl5/yay5E+KUc6Yez7zme0BwbpHWV1PaULg3larBQutrpDtMiK/hQ5VoxOchO7v8PjjyQx6B3dhaHiUJbpLxXmIagY0pZLLW8ty0G6UWHlZUMKs5VScu9ixQ4z3w7z+xnp5+u9uPH9mZvFOqsYd8ofvO0LpvZb1dzzVyWRy2w5deshete4VNrwA8WPCagTx7XevQVIblevXl4vFYov2iK7rcnDSdP7Jh38nemu5/IBRa+yQPNKXDPLuMqJFoWsqEtk0gqEcZMVBJrOH6ROpVA4hnThEQHGuwBehSCzKMiwRPQazUcPR574KwbO9ialX316zfKIa2BSYBAjeRBE5PT097rVr1+5cKP/KvRt/iTF2a70UGNs9eL8c6OoPBoRtoiB1k8gtPaR0urXJlntT7FVTyBHZQcM0mAqcyeUxPHII+eHd8NwW5haq0FPZDgfKd7FUnEfDKCKTG+YkQjjYdquCUCwFx5Nw460r7q3qrPHc898tbg1DwWDQvkOO5lduxPrTpsNf5H38rxnzoZ3doRaUtUB3NuivESk7ROczLRRFz46Iu+6tN41K4/ri1attCkjq8ejSQiubW7dubezMZrt37BDvW7/Z/JjiewpB5mySlCGBLkJ6J5IYPfg4I276cvtZT0jVQtx7kjvE3PQVvgiR4SoFp6JFUZydxotHv7pxbyzmvHT+yhsktL9ZymkI4lJ+R2DemS0/KBmTPgteh3/68UdiGzeu5yVr7V6NlZg9VuXQSdtIUWA0Kx3LRCLuCSofK0iXnpBIwyP7sXffo4xSmpul90lGemCYFfcIrHzxwmlmemYHR3mdNDV5iYHOPXclvOb1a97Km5O3rlauVy6+8kqddpwEC6RhSNd1d2Zm5gOp+PGOjJl/4lCm6/WFux24H+vyoVBPHY1EoW9PrK2sec03K28tNyo1cmJY25yKucejHSJ9Aj09PQH9Xr23Z23lvlCXz8FJqwz6IdAtTZJY/5IGKgpCWSExrDYyA8NczouzU0wIoz6UGn4PKr7/8rc3Xnv1rBPbFr7xyuTktU2kOmVMm27E7wrM9/3p/0We+s0/y5M5reN+6zOjDwTtlX7VXlNV3lJ2BpaIrDJoo0SiDAppcVIyJM9PgUl7sUQKYwePYNeeA6hUKjhx4hssp5gfHuNMatkyjr/4DIYH90LR46hffXtj5tVXHDsQWOsSexzrWmV19VqpfaX4xjIhkzaB1FsmBVvopPe9L/9Fy/r/3963B7dx33d+sYvFYwlwCQgECIKCSIIvkaJIgaJp6kFLsqJIVuLaTj1NnGTSpGlu2mvv2mk7nbnr3M1cp3/dNW36SHLNu05cO44d2bFsWX7IsmnJsiTqQZOiSFGkIJAggCWA5QKLXSywuPn+iOXBjGxJ1sOiZc1obIkkKP7w3e/3+/t+Pw/SB6FGe9Wm5tX5SKoT5iKOPCXTFmrRUqS6pk5lwJK4OH4xOh2eFnGOqQdmCTSRpyiqiKu51vWt1YVibr1JXljFomocuUUuItPJY4y2KF4HmdupgghufwcxKG3r2gKhWBT48ARY7A6wuZyEXx6JivDsf/w0xyuxWOriDHnisQ3TA7M0QC4/3DspW+pxTNxDMtUMS6fE9lVGuqmaRg04/IU7coqwLtFYKSHyBCyNvp+oRYqaTxjWG/sGYNfeL4LXF4ATJw7Dk0/+kGiOokLzll2fh7q6FnjqiX8tbtq0C+aEBXl65KwyOzW1EFflrKwo2Uw8LpUnFKw2t1M0tnw7ca0P9+LMraOD7lsfcOQKwo7c2UlbgZYNWCo4hgOnZ7VaNFuTly5fjl66cGGhPDB17CPOETVNQ/qCja2u3CDNRWoLUhIJkuidSsIT3wAN971aAVAsNtDWBn6uDgJd/ZAWYhDo3A7DY6eJto+Nc4KFswFjo+HdY0P5lx7/aSIpyyihQi5AiObWS1I0GsXALIe3XevPfrs+j2RNfPjtTaZae0rrNBuMHhQksy9axgJlxq3ZYoXBjCkkEiQrRlHrXpKJpSA6Ig/sfITs0ffvfwoOv/oSUaVDkp/N64NdAwPa4LsnpBqbK38xEkmFw2EEdsi4DMFf2HotB7uUMAX6DZ28U7f61/VkThKcPT09Zk9na8vs6JmNhZyEerrg4rzIQ82zNJWIR5Nz56bfnzH1Jw9vxvgD4Uou2B/0iQuxoBKNVlEFRLUv0vsJ9YyoxyFWE4dG1KJ6h6seerdsIWp+De1b4Nixo+SmiRsS1EES1az2ysHnhZFjx1AqmnBgsCShNQlm7NulY34Db5jeMhmb9uzhbMmLLW6AervRVIFSCejxSdBcgCp7CCHEPTgFPLkgMSBpBSKI0N7RAjv3PgadXf1wevQE/PzxH4MQmyGVSCrIRdVKKTbFKifFzNyClMuWMAU64IUAXTBIcYWL81/cli0LzNvWCl1vcKJBqqXR42y5rAnBQi5D1bFe8HvXF+azMX50/MzcXHg+rWdMk8lEaAylkqCXUwO6YwSDHT5JigdFPlJFy4hUooFFtTgMRlVZ1Fe3m4FGSxcaeywGfPXN4HIyEOh/EM6cGAS3vx00ioGL594txuZj0rFTJ2MpPs1jcGJg4vcvoxnoELc76VZeHsska9b11zHVDQO97Oz5hqpixozGCxQ23MTMlSF6UCqjQiENRL04QVQ/zARZhMrNuIjYtPNB0odjxtz37NPY2RQrLXQxoZlzsXgmVFSL5HKoo7D0TIkX1Ww2m9dXuIgrYFm2cOHCheUXx9vSDl1vcBoR0NHYWNcC5upg1jBP+eqCQBeU+LlTx2bOj4yQWzmOi3DQrZdyjuPUsh+QwhVnR5PbZy7kg/JCjsMbPqYFIv6K+yEFtdRlIvxKhsU0cmZsQGE5MwMEuvtAkzXwtjTDxcuXim+9cUBOJIUYH03HkaZbVs6VFdJnkjsgGbZ/6fPcwthkr4Mp1tpNKKCI5RuXDAwxZcDyrBL4oEIyKRJXUFQMtZHwY/0Du6F3y14IxyKw//mfw+joCOQMBhUM+QUlaRCkQiFVDnYplW8CCTQajRiYGrZeFotFK81/9YdZvwDdlsDEA7n+4Ny2zVx/79rWQJzaoK3uoBizBqeOvH72vaNvJlEnCGkM5fyaEry/fGCLO2LG46HrzEZrtwv10exo+lRCxGDjiVIzqC9oYYizrVjQwMmowNjRFAA9erzgbQuCpLJw8tQ7mZPDb8bFlJowGo0kMDFrlkZG+h74tuAPb6Ckk/ER2nZXBdwNzlS8qyJvqsJ/tEJJuGAEm2YGC9oM0hTQMsK1FunODOcjysUhfpJ4vG/f9VVoCfbB8eHDcGD/sxCJpHKikJmX5fw8ZssSAovQTfB9KmEKEKtaiEajy7dkeiDe8pv5lc7uuoMTSzK3erW1c/P2/ijwsDB6MRQbPi+JooiwN3zyEAeZw531soyJPyhehJiFhQWTt9LaWGk3tteylTab3UkMVhHviU8/mllhEJrJxQiD0g6qKEHBQkEahV05Btq6+2AqElaPv3MsHplLxI1gJI4P+gUIjerLvv8tsVy+wWD8rZJObLubnA22XGK9Q6E57DWxdjiIpI4FGFTQQ44+atUjK0pRwcYFIC3xEBJmyEN7396vQKAtCEcOH4QDrzxblJRCJjmvzkkLC0lcQOjKJB8AdikHunzs7c/1BifOeOjq6mrG3xa0pwwJY25qrpDNZon8CvYq2LOUxAWupIBLY0n3+3vaIHu+2Wll7NVWjsKyjSgP4qGD4gEqJk9l8ZJEM0RQP6HEQCE4BhlkMgJlIDIvp6ajC3OZTIZwrEs862zJblknZN0oWv0mxuAHvhQp6Xg2VdXGBtaidFaBuZIDC9iw90Zfz5JcuFZIE9ggmtKiIjOtodWiBFGUDm9og92/903CvETLwhOnjknnz12MzkVTCU1RcEOGVQV5UBikaiKBrPxF+n6ZAcFtK9tXO9jrDU4y58TsiZSCEt+FqGnpwYnlobSvLoedkZs+ZoauL322MbrvzU7aDPZa1kahYSoqBeNwBG/nFGsmu3NCA9YooG0ISnCAJkgg0gAxUQBB4oFr8EI0Ic+ODU1EEDFjMpn0rKnb3912KuvVDvsDPk5u6TjbjMViJo8531jLce0sa6pkbAxwuHFjOGKSim7AhQIaGmBIoZelhfgL4S0d5b/3PPIYfP6xr0FSSMDrhw6kD795JB66eCmVyeQypdUtbsiIMgnP88vHah97plx+PtcTnHrTXi4QQFDa5AMUVWQYRis10stBFAZ0/sVJ0drNXZ8Rz4w6TJSZcqFYAHGGQFbv4nwTNx80RS+aEVAU2O1IxbCDJIqgaBqEhQTIebmgWI3JWV6Mxi7NCig4pW8ylqmh3XEHfoUA1R9cpqqqajWlRtpcVks1Z7IZUT8CL4s2C0dIazjXRRdkVcGLEDqKIFOagxgfgUKBgUf/059D35YB5FSpL/1mX/zt46PxTCYjYS9e3u6U6Mx3+vTiui5E+gWqnPOiz+bwY+V85vJZGAnmvqYm6xq3uzuiKS2VuQKFu06UwbYwiMZGoCu1aMVixlGzRkCvZE9vdy4uNCkAQZBhSogA667MhiP87IUL4XldcKrManl5Of+ICe22fRkp6Z1btqxmZmfbKUZ0V1TYjC4SlNjSmMFCoyswKulJxGcJpAIoCC0yo7qzBjGBh/ZgF+x99E9QNxEGX34h+fILv4nOzAtXandQLe566cy37TCWN+LX843Lg/FKWXd5piJZoWNbh6V+dX29cjLUS9HAuFgLCURU7iWDZTJ0p4ngPgrv4xC+gEpqLEssUNKKBA7OAZORCIhaUhVpKj49HY1HowlkTGKPSQxDOY5Tpqenbxt19XoO7kNKOgnODVs61sJMvKuSNVmQtGdHQTMzQwALZBFBlpcacQ7R0PsTpUos7CKgmKZh12OPQXDjbnjvwnv5A88/O/fuW2/HcjnS7iytb0vnc8dnTP2srresX8v4SW+ol3qpNe3VTjNl7kucueRBmxabBqAyixLZDB4yHj2OSPBtICgGRHkAsKwdLKwDZBQHYF0wzqO6xTz/Xmg2OpsQiRqafgn6OHa/Nyk4Ccijrbumhskqmz0mewVWDKLujfpP+HQT+gUqFy8iQlBQooDW1XlGqfJ7TO5Kn2HgC18Bl8MDh94+mHrh+X1zs5OhJJ5NOaKoJGO4EsZq5Gg/SnBe63uytO50uzmvIS9ttS4UTAWWAVZZXFeaKQu5/FAa3tQRmEgUZQhlAOfNSD2gWRuoGjKsLXA+PqsMT01d5kUxpSjKkn7kFXCGeptxrf/Wj+vzlm7pNluhxmYqbrIbTCw6tDFm1G3UyKUQ9UclnP0q+Nyi5I5SXNXqVy9Op5IdG9fbO5u7rfcMfN6QyqSKL+7fN3PwN7+JZjIZRP1LZrOZzHzLBBFuOUj4Zh3mrQ5Osu60VtE+i4G6r04zk2YHkYloNYKEfoqyAY39UylDYJBSSA20qGAxc6SsCTiTR/GE2Yn5iVk+IhcKaD+iB6e8Ai9B+vtHRnP13d2s3ZjcVFkoeKuMLI1cHhrTJqkiix0ilnVsglAjKpXWCnUdTYnDR8cX+vrWVz348CNVPZs+S5+5cFZ54dlfhU+8NhhHZWK9qnwcktk3I0BvZXCSrNDa6rIwWkVdZYV1q9tsB5ahgKXRb9G8ODpa3FuSsk4WeKAsisKiFSBmTVLGVOB5ARbyC/yZmfBMQswSIf2S/7dcAnXcyWijK71XZJde29Njclksqw252KY6tGglDy16dWqk9ybCuIVFCDZeHVGdWcmZ1KmF/DRu5L72td9r3rzt83RDZxu8duDXyWeeeCJ8/r3JpD5aQ2yB0+lULly4sNLO55aV9UV4HYCxvr7e6jEY/JyZudfDOYBxITJRBbOKCmiYCzTQsJaXLkUFM/ae6BphITYsAl4C0hIkEyJkzbnY0FQknBBlAWebGJyCIODU77ZZ3t2MjFB6DfLwNvY0sh7Hmr2F+Wmr0aTSDgvCD3GcphJ7G9wCIc5A1DRI4v5cgKLDXSMPTs6FrFam+K1vfbl52+Yv0SFGgguH98cHX3r58pmJGdwGydjuoFxjmWT2ShitLR3xrcqcS2junq09jurKyvVKLLLGz/iBdmDVkoj+OZHVxKYfs6bZArSFAjOWMjRHxRs7ljfNDIKZBmkuWQzlFi5dCvPRfD6/gGUdtSNLQvrlA/ebGD+37KX0qQfiDExFtmjb1Lt1y/zMkMNdZKlFt4/FKQbK2uJFCI8FoXHZoqycvpydzea0XGurl/3mN/7K5+vqoqZHX9VefPbF82+8cTKG4G7MnNhrlhlb3ekr3N867FsZnDh0N+7YsanW5bLvkKfiBjd6K9rtpM9EsKxGS0AVUNucIjhOogLHlkoXctJZG5hlhkijnJOj+VBIGJVlIgdN1CcwM8Tj8eVzu1sWUTfxhZcqS6vLZero7eW+/qd/et/+H/ySvRx/x8DSCplvKqoKorSofW9jGVAtqPkuKmMRaVajTLkdO+7zPfaNP64w2isMY28e0g4ePHju6IkTUT1rYnDeTkLaTTyfW3pbJyUd0UdOZ0Wt21ax3cEw4PT6wVaggSU6mgSQCApZXuL6EhWKWbL5EGXU1wZAuxceBFAFnPAvLLw7FZ/I5g2YNUlJX6mNfmlKQtf21JoeeegRzwPbPru1zd1iPnPqjGH/Mz8EIRICC00T+xoVgcVYYjTkmqtgsHuKXZsfUseG31rYdu/uVU2fecAQnZyEX//i38+//fbbcUEQCMsU7acRgHM7CWkrITj1/TvT0NBQxZqotkws3Nzg9IPb7UT5MoJsp0mnWCC+4UhpXaRoUKSco1U0Xpp4BlHzCaDtdcXQyPjofDKdkjWN7NGx0b+dHOqbfPCk33zsjx6z7fncwMb+9h0NaLag8AwcPPQMDB4+AJQqQqDOD16fByRVgMmJEKSRhhFoAd/GXUBdPFNo6hqgXb56CIWG4Ymf/Hzk7bffncesieeDDr+oCx4Oh3XvoI8F9nYj53Yzy7r+WiRr7vn61ys9NjogTE22JKKCJeDygAMdxcwW4lKG8yGEbGJPJUoJcivFtSWOSiiKgqKhQotn0wWjy6wBsyo+NjQSlmWZWKsgeAEhcWVS0LeNOnAjh1362qWS/hd/8S37Y7/7hX7X6g4vOhubUYcvIUJ0egIikRDEoiHCOcdJWwS1oVQZPP4OgPp6UMcisOXBhyCfyxVffnnf/Msvvh4Oh+dwY7Y8OFcKAOaW9pz6odNferDPYa2qbUxllYZ0ZNbGaGao4zgy2yRmT5QKWnqRBCzKEghKkpCzcM6cpnJqkTamacouz0bnJbOTVdUCI6ZiMTK3K6HrbztN9SYEpf4S5LKICK3du7dW/tc/+Uqf3Rn02gC9OQswNjYEkckzMDU5CWkhQQhrLq8f/dyIZibNOIBXkmAumGHPF78BQ0ePac/8+qnwyZMn5lOpDOrWo9xOVi/ry0h9K2U5cdN7TlKqWnp6uGqL2mQ1MY0FlbJpqkBGI16LA8DGghmVSWnCHQQLxUBY4AlwQdPoolIwZFJZKZkzIOTGIqdSKblEUUUhBqIGh33UCqJeLI/ppQe4dXOr+bM962oe3LW3r2/L51l0+BgbHoLTx1+DsYkRSCfS4PO4obd/CwRauoFizCDIGkyMjsP4+CgEN90PbX1b4Ln/+H7x7PGJdHJuRlGYTPIyL8TmLicQqUX066/A018xAXqzyjo5dITFsXXuZjonrLOqaqUNWNAoCTjaTDCJNgdHwLGLAzxiqwaTyQjMx+YLSpHOCJphPrGQEZDjUlIZ1imqKOhK1ODwsMtIVysBSFyeMck5bW5ttTb3rKu5Z8v6lmDLel93EO2lx+DIoadgbHgYQhEe7CwLfRv7YeC+PeCvR5lDM/CiBIOHDkCEj8KuvV+DhJIEfuo4aOABIS3C6Mg7UjIeS9FWp5iWc/Ghoff4ZDKJLVC+JL1zpyqcXLEw3azgJFkTQch1nc3BoprssAgicBRyXgrAIYoB15a4V2dZsju3qAy5lV9MzWiJ+bQopAvz8/m8gBlSVxou8VyIc0U6nUbSVd7hcORHRkbKRV3vGOT2VUo/Ccxd69db6htdNc3tDW2bP/c5H9ppc4wMB156Go4MvgaRUATSKoDP44Bd9++FTZu2g82Bwrkssds+fHgfuPz10NmxE4ZOH4RgoB24Oj8IkgL7nvwx8SGyc25VK1r4c+GpqcOvHIlixVkBSie3pOdchMV1dNBMJsPa2uq6QZFaGCkNdpolEC+WNoNWIKgFYpKKdsq4B0Iv8XB2Pj8rSHMZQZsvlnSNsG9C8hXykCRJyiO63mq1In9aW8GBSXrNRz/X7/Z77es7WgO+vY/9EWWmWZgeOwoHn/8ZDI2OEfU8hAl6XE64f+duCG7cArSFBVGmYXJyHIaHjkJw+15ivDA2NgidgU1AmwESySgcfGkfTIcmwOH0gdXuKRRd/JkAABYXSURBVPDphdi5cxMX3ntvnMcSX5puLBcvu4nt9M19qZuROZeQ3H5PfjVTtHdoBrMbZ5l2XABR6FRJEfQRq9FE4NRic4IgJYggQFyWpFRGnc1mi4QdqCPaMTh17cyyoCwHNK+UjInv2NIN/ctf7gu4V3Fb2hvaoG/Lg+DkOHjix/8Aockh4gzicHmhjkNxLgt0bByAYGcf0dEMxRIwPHICsYbQ1bcbFCUE42NngDXbIC1IEOFDMDkxCiCL4A90A+cNQDabVmcjlyMHDp08Fw6HM1fgVt3R46WbFZxY0plAa8W9bLGiiSlaDCh3xCK6fXEBBwVFBlRK02gafL4AxHgewgoP0xF+juclspLEW6Z+Iy9denRgbDlneiUF5ftu6HhGWzd4G6trXZsD9QGi8tbS1gZP//ifyAXRwbEQCHQDH4lAWpEJm7KtuQM4lxdCoQhMh0IQaOuH9u5eeO3VZ2DszDEQEgLwSYGAj9GryWahINgVJKYE+VyxmErGE4PnQxNHjhyJl2bDSsns6paLv95oHr0Zwbm0DVq/s70bMsVmI58xsejii4xBBsCiUSDLGgh0lCDA0F5IE9RiVbBdDc9EQxOnJnij0YgSMhLLskQ+prTZKCfJ3ejP+nF9/dIeHdmV2zd3B9ycsZ/VoiChA4bFDvz4FCQ1FSjZAp0dPuCjaeCcNkiKaUhI8qJ5Is1CV+cABAd2gpOzwfP7ngA76wQby4Ld5YIjx45BZHocJEECj9sFzW1tRK4nmxDFI+dGLh58651Zi8VCRnEej0e5XTKGN3LoNxqcS7d0hBs+ONDZUDByLZcuzzrSiRnwsg6iVEGxGmgKBQVGIpckieYgvDCTiyTTs4mEkJAkCWeYWHbQCLRcoBSz5B1deq7h8PXgJOvcDS1VgVp3xb1eNwscCsCqCkQmI8RKm2hDMRzxsPT5OFAkBQpgA8bOAZ9IQ0tLEO7f/RBIyTAosgD1DW0EGY9AZEYVQNUsEOYFGB0eAlHgwc5xkFhQ06++Pjh9PhRClipxAS6js9zRwOMbDc6lVeWXH3qgaeOW+9pESXIcfmk/TI4OA+dyArqaM3IaNNoMEmUBN4JoKRbOC7OZmbh4OZ3OpzAwkXKBg2NE1KyUsnMNgan3m3jOxDG5rs4QqK6y9wVcDVDX0gwCH4NoYgTSSQUGuvxgcfogxKsQGpuAep8Ptmzfg6g5iMSiEOzbAi6OA54fA7etBVSOg4ljr0IirYImhmDjpj1Amx1wevgoTE+MgSwIEE6E04fPXryUSKi6IwauNpXSWvMTG5xLt/Rt23rsv/OFR/uaGgO1ybkFav++fTA4eAAkQSR5z+NC3rUdGAdHTFEXnceNYiSZuZRKKeigRugEy7LmSlpJflicLmVODM6+voaAr6ayz+9xw8DAXvDU1UE0HIZDB/YDyBGwWCwQEUQIh3lo8NZBoKGZbIc4dx0xbCDOyaIATn8LmFkKjh49A3xoElRZgM5gP0QFASYmxyASiUA4EoMUP5+eTc5fmplZuKuCcylrfv9n/2tDa1NvoIa1WRG1HuUFmJkJQyIqAPJhXH4n4QhFeBpeffMlOPLma7FMWlyYT8sJVVVFDE69Wfd6verJkyfvNPOAa0ySHzhLXsqc69ucjQ2+Vfe2BXxA21y4piBeSsOTIQiPTIJqp8EC6CPPAOfgSLCyNjds7NsODYG2xYc+GQGvyw0OhxPeHBqG0OQkSEkZ+vo3gcPvAz7GA88v/o6HI2lF06ZOjU3O6WV9pQBmPmpZXxLUR2ma//LNXdvWtnR6O3oGDB5vPfKxCLVXQ69oVQNJotCaF2iWg+f2vSj+4Kffi0Tn59MAuYws/1avWU5dvZGguFO+9n3AYr+/pr6mprK3rtposhQ0EIQEhJIqOMw0MHYXmI2KlhcLaHMIBtZirKxwUM2BTti0fTeYWQv88J/+HiQpQRYayZhApMnRwICX0kR8oa1pbT6dlwoJUSjSJqaQyWQSwycnQslMBnlXpDrZbDa1RKH+xJR1PZD1SxAtiqLR57N5W322YI3TWdXeHYRgsA8a/C1gQx9GRCAWNBAFEWKhGfD5/fDMK8cS//jdb89GozNphmEIQ3CljTg+QtSTATxa4tiqqx3V1bbVNRXZ6gq20hOPJFKXYrzqtpoMVrcbUKcvFV3IFcFoCLQ2c6t9a+zNze10V7AX4qk57fv/8H+UaHROBhMNJqVggwor43dzABX2Ij+XXCjkYUHOZpWsKhWMdrtakPOZS5dmCVoJz3klUaivNXPqQ2TU9EEPRgrpBX5/dZW/ub5DSU7XFNIig6L5HMtBV3sz9Pb2gdsXJMN3KS3A2PgkdLV1wC9ef4v/7nf/OTw3N4fWL4hmR7rFSiWpXWucLiGRBIoy15jNLGfNV1lXcc5URFQWsgtFYxEMRaPRkM9DUZazGk1bqfu3bnN3dja7mzvaTDWrfMVzw0PZb3/vX2Pz86mcwcBoLhtjytIUVVtZAUZbVXF+PpWNx2NZWS6gAzJRK9bls3Xlv1LWXD4/vtaf47Z+3tWCUy9JpL/s2LbNdO/OzavqiwZjbWC9u6bCyNEs680m40wyEoKpyRHgI9Pg5CgIdnZCZ+dO4hgmFwBGx4bgnv7dxZ889Wv+hz/8bmhubg4ZlJg1URobdTTL6Ra39RBuwzdbQiPV1tYas9ksgx6W+TxuZhkG/dSLRbT1KpLzLhaLlKfOY9264Z66zmDQ09rRQovJdHb/r3419+uDB1MGg0HL5/MFg8GQx/9HETWUA8L/4p/R40lRlALKUeJvXRi2ZKFYrut+Ry80Piw49QNFdTh6+/Zee0t30O+s76xpW2WnbZWuVU6LmUFVjoIsg5CMQZIPQTg0ApHwGCAPJlDfDP6WTUA7/DA1ehqa+3cXn/rRz+I/efLfp3meJ8GJJLVkMomBqTMo7+gDu4FA1gXQsLzTsiwbWZY16kp9GJhWq9VQ8len+3dsrWtc41/TvnaDzedvgKlzpxJ/8zf/8yIGHhra6lqo+OeywCwqioLBqqEcJaoUIzahzAX5jpU7vNK5Xik49WxJlOFWNa8yd7mqq3o3bFrjbVnfXOdvM3q9OBqiyZiIQs1MWgINzeQpgNhMCMaHDwEfGSZ+6F5/O3DePpi9HC5y3mr1iZ/8cubA4cMRKZ8XRVEkJLUVyju/3jgtr0K47l3yUdezZmVlpQGDVVVV41f+4Pe7a2t9q2sb1xoqzKw6evyN6He+8y8hzIQYnLqOO0VRGIgke+JvURSL+t/h32Ni/gBr7js+CSwPzvcd4NavP1pZw0DNWoe9bts9969u2bgdWES/oRgC4fwsir4CnQCaaB6h6pkEkckhODN0CKI48vB6gWH8kBQFLTY3E/vBLw/PSKqa1kURcPBexqte6dugqwXsUu/e09NjkGXZgP17Pp/HjGkoFAqGXC5ntFqtzDe+8Y2NrWvX+6vq64tzc7PJF370+OW33z2cQs19DEyEEyKUEDMjBiVKUOI3p2m6aDKZNKPRWDSbzcWRkRF9y1bOWb/jA1PfXpSDE8jh9ff3M8FgkJUqrU2qFG/tWOW0PLr398Dp9wNoqAQHwOCUCIlqyBBEYyu0I9FwC1yAhBCDY8cOw9jwILCsBWYiErBWKv/dp4+fw3EGAKRLFsn6tkIXMl0Rh3a1CLzKx/UEUH7+5O+ampooQRCYpr4mbnPHQLDrnq1eh9uTPzt0ZO7H//zP0wsLC8Sesdy/swS8Xi6WcCX01oo72/LxEAnMr/7lV829/nWOCq6mOTw97k9dDpk7A/XQv6kXvG2dRGEXHX1VkICYixTMQGnoVimCjJpTwEA6mYTTQ4MwOnwYEoIEwNqhp3Wz+gf//e9GEOBRcqHVRRGQh7nipFJuMEA/KDHQra2t5oGHN/fVWNr83X19RtYOytHX3gh/71/+5ZLRaCRueAjeKNGiP0hMojwQV1xQlmdL/aAImv1/P/ePbR0VnrW0mOdiER4EQQQzSODhADZufwxYp5OIupLAlIlYNlCaCBqKmqIYMQ0wE5qE4dOHYWp6DELhJLhcDljXPaD+4V/93Xsmkykty/ISyKOs3ySNwl36S58dGzu2bnWvq60NtnRvql61up5KXhqP7f/pv106NDQkoIUO9uglJQ8cpOu03xUbgFfb++LHl1aRj//d/9isMOZ6Y00NCj1DbPgohGfGweP2QnNbL7QEOoFx2UCS7MCyAlAaA2lctyE+piDDTGgITg8dgpmZELmAhxM0+F0BsNa7c//tr/9+GMt5qaRnSiOkciXiuzQ2Fz2IkOby6P2/01h3T/e6xtY2zmEwF8+++86lv/32307prstIiVZV9ZM+eiNxoJd14oHzzS9+JuDxNHT6qr1V6HEjSgJxo03wMwCqCN46P9y3+wtAaSxIogCKJhL9HnRcE/gohEKTMDU5AYoiAGNmgE9KgFW9pXlN/sRYMvr8iy+jzx0JzpIIF971P+kjpKs9cEsAGjQs+Oaf/+WO+uZWt7emkYrOXI4e2Pd4aPDQIcyaSPIjWbM0r/zEn9vS7Rz9gb62c6Al2N3ZbnevrkSoG6oQ4wkMHX0NktEw9G3qgM6Br8CxwaMwOT0EmFk7ggNAURYITY5BMhmGcHQGVCkBHqcHGLYZkM+WySXVX7xwcnZ8/OJsWXDKyWRS7zfv6B3v1aLrBj++tD36/b/+z5sY2eavD3SZKjiLfPLk4KVf/t9/nUMlPew1y7KmfoH8RLdCS6AEpBA8vKu75YE9n1nLmp2VZoYDKEgQi0xCQS0ATVtgavI4dLQ1gAou4ubrtLnB19JB5LJlSSR0jOnJMQiNjS4K7GNnKidgwWBXT58+Hx4cfGcGR0iFQiFTEuFaaeYCNxiHV/zyJXXjL/7Zn+31V9VUrV7bbdCUTOatV16YevInP4iW39DLEEUrTjXueg+PlJSenh46bbFYtnau7ml3V65Z27jWzDrdZDxEqxKR2ULKxYmhQWCUMHT2bQefrxNYex0wLAOoDI2iUzjn5PkkDJ05AtNTo1BQZUhls0XV4s2efOvI5Mj4OJLY8JYuLes3V5Ru5PUe8lU+n8ZlB46QHvzDr33uno6BSl+gGS5fODe7/8nHLx8/fmQBZ5r6RajkSndXTDf0fsdYXc2w96wLDtAVFk9NhdFQ5/FAAEdHBQpCk2eAYSQIx0Si3tHR2Qbu5m5gUcUDJbFBAYUUGDOIaQGGjg/CmeFjIMlp5dKskErKjHhheDieWRy+I2wLFeJQZEofhXzSh+8fFJ+kpGPVeuiBB9awgZrejT27rU7WBkcPvzz+kx98bzabzZKSXjY+WolCuR/peV4KTovFYt0zsLbf6vbWUum0scHtgbbOThCSPITGhsHrtQGYOTDTXmiodwJX10y2Q4RficrZKgVpVQKej8H45CSMTl7InT8/On/q+Hk+Or+Q1o2adLXdksvbXZEBPuSdIeTAvr4+y2cGBu71dXXVrW7qMWYTscwr+5+98NyvnkTGZA6lZVaq6cBHisrSFy0FZwxipoc2Bdd4mxvbmQWlymFiDW4Pu+iBbndBndsFZpaD0LQEbe1+YJz1EBp+E1jWBZqZASGdgHBiBpJpGeJiQRmfnkqcPHRs/tKlGbS5Rrda4n9edsgrxg/nRg74Q76WnD1eRFevXm3fvHP7jo19eyqrqlYZTp999/Lz+54Inz1yRDQajeUXIT1rfqIvQuVDeNJzRqNRoyiKlp1/vKeFW5DXWBTJ7maB7mprgWBfH9jR1aJgg5FjY9DZGwSJYWHo1Z+D1xsEVZMhFJ2GmbQAqQKduxSe508NHosLvJDFwCzJ8hEx0xUswnWzY5RchNavX29a199fu7Zr3Zau3p0MJWWU1w/+emLfs8/Gk3NzKF5GsmaJlHZXtUFLt3WU5Eun04zRaLS0BdvW1NqpBh8HXFNDDVXvbwCn0w8q2GDk+AloaAuAyEsQESLgDwRA4MMwH0vlkwaHeiEqpI6fOMFHJyawlBM2pX7ACFQo8dH1m+bd3GuS4OzZudP6uw882Fe7JuB3BBqpibNnw7956t9D506cQGlxBHfowfmJ3wgtf/rfh0JCIKzRaDQXi0Vrb6vNv8ZbWV/lcleYK6qpSitn8NpUGEPNSJqDtJrTVvnaijhumpkcL06EZlNT0WwicjklJpMxlC5USv7eRIrvCoF5N9/QyUUIaRufu/9+V9+2HZ+talhvQHXt5579+emXn346kclkcjhCwqyJ1Ioy+ey75tz0DRFZX+rZE1HaiqKY+/r83mqvbY2rwsyuYV0MU1UJih2gMJcCkc9I6CdSoRmKCteQf3foXPz8yIioYw1LGZPoaS5TOCtHzNzsUrlSXo9kzUcffdTe0dqxyXdPe63H1QmmuYvqE794/PTLg4dSuBEqCeWuSPe1m/FGlKOS9P26EVHaFouFkWXZzPk9FWt8nsoquWgtaBlqQUNTQBnOX5iTRFlGLCEis5EyQBDaKPaKe2CkBqDhfBk1YMV4Lt6Mg73aRQhv6Q8//DC3Y8dn7q3t7aux0RY49tJz5597+pno5OXJrJ41cR5cJs3zSeHyX9MRl4ONl2gZCEDAAM3lcgwGKf4y5vNMQdNouVikTcWiIVfiq+iclVwuh7QADMi8yWTKZzKZfEVFRX56eloPyrvqYK8yPqL27Oljt/Rt9bfeu7OfXrXOYJFC8G//+J1jR468IWLW1Pt0nAd7PJ58ict/V/XoV0LC6yWezmazNCKz8/m8sVgs0haLBYlYxL+JoEZKxCpZljFzEmJVKTgLJRBs+cXnEwnruqYU8P8/SU8A9MNffbiqJbixZ2v/7tWSxQ7ihbHUT3/0nfcmTo3gBg3bIQX1SVeyj9B1ns1vffry4CQxV6YnSdXV1SGnBfkuNJKvyliCJDjLOSzIV1kWlJ/2l+8/cp3kZvzWt77l7u4M3t/QvYNRF6ZzT/7iidNvvTsoZhIJ0qdj5iyN3crRR3fVA36l4CwP0KVSX19fj+QrwnUpP2/kriBfpSTwupyvclcd5lUyxdJZPvLIVlegc8OGjq2P1mkGq8ZHhuZ+9u3vj81OTZF+XVEUlBpXeJ7XgTF3JWrrg4JTD9DlgXqlz/8gteFPA/P90UqC09Xayt6/ubtxffc9Gzz3bKcunBuZPfXGi5fPHnxDxL4dqRifLitKbeM19AVX6kv1L1segJ8G5AcfKJltNm3d6mjvXLtu/freerbWHn/ll89MnH3p9XSpRSqYTCYSnCX00SdNN+oawu39Dfp1fcGnn/yRT4AE54Y9Wx0NTesCjY2N7ExsYva1H+1L4iti7y5JEmbOfGn8tmKMBT7yiVxDH3SrXvvT1/3tsk5v3rzZWr/Ww9mNdPGFF45mSxI0kMlkMDAxcxbKPIPu6vHbh/WcnwbXzT0BkjkxSZZPQPRvgXY2OO2wWCzahQsXyhcWd22r9Glw3twA/LBX02/rOlSOyuVyZGaME49SUOqZciU5092yE/w0OG/Z0V5xpqzPkPX/Lv+k8uC8ff+yO/Q7fRqct/eNKQ/K5Wevl++7akV5tVJze9+eT78bnsAHzYs/PZ2yE/h/z+vbhYyCnjcAAAAASUVORK5CYII=');
/* class PianoKey {
  constructor (args) {
    const def = { isPlaying: false }
    Object.assign(def, args)
    Object.assign(this, def)
  }
  draw (c) {
    const { left, right, top, bottom, width, height, type, note, isPlaying } = this
    c.beginPath()
    if (type === 'white') {
      const centerX = left + width / 2
      if (isPlaying) {
        c.fillStyle = gradient(c.createRadialGradient(centerX, top + height * 0.9, 2, centerX, top + height * 0.9, 100), [
          { '#eee': 0 },
          { '#fff': 1 }
        ])
      } else {
        c.fillStyle = 'white'
      }
      c.fillRect(left, top, width, height)
      c.strokeStyle = 'black'
      c.strokeRect(left, top, width, height)
      c.fillStyle = 'black'
      c.fillText(note, centerX, top + height * 0.66)
    }
    if (type === 'black') {
      const topGd = c.createLinearGradient(left, top, left, bottom)
      const btmGd = c.createLinearGradient(left, top, right, bottom)
      if (isPlaying) {
        this.keydownBlackKey(c, topGd, btmGd)
      } else {
        this.keyupBlackKey(c, topGd, btmGd)
      }
    }
  }
  keydownBlackKey (c, topGd, btmGd) {
    const { left, top, width, height } = this
    c.fillStyle = gradient(topGd, [
      { '#666': 0 },
      { '#222': 0.1 },
      { '#666': 0.88 },
      { '#aaa': 0.95 },
      { '#555': 0.96 },
      { '#000': 1 } ])
    c.fillRect(left, top, width, height)

    c.fillStyle = gradient(btmGd, [
      { '#333': 0 },
      { '#222': 0.7 },
      { '#111': 1 }])
    c.fillRect(left + 1.5 * 1.5, top + 2 * 1.5, width - 3 * 1.5, height - 6 * 1.5)
  }
  keyupBlackKey (c, topGd, btmGd) {
    const { left, top, width, height } = this
    c.fillStyle = gradient(topGd, [
      { '#666': 0 },
      { '#222': 0.1 },
      { '#666': 0.85 },
      { '#ccc': 0.89 },
      { '#555': 0.9 },
      { '#111': 0.94 },
      { '#000': 1 } ])
    c.fillRect(left, top, width, height)

    c.fillStyle = gradient(btmGd, [
      { '#333': 0 },
      { '#222': 0.8 },
      { '#111': 1 }])
    c.fillRect(left + 2 * 1.5, top + 2 * 1.5, width - 4 * 1.5, height - 10 * 1.5)
  }
  get right () {
    return this.left + this.width
  }
  get bottom () {
    return this.top + this.height
  }

  play () {
    const context = new AudioContext()
    const osc = context.createOscillator()
    const gain = context.createGain()
    osc.frequency.value = this.Hz
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 2)
    osc.connect(gain)
    gain.connect(context.destination)
    osc.start(0)
    return this
  }
  update () {
    this.isPlaying = !this.isPlaying
    return this
  }
} */
"use strict";
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Particle = /*#__PURE__*/function () {
  function Particle(args) {
    _classCallCheck(this, Particle);

    var def = {
      alpha0: 0,
      size: 3,
      duration: 1000 + Math.random() * 1000 | 0
    };
    Object.assign(def, args);
    Object.assign(this, def);
    this.tX = new Transition({
      from: this.p0.x,
      to: this.p1.x,
      duration: this.duration
    });
    this.tY = new Transition({
      from: this.p0.y,
      to: this.p1.y,
      duration: this.duration
    });
  }

  _createClass(Particle, [{
    key: "draw",
    value: function draw(c) {
      c.fillStyle = "rgba(".concat(this.color.join(','), ",").concat(this.alpha, ")");
      c.beginPath();
      c.rect(this.x, this.y, this.size, this.size);
      c.fill();
      return this;
    }
  }, {
    key: "update",
    value: function update(delta) {
      this.alpha0 += 0.001;

      if (this.alpha0 > this.alpha) {
        this.alpha0 = this.alpha;
      }

      if (this.size - 0.2 > 1) {
        this.size -= 0.2;
      }

      var past = this.duration - this.tX.timer < 100 ? this.duration : this.tX.timer;
      this.y = this.tY.change(delta); // - innerHeight / 1.3 * Math.sin(past / this.duration * Math.PI)

      this.x = this.tX.change(delta);
      return this;
    }
  }]);

  return Particle;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Transition = /*#__PURE__*/function () {
  function Transition(args) {
    _classCallCheck(this, Transition);

    var def = {
      duration: 300,
      delay: 0
    };
    Object.assign(def, args);
    Object.assign(this, def);
    this.timer = 0;
  }

  _createClass(Transition, [{
    key: "easing",
    value: function easing(x) {
      // return 1 - Math.cos((x * Math.PI) / 2)
      return x ? Math.pow(2, 10 * x - 10) : 0;
    }
  }, {
    key: "mapping",
    value: function mapping(value, start1, end1, start2, end2) {
      var overRange = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
      var init = end1 - start1;
      var final = end2 - start2;
      var rate = final / init;
      var result = (value - start1) * rate + start2;

      if (!overRange) {
        var closeStart = Math.abs(value - start1);
        var closeEnd = Math.abs(value - end2);

        if (!isBetween(value, [start1, end1])) {
          return closeStart > closeEnd ? end2 : start2;
        }
      }

      return result;
    }
  }, {
    key: "change",
    value: function change(delta) {
      var delay = this.delay,
          duration = this.duration,
          timer = this.timer,
          from = this.from,
          to = this.to;
      var value = to;

      if (timer <= duration) {
        var percentage = (timer - delay) / duration;
        value = this.mapping(this.easing(percentage), 0, 1, from, to, true);

        if (delay === 0) {
          this.timer += delta;
        } else if (delay > 0) {
          this.delay = delay < 0 ? 0 : delay - delta;
        } else if (delay < 0) {
          this.timer -= delay;
          this.delay = 0;
        }
      }

      return value;
    }
  }]);

  return Transition;
}();
//# sourceMappingURL=script.js.map
