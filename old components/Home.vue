<template>
  <div id="content">
    <el-container>
      <el-aside width="20%" id="navBar">
        <nav>
          <el-row type="flex" justify="center">
            <h1 id="title">UM SHARE</h1>
          </el-row>
          <el-row type="flex" justify="center">
            <p id="subtitle">To share, to learn, to earn</p>
          </el-row>
          <el-row type="flex" justify="center">
            <el-button v-on:click="facebookLogout" id="logOut">Log Out</el-button>
          </el-row>
          <el-menu default-active="2">
            <el-menu-item index="1" v-on:click="crt_component = 'my-profile'">
              <a>My Profile</a>
            </el-menu-item>
            <el-menu-item index="2" v-on:click="crt_component = 'my-groups'">
              <a>My Groups</a>
            </el-menu-item>
            <el-menu-item index="3" v-on:click="crt_component = 'join-a-group'">
              <a>Join a Group</a>
            </el-menu-item>
            <el-menu-item index="4" v-on:click="crt_component = 'be-a-student'">
              <a>Be a Student</a>
            </el-menu-item>
            <el-menu-item index="5" v-on:click="crt_component = 'be-a-teacher'">
              <a>Be a Teacher</a>
            </el-menu-item>
            <el-menu-item index="6" v-on:click="crt_component = 'send-feedback'">
              <a>Send Feedback</a>
            </el-menu-item>
          </el-menu>
        </nav>
      </el-aside>
      <el-container id="contents">
        <el-main>
          <component v-bind:is="crt_component" v-bind:uid="uid"></component>
        </el-main>
        <el-footer>
          <h3>You only have to know one thing;</h3>
          <h2>You can learn anything</h2>
          <custom-footer></custom-footer>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import myProfile from "./myProfile.vue";
  import myGroups from "./myGroups.vue";
  import joinAGroup from "./joinAGroup.vue";
  import beAStudent from "./beAStudent.vue";
  import beATeacher from "./beATeacher.vue";
  import sendFeedBack from "./sendFeedBack.vue";
  import CustomFooter from "./Footer.vue";
  export default {
    name: "home",
    components:{
      'my-profile': myProfile,
      'my-groups': myGroups,
      'join-a-group': joinAGroup,
      'be-a-student': beAStudent,
      'be-a-teacher': beATeacher,
      'send-feedback': sendFeedBack,
      'custom-footer': CustomFooter
    },
    props: ["uid"],
    data(){
      return{
        crt_component: "my-groups",
        temp: []
      }
    },
    mounted(){
      // When the page is loaded, add an event listener for authentication state change.
      this.$firebase.auth().onAuthStateChanged((user)=>{
        if(!user){
          // if the user does not exist, push back to the main page
          this.$router.push({path: "/"});
        }
      });
    },
    methods:{
      facebookLogout: function(){
        this.$firebase_basic.database().ref("activeUsers").once('value').then((data)=>{
          this.temp = data.val();
          if(!this.temp) this.temp = [];
          let index = this.temp.indexOf(this.uid);
          if(index != -1) this.temp.splice(index, 1);
        }).then(()=>{
          this.$firebase_basic.database().ref("activeUsers").set(this.temp);
        }).then(()=>{
          this.$firebase_basic.auth().signOut().then(()=>{
            // log out and push to main page
            this.$router.push({path: "/"});
          });
        });
      }
    }
  }
</script>

<style scoped>
  #logOut{
    margin-bottom: 30px;
  }
  #navBar{
    min-width: 300px;
  }
  #title{
    font-size: 2.5em;
    margin-bottom: 0;
  }
  #subtitle{
    font-size: 1.5em;
  }
  a{
    font-size: 1.5em;
  }
  #contents{
    min-width: 500px;
  }
</style>
