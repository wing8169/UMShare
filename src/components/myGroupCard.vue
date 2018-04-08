<template>
  <div id="my-group-card">
    <div id="front" v-on:mouseenter="showFront = false" v-if="showFront">
      <h3>{{ group_info.name }}</h3>
      <h3>{{ group_info.key }}</h3>
      <img v-bind:src="this.image" alt="">
    </div>
    <div id="back" v-if="!showFront" v-on:mouseleave="showFront = true">
      <h3>{{ group_info.members.length - 1}}</h3>
      <p>{{ group_info.desc }}</p>
      <p></p>
    </div>
    <form>
      <button v-on:click="" type="button">Go Now</button>
      <button v-on:click="quitGroup" type="button">Quit</button>
    </form>
  </div>
</template>

<script>
  export default {
    props:["group_info", "uid"],
    name: "my-group-card",
    data(){
      return{
        // default show the front page
        showFront: true,
        // temp for temporarily storing user_info.group
        temp: [],
        // group image
        image: ""
      }
    },
    mounted(){
      // on loaded, load the group image from storage
      this.$firebase_basic.storage().ref(this.group_info.image).getDownloadURL().then((url) => {
        this.image = url;
      });
    },
    methods:{
      quitGroup: function(){
        this.$firebase_basic.database().ref("users/" + this.uid + "/group").once('value').then((data)=>{
          // grab the user_info.group from database and put in temp
          this.temp = data.val();
          // get the index of the key in temp
          let index = this.temp.indexOf(this.group_info.key);
          if(index > -1)
            this.temp.splice(index, 1);  // remove the key
        }).then(()=>{
          // update the user_info.group
          this.$firebase_basic.database().ref("users/" + this.uid + "/group").set(this.temp);
        });
        // update group user data
        this.$firebase_basic.database().ref("groups/" + this.group_info.key + "/members").once('value').then((data)=>{
          this.temp = data.val();
          let index = this.temp.indexOf(this.uid);
          if(index > -1)
            this.temp.splice(index, 1);  // remove the key
        }).then(()=>{
          this.$firebase_basic.database().ref("groups/" + this.group_info.key + "/members").set(this.temp);
        });
      }
    }
  }
</script>

<style scoped>

</style>
