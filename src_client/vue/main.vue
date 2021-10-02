<template lang="pug">
div(
  @dragenter="dragOver"
  @dragleave="dragLeave"
  @dragover.prevent="dragOver"
  @drop.prevent="dropFile"
  :class="{ enter: isDragOver }"
  style="width: calc(100% - 56px); height: 100%"
)
  v-container
    v-row.mb-4.elevation-2(
      style="background: white; position: sticky; top: 0; z-index: 2;"
    )
      v-col(
        cols="6"
        style="position: relative; height: 164px; padding-right: 6px;"
      )
        v-hover
          template(
            #default="{ hover }"
          )
            v-card.px-4.py-3(
              v-show="isShownOriginal"
              width="calc(100% - 18px)"
              :disabled="isShownArrange || isCooldown"
              outlined
              style="position: absolute; cursor: pointer"
              @click="singleClickAlertReservation"
              @dblclick.stop="toggleOriginalShowing(); singleClickAlertCancel()"
            )
              .d-flex.flex-column.justify-center
                .text-center 原曲
                template(
                  v-if="currentOriginalMember"
                )
                  .d-flex.flex-row.justify-center.align-center
                    v-avatar(
                      color="grey darken-3"
                      size="16"
                    )
                      v-img(
                        :src="`icons/${currentOriginalMember.twitter}`"
                      )
                    .text-ellipsis.ml-1 {{ `${currentOriginalMember.name} (@${currentOriginalMember.twitter})` }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.title) }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.ruby) }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.comment) }}
              v-slide-y-transition
                v-overlay(
                  v-if="hover"
                  absolute
                  opacity="0.3"
                )
                  v-icon(
                    large
                  ) mdi-arrow-down-bold-box-outline
        v-hover
          template(
            #default="{ hover }"
          )
            v-slide-y-transition
              v-card.px-4.py-3(
                v-show="!isShownOriginal"
                color="primary"
                :disabled="isCooldown"
                width="calc(100% - 24px)"
                dark
                style="position: absolute; z-index: 1; cursor: pointer"
                @click="singleClickAlertReservation"
                @dblclick.stop="toggleOriginalShowing(); singleClickAlertCancel()"
              )
                .d-flex.flex-column.justify-center
                  .text-center 原曲
                  template(
                    v-if="currentOriginalMember"
                  )
                    .d-flex.flex-row.justify-center.align-center
                      v-avatar(
                        color="grey darken-3"
                        size="16"
                      )
                        v-img(
                          :src="`icons/${currentOriginalMember.twitter}`"
                        )
                      .text-ellipsis.ml-1 {{ `${currentOriginalMember.name} (@${currentOriginalMember.twitter})` }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.title) }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.ruby) }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentOriginalMember.original.comment) }}
                v-slide-y-reverse-transition
                  v-overlay(
                    v-if="hover"
                    absolute
                    opacity="0.3"
                  )
                    v-icon(
                      large
                    ) mdi-arrow-up-bold-box-outline
      v-col(
        cols="6"
        style="position: relative; height: 164px; padding-left: 6px;"
      )
        v-hover
          template(
            #default="{ hover }"
          )
            v-card.px-4.py-3(
              v-show="isShownArrange"
              :disabled="isCooldown"
              width="calc(100% - 18px)"
              outlined
              style="position: absolute; cursor: pointer"
              @click="singleClickAlertReservation"
              @dblclick.stop="toggleArrangeShowing(); singleClickAlertCancel()"
            )
              .d-flex.flex-column.justify-center
                .text-center アレンジ
                template(
                  v-if="currentArrangeMember"
                )
                  .d-flex.flex-row.justify-center.align-center
                    v-avatar(
                      color="grey darken-3"
                      size="16"
                    )
                      v-img(
                        :src="`icons/${currentArrangeMember.twitter}`"
                      )
                    .text-ellipsis.ml-1 {{ `${currentArrangeMember.name} (@${currentArrangeMember.twitter})` }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.title) }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.ruby) }}
                  .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.comment) }}
              v-slide-y-transition
                v-overlay(
                  v-if="hover"
                  absolute
                  opacity="0.3"
                )
                  v-icon(
                    large
                  ) mdi-arrow-down-bold-box-outline
        v-hover
          template(
            #default="{ hover }"
          )
            v-slide-y-transition
              v-card.px-4.py-3(
                v-show="!isShownArrange"
                :color="!isShownOriginal ? 'grey' : 'primary'"
                :disabled="!isShownOriginal || isCooldown"
                width="calc(100% - 24px)"
                dark
                style="position: absolute; z-index: 1; cursor: pointer"
                @click="singleClickAlertReservation"
                @dblclick.stop="toggleArrangeShowing(); singleClickAlertCancel()"
              )
                .d-flex.flex-column.justify-center
                  .text-center アレンジ
                  template(
                    v-if="currentArrangeMember"
                  )
                    .d-flex.flex-row.justify-center.align-center
                      v-avatar(
                        color="grey darken-3"
                        size="16"
                      )
                        v-img(
                          :src="`icons/${currentArrangeMember.twitter}`"
                        )
                      .text-ellipsis.ml-1 {{ `${currentArrangeMember.name} (@${currentArrangeMember.twitter})` }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.title) }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.ruby) }}
                    .text-center.text-ellipsis {{ toSpaceWhenEmpty(currentArrangeMember.arrange.comment) }}
                v-slide-y-reverse-transition
                  v-overlay(
                    v-if="hover"
                    absolute
                    opacity="0.3"
                  )
                    v-icon(
                      large
                    ) mdi-arrow-up-bold-box-outline
      v-col.mt-n2(
        cols="12"
      )
        v-hover
          template(
            #default="{ hover }"
          )
            v-card.px-4.py-3(
              :color="!isShownOriginal || !isShownArrange ? 'grey' : 'primary'"
              dark
              :disabled="!isShownOriginal || !isShownArrange || isCooldown"
              style="cursor: pointer"
              @click="singleClickAlertReservation"
              @dblclick.stop="changeNextMember(); singleClickAlertCancel()"
            )
              .text-center 次へ
              v-expand-x-transition
                v-overlay(
                  v-if="hover && isShownOriginal && isShownArrange"
                  absolute
                  opacity="0.5"
                )
                  | {{ data.members[getNextIndex()].name }} (@{{ data.members[getNextIndex()].twitter }})
                  v-icon mdi-arrow-right-bold-box-outline

    transition-group.d-flex.flex-column(
      name="flip-list"
      tag="div"
    )
      v-card.d-flex.flex-row.mb-4(
        v-for="member in data.members"
        :key="`editor-${member.id}`"
        outlined
        :style="{ 'box-shadow': isCurrentMember(member.id) ? `0 0 0 4px ${$vuetify.theme.themes.light.primary}BF` : '', 'transition': 'box-shadow .3s cubic-bezier(.25,0.8,0.5,1)' }"
      )
        v-sheet.px-4.pt-2(
          width="100%"
          rounded
          :class="isCurrentMember(member.id) ? 'px-2 pt-1' : 'px-4 pt-2'"
        )
          v-row(
            :style="{ width: isEdit ? 'calc(100% + 24px)' : 'calc(50% + 12px)', transition: '.3s cubic-bezier(.25,0.8,0.5,1)' }"
          )
            v-col.d-flex.flex-row.align-center.mb-n4(
              cols="7"
            )
              v-avatar.mt-n4(
                color="grey darken-3"
                size="26"
              )
                v-img(
                  :src="`icons/${member.twitter}`"
                )
              v-text-field.ml-1(
                v-model="member.name"
                label="名前"
                dense
                @change="sendData"
              )
            v-col.mb-n4(
              cols="5"
            )
              v-text-field(
                v-model="member.twitter"
                label="Twitter"
                dense
                @change="sendData"
              )
          v-row.mt-n4.mb-n3
            v-col(
              cols="6"
            )
              .mb-3 原曲
              v-text-field(
                v-model="member.original.title"
                label="曲名"
                dense
                @change="sendData"
              )
              v-text-field(
                v-model="member.original.ruby"
                label="読み方"
                dense
                @change="sendData"
              )
              v-textarea(
                v-model="member.original.comment"
                label="コメント"
                rows="1"
                dense
                @change="sendData"
              )

            v-col(
              cols="6"
            )
              .mb-3 アレンジ
              v-text-field(
                v-model="member.arrange.title"
                label="曲名"
                dense
                @change="sendData"
              )
              v-text-field(
                v-model="member.arrange.ruby"
                label="読み方"
                dense
                @change="sendData"
              )
              v-textarea(
                v-model="member.arrange.comment"
                label="コメント"
                rows="1"
                dense
                @change="sendData"
              )

        v-slide-x-reverse-transition
          v-sheet.px-4.pt-2(
            v-show="!isEdit"
            color="grey darken-3"
            dark
            rounded
            elevation="4"
            style="position: absolute; right: 0; width: 50%;"
          )
            v-row
              v-col.mb-n4(
                cols="12"
              )
                v-select(
                  v-model="member.arrangeId"
                  :items="membersSelect"
                  item-text="text"
                  item-value="value"
                  label="アレンジ者"
                  rows="1"
                  dense
                  height="27"
                  @change="sendData"
                )
                  template(
                    #item="{ item }"
                  )
                    v-list-item-avatar.ma-0(
                      color="grey darken-3"
                      size="16"
                    )
                      v-img(
                        :src="`icons/${item.twitter}`"
                      )
                    v-list-item-content.ma-0.ml-1
                      v-list-item-title.text-ellipsis {{ item.text }}
                  template(
                    #selection="{ item }"
                  )
                    v-list-item-avatar.ma-0(
                      color="grey darken-3"
                      size="16"
                    )
                      v-img(
                        :src="`icons/${item.twitter}`"
                      )
                    v-list-item-content.ma-0.ml-1
                      v-list-item-title.text-ellipsis {{ item.text }}
            v-expand-transition
              v-row.mt-n4.mb-n3(
                v-if="member.arrangeId !== null && data.members[idToIndex(member.arrangeId)]"
              )
                v-col(
                  cols="12"
                )
                  .mb-3 アレンジ
                  v-text-field(
                    v-model="data.members[idToIndex(member.arrangeId)].arrange.title"
                    label="曲名"
                    dense
                    @change="sendData"
                  )
                  v-text-field(
                    v-model="data.members[idToIndex(member.arrangeId)].arrange.ruby"
                    label="読み方"
                    dense
                    @change="sendData"
                  )
                  v-textarea(
                    v-model="data.members[idToIndex(member.arrangeId)].arrange.comment"
                    label="コメント"
                    rows="1"
                    dense
                    @change="sendData"
                  )
    v-btn(
      block
      rounded
      text
      outlined
      @click="singleClickAlertReservation"
      @dblclick.stop="addMember(); singleClickAlertCancel()"
    )
      v-icon mdi-account-plus
      | 追加

    v-btn(
      color="primary"
      fab
      fixed
      bottom
      style="right: 72px"
      @click="isEdit = !isEdit"
    )
      v-icon mdi-{{ isEdit ? 'format-columns' : 'format-align-justify' }}

    v-navigation-drawer.elevation-4(
      v-model="drawer"
      expand-on-hover
      right
      permanent
      fixed
      dark
    )
      draggable(
        v-model="data.members"
        v-bind="dragOptions"
        tag="div"
        @start="drag = true"
        @end="drag = false"
      )
        transition-group(
          type="transition"
          :name="!drag ? 'flip-list' : null"
          tag="div"
        )
          v-card.d-flex.justify-space-between.mb-1.pa-2(
            v-for="member in data.members"
            :key="`nav-${member.id}`"
            :color="isCurrentMember(member.id) ? 'primary' : 'grey darken-2'"
            tile
            min-width="256"
            :disabled="isShownOriginal || isShownArrange"
            style="cursor: pointer"
            @click="singleClickAlertReservation"
            @dblclick.stop="changeCurrentMemberId(member.id); singleClickAlertCancel()"
          )
            div.d-flex.flex-row.align-center(
              style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
            )
              v-avatar(
                color="grey darken-3"
                size="16"
              )
                v-img(
                  :src="`icons/${member.twitter}`"
                )
              .ml-1 {{ `${member.name} (@${member.twitter})` }}
            v-btn(
              v-show="!(isCurrentMember(member.id))"
              color="red lighten-2"
              icon
              text
              x-small
              @click="singleClickAlertReservation"
              @dblclick.stop="removeMember(member.id); singleClickAlertCancel()"
            )
              v-icon mdi-close

      v-card.pa-2(
        :color="'grey darken-3'"
        tile
        :disabled="isShownOriginal || isShownArrange"
        @click="singleClickAlertReservation"
        @dblclick.stop="addMember(); singleClickAlertCancel()"
      )
        div(
          style="white-space: nowrap"
        ) 
          v-icon mdi-account-plus
          | 追加
      
  v-snackbar(
    v-model="singleClickAlertSnackbar"
    timeout="1200"
    top
    style="transform: translateX(-28px)"
  )
    .text-center ダブルクリックしてください

  v-snackbar(
    v-model="errorSnackbar"
    color="error"
    timeout="0"
    bottom
    multi-line
    style="transform: translateX(-28px)"
  )
    div(
      style="white-space: pre-wrap; word-wrap: break-word"
    ) {{ errorMessage }}
    template(
      @action="{ attrs }"
    )
      v-btn.ma-n3(
        color="white"
        absolute
        right
        bottom
        text
        v-bind="attrs"
        @click="errorSnackbar = false"
      )
        v-icon mdi-close
  v-overlay(
    :value="isLoading"
  )
    v-progress-circular(
      color="primary"
      width="7"
      size="70"
      indeterminate
    )
