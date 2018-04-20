<template>
  <div id="myProfile">
    <h1>Profile</h1>
    <el-form label-position="top">
      <img v-bind:src="user_info.profile_pic" alt="">
      <el-form-item label="Full Name:">
        <el-input type="text" v-model="user_info.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="Birthday:">
        <el-input type="date" v-model="user_info.birthday"></el-input>
      </el-form-item>
      <el-form-item label="Faculty:">
        <el-input type="text" v-model="user_info.faculty" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="Course:">
        <el-input type="text" v-model="user_info.course" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="Contact Number:">
        <el-input type="text" v-model="user_info.contact" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Biography:">
        <el-input type="textarea" v-model="user_info.biography" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="button" v-on:click="updateInfo" >Update Info</el-button>
      </el-form-item>
    </el-form>
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
            group: [],
            class_learn: [],
            class_teach: [],
            quited_group: [],
            deleted_class_learn: [],
            deleted_class_teach: [],
            chat_history: [],
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
          if(!this.user_info.group) this.user_info.group = [];
          if(!this.user_info.class_learn) this.user_info.class_learn = [];
          if(!this.user_info.class_teach) this.user_info.class_teach = [];
          if(!this.user_info.quited_group) this.user_info.quited_group = [];
          if(!this.user_info.deleted_class_learn) this.user_info.deleted_class_learn = [];
          if(!this.user_info.deleted_class_teach) this.user_info.deleted_class_teach = [];
          if(!this.user_info.chat_history) this.user_info.chat_history = [];
        });
      },
      methods:{
        updateInfo: function(){
          let updates = {};
          updates['users/' + this.uid] = this.user_info;
          // map the path to the user_info
          this.$firebase_basic.database().ref().update(updates);
          // update the data and alert the user
          this.$alert("update complete!", "Notification", {
            confirmButtonText: 'OK',
            callback: action => {
            }
          });
        }
      }
    }
</script>

<style scoped>
  img{
    height: 150px;
    width: 150px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
