class Particle {
  constructor (args) {
    const def = { alpha0: 0, size: 3, duration: 1000 + Math.random() * 1000 | 0 }
    Object.assign(def, args)
    Object.assign(this, def)
    this.tX = new Transition({
      from: this.p0.x,
      to: this.p1.x,
      duration: this.duration
    })
    this.tY = new Transition({
      from: this.p0.y,
      to: this.p1.y,
      duration: this.duration
    })
  }
  draw (c) {
    c.fillStyle = `rgba(${this.color.join(',')},${this.alpha})`
    c.beginPath()

    c.rect(this.x, this.y, this.size, this.size)

    c.fill()
    return this
  }
  update (delta) {
    this.alpha0 += 0.001
    if (this.alpha0 > this.alpha) {
      this.alpha0 = this.alpha
    }
    if (this.size - 0.2 > 1) {
      this.size -= 0.2
    }
    let past = this.duration - this.tX.timer < 100 ? this.duration : this.tX.timer
    this.y = this.tY.change(delta) // - innerHeight / 1.3 * Math.sin(past / this.duration * Math.PI)
    this.x = this.tX.change(delta)
    return this
  }
}
