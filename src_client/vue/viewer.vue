<template lang="pug">
div.mplus1p-800(
  style="width: 100%; height: 100%; overflow: hidden"
)
  .wrapper
    .ma-6(
      :style="`display: inline-block; width: ${cardWidth}px; height: ${cardHeight}px; overflow: visible !important; transform-style: preserve-3d`"
    )
      transition(
        :name="isShowingOriginal ? 'hide-rotation' : 'show-rotation'"
        @after-enter="isShowingOriginal = true"
        @after-leave="isShowingOriginal = false"
      )
        v-card.pa-4(
          v-show="isShownOriginal"
          :class="isShowingOriginal ? 'show-composer-card' : 'hide-composer-card'"
          width="100%"
          height="100%"
          style="--translate-amount: -224px"
        )
          .d-flex.flex-row.justify-space-between
            div
              .d-flex.flex-row.justify-start.align-center.mt-1
                v-avatar(
                  color="grey darken-3"
                  :size="iconSize"
                )
                  v-img(
                    :src="`icons/${data.originalMember.twitter}`"
                  )
                .d-flex.flex-column.ml-2
                  .name-text.grey--text.text--darken-4.mt-n2 {{ data.originalMember.name }} 
                  .name-text.grey--text.text--darken-4.mt-n6 {{ `@${data.originalMember.twitter}` }}
              .ma-2.mt-5
                .scalable-text.grey--text.text--darken-4.mt-1(
                  :style="{ '--font-size': originalTitleFontSize }"
                ) {{ data.originalMember.original.title }}
                .scalable-text.grey--text.text--darken-2.mplus1p-400(
                  :style="{ '--font-size': originalCommentFontSize, 'white-space': 'pre-wrap', 'word-wrap': 'break-word' }"
                ) {{ data.originalMember.original.comment }}
            v-card.ma-2(
              flat
              style="position: absolute; top: 0; right: 0"
            )
              v-img(
                :src="originalQRUrl"
                :width="qrSize"
                :height="qrSize"
                contain
              )
                .d-flex.justify-center.align-center(
                  style="height: 100%"
                )
                  v-icon.text-stroke(
                    color="#1DA1F2"
                    large
                  ) mdi-twitter
      transition(
        :name="isShowingOriginal ? 'hide-rotation' : 'show-rotation'"
      )
        v-card(
          v-show="!isShownOriginal"
          :class="isShowingOriginal ? 'hide-composer-card' : 'show-composer-card'"
          width="100%"
          height="100%"
          style="--translate-amount: -224px"
        )
          v-img(
            src="images/original.png"
            :width="cardWidth"
            :height="cardHeight"
            contain
          )

  .wrapper
    .ma-6(
      :style="`display: inline-block; width: ${cardWidth}px; height: ${cardHeight}px; overflow: visible !important; transform-style: preserve-3d`"
    )
      transition(
        :name="isShowingArrange ? 'hide-rotation' : 'show-rotation'"
        @after-enter="isShowingArrange = true"
        @after-leave="isShowingArrange = false"
      )
        v-card.pa-4(
          v-show="isShownArrange"
          :class="isShowingArrange ? 'show-composer-card' : 'hide-composer-card'"
          width="100%"
          height="100%"
          style="--translate-amount: 224px"
        )
          .d-flex.flex-row.justify-space-between
            div
              .d-flex.flex-row.justify-start.align-center.mt-1
                v-avatar(
                  color="grey darken-3"
                  :size="iconSize"
                )
                  v-img(
                    :src="`icons/${data.arrangeMember.twitter}`"
                  )
                .d-flex.flex-column.ml-2
                  .name-text.grey--text.text--darken-4.mt-n2 {{ data.arrangeMember.name }}
                  .name-text.grey--text.text--darken-4.mt-n6 {{ `@${data.arrangeMember.twitter}` }}
              .ma-2.mt-5
                .scalable-text.grey--text.text--darken-4.mt-1(
                  :style="{ '--font-size': arrangeTitleFontSize }"
                ) {{ data.arrangeMember.arrange.title }}
                .scalable-text.grey--text.text--darken-2.mplus1p-400(
                  :style="{ '--font-size': arrangeCommentFontSize, 'white-space': 'pre-wrap', 'word-wrap': 'break-word' }"
                ) {{ data.arrangeMember.arrange.comment }}
            v-card.ma-2(
              flat
              style="position: absolute; top: 0; right: 0"
            )
              v-img(
                :src="arrangeQRUrl"
                :width="qrSize"
                :height="qrSize"
                contain
              )
                .d-flex.justify-center.align-center(
                  style="height: 100%"
                )
                  v-icon.text-stroke(
                    color="#1DA1F2"
                    large
                  ) mdi-twitter
      transition(
        :name="isShowingArrange ? 'hide-rotation' : 'show-rotation'"
      )
        v-card(
          v-show="!isShownArrange"
          :class="isShowingArrange ? 'hide-composer-card' : 'show-composer-card'"
          width="100%"
          height="100%"
          style="--translate-amount: 224px"
        )
          v-img(
            src="images/arrange.png"
            :width="cardWidth"
            :height="cardHeight"
            contain
          )
