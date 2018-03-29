<template>
  <div id="mainPage">
    <header id="first_page">
      <h1>UM SHARE</h1>
      <p>To share, to learn, to earn</p>
      <button v-on:click="facebookLogin">Begin</button>
    </header>
    <nav>
      <a href="#first_page">UM Share</a>
      <a href="#second_page">About</a>
      <a href="#third_page">Services</a>
      <a href="#forth_page">Contact</a>
    </nav>
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
    <custom-footer></custom-footer>
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
            group: [0],
            class_learn: [0],
            class_teach: [0],
            quited_group: [0],
            deleted_class_learn: [0],
            deleted_class_teach: [0],
            chat_history: [0],
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
            console.log(this.user);
          }
          else{
            let provider = new this.$firebase_basic.auth.FacebookAuthProvider();
            this.$firebase.auth().languageCode = 'en_US';
            this.$firebase.auth().signInWithPopup(provider).then((result) => {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              let token = result.credential.accessToken;
              // The signed-in user info.
              let user = result.user;
              this.token = token;
              this.user = user;
            }).then(()=>{
              this.$firebase_basic.database().ref('users/' + this.user.uid).once('value').then((data)=>{
                // if data is null, create new user account for user
                if(!data.val()){
                  this.user_details.username = this.user.displayName;
                  this.user_details.profile_pic = this.user.photoURL;
                  this.$firebase_basic.database().ref("users/" + this.user.uid).set(this.user_details);
                }
              })
            }).then(()=>{
              this.$router.push({name: "home", params: {uid: this.user.uid}});
            }).catch(function(error) {
              console.log(error);
            });
          }
        }
      }
    }
</script>

<style scoped>

</style>
