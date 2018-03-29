<template>
  <div id="group-card">
    <div id="front" v-on:mouseenter="showFront = false" v-show="showFront">
      <h3>{{ class_info.name }}</h3>
      <h3>{{ class_info.key }}</h3>
      <img v-bind:src="this.image" alt="">
    </div>
    <div id="back" v-show="!showFront" v-on:mouseleave="showFront = true">
      <h3>{{ class_info.name }}</h3>
      <h3>{{ class_info.key }}</h3>
      <h4>Conductor Name:</h4>
      <h5>{{ name }}</h5>
      <h4>Rating: {{ num }}</h4>
      <h5>{{ rating }}</h5>
      <p></p>
    </div>
    <form>
      <button v-on:click="">Details</button>
    </form>
  </div>
</template>

<script>
  export default {
    props:["class_info", "uid"],
    name: "class-card",
    data(){
      return{
        name: "",
        num: 0,
        rating: 0,
        image: "",
        showFront: true,
        user_info: {}
      }
    },
    methods:{

    },
    mounted(){
      this.$firebase_basic.database().ref("users/" + this.uid).on('value', (data)=>{
        this.name = data.val().username;
        this.num = data.val().rating.num;
        this.rating = data.val().rating.star;
      });
    }
  }
</script>

<style scoped>

</style>
