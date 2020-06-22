<template lang="pug">
  .logos
    .logo(
      v-for="n of 15" :key="n"
      :class="`logo-${checkeredLogo(n)}`"
      )
        img(src="~/assets/prossell_logo.svg").logo-img
</template>
<script>
export default {
  methods: {
    checkeredLogo(n) {
      return Math.ceil(n / 3) % 2 === 0 ? 'right' : 'left'
    },
  },
}
</script>
<style lang="scss">
.logos {
  @include absolute($top: 0, $left: 0);
  @include flex($wrap: wrap);
  width: 1000px;
  height: 515px;
}
.logo {
  width: 33.333333%;
  height: 103px;
}
.logo-img {
  display: block;
  width: 50%;
}
.logo-left .logo-img {
  margin-right: 50%;
}
.logo-right .logo-img {
  margin-left: 50%;
}
</style>
