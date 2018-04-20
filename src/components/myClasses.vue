<template>
  <div id="my_group">
    <h2>Classes Joined</h2>
    <my-class-card v-for="c in send_to_class_learn" v-bind:class_info="c" v-bind:uid="uid"></my-class-card>
    <h2>Classes Teaching</h2>
    <my-class-card v-for="c2 in send_to_class_teach" v-bind:class_info="c2" v-bind:uid="uid"></my-class-card>
  </div>
</template>

<script>
    import myClassCard from "./myClassCard.vue";
    export default {
      components:{
        "my-class-card": myClassCard
      },
      name: "my-classes",
      props: ["uid"],
      data(){
        return{
          // initialize the user_info and class list
          user_info: {},
          send_to_class_learn: [],
          send_to_class_teach: []
        }
      },
      mounted() {
        // on loaded, grab the user_info from database
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          this.user_info = data.val();
          if(!this.user_info.class_learn) this.user_info.class_learn = [];
          if(!this.user_info.class_teach) this.user_info.class_teach = [];
          if(!this.user_info.review) this.user_info.review= [];
        });
        // grab the class_info
        this.$firebase_basic.database().ref("classes").once('value').then((data)=> {
          let tmp = data.val();
          // if nothing then {}
          if(!tmp) tmp = {};
          for (let k in tmp) {
            if (this.user_info.class_learn.includes(tmp[k].key)) {
              this.send_to_class_learn.push(tmp[k]);
            }
            if (this.user_info.class_teach.includes(tmp[k].key)) {
              this.send_to_class_teach.push(tmp[k]);
            }
          }
        }).then(()=>{
          this.user_info.class_learn = this.user_info.class_learn.reverse();
          this.user_info.class_teach = this.user_info.class_teach.reverse();
        });
      }
    }
</script>

<style scoped>

</style>
