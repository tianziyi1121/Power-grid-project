<template>
    <div class="user-avatar-dropdown">
        <Dropdown @on-click="handleClick">
            <Badge :dot="!!messageUnreadCount">
                <Avatar :src="defaultUserAvatar" />
            </Badge>
            <Icon :size="18" type="md-arrow-dropdown"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="userhome">个人主页</DropdownItem>
                <DropdownItem name="logout">退出登录</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAYAAAAbW8YEAAACqUlEQVRIibWWzYtNcRjHP/fOmBmESMZLIlKSJKnRRGOUsPCSjSQkxR9gQyyUUkpJUSKlbGyspCiJFRtKQ4QFkhoW3t+Nj8V5Tve47r3n3Nt46qnzO+f3PJ/f2/M9v5JKQesCFgBrgeXABOANcAO4BAwAPwplUvO8TV2qPvZvG6pqP1B71HJezjzgSPVcJvFldYs6T52lzle3qdcyfU6pna1CuwKi+lLtVzvq9O1UV6lvov+FRuBG0MOR4LY6MW/JwierAxG3t1notAj8qs4uCEx9nvoz4msOtl7g2Qg61CQQtaQei/ijRaGj1EH1YwuzTH1+rNILa5yDco0qmgFMBJ4Cz4sWcZU9AZ4B3cCU6o+1oOPi/QdgqEXoT+Az0AGMLQJNVaUDKLUILUXu3zGAXOgr4BswHRjTInQ8MBX4BAwWgQ4Cj4BpQF+L0FUk+3kfePfP1zqnb10c+VvmSFoNH6nei/j+Zuq0LRO4J2qvaI0eyAy4pvjn1VqqLIdr1VuVd1kRhe/qnHp980beF0WuiQYvMxGPtphVmzpaXaHejX4fTX5xdfOWNPcnPhs4A/RH+zVwNQ7cZGA1iZgAXAF2Ay8aJWwvcBIFfmXak4CtdfoWE5MGyzBTPRn7o8lN4aK6Xe1VF5ncKHapV63YZ/W4Or3ZPe2NvUmT7FMnWP8Ul9Ru9UhmkO/VxUWhOzKjPqGOzzls1d7t31ecTXnQNVYuXLsbzCzPyyb1bcy8rx50oZXy2NwirHrJd0a+t+rcaugIK3eb/cMAzIIPRt6bansWujE+PDXRzuGCEvkeRv7+FNqpvoqX64cZmPrKyD+gjsBEwjQR+FH/CdqhXg9OXxnYEDpxHvhSSFGatx/A6XjeUQaWROPOfwKmdjfgPe0kN752ckR6GCz9UQz9AdzjaN8Kth2/AAAAAElFTkSuQmCC'
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      defaultUserAvatar: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAYAAAAbW8YEAAACqUlEQVRIibWWzYtNcRjHP/fOmBmESMZLIlKSJKnRRGOUsPCSjSQkxR9gQyyUUkpJUSKlbGyspCiJFRtKQ4QFkhoW3t+Nj8V5Tve47r3n3Nt46qnzO+f3PJ/f2/M9v5JKQesCFgBrgeXABOANcAO4BAwAPwplUvO8TV2qPvZvG6pqP1B71HJezjzgSPVcJvFldYs6T52lzle3qdcyfU6pna1CuwKi+lLtVzvq9O1UV6lvov+FRuBG0MOR4LY6MW/JwierAxG3t1notAj8qs4uCEx9nvoz4msOtl7g2Qg61CQQtaQei/ijRaGj1EH1YwuzTH1+rNILa5yDco0qmgFMBJ4Cz4sWcZU9AZ4B3cCU6o+1oOPi/QdgqEXoT+Az0AGMLQJNVaUDKLUILUXu3zGAXOgr4BswHRjTInQ8MBX4BAwWgQ4Cj4BpQF+L0FUk+3kfePfP1zqnb10c+VvmSFoNH6nei/j+Zuq0LRO4J2qvaI0eyAy4pvjn1VqqLIdr1VuVd1kRhe/qnHp980beF0WuiQYvMxGPtphVmzpaXaHejX4fTX5xdfOWNPcnPhs4A/RH+zVwNQ7cZGA1iZgAXAF2Ay8aJWwvcBIFfmXak4CtdfoWE5MGyzBTPRn7o8lN4aK6Xe1VF5ncKHapV63YZ/W4Or3ZPe2NvUmT7FMnWP8Ul9Ru9UhmkO/VxUWhOzKjPqGOzzls1d7t31ecTXnQNVYuXLsbzCzPyyb1bcy8rx50oZXy2NwirHrJd0a+t+rcaugIK3eb/cMAzIIPRt6bansWujE+PDXRzuGCEvkeRv7+FNqpvoqX64cZmPrKyD+gjsBEwjQR+FH/CdqhXg9OXxnYEDpxHvhSSFGatx/A6XjeUQaWROPOfwKmdjfgPe0kN752ckR6GCz9UQz9AdzjaN8Kth2/AAAAAElFTkSuQmCC'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(['querylogOut']),
    makelogout () {
      let params = {
        token: this.token
      }
      let _this = this
      _this.$store.dispatch('querylogOut', params).then((res) => {
        _this.$Message.success('退出登录成功')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('res')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch((res) => {
        _this.$Message.error('退出登录失败')
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    goRoute () {
      this.$router.push('/auxiliary_function/personal/homepage')
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.makelogout()
          break
        case 'userhome': this.goRoute()
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.user{
  &-avatar-dropdown{
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    .ivu-badge-dot{
      top: 16px;
    }
  }
}
.ivu-icon-md-expand:before, .ivu-icon-md-contract:before,.ivu-icon-md-arrow-dropdown:before{
  color:#fff;
}
</style>
