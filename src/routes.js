import mainPage from './components/mainPage.vue';
import myProfile from "./components/myProfile.vue";
import myClasses from "./components/myClasses.vue";
import beAStudent from "./components/beAStudent.vue";
import beATeacher from "./components/beATeacher.vue";
import sendFeedBack from "./components/sendFeedBack.vue";
import Home from "./components/home.vue";


export default[
  {path: "/", component: mainPage},
  {path: "/myprofile/:uid", name: "myprofile", component: myProfile, props: true},
  {path: "/myclasses/:uid", name: "myclasses", component: myClasses, props: true},
  {path: "/beastudent/:uid", name: "beastudent", component: beAStudent, props: true},
  {path: "/beateacher/:uid", name: "beateacher", component: beATeacher, props: true},
  {path: "/sendfeedback/:uid", name: "sendfeedback", component: sendFeedBack, props: true},
  {path: "/home/:uid", name: "home", component: Home, props: true}
]

// group chat room no yet implemented
