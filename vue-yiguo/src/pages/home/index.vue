<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <img src="http://static01.yiguo.com/www/images/header/logo.png" alt /> 易果生鲜管理系统
        </el-col>
        <el-col :span="12" style="text-align:right">
          <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary" class="el-dropdown-link">{{username}}</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item command="btnLogout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          style="height:100%"
          :default-active="$route.path"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          router
        >
          <template v-for="item in menu">
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <el-submenu :key="item.path" :index="item.text" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>
              <el-menu-item
                :key="sub.text"
                :index="item.path+sub.path"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>

      <el-main>
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>-->
        <div style="padding:15px 0;">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      activeIndex: "/main",
      openMenu: [],
      username: "",
      menu: [
        {
          text: "首页",
          path: "/main",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
          submenu: [
            {
              text: "用户编辑",
              path: "/edit",
            },
            {
              text: "用户列表",
              path: "/list",
            },
            {
              text: "用户添加",
              path: "/add",
            },
          ],
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-grape",
          submenu: [
            {
              text: "冰鲜",
              path: "/binxian",
            },
            {
              text: "海鲜",
              path: "/haixian",
            },
            {
              text: "料理食材",
              path: "/liaoli",
            },
            {
              text: "龙虾",
              path: "/longxia",
            },
            {
              text: "水产",
              path: "/shuican",
            },
            {
              text: "重磅推荐",
              path: "/zhongbang",
            },
          ],
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order",
        },
      ],
    };
  },
  methods: {
    goto(path, idx) {
      this.$router.push(path);
      this.currentIndex = idx;
    },
    back() {
      this.$router.back();
    },

    //  登出
    handleCommand(command) {
      if (command === "btnLogout") {
        localStorage.removeItem("currentUser");
        this.$router.push("/login");
      }
    },
  },
  components: {},
  async created() {
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    if (!currentUser) {
      this.$router.push("/login");
    } else {
      // 校验token的有效性
      const result = await fetch(
        `http://120.24.62.247:2003/api/jwtverify?authorization=${currentUser.authorization}`
      ).then((res) => res.json());

      if (result.code === 0) {
        localStorage.removeItem("currentUser");
        this.$router.push("/login");
      } else {
        // 显示用户信息
        this.username = currentUser.username;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  // text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

.header {
  line-height: 60px;
  color: #fff;
  background-color: #e0e0e0;
  .logo {
    font-size: 24px;
    color: #008842;
    img {
      font-size: 40px;
      vertical-align: middle;
      margin: 5px;
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
.el-container {
  height: 100%;
}
</style>
