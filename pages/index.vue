<template lang="pug">
  .main
    Background(
      :sourceText="sourceText"
      :imgSrc="imgSrc"
      :isAmbas="isAmbas"
    )
    .virtual-body
      v-app
        .container
          h3.my-1 オンコン用 Zoom背景つく〜る
          p アンバサの方は「アンバサ用にする」をクリック！ 運営かアンバサかわかりやすいように色を変えてます。
          v-row
            v-col(cols="12" sm="10")
              v-text-field(label="名前を入力" v-model="sourceText.name" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="2")
              v-switch(label="アンバサ用にする" v-model="isAmbas" @change="toggleambas()")
          v-row
            v-col(cols="12" sm="3")
              v-text-field(label="Twitter名を入力（@無し）" v-model="sourceText.twitter" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="3")
              v-text-field(label="Facebook idを入力" v-model="sourceText.facebook" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="6")
              v-text-field(label="ハッシュタグ（カンマで区切り）" v-model="hashtagsCom" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
          v-row
            v-col(cols="12" sm="3")
              v-text-field(label="縦文字（小）" v-model="sourceText.attributeSmall" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="3")
              v-text-field(label="縦文字（大）" v-model="sourceText.attributeLarge" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="3")
              v-text-field(label="初参加のオンコン（2020 #2 など）" v-model="sourceText.attributeBottom" @change="delaycapturecanvas(50)" @keydown.tab="delaycapturecanvas(50)")
            v-col(cols="12" sm="3")
              v-file-input(
                v-model="files"
                label="カスタム背景 (1000x515)"
                placeholder="画像をアップロード"
                ref="imageFile"
                @change="imageUpload()"
                prepend-icon="mdi-paperclip"
                )
          v-btn(@click="downloadImage()") 画像出力
          span.ml-4 {{`zoomBG_${sourceText.name}.png`}}
        .result-wrapper.mt-6
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
      files: null,
      isAmbas: false,
      sourceText: {
        name: 'ちげ',
        twitter: 'Chige12_',
        facebook: 'chige12f',
        hashtags: ['研究終わらん', 'プログラミング言語かるた'],
        attributeSmall: 'オンコン運営',
        attributeLarge: 'デザイン',
        attributeBottom: '',
      },
      officialCash: {
        name: 'ちげ',
        twitter: 'Chige12_',
        facebook: 'chige12f',
        hashtags: ['研究終わらん', 'プログラミング言語かるた'],
        attributeSmall: 'オンコン運営',
        attributeLarge: 'デザイン',
        attributeBottom: '',
      },
      ambasCash: {
        name: 'ちげ',
        twitter: 'Chige12_',
        facebook: 'chige12f',
        hashtags: ['研究終わらん', 'プログラミング言語かるた'],
        attributeSmall: '過去の参加者',
        attributeLarge: 'アンバサ',
        attributeBottom: '2020 #2',
      },
      imgData: null,
      imgSrc: null,
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
    imageUpload() {
      if (this.files) {
        const file = this.files
        const reader = new FileReader()
        // dataURL形式でファイルを読み込む
        reader.readAsDataURL(file)

        // ファイルの読込が終了した時の処理
        reader.onload = function () {
          const dataUrl = reader.result
          this.imgSrc = dataUrl
        }.bind(this)
      } else {
        this.imgSrc = null
      }
      this.delaycapturecanvas(50)
    },
    toggleambas() {
      if (this.isAmbas) {
        this.officialCash = JSON.parse(JSON.stringify(this.sourceText))
        this.sourceText = JSON.parse(JSON.stringify(this.ambasCash))
        this.isAmbas = true
      } else {
        this.ambasCash = JSON.parse(JSON.stringify(this.sourceText))
        this.sourceText = JSON.parse(JSON.stringify(this.officialCash))
        this.isAmbas = false
      }
      this.delaycapturecanvas(50)
    },
    async delaycapturecanvas(ms) {
      scrollTo(0, 0)
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
  z-index: 10;
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
