<template>
  <div id="be-a-teacher">
    <h1>Create Class</h1>
    <el-form label-position="top">
      <el-form-item label="Class Name:">
        <el-input type="text" v-model="class_info.name" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Description:">
        <el-input type="textarea" v-model="class_info.desc"></el-input>
      </el-form-item>
      <el-form-item label="Pricing per Class: RM">
        <el-input type="number" v-model="class_info.pricing" min="10"></el-input>
      </el-form-item>
      <el-form-item label="Available Slots:">
        <el-input type="number" v-model="class_info.slots" maxlength="5"></el-input>
      </el-form-item>
      <el-form-item label="Venue:">
        <el-input type="text" v-model="class_info.venue" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="Prerequisite:">
        <el-input type="textarea" v-model="class_info.prerequisite"></el-input>
      </el-form-item>
      <el-form-item label="WhatsApp Group Share Link:">
        <el-input type="text" v-model="class_info.whatsapp_link"></el-input>
      </el-form-item>
      <el-form-item label="Available Tags:">
        <el-button v-for="item in tags_display" v-on:click="addTags(item)">{{ item }}</el-button>
      </el-form-item>
      <el-form-item label="Chosen Tags:">
        <el-button v-for="item in class_info.tags" v-on:click="removeTags(item)">{{ item }}</el-button>
      </el-form-item>
      <el-form-item label="Class details:">
        <div v-for="class_detail in class_details" id="block">
          <el-form-item label="Content:">
            <el-input type="textarea" v-model="class_detail.content" aria-required="true"></el-input>
          </el-form-item>
          <el-form-item label="Date:">
            <el-input type="date" v-model="class_detail.date" aria-required="true"></el-input>
          </el-form-item>
          <el-form-item label="Time:">
            <el-input type="time" v-model="class_detail.time"></el-input>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button v-on:click="addClasses">Add class</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-on:click="removeClasses">Remove class</el-button>
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
          x: "",
          tags: [],
          temp: [],
          class_info:{
            name: "",
            desc: "",
            whatsapp_link: "",
            tags: [],
            pricing: "",
            slots: 0,
            venue: "",
            prerequisite: "",
            class_info: [],
            conductor: this.uid,
            members: [this.uid],
            open_register: true
          },
          class_details: [{
            key: "",
            parent_class: "",
            content: "",
            data: "",
            time: "",
            attended_members: [],
            members: []
          }]
        }
      },
      computed:{
        tags_display: function(){
          let tmp = [];
          for(let item in this.tags){
            if(this.class_info.tags.indexOf(this.tags[item]) === -1){
              tmp.push(this.tags[item]);
            }
          }
          return tmp;
        }
      },
      mounted(){
        this.$firebase_basic.database().ref("tags").once('value').then((data)=>{
          this.tags = data.val();
          if(!this.tags) this.tags = [];
        })
      },
      methods:{
        addTags(item){
          if(this.class_info.tags.length < 5){
            this.class_info.tags.push(item);
          }
        },
        addClasses(){
          this.class_details.push({
            parent_class: "",
            content: "",
            date: "",
            time: "",
            attended_members: [],
            members: []
          });
        },
        removeClasses(){
          if(this.class_details.length > 0) this.class_details.splice(0, 1);
        },
        removeTags(item){
          this.class_info.tags.splice(this.class_info.tags.indexOf(item), 1);
        },
        createClass(){
          let verified = true;
          if(this.class_info.tags.length === 0){
            verified = false;
            this.$alert('You need to add at least one tag for your class!', 'Warning', {
              confirmButtonText: 'OK',
              callback: action => {

              }
            });
          }
          if(verified){
            // push the class_info to the database and store key at x
            this.x = this.$firebase_basic.database().ref("classes").push(this.class_info);
            // update database with key
            this.$firebase_basic.database().ref("classes/" + this.x.key + "/key").set(this.x.key);
            // push class_info data
            for(let i=0; i<this.class_details.length; i++){
              this.class_details[i].parent_class = this.x.key;
              // push the class_info to the database and store key at x
              let y = this.$firebase_basic.database().ref("class_info").push(this.class_details[i]);
              // push class
              this.class_info.class_info.push(y.key);
            }
            // update classes.class_info
            this.$firebase_basic.database().ref("classes/" + this.x.key + "/class_info").set(this.class_info.class_info);
            // update user class_teach
            this.$firebase_basic.database().ref("users/" + this.uid + "/class_teach").once('value').then((data)=>{
              this.temp = data.val();
              if(!this.temp) this.temp = [];
              this.temp.push(this.x.key);
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
  #block{
    border: 2px solid black;
  }
</style>
