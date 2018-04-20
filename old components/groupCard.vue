<template>
  <div id="group-card">
    <div id="front" v-on:mouseenter="showFront = false" v-show="showFront">
      <h3>{{ group_info.name }}</h3>
      <h3>{{ group_info.key }}</h3>
      <img v-bind:src="this.image" alt="No Image">
    </div>
    <div id="back" v-show="!showFront" v-on:mouseleave="showFront = true">
      <h3>{{ group_info.members.length}}</h3>
      <p>{{ group_info.desc }}</p>
      <p></p>
    </div>
    <form>
      <button v-on:click.once="joinGroup">Join Now</button>
    </form>
  </div>
</template>

<script>
    export default {
      props:["group_info", "uid"],
      name: "group-card",
      data(){
        return{
          showFront: true,
          temp: [],
          image: ""
        }
      },
      mounted(){
        // grab the group_info image
        this.$firebase_basic.storage().ref(this.group_info.image).getDownloadURL().then((url) => {
          this.image = url;
        });
      },
      methods:{
        joinGroup: function(){
          // update the user group data
          this.$firebase_basic.database().ref("users/" + this.uid + "/group").once('value').then((data)=>{
            this.temp = data.val();
            if(!this.temp) this.temp = [];
            this.temp.push(this.group_info.key);
          }).then(()=>{
            this.$firebase_basic.database().ref("users/" + this.uid + "/group").set(this.temp);
          });
          // update the group user data
          this.group_info.members.push(this.uid);
          this.$firebase_basic.database().ref("groups/" + this.group_info.key + "/members").set(this.group_info.members);
        }
      }
    }
</script>

<style scoped>

</style>
