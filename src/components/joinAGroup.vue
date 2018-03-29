<template>
  <div id="join-a-group">
    <h1>Join A Group</h1>
    <input type="text" placeholder="Search">
    <group-card v-for="g in groups" v-if="!user_info.group.includes(g.key)"  v-bind:group_info="g" v-bind:uid="uid"></group-card>
    <h3>Create a Group within 5 Minutes</h3>
    <form>
      <label>Group Name:</label>
      <input type="text" v-model="group_info.name">
      <label>Description:</label>
      <input type="text" v-model="group_info.desc">
      <button v-on:click="createGroup">Create a Group</button>
    </form>
  </div>
</template>

<script>
    import groupCard from "./groupCard.vue";
    export default {
      name: "join-a-group",
      props: ["uid"],
      components: {
        "group-card": groupCard
      },
      data(){
        return{
          groups: {},
          group_info:{
            name: "",
            desc: "",
            image: "",
            chat: [{time: 0, id: "default", name:"System" ,msg: "yolo, welcome to the text chat system"}],
            pinned_msg: {time: 0, id: "default", name: "default", msg: "yolo"},
            admin: [this.uid],
            members: [this.uid],
            banned: [0]
          },
          user_info:{
            group: [],
            name: ""
          }
        }
      },
      mounted(){
        this.$firebase_basic.database().ref('groups').on('value', (data)=> {
          this.groups = data.val();
        });
        if(!this.groups) {
          this.groups = {};
        }
        this.$firebase_basic.database().ref('users/' + this.uid).once('value').then((data)=> {
          this.user_info.group = data.val().group;
          this.user_info.name = data.val().username;
        });
      },
      methods:{
        createGroup: function(){
          let x = this.$firebase_basic.database().ref("groups").push(this.group_info);
          this.$firebase_basic.database().ref("groups/" + x.key + "/key").set(x.key);
          this.$firebase_basic.database().ref('groups').on('value', (data)=> {
            this.groups = data.val();
          });
          this.$firebase_basic.database().ref("users/" + this.uid + "/group").once('value').then((data)=>{
              this.temp = data.val();
              this.temp.push(x.key);
            }).then(()=>{
              this.$firebase_basic.database().ref("users/" + this.uid + "/group").set(this.temp);
            });
        },
      }
    }
</script>

<style scoped>

</style>
