;(function (window) {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

  const PARTICLE_NUM = 2000
  const RADIUS = Math.PI * 2
  const CANVASWIDTH = 500
  const CANVASHEIGHT = 150
  const CANVASID = 'canvas'

  const texts = ['小登对云辛说', '抬头看看', '今晚的星空', '你是不是也在', '望着同一颗星', '七夕快乐', '小登想你了']

  let canvas
  let ctx
  let textIndex = 0
  let textPixels
  const particles = []

  function sampleText (text) {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    ctx.fillStyle = '#fff'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    ctx.font = 'bold 64px "Microsoft YaHei", "Noto Sans CJK SC", sans-serif'
    ctx.fillText(text, CANVASWIDTH / 2, CANVASHEIGHT / 2, CANVASWIDTH - 24)

    const data = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT).data
    const pixels = []
    for (let x = CANVASWIDTH - 1; x >= 0; x -= 3) {
      for (let y = 0; y < CANVASHEIGHT; y += 3) {
        const alpha = (x + y * CANVASWIDTH) * 4 + 3
        if (data[alpha] > 100) pixels.push([x, y])
      }
    }

    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    return pixels
  }

  function draw () {
    ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
    const start = Math.max(0, Math.floor((particles.length - textPixels.length) / 2))

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i]
      const target = textPixels[i - start]
      if (target) {
        const [x, y] = target
        particle.x = particle.px + (x - particle.px + (Math.random() - 0.5) * 3) * particle.delta
        particle.y = particle.py + (y - particle.py + (Math.random() - 0.5) * 3) * particle.delta
        particle.fadeIn()
      } else {
        particle.x = particle.px + (particle.mx - particle.px) * particle.delta / 2
        particle.y = particle.py + (particle.my - particle.py) * particle.delta / 2
        particle.fadeOut()
      }

      particle.px = particle.x
      particle.py = particle.y
      if (particle.opacity > 0) particle.draw(ctx)
    }

    window.requestAnimationFrame(draw)
  }

  function setDimensions () {
    canvas.width = CANVASWIDTH
    canvas.height = CANVASHEIGHT
  }

  function listenForNextMessage () {
    const message = document.getElementById('message')
    const nextButton = document.getElementById('next-message')
    const music = document.querySelector('audio')

    document.addEventListener('click', function (event) {
      if (music.contains(event.target) || textIndex === texts.length - 1) return

      textIndex += 1
      const text = texts[textIndex]
      textPixels = sampleText(text)
      message.textContent = text
      nextButton.hidden = textIndex === texts.length - 1
    })
  }

  function init () {
    canvas = document.getElementById(CANVASID)
    if (canvas === null || !canvas.getContext) {
      return
    }
    ctx = canvas.getContext('2d')
    setDimensions()
    textPixels = sampleText(texts[0])
    listenForNextMessage()

    for (var i = 0; i < PARTICLE_NUM; i++) {
      particles[i] = new Particle(canvas)
    }

    draw()
  }

  class Particle {
    constructor (canvas) {
      let spread = canvas.height
      let size = 0.8 + Math.random() * 0.9
      // 速度
      this.delta = 0.06
      // 现在的位置
      this.x = 0
      this.y = 0
      // 上次的位置
      this.px = Math.random() * canvas.width
      this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
      // 记录点最初的位置
      this.mx = this.px
      this.my = this.py
      // 点的大小
      this.size = size
      this.opacity = 0
    }
    fadeIn () {
      this.opacity = Math.min(1, this.opacity + 0.015)
    }
    fadeOut () {
      this.opacity = Math.max(0, this.opacity - 0.03)
    }
    draw (ctx) {
      ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')'
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
      ctx.closePath()
      ctx.fill()
    }
  }

  init()
})(window)
