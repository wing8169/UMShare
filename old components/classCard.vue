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
    <button v-on:click="showModal = true" type="button">Details</button>
    <class-detail v-if="showModal" v-on:close="showModal = false" v-bind:class_info="class_info" v-bind:uid="uid"></class-detail>
  </div>
</template>

<script>
  import classDetails from "./ClassDetails.vue";
  export default {
    components:{
      "class-detail": classDetails
    },
    props:["class_info", "uid"],
    name: "class-card",
    data(){
      return{
        showModal: false,
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
      // grab the teacher info, update name, num and rating
      this.$firebase_basic.database().ref("users/" + this.class_info.conductor).on('value', (data)=>{
        this.name = data.val().username;
        this.num = data.val().rating.num;
        this.rating = data.val().rating.star;
      });
      // get the class image
      this.$firebase_basic.storage().ref(this.class_info.image).getDownloadURL().then((url) => {
        this.image = url;
      });
    }
  }
</script>

<style scoped>

</style>
