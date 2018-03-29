<template>
  <div id="my_group">
    <h1>My Groups</h1>
    <h2>Group Chatrooms Joined</h2>
    <my-group-card v-for="g in send_to_groupcard" v-bind:group_info="g" v-bind:uid="uid"></my-group-card>
    <h2>Classes Joined</h2>
    <p v-for="c in classes_learn" v-if="c != 0">{{ c }}</p>
    <h2>Classes Teaching</h2>
    <p v-for="c2 in classes_teach" v-if="c2 != 0">{{ c2 }}</p>
  </div>
</template>

<script>
    import myGroupCard from './myGroupCard.vue';
    export default {
      components:{
        "my-group-card": myGroupCard
      },
      name: "my-groups",
      props: ["uid"],
      data(){
        return{
          groups: [],
          classes_learn: [],
          classes_teach: [],
          send_to_groupcard: []
        }
      },
      mounted() {
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          this.groups = data.val().group;
          this.classes_learn = data.val().class_learn;
          this.classes_teach = data.val().class_teach;
        });
        this.$firebase_basic.database().ref("groups").once('value').then((data)=> {
          let tmp = data.val();
          for (let k in tmp) {
            if (this.groups.includes(tmp[k].key)) {
              this.send_to_groupcard.push(tmp[k]);
            }
          }
        });
      }
    }
</script>

<style scoped>

</style>
