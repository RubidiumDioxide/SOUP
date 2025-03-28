import React, { useEffect, useState } from "react"; 
import Notification from "./Notification"; 

export default function NotificationsTable({userId}) {
  const [notifications, setNotifications] = useState([]);
  const [refreshCond, setRefreshCond] = useState([false]);  

  var uri = `/api/Notifications/ByReceiver/${userId}`; 

  useEffect(()=>{
    fetch(uri)
      .then(response => response.json())
      .then(data => setNotifications(data)); 
      setRefreshCond([false]); 
  }, refreshCond)

  function onAction(){
    setRefreshCond([true]); 
  } 

return (
  <div>
    {notifications.map(notification =>
      <Notification
        key={notification.id}
        notification={notification}
        onAction={onAction}
    />)}
  </div>
  );
} 