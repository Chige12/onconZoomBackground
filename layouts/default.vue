<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
html {
  font-family: $noto-font;
  font-size: 16px;
  font-weight: $font-normal;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  font-feature-settings: 'pkna';
  height: 100%;
}

body,
#__nuxt,
#__layout {
  height: 100%;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a,
a:link,
a:visited {
  text-decoration: none;
}

button:focus:not(.focus-visible),
input:focus:not(.focus-visible) {
  outline: none;
}

[data-whatinput='mouse'] :focus,
[data-whatinput='touch'] :focus {
  outline: none;
}
</style>
