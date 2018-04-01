<template>
  <div id="myProfile">
    <h1>Profile</h1>
    <img v-bind:src="user_info.profile_pic" alt="">
    <form>
      <label>Full Name:</label>
      <input type="text" v-model="user_info.username" disabled>
      <label>Birthday:</label>
      <input type="date" v-model="user_info.birthday">
      <label>Faculty:</label>
      <input type="text" v-model="user_info.faculty">
      <label>Course:</label>
      <input type="text" v-model="user_info.course" required>
      <label>Contact Number:</label>
      <input type="text" v-model="user_info.contact">
      <label>Biography:</label>
      <textarea cols="30" rows="10" v-model="user_info.biography"></textarea>
      <button v-on:click="updateInfo" type="button">Begin</button>
    </form>
  </div>
</template>

<script>
    export default {
      name: "my-profile",
      props: ["uid"],
      data() {
        return {
          user_info:{
            username: "",
            profile_pic: "",
            birthday: "",
            faculty: "",
            course: "",
            contact: "",
            biography: ""
          }
        }
      },
      created() {
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          this.user_info = data.val();
        });
      },
      methods:{
        updateInfo: function(){
          let updates = {};
          updates['users/' + this.uid] = this.user_info;
          this.$firebase_basic.database().ref().update(updates);
          alert("update complete!");
        }
      }
    }
</script>

<style scoped>

</style>
