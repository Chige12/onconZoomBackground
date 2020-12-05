<template lang="pug">
.main
  v-app(v-show="!fullscreen").app
    .container
      h3.my-1 オンコン用 賞状つく〜る
      p.mb-8 
      v-text-field(prepend-icon="mdi-pound" label="オンコンのバージョンを入力" v-model="onconName" @change="allUpdateKanva()" @keydown.tab="allUpdateKanva()")
      v-card.mb-4(
        v-for="(award, awardKey) in awards"
        :key="`award-key-${award.name}`"
        outlined
        tile
      )
        v-card-subtitle {{award.name}}
        v-card-text.pb-0: v-row
          v-col(cols="12" sm="6").py-0
            v-text-field(label="チームNo." v-model="awards[awardKey].teamNumber" @change="updateKanva(awardKey)" @keydown.tab="updateKanva(awardKey)")
          v-col(cols="12" sm="6").py-0
            v-text-field(label="チーム名" v-model="awards[awardKey].teamName" @change="updateKanva(awardKey)" @keydown.tab="updateKanva(awardKey)")
        v-card-text.py-0: v-text-field(label="チームメンバー" v-model="awards[awardKey].teamMenber" @change="updateKanva(awardKey)" @keydown.tab="updateKanva(awardKey)")
      v-row
        v-col(cols="12" sm="12")
          v-btn(@click="requestFullScreen") full Screen

    //- .result-wrapper.mt-6
      .container
        .konva-images
          .konva-image(
            v-for="(award, awardKey) in awards" :key="`konva-key-${award.name}`"
          )
            konvaCom(
              :award="award" :fullscreen="false"
              :onconName="onconName" ref="award"
            )
        //- v-btn(@click="downloadPng") Download PNG
        a(id="hiddenLink" download="canvas.png") display:none; link
    .download-png
      .konva-png-wrapper(
        v-for="(award, awardKey) in awards" :key="`konva-png-${award.name}`"
      )
        .konva-png(@click="downloadOnePng(awardKey)")
          konvaCom(
            :award="award" :fullscreen="false"
            :onconName="onconName" ref="award"
            :id="`award-copy-img-${awardKey}`"
          )
        v-btn(@click="downloadOnePng(awardKey)").download-btn Download PNG {{award.name}}
      img#canvasImage(src="" style="display:none;")
  .fullscreen(v-show="fullscreen")
    slideShow(
      :awards="awards"
      :onconName="onconName"
      ref="slides"
    )
</template>
<script>
import konvaCom from '~/components/award/konvaCom.vue'
import slideShow from '~/components/award/slideShow.vue'

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
    slideShow,
  },
  data() {
    return {
      fullscreen: false,
      onconName: 'ONLINE INTERN CONTEST #10',
    }
  },
  computed: {
    awards() {
      return [
        {
          name: 'スライドデザイン賞',
          image: 'slide-design-3',
          color: colorCodes.slide,
          teamNumber: 'Team 1',
          teamName: 'あいうえお',
          teamMenber: '〇〇 〇〇　□□ □□　△△ △△',
        },
        {
          name: 'プレゼンター賞',
          image: 'presenter-3',
          color: colorCodes.presen,
          teamNumber: 'Team 2',
          teamName: '',
          teamMenber: '',
        },
        {
          name: '優秀賞',
          teamNumber: 'Team 3',
          color: colorCodes.merit,
          image: 'merit-award-3',
          teamName: '',
          teamMenber: '',
        },
        {
          name: '最優秀賞',
          image: 'grand-prize-3',
          color: colorCodes.grand,
          teamNumber: 'Team 4',
          teamName: '',
          teamMenber: '',
        },
        {
          name: 'めっちゃ頑張ったで賞',
          image: 'ganbatta-3',
          color: colorCodes.ganbatta,
          teamNumber: 'Team 5',
          teamName: '',
          teamMenber: '',
        },
      ]
    },
  },
  mounted() {
    this.listen(document, 'fullscreenchange', this.fullScreenChange)
    this.listen(document, 'webkitfullscreenchange', this.fullScreenChange)
    this.listen(document, 'mozfullscreenchange', this.fullScreenChange)
    this.listen(document, 'MSFullscreenChange', this.fullScreenChange)
    this.listen(document, 'keydown', this.keydownEvent)
  },
  methods: {
    allUpdateKanva() {
      for (let i = 0; i < this.awards.length; i++) {
        this.$refs.award[i].update()
      }
    },
    updateKanva(key) {
      this.$refs.award[key].update()
    },
    keydownEvent(e) {
      if (this.fullscreen) {
        this.$refs.slides.keydownEvent(e)
      }
    },
    downloadOnePng(awardKey) {
      const konvaComDom = document.getElementById(`award-copy-img-${awardKey}`)
      const canvas = konvaComDom.children[0].children[0].children[0] || null
      if (canvas !== null) {
        const link = document.getElementById('hiddenLink')
        const number = this.onconName.replace(/[^0-9]/g, '')
        const numberHyphen = number !== '' ? `${number}-` : number
        link.download = `${numberHyphen}${this.awards[awardKey].name}`
        link.href = canvas.toDataURL()
        document.getElementById('canvasImage').src = canvas.toDataURL()
        link.click()
      }
    },
    downloadPng() {
      const canvas = document.getElementById('targetCanvas')
      const link = document.getElementById('hiddenLink')
      link.href = canvas.toDataURL()

      document.getElementById('canvasImage').src = canvas.toDataURL()

      link.click()
    },
    async requestFullScreen() {
      await (this.fullscreen = true)
      const rootElement = document.documentElement
      rootElement.requestFullscreen()
      this.$refs.slides.slideKeyReset()
    },
    async fullScreenChange(e) {
      if (
        !document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement
      ) {
        await (this.fullscreen = false)
        this.allUpdateKanva()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.app {
  background: #efefef;
}
.result-wrapper {
  width: 100%;
  background: $dark-gray;
}
.result-img {
  margin: auto;
  display: block;
  width: 800px;
  height: auto;
}
.konva-images {
  display: flex;
  flex-wrap: wrap;
}
.konva-image {
  width: 50%;
}
#hiddenLink {
  display: none;
}

.konva-png-wrapper {
  width: 100%;
  height: 48px;
  overflow: hidden;
  position: relative;
}
.konva-png {
  width: 2341px;
  height: auto;
  cursor: pointer;
}
.download-btn {
  position: absolute;
  top: 4px;
  left: 4px;
}
</style>
