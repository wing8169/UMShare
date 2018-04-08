<template>
  <div id="my_group">
    <h1>My Groups</h1>
    <h2>Group Chat rooms Joined</h2>
    <my-group-card v-for="g in send_to_groupcard" v-bind:group_info="g" v-bind:uid="uid"></my-group-card>
    <h2>Classes Joined</h2>
    <my-class-card v-for="c in send_to_class_learn" v-bind:class_info="c" v-bind:uid="uid"></my-class-card>
    <h2>Classes Teaching</h2>
    <my-class-card v-for="c2 in send_to_class_teach" v-bind:class_info="c2" v-bind:uid="uid"></my-class-card>
  </div>
</template>

<script>
    import myGroupCard from './myGroupCard.vue';
    import myClassCard from "./myClassCard.vue";
    export default {
      components:{
        "my-group-card": myGroupCard,
        "my-class-card": myClassCard
      },
      name: "my-groups",
      props: ["uid"],
      data(){
        return{
          // initialize the user_info, group list and class list
          user_info: {},
          send_to_groupcard: [],
          send_to_class_learn: [],
          send_to_class_teach: []
        }
      },
      mounted() {
        // on loaded, grab the user_info from database
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          this.user_info = data.val();
        });
        // grab the group_info
        this.$firebase_basic.database().ref("groups").once('value').then((data)=> {
          let tmp = data.val();
          // if nothing then {}
          if(!tmp) tmp = {};
          for (let k in tmp) {
            // push to the list-to-display if the key exists in user_info.group
            if (this.user_info.group.includes(tmp[k].key)) {
              this.send_to_groupcard.push(tmp[k]);
            }
          }
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
        });
      }
    }
</script>

<style scoped>

</style>
