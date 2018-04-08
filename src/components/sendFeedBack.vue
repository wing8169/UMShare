<template>
  <div id="send-feedback">
    <h1>Send Feedback</h1>
    <form>
      <label>Title: </label>
      <input type="text" v-model="title">
      <label>Description: </label>
      <input type="text" v-model="desc">
      <button type="button" v-on:click.once="sendFeedback">Submit</button>
    </form>
  </div>
</template>

<script>
    export default {
      name: "send-feed-back",
      props: ["uid"],
      data(){
        return{
          title: "",
          desc: "",
          temp: []
        }
      },
      methods:{
        sendFeedback(){
          // grab the existing feedback from the database
          this.$firebase_basic.database().ref("feedbacks/").once('value').then((data)=>{
            this.temp = data.val();
            if(!this.temp) this.temp = [];
            // push the current feedback to the array
            this.temp.push({id: this.uid, title: this.title, desc: this.desc});
          }).then(()=>{
            // update the database
            this.$firebase_basic.database().ref("feedbacks/").set(this.temp);
          }).then(()=>{
            this.title = "";
            this.desc = "";
          });
        }
      }
    }
</script>

<style scoped>

</style>