</template>

<script>
import draggable from 'vuedraggable'
const csvSync = require('csv-parse/lib/sync')

export default {
  components: {
    draggable,
  },
  data() {
    return {
      ws: null,
      isEdit: true,
      drag: false,
      drawer: null,
      data: {
        members: [],
        showingItems: []
      },
      singleClickAlertSnackbar: false,
      singleClickAlertTimeout: null,
      isCooldown: false,
      showCooldownSecond: 3,
      hideCooldownSecond: 1,
      isDragOver: false,
      isLoading: false,
      errorSnackbar: false,
      errorMessage: ''
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    membersSelect() {
      return this.data.members.map((member) => {
        return {
          text: `${member.name} (@${member.twitter})`,
          value: member.id,
          twitter: member.twitter
        }
      })
    },
    isShownOriginal() {
      return this.data.showingItems.includes('original')
    },
    isShownArrange() {
      return this.data.showingItems.includes('arrange')
    },
    currentOriginalMember() {
      const index = this.idToIndex(this.data.currentMemberId)
      return index >= 0 ? this.data.members[index] : null
    },
    currentArrangeMember() {
      const arrangeIndex = this.idToIndex(this.data.currentMemberId)
      if (arrangeIndex < 0) return null
      const arrangeId = this.data.members[arrangeIndex].arrangeId
      const index = this.idToIndex(arrangeId)
      return index >= 0 ? this.data.members[index] : null
    }
  },
  mounted() {
    this.ws = new WebSocket(`ws://${location.hostname}:8881`)

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
    addMember() {
      const id = this.data.members.length === 0 ? 0 : (Math.max(...this.data.members.map((member) => member.id)) + 1)
      this.data.members.push({
        id: id,
        name: '',
        twitter: '',
        original: {
          title: '',
          comment: ''
        },
        arrange: {
          title: '',
          comment: ''
        },
        arrangeId: null
      })

      this.sendData()
    },
    removeMember(id) {
      this.$set(this.data, 'members', this.data.members.filter((member) => member.id !== id))

      this.sendData()
    },
    isCurrentMember(id) {
      return this.data.currentMemberId === id
    },
    toggleOriginalShowing() {
      if (this.isShownOriginal) {
        this.data.showingItems.splice(this.data.showingItems.findIndex((item) => item === 'original'), 1)
      } else {
        this.data.showingItems.push('original')
      }

      const cooldownSecond = this.isShownOriginal ? this.showCooldownSecond : this.hideCooldownSecond
      this.isCooldown = true
      setTimeout(() => {
        this.isCooldown = false
      }, cooldownSecond * 1000)

      this.sendData()
    },
    toggleArrangeShowing() {
      if (this.isShownArrange) {
        this.data.showingItems.splice(this.data.showingItems.findIndex((item) => item === 'arrange'), 1)
      } else {
        this.data.showingItems.push('arrange')
      }

      const cooldownSecond = this.isShownArrange ? this.showCooldownSecond : this.hideCooldownSecond
      this.isCooldown = true
      setTimeout(() => {
        this.isCooldown = false
      }, cooldownSecond * 1000)

      this.sendData()
    },
    changeCurrentMemberId(id) {
      if (this.isShownOriginal || this.isShownArrange) return
      if (this.data.members[this.idToIndex(id)].arrangeId !== null) {
        this.data.currentMemberId = id
        this.sendData()
      }
    },
    changeNextMember() {
      this.$set(this.data, 'showingItems', [])

      this.isCooldown = true
      setTimeout(() => {
        this.isCooldown = false
      }, this.hideCooldownSecond * 1000)

      this.sendData()

      const nextIndex = this.getNextIndex()
      this.$set(this.data, 'currentMemberId', this.data.members[nextIndex].id)

      setTimeout(() => { this.sendData() }, 500)
    },
    getNextIndex() {
      const nextIndex = this.data.members.findIndex((member) => member.id === this.data.currentMemberId) + 1
      return this.data.members.length > nextIndex ? nextIndex : 0
    },
    singleClickAlertReservation() {
      if (this.singleClickAlertTimeout) clearTimeout(this.singleClickAlertTimeout)
      this.singleClickAlertTimeout = setTimeout(() => {
        this.singleClickAlertSnackbar = true
      }, 500)
    },
    singleClickAlertCancel() {
      clearTimeout(this.singleClickAlertTimeout)
    },
    sendData() {
      if (this.ws) {
        this.ws.send(JSON.stringify(this.data))
      }
    },
    dragOver(event) {
      if (event.dataTransfer.types.includes('Files')) {
        this.isDragOver = true
      }
    },
    dragLeave(event) {
      this.isDragOver = false
    },
    dropFile(event) {
      if (event.dataTransfer.types.includes('Files')) {
        const file = event.dataTransfer.files[0]
        if (/\.csv$/.test(file.name)) {
          const reader = new FileReader()
          reader.onload = (e) => {
            try {
              const members = []
              const csvArray = csvSync(e.target.result)
              csvArray.shift()
              csvArray.forEach((record) => {
                record.forEach((r)=>console.log(r))
                const [twitter, name] = record[1].split('\n')
                const toArrange = csvArray.find((r) => record[1] === r[5])
                const fromArrange = csvArray.find((r) => record[5] === r[1])
                if (!toArrange) {
                  throw `「${record.join(', ').replace(/\r?\n/g, '↵')}」の行でエラー\nアレンジ者に「${record[1].replace(/\r?\n/g, '↵')}」が存在しません`
                }
                if (!fromArrange) {
                  throw `「${record.join(', ').replace(/\r?\n/g, '↵')}」の行でエラー\n原曲者に「${record[5].replace(/\r?\n/g, '↵')}」が存在しません`
                }
                members.push({
                  id: record[0],
                  name: name,
                  twitter: twitter.split('@')[1],
                  original: {
                    title: record[2],
                    ruby: record[3],
                    comment: record[4]
                  },
                  arrange: {
                    title: toArrange[6],
                    ruby: toArrange[7],
                    comment: toArrange[8]
                  },
                  arrangeId: fromArrange[0]
                })
              })
              this.$set(this.data, 'members', members)
              this.data.currentMemberId = this.data.members[0].id
              this.isLoading = false
              this.sendData()
            } catch (e) {
              this.errorMessage = e
              this.errorSnackbar = true
              this.isLoading = false
            }
          }
          reader.readAsText(file)
          this.isLoading = true
          this.isDragOver = false
        }
      }
    },
    idToIndex(id) {
      return this.data.members.findIndex((member) => member.id === id)
    },
    toSpaceWhenEmpty(str) {
      return !str ? '　' : str
    }
  }
}
</script>

<style>
.mplus1p {
  font-family: 'M PLUS 1p', sans-serif !important;
}

.flip-list-move {
  transition: transform .3s cubic-bezier(.25,0.8,0.5,1) !important;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.seven-eighth-font {
  font-size: 0.875rem;
}

.enter {
  opacity: 0.5;
}
</style>