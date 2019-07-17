import Questions from "views/Questions.jsx";
import Details from "views/Details.jsx";
import Icons from "views/Icons.jsx";
import Notifications from "views/Notifications.jsx";


var routes = [
  {
    path: "/all",
    name: "All Questions",    
    icon: "tim-icons icon-chart-bar-32",
    component: Questions,
    layout: "/app"
  },
  {
    path: "/detail/:id/:date",
    name: "Details",    
    icon: "tim-icons icon-chart-bar-32",
    component: Details,
    layout: "/app"
  },
  {
    path: "/data-structures",
    name: "Data Structures",    
    icon: "tim-icons icon-molecule-40",
    component: Questions,
    layout: "/app"
  },
  {
    path: "/algorithms",
    name: "Algorithms",    
    icon: "tim-icons icon-paper",
    component: Questions,
    layout: "/app"
  },
  {
    path: "/es6",
    name: "Ecmascript 6",    
    icon: "tim-icons icon-html5",
    component: Questions,
    layout: "/app"
  },
  {
    path: "/patterns",
    name: "Patterns",    
    icon: "tim-icons icon-single-copy-04",
    component: Questions,
    layout: "/app"
  },
  {
    path: "/icons",
    name: "Icons",    
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/app"
  },  
  // {
  //   path: "/notifications",
  //   name: "Notifications",    
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/app"
  // }    
];
export default routes;