</template>

<script>
const QRCode = require('qrcode')

export default {
  data() {
    return {
      ws: null,
      data: {
        originalMember: {
          original: {},
          twitter: ''
        },
        arrangeMember: {
          arrange: {},
          twitter: ''
        },
        showingItems: []
      },
      cardWidth: 800,
      cardHeight: 400,
      originalQRUrl: '',
      arrangeQRUrl: '',
      isShowingOriginal: false,
      isShowingArrange: false,
      iconSize: 104,
      qrSize: 144
    }
  },
  watch: {
    data: function(data) {
      if (data.originalMember) {
        QRCode.toDataURL(`https://twitter.com/${data.originalMember.twitter}`, { margin: 2, errorCorrectionLevel: 'M', color: { dark: '#FFF', light: '#1DA1F2' } },
        (err, url) => {
          this.originalQRUrl = url
        })
      }
      if (data.arrangeMember) {
        QRCode.toDataURL(`https://twitter.com/${data.arrangeMember.twitter}`, { margin: 2, errorCorrectionLevel: 'M', color: { dark: '#FFF', light: '#1DA1F2' } },
        (err, url) => {
          this.arrangeQRUrl = url
        })
      }
    }
  },
  computed: {
    isShownOriginal() {
      return this.data.showingItems.includes('original')
    },
    isShownArrange() {
      return this.data.showingItems.includes('arrange')
    },
    originalTitleFontSize() {
      let size = 60
      if (this.data.originalMember.original.title) {
        size = this.calcFontSize(this.data.originalMember.original.title, this.cardWidth - 50, this.cardHeight - 50, size, size / 2, 5, 800, true)
      }
      return `${size}px`
    },
    originalCommentFontSize() {
      let size = 40
      if (this.data.originalMember.original.comment) {
        size = this.calcFontSize(this.data.originalMember.original.comment, this.cardWidth - 50, 140, size, size / 2, 5, 400, false)
      }
      return `${size}px`
    },
    arrangeTitleFontSize() {
      let size = 60
      if (this.data.arrangeMember.arrange.title) {
        size = this.calcFontSize(this.data.arrangeMember.arrange.title, this.cardWidth - 50, this.cardHeight - 50, size, size / 2, 5, 800, true)
      }
      return `${size}px`
    },
    arrangeCommentFontSize() {
      let size = 40
      if (this.data.arrangeMember.arrange.comment) {
        size = this.calcFontSize(this.data.arrangeMember.arrange.comment, this.cardWidth - 50, 140, size, size / 2, 5, 400, false)
      }
      return `${size}px`
    }
  },
  mounted() {
    this.ws = new WebSocket(`ws://${location.hostname}:8882`)

    this.ws.addEventListener('open', (event) => {
      console.log('ws: open')
    })

    this.ws.addEventListener('close', () => {

    })

    this.ws.addEventListener('message', (event) => {
      console.log('ws: message')
      this.data = JSON.parse(event.data)
    })

    window.addEventListener('beforeunload', (event) => {
      this.ws.close()
    })
  },
  methods: {
    calcFontSize(str, cardWidth, cardHeight, maxSize, minSize, step, fontWeight, isSingleLine) {
      let size = maxSize + step
      let tmpWidth = 0
      let tmpHeight = 0
      do {
        size -= step
        const tmp = document.createElement('div')
        tmp.classList.add(`mplus1p-${fontWeight}`)
        if (isSingleLine) {
          tmp.style.overflow = 'hidden'
          tmp.style.whiteSpace = 'nowrap'
        } else {
          tmp.style.width = `${cardWidth}px`
        }
        tmp.style.display = 'inline-block'
        tmp.style.fontSize = `${size}px`
        tmp.innerText = str
        document.body.appendChild(tmp)
        tmpWidth = tmp.scrollWidth
        tmpHeight = tmp.scrollHeight
        document.body.removeChild(tmp)
      } while ((tmpWidth > cardWidth || tmpHeight > cardHeight) && size > minSize)
      return size
    },
    sendData() {
      if (this.ws) {
        this.ws.send(JSON.stringify(this.data))
      }
    }
  }
}
</script>

