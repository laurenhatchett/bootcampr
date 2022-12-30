import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { emptyNotification } from '../../utilities/data/notificationConstants';
import { NotificationInterface } from '../../utilities/types/NotificationInterface';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import { useAppSelector, useAppDispatch } from '../../utilities/redux/hooks';
const ENDPOINT = `${process.env.REACT_APP_LOCAL_URL}`;
const socket = io(ENDPOINT, { transports: ['websocket'] });

export const Notifications = () => {
  const authUser = useAppSelector(selectAuthUser);
  const [notifications, setNotifications] = useState<NotificationInterface>(emptyNotification);

  console.log(authUser);

  useEffect(() => {
    // const askUserPermission = async () => {
    //   return await Notification.requestPermission();
    // };
    // askUserPermission();

    // const handler = (notifications: string) => {
    //   setNotifications([...notifications, notifications]);
    // };

    socket.on('changes', () => {
      console.log(socket.connected);
    });
  }, []);

  console.log(notifications);

  return (
    <>
      <p>hi</p>
    </>
  );
};
