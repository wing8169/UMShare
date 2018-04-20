<template>
  <div id="my-class-card">
    <div>
      <h3>{{ class_info.name }}</h3>
      <h3>{{ class_info.key }}</h3>
      <h3>Conducted by {{ name }}</h3>
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
        name: ""
      }
    },
    methods:{

    },
    mounted(){
      // on load, refer to the conductor_info and pass to name, num, rating
      this.$firebase_basic.database().ref("users/" + this.class_info.conductor + "/username").on('value', (data)=>{
        this.name = data.val();
      });
    }
  }
</script>

<style scoped>

</style>
