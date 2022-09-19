class Transition {
  constructor (args) {
    let def = {
      duration: 300,
      delay: 0
    }
    Object.assign(def, args)
    Object.assign(this, def)
    this.timer = 0
  }
  easing (x) {
    // return 1 - Math.cos((x * Math.PI) / 2)

    return x ? Math.pow(2, 10 * x - 10) : 0
  }

  mapping (value, start1, end1, start2, end2, overRange = false) {
    const init = end1 - start1
    const final = end2 - start2
    const rate = final / init
    const result = (value - start1) * rate + start2

    if (!overRange) {
      const closeStart = Math.abs(value - start1)
      const closeEnd = Math.abs(value - end2)
      if (!isBetween(value, [start1, end1])) {
        return closeStart > closeEnd ? end2 : start2
      }
    }
    return result
  }
  change (delta) {
    const { delay, duration, timer, from, to } = this

    let value = to
    if (timer <= duration) {
      const percentage = (timer - delay) / duration
      value = this.mapping(this.easing(percentage), 0, 1, from, to, true)
      if (delay === 0) {
        this.timer += delta
      } else if (delay > 0) {
        this.delay = delay < 0 ? 0 : delay - delta
      } else if (delay < 0) {
        this.timer -= delay
        this.delay = 0
      }
    }
    return value
  }
}
