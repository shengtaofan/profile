class PianoKey {
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
}
