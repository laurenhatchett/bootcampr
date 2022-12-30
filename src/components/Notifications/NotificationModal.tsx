import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
// import { getAllNotifications, updateStatusNotification, deleteNotification } from '../../utilities/api/users';
import { getAllNotifications } from '../../utilities/api/notifications';
import { BsBell } from 'react-icons/bs';
import { emptyNotification } from '../../utilities/data/notificationConstants';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { useAppSelector } from '../../utilities/redux/hooks';
import { selectAuthUser } from '../../utilities/redux/slices/users/userSlice';
import './Notification.scss';
import { NotificationInterface } from '../../utilities/types/NotificationInterface';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string | boolean;
  onClose: (value: string | boolean) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;
  const params = useParams();
  const authUser = useAppSelector(selectAuthUser);
  // const [userNotifications, setUserNotifications] = useState<NotificationState[]>();
  const [notifications, setNotifications] = useState<NotificationInterface[]>([]);
  // const { _id, read, message, type, title, user } = notifications;

  useEffect(() => {
    const fetchNotifications = async () => {
      const displayNotifications = await getAllNotifications(authUser._id);
      setNotifications(displayNotifications);
    };
    fetchNotifications();
  }, [setNotifications]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  console.log(notifications);

  // const handleNotificationStatus = (e: any) => {
  //   const { name, accessKey, id, title } = e.target;
  //   setNotifications({
  //     ...notifications,
  //     [name]: true,
  //     user: authUser._id,
  //     _id: id,
  //     message: accessKey,
  //     notification: title,
  //   });
  // };

  const handleListItemClick = async (value: string | boolean) => {
    // if ('Read' === value) {
    //   await updateStatusNotification(_id, notifications);
    //   console.log(notifications);
    // }
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {notifications.map((notification: any) => {
          return (
            <ListItem key={notification._id}>
              <h3>{notification.title}</h3>
              <ListItemText>{notification.message}</ListItemText>
              <button
                name="read"
                onClick={(e) => {
                  // handleNotificationStatus(e);
                  handleListItemClick('Read');
                }}
              >
                Mark as Read
              </button>
              <ListItem onClick={() => handleListItemClick('Delete')}>Delete Notification</ListItem>
            </ListItem>
          );
        })}
        {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary="Add account" />
        </ListItem>
      </List>
    </Dialog>
  );
}

export const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <button className="notification-btn" onClick={handleClickOpen}>
        <BsBell size={25} />
      </button>
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
};
