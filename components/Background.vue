<template lang="pug">
.back-ground
  .img-target#target(:class="{'ambas':isAmbas}")
    .left-bar(:class="{'ambas-bar':isAmbas}")
    .main-contents
      .header
        .name {{sourceText.name}}
        .self-introduction
          .snss
            .sns(v-if="sourceText.twitter")
              img(src="~/assets/twitter.svg").sns-icon
              span.sns-name {{'@' + sourceText.twitter}}
            .sns(v-if="sourceText.facebook")
              img(src="~/assets/facebook.svg").sns-icon
              span.sns-name {{sourceText.facebook}}
          .hashtags(:class="{'nosns': !sourceText.twitter}")
            span.hashtag(v-for="hashtag in sourceText.hashtags" :key="hashtag") {{'#' + hashtag}}
      .contents
        .attribute
          .attribute-wrap
            .attribute-small(:class="{'ambas': isAmbas}") {{sourceText.attributeSmall}}
            .attribute-large(
              :style="{fontSize: `${attributeLargeFontSize}px`, marginRight: `${attributeLargeMarginRight}px` }"
              :class="{'ambas':isAmbas}"
              ) {{sourceText.attributeLarge}}
            .attribute-bottom(v-if="sourceText.attributeBottom" :class="{'ambas':isAmbas}") {{sourceText.attributeBottom}}
        .visual-background
          .background-custom-img(v-if="imgSrc" :style="{backgroundImage: `url('${imgSrc}')`}")
          img(v-if="isAmbas" src="~/assets/background-ambas.svg").background
          img(v-else="isAmbas" src="~/assets/background-official.svg").background.background-official
          Logo
</template>
<script>
export default {
  props: {
    sourceText: {
      type: Object,
      default: null,
    },
    imgSrc: {
      type: String,
      default: null,
    },
    isAmbas: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    attributeLargeFontSize() {
      const textLength = this.sourceText.attributeLarge.length
      let fontSize = '102'
      if (textLength <= 4) {
        fontSize = '102'
      } else if (textLength === 5) {
        fontSize = '98'
      } else if (textLength === 6) {
        fontSize = '82'
      } else if (textLength === 7) {
        fontSize = '70'
      } else if (textLength >= 8) {
        fontSize = '60'
      }
      return fontSize
    },
    attributeLargeMarginRight() {
      const textLength = this.sourceText.attributeLarge.length
      let marginRight = '-38'
      if (textLength <= 4) {
        marginRight = '-38'
      } else if (textLength === 5) {
        marginRight = '-32'
      } else if (textLength === 6) {
        marginRight = '-20'
      } else if (textLength === 7) {
        marginRight = '-12'
      } else if (textLength >= 8) {
        marginRight = '-8'
      }
      return marginRight
    },
  },
}
</script>

<style lang="scss" scoped>
.back-ground {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img-target {
  width: $img-width;
  height: $img-height;
  background: $light-gray;
  @include flex($justifyContent: flex-start);
  &.ambas {
    background: $white;
  }
}
.left-bar {
  background: linear-gradient(
    -135deg,
    rgba($official-green, $official-opacity) 0%,
    rgba($official-blue, $official-opacity) 100%
  );
  width: $left-bar-width;
  height: $img-height;
  flex-shrink: 0;
  &.ambas-bar {
    background: linear-gradient(135deg, $ambas-skyblue 0%, $ambas-blue 100%);
  }
}
.main-contents {
  width: $img-width - $left-bar-width;
  height: $img-height;
}
.visual-background {
  position: relative;
}
.background {
  display: block;
  width: $background-width;
  height: $background-height;
  &-official {
    opacity: $official-opacity;
  }
}
.background-custom-img {
  @include absolute($top: 0, $left: 0);
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 3;
}
.header {
  width: 100%;
  height: $img-height - $background-height;
  @include flex($justifyContent: flex-start, $alignItems: flex-start);
}
.name {
  height: 100%;
  @include noto($size: 102px, $weight: $font-black);
  margin-left: 16px;
}
.self-introduction {
  padding-left: 24px;
  height: 100%;
}
.snss {
  margin-top: 48px;
  @include flex($justifyContent: flex-start, $alignItems: flex-start);
}
.sns {
  @include flex($justifyContent: flex-start, $alignItems: flex-start);
  margin-right: 16px;
}
.sns-icon {
  display: block;
  width: 60px;
  height: 60px;
}
.sns-name {
  margin-top: -8px;
  line-height: 2;
  @include noto($size: 32px, $weight: $font-bold);
}
.hashtags {
  line-height: 2;
  @include noto($size: 28px, $weight: $font-bold);
  margin-top: -8px;
  &.nosns {
    font-size: 38px;
    margin-top: 28px;
  }
}
.hashtag {
  margin-right: 8px;
}

.contents {
  @include flex();
}
.attribute {
  position: relative;
  width: $img-width - $left-bar-width - $background-width;
  height: $background-height;
  writing-mode: vertical-rl;
}
.attribute-small {
  margin-right: 8px;
  @include noto($size: 40px, $color: $official-text, $weight: $font-medium);
  &.ambas {
    color: $ambas-text;
  }
}
.attribute-large {
  margin-right: -38px;
  @include noto($size: 102px, $color: $official-text, $weight: $font-bold);
  &.ambas {
    color: $ambas-text;
  }
}
.attribute-bottom {
  width: 100%;
  text-align: center;
  @include absolute($bottom: 16px, $left: 0);
  @include noto($size: 28px, $color: $official-text, $weight: $font-bold);
  writing-mode: horizontal-tb;
  &.ambas {
    color: $ambas-text;
  }
}
</style>
