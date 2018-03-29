<template>
  <div id="group-card">
    <div id="front" v-on:mouseenter="showFront = false" v-show="showFront">
      <h3>{{ group_info.name }}</h3>
      <h3>{{ group_info.key }}</h3>
      <img v-bind:src="group_info.image" alt="">
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
          temp: []
        }
      },
      methods:{
        joinGroup: function(){
          this.$firebase_basic.database().ref("users/" + this.uid + "/group").once('value').then((data)=>{
            this.temp = data.val();
            this.temp.push(this.group_info.key);
          }).then(()=>{
            this.$firebase_basic.database().ref("users/" + this.uid + "/group").set(this.temp);
          });
        }
      }
    }
</script>

<style scoped>

</style>
