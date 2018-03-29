<template>
  <div id="group_chatroom">
    <h1>{{ group_info.name }}({{ group_info.key }})</h1>
    <h2>Announcement</h2>
    <h4>{{ group_info.pinned_msg }}</h4>
  </div>
</template>

<script>
    export default {
      name: "group-chatroom",
      props: ["group_info", "uid"],
      data(){
        return{

        }
      },

    }
</script>

<style scoped>

</style>
