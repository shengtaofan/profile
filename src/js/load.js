function between (a, b = 0) {
  return Math.floor(Math.random() * (Math.max(a, b) - Math.min(a, b) + 1)) + Math.min(a, b)
}
(function () {
  function tabTrigger (hash) {
    const tab = document.getElementById(`${hash.split('#')[1]}-list`)
    new bootstrap.Tab(tab).show()
  }
  function anchor () {
    if (innerWidth < 992) {
      document.querySelector('.parallax').scrollTop = document.getElementById('list-tabContent').offsetTop
    }
  }
  const { hash } = location
  if (hash) {
    tabTrigger(hash)
    anchor()
  }
  if (navigator.userAgent.match(/Trident|MSIE/)) {
    location = 'microsoft-edge:https://shengtaofan.github.io/profile/'
    setTimeout(() => {
      location = 'https://www.microsoft.com/zh-tw/edge'
    // location = 'https://support.microsoft.com/zh-tw/topic/此網站在-microsoft-edge-中的運作效能更好-160fa918-d581-4932-9e4e-1075c4713595'
    }, 50)
  }
  document.querySelectorAll('[data-bs-toggle="list"]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault()
      anchor()
      if (location.href === this.href) return

      location = this.href
    })
  })

  // document.getElementById('modal-carousel').addEventListener('shown.bs.modal', function (event) {
  //   gtag('event', 'modal-carousel-shown', {
  //     'event_category': 'interactive',
  //     'event_label': 'The Samurai Game'
  //   })
  //   this.addEventListener('contextmenu', function (e) { e.preventDefault() })
  // }, { once: true })
  function isBetween (n, a, b) {
    const min = Math.min(a, b)
    const max = Math.max(a, b)
    return min < n && n < max
  }
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < 100; i++) {
    const div = document.createElement('div')
    const { style } = div
    const { offsetLeft: conL, offsetWidth: conW, offsetTop: conT, offsetHeight: conH } = document.querySelector('.container')

    const conR = conL + conW
    const conB = conT + conH
    let bubbleLeft = between(innerWidth)
    let beteenTop = between(5, 95)
    if (innerWidth < 992 || i < 50) {
      while (isBetween(bubbleLeft, conL, conR)) {
        bubbleLeft = between(innerWidth)
      }
    } else if (isBetween(bubbleLeft, conL, conR)) {
      beteenTop = between(conB * 100 / innerHeight | 0, 150)
    }
    div.classList.add('bubble')
    Object.assign(style, {
      left: bubbleLeft + 'px',
      top: innerWidth < 992 ? between(1500) + 'px' : beteenTop + 'vh',
      transform: `translateZ(${innerWidth >= 992 ? between(200, -500) : between(250, -250)}px) translateY(var(--trY))`
    })

    fragment.appendChild(div)
  }
  document.querySelector('.parallax').prepend(fragment)
  window.addEventListener('resize', function (e) {
    if (innerWidth >= 992) {
      document.querySelector('.parallax').scrollTop = 0
    }
  })
})()
