<template>
  <div>
    <el-container id="mainPage" style="min-width: 400px;">
      <nav id="navBar">
        <el-menu mode="horizontal" background-color="#000"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <el-menu-item index="1"><a href="#first_page">UM Share</a></el-menu-item>
          <el-menu-item index="2"><a href="#second_page">About</a></el-menu-item>
          <el-menu-item index="3"><a href="#third_page">Services</a></el-menu-item>
          <el-menu-item index="4"><a href="#forth_page">Contact</a></el-menu-item>
        </el-menu>
      </nav>
      <div id="first_page">
        <el-header>
          <h1 align="center">UM SHARE</h1>
        </el-header>
        <p align="center">To share, to learn, to earn</p>
        <el-button type="primary" v-on:click="facebookLogin" style="margin: auto; display: block;">Begin</el-button>
      </div>
      <el-main>
        <article id="second_page">
          <header>
            <h1>About us</h1>
          </header>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </article>
        <section id="third_page">
          <header>
            <h1>Services</h1>
          </header>
          <figure>
            <img src="../assets/icon_01.png">
            <figcaption>
              <h2>Peer-to-peer</h2>
              <p>Students join a group which have  people with same interest to practice the skills.</p>
            </figcaption>
          </figure>
          <figure>
            <img src="../assets/icon_02.png">
            <figcaption>
              <h2>Students</h2>
              <p>Students pay for a teacher who can professionally teach them at particular skills.</p>
            </figcaption>
          </figure>
          <figure>
            <img src="../assets/icon_03.png">
            <figcaption>
              <h2>Teachers</h2>
              <p>Students who are professional at a particular skill can teach other students with charges.</p>
            </figcaption>
          </figure>
        </section>
      </el-main>
      <el-footer id="forth_page">
        <custom-footer></custom-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import CustomFooter from "./Footer.vue";
  export default {
      name: "main-page",
      components:{
        "custom-footer": CustomFooter
      },
      data(){
        return{
          token: "",
          user: null,
          user_details:{
            username: "",
            profile_pic: "",
            group: [],
            class_learn: [],
            class_teach: [],
            quited_group: [],
            deleted_class_learn: [],
            deleted_class_teach: [],
            chat_history: [],
            biography: "",
            contact: "",
            birthday: "",
            faculty: "",
            course: "",
            rating: {num: 0, star: 0}
          }
        }
      },
      methods:{
        facebookLogin: function(){
          if(this.user){
            // if exist, navigate to home page, push user id to home page
            this.$router.push({name: "home", params: {uid: this.user.uid}});
          }
          else{
            let provider = new this.$firebase_basic.auth.FacebookAuthProvider();
            this.$firebase.auth().languageCode = 'en_US';
            this.$firebase.auth().signInWithPopup(provider).then((result) => {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              let token = result.credential.accessToken;
              // The signed-in user info.
              let user = result.user;
              // token and user
              this.token = token;
              this.user = user;
            }).then(()=>{
              // go to the database and grab user details for this user id
              this.$firebase_basic.database().ref('users/' + this.user.uid).once('value').then((data)=>{
                // if data is null, create new user account for user
                if(!data.val()){
                  this.user_details.username = this.user.displayName;
                  this.user_details.profile_pic = this.user.photoURL;
                  this.$firebase_basic.database().ref("users/" + this.user.uid).set(this.user_details);
                }
              })
            }).then(()=>{
              this.$firebase_basic.database().ref("activeUsers").once('value').then((data)=>{
                this.temp = data.val();
                if(!this.temp) this.temp = [];
                let index = this.temp.indexOf(this.user.uid);
                if(index === -1)
                  this.temp.push(this.user.uid);
              }).then(()=>{
                this.$firebase_basic.database().ref("activeUsers").set(this.temp);
              })
            }).then(()=>{
              // navigate to the home page, push user id to home page
              this.$router.push({name: "home", params: {uid: this.user.uid}});
            }).catch(function(error) {
              // rofl just log the error
              console.log(error);
            });
          }
        }
      }
    }
</script>

<style scoped>
  #first_page, #second_page, #third_page, #forth_page{
    height: 100vh;
  }
  #first_page{
    background-image: url("../assets/bg02.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

  }
  #navBar{
    overflow: hidden;
    position: sticky;
    top: 0;
    width: 100%;
  }
</style>
