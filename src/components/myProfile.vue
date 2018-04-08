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
      <input type="text" v-model="user_info.faculty" maxlength="50">
      <label>Course:</label>
      <input type="text" v-model="user_info.course" maxlength="50">
      <label>Contact Number:</label>
      <input type="text" v-model="user_info.contact" maxlength="15">
      <label>Biography:</label>
      <textarea cols="30" rows="10" v-model="user_info.biography" maxlength="50"></textarea>
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
          // initialize user_info with nothing inside
          user_info:{
            username: "",
            profile_pic: "",
            group: [0],
            class_learn: [0],
            class_teach: [0],
            quited_group: [0],
            deleted_class_learn: [0],
            deleted_class_teach: [0],
            chat_history: [0],
            biography: "",
            contact: "",
            birthday: "",
            faculty: "",
            course: "",
            rating: {num: 0, star: 0}
          }
        }
      },
      mounted() {
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          // refer to the database and grab the data to user_info
          this.user_info = data.val();
        });
      },
      methods:{
        updateInfo: function(){
          let updates = {};
          updates['users/' + this.uid] = this.user_info;
          // map the path to the user_info
          this.$firebase_basic.database().ref().update(updates);
          // update the data and alert the user
          alert("update complete!");
        }
      }
    }
</script>

<style scoped>

</style>
