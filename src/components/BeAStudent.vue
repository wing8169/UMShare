<template>
  <div id="be-a-student">
    <h1>Join Classes</h1>
    <input type="text" placeholder="Search">
    <class-card v-for="c in classes" v-bind:class_info="c" v-bind:uid="uid"></class-card>
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
        classes: [],
        user_info:{

        }
      }
    },
    mounted(){
      // if nothing then {}
      if(!this.classes) this.classes = {};
      // get the user_info
      this.$firebase_basic.database().ref('users/' + this.uid).once('value').then((data)=> {
        this.user_info = data.val();
      });
      // grab the classes data and put in this.classes
      this.$firebase_basic.database().ref('classes').on('value', (data)=> {
        let tmp = data.val();
        // if nothing then {}
        if(!tmp) tmp = {};
        for (let k in tmp) {
          // push to the list-to-display if the key not exists in user_info.class
          if (!this.user_info.class_learn.includes(tmp[k].key) && !this.user_info.class_teach.includes(tmp[k].key)) {
            this.classes.push(tmp[k]);
          }
        }
      });
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
