<template>
<section class="card">
  <UserPropsBlock
                  :title="USER_PROPS_TITLE.NAME"
                  :isEdit="editName"
                  :userProps="userName"
                  :clickEdit="editUserProps"
                  :clickSave="clickSave"
                  :editButtonId="EDIT_PROPS.NAME"
                  :saveButtonId="SAVE_PROPS.SNAME"
                  :changeValue="changeName"
                  :saveProp="newName"
  />
  <UserPropsBlock
                  :title="USER_PROPS_TITLE.CUSTOM"
                  :isEdit="editCustomName"
                  :userProps="userCastomName"
                  :clickEdit="editUserProps"
                  :clickSave="clickSave"
                  :editButtonId="EDIT_PROPS.CUSTOM"
                  :saveButtonId="SAVE_PROPS.SCUSTOM"
                  :changeValue="changeCastomName"
                  :saveProp="newCastomName"
  />
  <UserPropsBlock
                  :title="USER_PROPS_TITLE.EMAIL"
                  :isEdit="editEmail"
                  :userProps="userEmail"
                  :clickEdit="editUserProps"
                  :clickSave="clickSave"
                  :editButtonId="EDIT_PROPS.EMAIL"
                  :saveButtonId="SAVE_PROPS.SEMAIL"
                  :changeValue="changeEmail"
                  :isValid="emailVaild"
                  :saveProp="newEmail"
  />
  <UserPropsBlock
                  :title="USER_PROPS_TITLE.REG_DATE"
                  :userProps="getDate(user.register_date)"
                  :showButtons="false"
  />
  <UserPropsBlock
                  :title="USER_PROPS_TITLE.BALANCE"
                  :userProps="user.balance.toFixed(2)"
                  :showButtons="false"
  />

  <UserPropsBlock
                  :title="USER_PROPS_TITLE.USER_BALANCE"
                  :userProps="user.wallet_amount.toFixed(2) + ' ' + (user.wallet_currency ? user.wallet_currency : '---')"
                  :showButtons="false"
  />

  <UserPropsBlock
                  :title="USER_PROPS_TITLE.ENABLED"
                  :userProps="user.enabled ? 'Yes' : 'No'"
                  :showButtons="false"
  />
</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import uuid from 'uuid'
import * as dayjs from 'dayjs'
import UserPropsBlock from '../UserPropsBlock/UserPropsBlock'
import { DATE_FORMAT_DDMMYYYY,
          SAVE_PROPS,
          EDIT_PROPS,
          USER_PROPS_TITLE,
          EMAIL_REG_EXP } from '../../const/const'

export default {
  name: 'UserCard',
  components: {
    UserPropsBlock
  },
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      editName: false,
      editCustomName: false,
      editEmail: false,
      newName: false,
      newCastomName: false,
      newEmail: false,
      emailVaild: true,
      SAVE_PROPS,
      EDIT_PROPS,
      USER_PROPS_TITLE
    }
  },
  mounted() {
    const meta = uuid();
    this.setUserName({
      meta,
      data: this.user.user_name
    })
    this.setUserCustomName({
      meta,
      data: this.user.user_custom
    })
    this.setUserEmail({
      meta,
      data: this.user.email
    })
  },
  computed: {
    ...mapGetters('user', [
      'getUserName',
      'getUserCustomName',
      'getUserEmail'
    ]),
    userName: {
      get () {
        return this.getUserName //|| this.user.user_name
      },
      set (val) {
        this.setUserName({
          meta: uuid(),
          data: val
        })
      }
    },
    userCastomName: {
      get () {
        return this.getUserCustomName //|| this.user.user_custom
      },
      set (val) {
        this.setUserCustomName({
          meta: uuid(),
          data: val
        })
      }
    },
    userEmail: {
      get () {
        return this.getUserEmail // || this.user.email
      },
      set (val) {
        if(!EMAIL_REG_EXP.test(val)) {
          this.emailVaild = false
        } else {
          this.emailVaild = true
        }
        this.setUserEmail({
          meta: uuid(),
          data: val
        })
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'setUserName',
      'setUserCustomName',
      'setUserEmail',
      'setEditPropsUser'
    ]),
    editUserProps(event){
      switch(event.target.id) {
        case EDIT_PROPS.NAME:
          this.editName = !this.editName
          this.userName = this.user.user_name
          if (this.newName) {
            this.newName = false
          }
          break
        case EDIT_PROPS.CUSTOM:
          this.editCustomName = !this.editCustomName
          this.userCustomName = this.user.user_custom
          if (this.newCastomName) {
            this.newCastomName = false
          }
          break
        case EDIT_PROPS.EMAIL:
          this.editEmail = !this.editEmail
          this.userEmail = this.user.email
          if (this.newEmail) {
            this.newEmail = false
          }
          break
      }
    },
    clickSave(event) {
      const meta= uuid()
      const target = event.target.id
      switch(target) {
        case SAVE_PROPS.SNAME:
          this.editName = false
          this.newName = true
          break
        case SAVE_PROPS.SCUSTOM:
          this.editCustomName = false
          this.newCastomName = true
          break
        case SAVE_PROPS.SEMAIL:
          this.editEmail = false
          this.newEmail = true
          break
      }
      this.setEditPropsUser({
        meta,
        data: target
      })
    },
    getDate(date) {
      return dayjs(date).format(DATE_FORMAT_DDMMYYYY)
    },
    changeName(val) {
      this.userName = val
    },
    changeCastomName(val) {
      this.userCastomName = val
    },
    changeEmail(val) {
      this.userEmail = val
    }
  }
}
</script>