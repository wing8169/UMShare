<template>
  <div id="be-a-student">
    <h1>Join Classes</h1>
    <p v-if="!user_info.verified">You have to verify your email first in order to use our services!</p>
    <div v-if="user_info.verified">
      <input type="text" placeholder="Search">
      <my-class-card v-for="c in classes" v-bind:class_info="c" v-bind:uid="uid"></my-class-card>
    </div>
  </div>
</template>

<script>
  import myClassCard from "./myClassCard.vue";
  export default {
    name: "be-a-student",
    props: ["uid"],
    components: {
      "my-class-card": myClassCard
    },
    data(){
      return{
        classes: [],
        user_info:{
          username: "",
          profile_pic: "",
          email: "",
          verified: false,
          class_learn: [],
          class_teach: [],
          biography: "",
          contact: "",
          birthday: "",
          faculty: "",
          course: "",
          rating: {num: 0, star: 0},
          review: []
        }
      }
    },
    mounted(){
      // get the user_info
      this.$firebase_basic.database().ref('users/' + this.uid).once('value').then((data)=> {
        this.user_info = data.val();
        if(!this.user_info.class_learn) this.user_info.class_learn = [];
        if(!this.user_info.class_teach) this.user_info.class_teach = [];
        if(!this.user_info.review) this.user_info.review = [];
      }).then(()=>{
        // grab the classes data and put in this.classes
        this.$firebase_basic.database().ref('classes').on('value', (data)=> {
          let tmp = data.val();
          // if nothing then {}
          if(!tmp) tmp = {};
          for (let k in tmp) {
            // push to the classes if the key not exists in user_info.class
            if (!this.user_info.class_learn.includes(tmp[k].key) && !this.user_info.class_teach.includes(tmp[k].key)) {
              if(tmp[k].open_register)
                this.classes.push(tmp[k]);
            }
          }
        });
      });
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
