import "./sidebar.css";
import {
 RssFeed,
 Chat,
 PlayCircleFilledOutlined,
 Group,
 Bookmark,
 HelpOutline,
 WorkOutline,
 Event,
 School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


export default function Sidebar() {
 return (
   <div className="sidebar">
     <div className="sidebarWrapper">
       <ul className="sidebarList">
         <li className="sidebarListItem">
           <RssFeed className="sidebarIcon" />
           <span className="sidebarListItemText">Feed</span>
         </li>
         <li className="sidebarListItem">
          <Link to="/reels" className="sidebarLink">
           <PlayCircleFilledOutlined className="sidebarIcon" />
           <span className="sidebarListItemText">Reels</span>
           </Link>
         </li>
         <li className="sidebarListItem">
          <Link to="/marketplace" className="sidebarLink">
           <Chat className="sidebarIcon" />
           <span className="sidebarListItemText">Marketplace</span>
           </Link>
         </li>
       
         <li className="sidebarListItem">
         <Link to="/groups" className="sidebarLink">
           <Group className="sidebarIcon" />
           <span className="sidebarListItemText">Groups</span>
           </Link>
         </li>
        
         <li className="sidebarListItem">
           <HelpOutline className="sidebarIcon" />
           <Link to="/vpn" className="sidebarLink">
           <span className="sidebarListItemText">Free VPN </span>
        </Link>
         </li>
         <li className="sidebarListItem">
           <Bookmark className="sidebarIcon" />
           <Link to="/todo" className="sidebarLink">
           <span className="sidebarListItemText">To Do List</span>
           </Link>
         </li>
         <li className="sidebarListItem">
           <WorkOutline className="sidebarIcon" />
           <span className="sidebarListItemText">Jobs</span>
         </li>
         <li className="sidebarListItem">
           <Event className="sidebarIcon" />
           <span className="sidebarListItemText">Events</span>
         </li>
         <li className="sidebarListItem">
           <School className="sidebarIcon" />
           <span className="sidebarListItemText">Courses</span>
         </li>
         <li className="sidebarListItem">
           <Link to="/crypto" className="sidebarLink">
             <Bookmark className="sidebarIcon" />
             <span className="sidebarListItemText">Crypto</span>
           </Link>
         </li>
       </ul>
       <button className="sidebarButton">Show More</button>
       <hr className="sidebarHr" />
       <ul className="sidebarFriendList">
         {Users.map((u) => (
           <CloseFriend key={u.id} user={u} />
         ))}
       </ul>
     </div>
   </div>
 );
}



