<template>
  <div id="be-a-teacher">
    <h1>Create Class</h1>
    <el-form label-position="top">
      <el-form-item label="Class image:">
        <input type="file" v-on:change="onFileChange"></input>
      </el-form-item>
      <img v-bind:src="image" alt="">
      <el-form-item label="Class Name:">
        <el-input type="text" v-model="class_info.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Category:">
        <el-input type="text" v-model="class_info.category" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Description:">
        <el-input type="text" v-model="class_info.desc" maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="Pricing per Class: RM">
        <el-input type="number" v-model="class_info.pricing" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="Available Slots:">
        <el-input type="number" v-model="class_info.slots" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="Venue:">
        <el-input type="text" v-model="class_info.venue" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Time:">
        <el-input type="text" v-model="class_info.time" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Date:">
        <el-input type="text" v-model="class_info.date" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="class_info.negotiable">Time is Negotiable</el-checkbox>
      </el-form-item>
      <el-form-item label="Class Content:">
        <el-input type="textarea" v-model="class_info.class_content"></el-input>
      </el-form-item>
      <el-form-item label="Prerequisite:">
        <el-input type="textarea" v-model="class_info.prerequisite"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button v-on:click="createClass">Create Class</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "be-a-teacher",
      props: ["uid"],
      data(){
        return{
          image: "",
          temp: [],
          file: "",
          class_info:{
            name: "",
            image: "",
            desc: "",
            category: "",
            pricing: "",
            slots: 0,
            venue: "",
            time: "",
            date: "",
            negotiable: false,
            requests: [0],
            class_content: "",
            prerequisite: "",
            chat: [{time: 0, id: "default", msg: "Hi there"}],
            pinned_msg: {time: 0, id: "default", msg: "default"},
            conductor: this.uid,
            members: [this.uid],
            open_register: true,
            deleted: false
          }
        }
      },
      methods:{
        // when a file is selected
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          // if the file is not empty, set this.file to the first file.
          this.file = files[0];
          // create an image to that file.
          this.createImage(files[0]);
        },
        createImage(file) {
          // create the image based on file
          let reader = new FileReader();
          let vm = this;
          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        createClass(){
          let verified = true;
          // verify the file first
          if(!this.file.name){
            alert("upload image first");
            verified = false;
          }
          if(verified){
            // push the class_info to the database and store key at x
            let x = this.$firebase_basic.database().ref("classes").push(this.class_info);
            // update this.class_info.image
            this.class_info.image = "class_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1);
            // update database with image
            this.$firebase_basic.database().ref("classes/" + x.key + "/image").set(this.class_info.image);
            // update database with key
            this.$firebase_basic.database().ref("classes/" + x.key + "/key").set(x.key);
            // refer to the location in storage
            let ref = this.$firebase_basic.storage().ref().child("class_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1));
            // push the image to the storage, and update class_teach
            ref.put(this.file);
            this.$firebase_basic.database().ref("users/" + this.uid + "/class_teach").once('value').then((data)=>{
              this.temp = data.val();
              this.temp.push(x.key);
            }).then(()=>{
              this.$firebase_basic.database().ref("users/" + this.uid + "/class_teach").set(this.temp);
            });
            this.$alert("You have created a class!", "Notification", {
              confirmButtonText: 'OK',
              callback: action => {

              }
            });
          }
        }
      }
    }
</script>

<style scoped>

</style>
