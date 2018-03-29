<template>
  <div id="be-a-teacher">
    <h1>Create Class</h1>
    <form>
      <input type="file" v-on:change="onFileChange">
      <img v-bind:src="image" alt="">
      <label>Class Name: </label>
      <input type="text" v-model="class_info.name">
      <label>Category: </label>
      <input type="text" v-model="class_info.category">
      <label>Description: </label>
      <textarea cols="30" rows="10" v-model="class_info.desc"></textarea>
      <label>Pricing: </label>
      <input type="text" v-model="class_info.pricing">
      <label>Available Slots: </label>
      <input type="number" v-model="class_info.slots">
      <label>Venue: </label>
      <input type="text" v-model="class_info.venue">
      <label>Time: </label>
      <input type="text" v-model="class_info.time">
      <label>Date: </label>
      <input type="text" v-model="class_info.date">
      <input type="checkbox" v-model="class_info.negotiable">Time is Negotiable
      <label>Class Content: </label>
      <textarea cols="30" rows="10" v-model="class_info.class_content"></textarea>
      <label>Prerequisite: </label>
      <textarea cols="30" rows="10" v-model="class_info.prerequisite"></textarea>
      <button v-on:click="createClass" type="button">Create Class</button>
    </form>
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
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file = files[0];
          this.createImage(files[0]);
        },
        createImage(file) {
          let reader = new FileReader();
          let vm = this;
          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        createClass(){
          let x = this.$firebase_basic.database().ref("classes").push(this.class_info);
          this.class_info.image = "class_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1);
          this.$firebase_basic.database().ref("classes/" + x.key + "/image").set(this.class_info.image);
          this.$firebase_basic.database().ref("classes/" + x.key + "/key").set(x.key);
          let ref = this.$firebase_basic.storage().ref().child("class_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1));
          ref.put(this.file);
          this.$firebase_basic.database().ref("users/" + this.uid + "/class_teach").once('value').then((data)=>{
            this.temp = data.val();
            this.temp.push(x.key);
          }).then(()=>{
            this.$firebase_basic.database().ref("users/" + this.uid + "/class_teach").set(this.temp);
          });
        }
      }
    }
</script>

<style scoped>

</style>
