<template>
  <div id="be-a-student">
    <h1>Join Classes</h1>
    <input type="text" placeholder="Search">
    <class-card v-for="c in classes" v-if="!user_info.class_learn.includes(c.key) && !user_info.class_teach.includes(c.key)"  v-bind:class_info="c" v-bind:uid="uid"></class-card>
  </div>
</template>

<script>
  import classCard from "./classCard.vue";
  export default {
    name: "be-a-student",
    props: ["uid"],
    components: {
      "class-card": classCard
    },
    data(){
      return{
        classes: {},
        user_info:{
          class_learn: [],
          class_teach: [],
          name: ""
        }
      }
    },
    mounted(){
      this.$firebase_basic.database().ref('classes').on('value', (data)=> {
        this.classes = data.val();
      });
      if(!this.classes) {
        this.classes = {};
      }
      this.$firebase_basic.database().ref('users/' + this.uid).once('value').then((data)=> {
        this.user_info.class_learn = data.val().class_learn;
        this.user_info.class_teach = data.val().class_teach;
        this.user_info.name = data.val().username;
      });
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
