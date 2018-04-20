<template>
  <div id="join-a-group">
    <h1>Join A Group</h1>
    <input type="text" placeholder="Search">
    <group-card v-for="g in send_to_groupcard" v-bind:group_info="g" v-bind:uid="uid"></group-card>
    <h3>Create a Group within 5 Minutes</h3>
    <form>
      <input type="file" v-on:change="onFileChange">
      <img v-bind:src="image" alt="">
      <label>Group Name:</label>
      <input type="text" v-model="group_info.name" maxlength="20">
      <label>Description:</label>
      <input type="text" v-model="group_info.desc" maxlength="50">
      <button v-on:click="createGroup">Create a Group</button>
    </form>
  </div>
</template>

<script>
    import groupCard from "./groupCard.vue";
    export default {
      name: "join-a-group",
      props: ["uid"],
      components: {
        "group-card": groupCard
      },
      data(){
        return{
          // image and file are for image upload operation
          image: "",
          file: "",
          // initialise group info
          group_info:{
            name: "",
            desc: "",
            image: "",
            key: "",
            chat: [],
            pinned_msg: [],
            admin: [this.uid],
            members: [this.uid],
            banned: []
          },
          // initialize user_info
          user_info:{},
          send_to_groupcard: []
        }
      },
      mounted(){
        // on loaded, grab the user_info from database
        this.$firebase_basic.database().ref('users/' + this.uid).on('value', (data)=> {
          this.user_info = data.val();
          if(!this.user_info.group) this.user_info.group = [];
          if(!this.user_info.class_learn) this.user_info.class_learn = [];
          if(!this.user_info.class_teach) this.user_info.class_teach = [];
          if(!this.user_info.quited_group) this.user_info.quited_group = [];
          if(!this.user_info.deleted_class_learn) this.user_info.deleted_class_learn = [];
          if(!this.user_info.deleted_class_teach) this.user_info.deleted_class_teach = [];
          if(!this.user_info.chat_history) this.user_info.chat_history = [];
        });
        // grab the groups data and put in this.send_groupcard
        this.$firebase_basic.database().ref('groups').on('value', (data)=> {
          let tmp = data.val();
          // if nothing then {}
          if(!tmp) tmp = {};
          for (let k in tmp) {
            // push to the list-to-display if the key not exists in user_info.group
            if (!this.user_info.group.includes(tmp[k].key)) {
              if(!tmp[k].chat) tmp[k].chat = [];
              if(!tmp[k].pinned_msg) tmp[k].pinned_msg = [];
              if(!tmp[k].banned) tmp[k].banned = [];
              if(!tmp[k].admin) tmp[k].admin = [];
              if(!tmp[k].members) tmp[k].members = [];
              this.send_to_groupcard.push(tmp[k]);
            }
          }
        });
      },
      methods:{
        // invoked when file selector changes value
        onFileChange(e) {
          let files = e.target.files || e.dataTransfer.files;
          if (!files.length)
            return;
          this.file = files[0];
          this.createImage(files[0]);
        },
        // display the image
        createImage(file) {
          let reader = new FileReader();
          let vm = this;
          reader.onload = (e) => {
            vm.image = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        createGroup: function(){
          // TO-DO: more verifications
          let verified = true;
          if(!this.file.name){
            alert("upload image first");
            verified = false;
          }
          if(verified){
            // push the group_info to groups and return the key as x
            let x = this.$firebase_basic.database().ref("groups").push(this.group_info);
            // set the group_info.image
            this.group_info.image = "group_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1);
            // set the key
            this.group_info.key = x.key;
            this.$firebase_basic.database().ref("groups/" + x.key + "/key").set(x.key);
            // set the image
            this.$firebase_basic.database().ref("groups/" + x.key + "/image").set(this.group_info.image).then(()=>{
              // push the image to storage
              let ref = this.$firebase_basic.storage().ref().child("group_images/" + x.key + "." + this.file.name.substring(this.file.name.lastIndexOf(".")+1));
              ref.put(this.file);
            }).then(()=>{
              // update user_info.group
              this.$firebase_basic.database().ref("users/" + this.uid + "/group").once('value').then((data)=>{
                this.temp = data.val();
                if(!this.temp) this.temp = [];
                this.temp.push(x.key);
              }).then(()=>{
                this.$firebase_basic.database().ref("users/" + this.uid + "/group").set(this.temp);
              });
            });
          }
        },
      }
    }
</script>

<style scoped>

</style>
