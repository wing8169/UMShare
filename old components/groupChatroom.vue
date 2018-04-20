<template>
  <div id="group_chatroom">
    <h1>{{ group_info.name }}({{ group_info.key }})</h1>
    <h2>Announcement</h2>
    <h4>{{ group_info.pinned_msg }}</h4>
    <button type="button" v-on:click="home">Back</button>
  </div>
</template>

<script>
    export default {
      name: "group-chatroom",
      props: ["group_info", "uid"],
      data(){
        return{

        }
      },
      methods:{
        home: function(){
          // navigate to the home page, push user id to home page
          this.$router.push({name: "home", params: {uid: this.uid}});
        }
      }
    }
</script>

<style scoped>

</style>