<style>
:root {
  --card-thin: 20px;
}

.mplus1p-800 {
  font-family: 'M PLUS 1p', sans-serif !important;
  font-weight: 800;
}

.mplus1p-400 {
  font-family: 'M PLUS 1p', sans-serif !important;
  font-weight: 400;
}

.wrapper {
  display: inline-block;
  width: 848px;
  height: 448px;

  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;

  opacity: 0.95;

  perspective: 3000px;
  transform-origin: center center;
}

.show-composer-card, .hide-composer-card {
  --translate-amount: 0px;
  position: absolute;
  backface-visibility: visible !important;
  transform-style: preserve-3d;
}

.show-composer-card:after, .hide-composer-card:after {
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;

  background: #EEE;
  width: var(--card-thin);
  height: 100%;

  content: "";
  transform: rotateY(90deg);
  transform-origin: left;
}

.show-composer-card {
  transform: translateY(var(--translate-amount)) rotateY(0) translateZ(calc(var(--card-thin) / 2));
}

.hide-composer-card {
  transform: translateY(var(--translate-amount)) rotateY(-180deg) translateZ(calc(var(--card-thin) / 2));
}

.name-text {
  width: 500px;
  font-size: 48px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.text-stroke {
  text-shadow:
    2px  2px 0px #ffffff,
   -2px  2px 0px #ffffff,
    2px -2px 0px #ffffff,
   -2px -2px 0px #ffffff,
    2px  0px 0px #ffffff,
    0px  2px 0px #ffffff,
   -2px  0px 0px #ffffff,
    0px -2px 0px #ffffff;
}

.scalable-text {
  --font-size: 24px;
  font-size: var(--font-size);
}

.show-rotation-enter-active, .show-rotation-leave-active {
  transition: transform 3s cubic-bezier(1, .3, 0, .7);
}

.hide-rotation-enter-active, .hide-rotation-leave-active {
  transition: transform 1s cubic-bezier(1, .3, 0, .7);
}

.show-rotation-enter, .hide-rotation-enter {
  --translate-amount: 0px;
  transform: translateY(var(--translate-amount)) rotateY(-180deg) translateZ(calc(var(--card-thin) / 2)) !important;
}

.show-rotation-enter-to, .hide-rotation-enter-to {
  --translate-amount: 0px;
  transform: translateY(var(--translate-amount)) rotateY(0) translateZ(calc(var(--card-thin) / 2)) !important;
}

.show-rotation-leave, .hide-rotation-leave {
  --translate-amount: 0px;
  transform: translateY(var(--translate-amount)) rotateY(0) translateZ(calc(var(--card-thin) / 2)) !important;
}

.show-rotation-leave-to, .hide-rotation-leave-to {
  --translate-amount: 0px;
  transform: translateY(var(--translate-amount)) rotateY(180deg) translateZ(calc(var(--card-thin) / 2)) !important;
}
</style>