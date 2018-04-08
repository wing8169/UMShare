<template>
    <div class="class-details">
      <h1>Class Details</h1>
      <form>
        <img v-bind:src="teacher_info.profile_pic">
        <p>{{ teacher_info.biography }}</p>
        <label>Full Name: </label>
        <input type="text" v-bind:value="teacher_info.username" disabled>
        <label>Age: </label>
        <input type="text" v-bind:value="teacher_info.birthday" disabled>
        <label>Faculty: </label>
        <input type="text" v-bind:value="teacher_info.faculty" disabled>
        <label>Course: </label>
        <input type="text" v-bind:value="teacher_info.course" disabled>
        <label>Contact Number: </label>
        <input type="text" v-bind:value="teacher_info.contact" disabled>
        <label>Class Name: </label>
        <input type="text" v-bind:value="class_info.name" disabled>
        <label>Description: </label>
        <input type="text" v-bind:value="class_info.desc" disabled>
        <label>Pricing: </label>
        <input type="text" v-bind:value="class_info.pricing" disabled>
        <label>Available Slots: </label>
        <input type="text" v-bind:value="class_info.slots" disabled>
        <label>Venue: </label>
        <input type="text" v-bind:value="class_info.venue" disabled>
        <label>Time: </label>
        <input type="text" v-bind:value="class_info.time" disabled>
        <label>Date: </label>
        <input type="text" v-bind:value="class_info.date" disabled>
        <input type="checkbox" :checked="class_info.negotiable" disabled>Time is Negotiable
        <label>Class Content: </label>
        <textarea cols="30" rows="10" v-bind:value="class_info.class_content" disabled></textarea>
        <label>Prerequisite: </label>
        <textarea cols="30" rows="10" v-bind:value="class_info.prerequisite" disabled></textarea>
        <button v-on:click="$emit('close')" type="button">Close</button>
        <button v-on:click="" type="button">PM Conductor Now</button>
        <button v-on:click="sendRequest()" type="button">Request to Join Class</button>
      </form>
    </div>
</template>

<script>
    export default {
      name: "class-details",
      props: ["class_info", "uid"],
      data(){
        return{
          temp: [],
          teacher_info:{
            username: "",
            biography: "",
            birthday: "",
            faculty: "",
            course: "",
            contact: "",
            profile_pic: ""
          }
        }
      },
      methods:{
        sendRequest(){
          this.$firebase_basic.database().ref('classes/' + this.class_info.key + "/requests").once('value').then((data)=> {
            this.temp = data.val();
            // if nothing then {}
            if(!this.temp) this.temp = [];
            if(this.temp.indexOf(this.uid) == -1) this.temp.push(this.uid);
            else alert("You have already sent a request to this class!");
          }).then(()=>{
            this.$firebase_basic.database().ref('classes/' + this.class_info.key + "/requests").set(this.temp);
          });
        }
      },
      mounted(){
        // grab the teacher_info
        this.$firebase_basic.database().ref("users/" + this.class_info.conductor).on('value', (data)=>{
          this.teacher_info = data.val();
        });
      }
    }
</script>

<style scoped>

</style>
