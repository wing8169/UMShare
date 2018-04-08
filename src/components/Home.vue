<template>
  <div>
    <nav>
      <ul>
        <h1>UM SHARE</h1>
        <p>To share, to learn, to earn</p>
        <button v-on:click="facebookLogout">Log Out</button>
        <li><a v-on:click="crt_component = 'my-profile'">My Profile</a></li>
        <li><a v-on:click="crt_component = 'my-groups'">My Groups</a></li>
        <li><a v-on:click="crt_component = 'join-a-group'">Join a Group</a></li>
        <li><a v-on:click="crt_component = 'be-a-student'">Be a Student</a></li>
        <li><a v-on:click="crt_component = 'be-a-teacher'">Be a Teacher</a></li>
        <li><a v-on:click="crt_component = 'send-feedback'">Send Feedback</a></li>
      </ul>
    </nav>
    <component v-bind:is="crt_component" v-bind:uid="uid"></component>
    <h3>You only have to know one thing;</h3>
    <h2>You can learn anything</h2>
    <custom-footer></custom-footer>
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
        crt_component: "my-groups"
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
        this.$firebase_basic.auth().signOut().then(()=>{
          // log out and push to main page
          this.$router.push({path: "/"});
        })
      }
    }
  }
</script>

<style scoped>

</style>
