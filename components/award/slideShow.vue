<template lang="pug">
.slide-show
  .one-slide(
    v-for="(award, awardKey) in awardShowSlide" :key="`slide-key-${award.image}`"
    :style="`z-index: ${awards.length - awardKey};`"
    :class="{'one-slide-hide': awardKey < slideKey}"
  )
    konvaCom(
      :award="award"
      :fullscreen="true"
      :onconName="onconName"
      ref="konvaCom"
    )
</template>
<script>
import konvaCom from '~/components/award/konvaCom.vue'

const colorCodes = {
  slide: '#b5c49d',
  presen: '#99bcbc',
  merit: '#8e8e8e',
  grand: '#ab9947',
  ganbatta: '#e5a1b6',
}

export default {
  components: {
    konvaCom,
  },
  props: {
    awards: {
      type: Array,
      default: () => [],
    },
    onconName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      slideKey: 0,
      awardShowSlide: [],
    }
  },
  methods: {
    setAwardShowSlide() {
      const slideAward = { ...this.awards[0] }
      const presenAward = { ...this.awards[1] }
      const meritAward = { ...this.awards[2] }
      const grandAward = { ...this.awards[3] }
      const ganbattaAward = { ...this.awards[4] }
      const slideArr = [
        {
          logoTitle: true,
          color: '#3c3d3b',
          image: 'awards-start',
          sound: false,
        },
        {
          color: colorCodes.slide,
          image: 'slide-design-1',
          sound: false,
        },
        {
          color: colorCodes.slide,
          image: 'slide-design-2',
          sound: true,
        },
        slideAward,
        {
          color: colorCodes.presen,
          image: 'presenter-1',
          sound: false,
        },
        {
          color: colorCodes.presen,
          image: 'presenter-2',
          sound: true,
        },
        presenAward,
        {
          color: colorCodes.merit,
          image: 'merit-award-1',
          sound: false,
        },
        {
          color: colorCodes.merit,
          image: 'merit-award-2',
          sound: true,
        },
        meritAward,
        {
          color: colorCodes.grand,
          image: 'grand-prize-1',
          sound: false,
        },
        {
          color: colorCodes.grand,
          image: 'grand-prize-2',
          sound: true,
        },
        grandAward,
        {
          color: colorCodes.ganbatta,
          image: 'ganbatta-1',
          sound: false,
        },
        {
          color: colorCodes.ganbatta,
          image: 'ganbatta-2',
          sound: true,
        },
        ganbattaAward,
        {
          logoHide: true,
          color: '#3c3d3b',
          image: 'congratulation',
          sound: false,
        },
      ]
      this.awardShowSlide = slideArr
    },
    async requestFullscreen() {
      this.slideKey = 0
      await this.setAwardShowSlide()
      await this.$delay(300)
      this.$refs.konvaCom[0].update()
      this.$refs.konvaCom[1].update()
    },
    keydownEvent(e) {
      if (e.key === 'ArrowRight') {
        if (this.slideKey < this.awardShowSlide.length - 1) {
          if (this.slideKey < this.awardShowSlide.length - 2) {
            this.$refs.konvaCom[this.slideKey + 2].update()
          }
          this.slideKey++
        }
      }
      if (e.key === 'ArrowLeft') {
        if (this.slideKey > 0) {
          this.slideKey--
        }
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.one-slide {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
}
.one-slide-hide {
  opacity: 0;
}
</style>
