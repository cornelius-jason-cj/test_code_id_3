import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../UserSelectors";
import { actions } from "../UserSlice";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const UserDetails: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUsers);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');

  const getUserList = () => {
    dispatch(actions.loadUsers())
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUsername('');
  };

  const handleUsername = (evt: any) => {
    setUsername(evt.target.value);
  }

  const addNewUser = () => {
    dispatch(actions.addUser({name: username}))
    setOpen(false);
    dispatch(actions.loadUsers())
  }

  const handleDelete = (id: number) => {
    dispatch(actions.deleteUser(id))
    dispatch(actions.loadUsers())
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <h1> User Details </h1>
      <div>
        {user.map((u: any) => <div key={u.id}>{u.id} - {u.name} | <span style={{color: 'red', cursor: 'pointer'}} onClick={()=>handleDelete(u.id)}> Delete</span></div>)}
        <button onClick={handleClickOpen}> Add user </button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              name="username"
              value={username}
              onChange={(evt) => handleUsername(evt)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={addNewUser}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

export default UserDetails;