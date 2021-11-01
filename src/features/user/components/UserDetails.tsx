import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers } from "../UserSelectors";
import { actions } from "../UserSlice";

const UserDetails: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUsers);

  useEffect(() => {
    dispatch(actions.loadUsers())
  }, []);

  return (
    <>
      <h1> User Details </h1>
      <div>
        {user.map((u: any) => <div key={u.id}>{u.id} - {u.name}</div>)}
      </div>
      <button> Add user </button>
    </>
  )
}

export default UserDetails;