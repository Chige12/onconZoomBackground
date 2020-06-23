<template lang="pug">
  .main
    Background(
      :sourceText="sourceText"
    )
    .virtual-body
      v-app
        .container
          v-switch(label="アンバサ用にする" v-model="sourceText.isAmbas" @change="toggleambas()")
          v-text-field(label="名前を入力" v-model="sourceText.name" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
          v-row
            v-col(cols="12" sm="6")
              v-text-field(label="Twitter名を入力（@無し）" v-model="sourceText.twitter" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="6")
              v-text-field(label="hashtags" v-model="hashtagsCom" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
          v-row
            v-col(cols="12" sm="4")
              v-text-field(label="縦文字（小）" v-model="sourceText.attributeSmall" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="4")
              v-text-field(label="縦文字（大）" v-model="sourceText.attributeLarge" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(v-if="sourceText.isAmbas" cols="12" sm="4")
              v-text-field(label="最初に参加したオンコン（2020 #2 など）" v-model="sourceText.attributeBottom" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
          v-btn(@click="downloadImage()") 画像出力
          span.ml-4 {{`zoomBG_${sourceText.name}.png`}}
        .result-wrapper.mt-8
          .container
            img#result(src="").result-img
            a#hiddenLink(:download="`zoomBG_${sourceText.name}.png`")
</template>

<script>
import html2canvas from 'html2canvas'
import Logo from '~/components/Logo.vue'
import Background from '~/components/Background.vue'

export default {
  components: {
    Background,
    Logo,
  },
  data() {
    return {
      sourceText: {
        isAmbas: false,
        name: 'ちげ',
        twitter: 'Chige12_',
        hashtags: ['研究終わらん', 'プログラミング言語かるた'],
        attributeSmall: 'オンコン運営',
        attributeLarge: 'デザイン',
        attributeBottom: '',
      },
      cash: {
        isAmbas: false,
        name: 'ちげ',
        twitter: 'Chige12_',
        hashtags: ['研究終わらん', 'プログラミング言語かるた'],
        attributeSmall: 'オンコン運営',
        attributeLarge: 'デザイン',
        attributeBottom: '',
      },
      imgData: null,
    }
  },
  computed: {
    hashtagsCom: {
      get() {
        return this.sourceText.hashtags.join(', ')
      },
      set(value) {
        this.sourceText.hashtags = this.hashtagInput(value)
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.capturecanvas()
    })
  },
  methods: {
    toggleambas() {
      if (this.sourceText.isAmbas) {
        this.cash = JSON.parse(JSON.stringify(this.sourceText))
        this.sourceText.attributeSmall = '過去参加者'
        this.sourceText.attributeLarge = 'アンバサ'
        this.sourceText.attributeBottom = '2020 #2'
      } else {
        this.sourceText = JSON.parse(JSON.stringify(this.cash))
      }
      this.delaycapturecanvas(50)
    },
    async delaycapturecanvas(ms) {
      await this.delay(ms)
      this.capturecanvas()
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    hashtagInput(text) {
      const splitTextArr = text.replace(/\s+/g, '').split(',')
      return splitTextArr
    },
    capturecanvasfirst() {
      // ロードされた際の処理として実施
      window.onload = () => {
        this.capturecanvas()
      }
    },
    capturecanvas() {
      // HTML内に画像を表示
      html2canvas(document.getElementById('target'), {
        scale: 1,
      }).then((canvas) => {
        // imgタグのsrcの中に、html2canvasがレンダリングした画像を指定する。
        const imgData = canvas.toDataURL()
        this.imgData = imgData
        document.getElementById('result').src = imgData
      })
    },
    downloadImage() {
      const link = document.getElementById('hiddenLink')
      link.href = this.imgData
      console.log(link)
      link.click()
    },
  },
}
</script>

<style lang="scss">
.virtual-body {
  width: 100%;
  height: 100%;
  @include absolute($top: 0, $left: 0);
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
</style>
