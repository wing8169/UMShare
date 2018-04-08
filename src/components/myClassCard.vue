<template>
  <div id="group-card">
    <div id="front" v-on:mouseenter="showFront = false" v-if="showFront">
      <h3>{{ class_info.name }}</h3>
      <h3>{{ class_info.key }}</h3>
      <img v-bind:src="this.image" alt="">
    </div>
    <div id="back" v-if="!showFront" v-on:mouseleave="showFront = true">
      <h3>{{ class_info.name }}</h3>
      <h3>{{ class_info.key }}</h3>
      <h4>Conductor Name:</h4>
      <h5>{{ name }}</h5>
      <h4>Rating: {{ num }}</h4>
      <h5>{{ rating }}</h5>
      <p></p>
    </div>
    <form>
      <button v-on:click="" type="button">Go Now</button>
    </form>
  </div>
</template>

<script>
  export default {
    props:["class_info", "uid"],
    name: "my-class-card",
    data(){
      return{
        name: "",
        num: 0,
        rating: 0,
        image: "",
        showFront: true
      }
    },
    methods:{

    },
    mounted(){
      // on load, refer to the conductor_info and pass to name, num, rating
      this.$firebase_basic.database().ref("users/" + this.class_info.conductor).on('value', (data)=>{
        this.name = data.val().username;
        this.num = data.val().rating.num;
        this.rating = data.val().rating.star;
      });
      // grab the image from storage and pass it to image
      this.$firebase_basic.storage().ref(this.class_info.image).getDownloadURL().then((url) => {
        this.image = url;
      });
    }
  }
</script>

<style scoped>

</style>
