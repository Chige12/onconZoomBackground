<template lang="pug">
#stage-parent(:style="`height: ${fullscreen ? '100vh' :'auto'}`" ref="stageParent")
  #konva-container(ref="container")
</template>
<script>
import Konva from 'konva'

export default {
  props: {
    award: {
      type: Object,
      default: () => {},
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    onconName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      stageWidth: 3122,
      stageHeight: 2160,
    }
  },
  async mounted() {
    this.listen(window, 'resize', this.fitStageIntoParentContainer)
    await this.$nextTick(() => {})
    await this.$delay(500)
    this.firstView()
  },
  methods: {
    update() {
      this.firstView()
    },
    firstView() {
      const container = this.$refs.container
      this.stage = new Konva.Stage({
        container,
        width: this.stageWidth,
        height: this.stageHeight,
      })
      this.Layer = new Konva.Layer()
      this.stage.add(this.Layer)
      const imageObj = new Image()
      imageObj.src = require(`~/assets/award/${this.award.image}.png`)
      imageObj.onload = () => {
        this.backgroundImage = new Konva.Image({
          image: imageObj,
          x: 0,
          y: 0,
          width: this.stageWidth,
          height: this.stageHeight,
        })
        this.Layer.add(this.backgroundImage)
        this.textLayerDraw()
        this.stage.draw()
        this.fitStageIntoParentContainer()
      }
    },
    textLayerDraw() {
      if (this.award.teamNumber) {
        this.teamtext(this.award.teamNumber, 1440, 'Open Sans', 55, 'italic')
      }
      if (this.award.teamName) {
        this.teamtext(this.award.teamName, 1540, 'Noto Sans JP', 100, 'normal')
      }
      if (this.award.teamMenber) {
        this.teamtext(this.award.teamMenber, 1730, 'Noto Sans JP', 60, 'normal')
      }
      if (!this.award.logoHide) {
        if (this.award.logoTitle) {
          this.logotext(this.onconName, this.award.color, 740)
        } else {
          this.logotext(this.onconName, this.award.color, 2030)
        }
      }
    },
    teamtext(text, y, font, size, style) {
      this.simpleText = new Konva.Text({
        x: this.stage.width() / 2,
        y,
        text,
        fontSize: size,
        fontFamily: font,
        fill: '#0e0f0d',
        fontStyle: style,
      })
      this.simpleText.offsetX(this.simpleText.width() / 2)
      this.Layer.add(this.simpleText)
    },
    logotext(text, color, y) {
      this.logoText = new Konva.Text({
        x: this.stage.width() / 2,
        y,
        text,
        fontSize: 80,
        fontFamily: 'Open Sans',
        fill: color,
        fontWeight: 700,
        fontStyle: 'italic',
      })
      this.logoText.offsetX(this.logoText.width() / 2)
      this.Layer.add(this.logoText)
    },
    fitStageIntoParentContainer() {
      const container = this.$refs.stageParent

      // now we need to fit stage into parent
      const containerWidth = container.offsetWidth
      const containerHeight = container.offsetHeight
      // to do this we need to scale the stage
      const Xscale = containerWidth / this.stageWidth
      const Yscale = containerHeight / this.stageHeight
      const scale = Xscale <= Yscale ? Xscale : Yscale

      this.stage.width(this.stageWidth * scale)
      this.stage.height(this.stageHeight * scale)
      this.stage.scale({ x: scale, y: scale })
      this.stage.draw()
    },
  },
}
</script>
<style lang="scss" scoped>
#stage-parent {
  overflow: hidden;
  width: 100%;
  max-height: 100vh;
  background: #000;
  text-align: center;
}
#konva-container {
  display: inline-block;
}
</style>
