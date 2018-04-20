<template>
  <div id="send-feedback">
    <h1>Send Feedback</h1>
    <el-form label-position="top">
      <el-form-item label="Title:">
        <el-input type="text" v-model="title" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="Description:">
        <el-input type="textarea" v-model="desc" maxlength="100"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="button" v-on:click.once="sendFeedback">Submit</el-button>
      </el-form-item>
    </el-form>
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
          this.$alert("We have received your feed back!! Thank you so much for supporting us!", "Notification", {
            confirmButtonText: 'OK',
            callback: action => {
            }
          });
        }
      }
    }
</script>

<style scoped>

</style>
