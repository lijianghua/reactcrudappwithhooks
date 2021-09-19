import UserTable from "./tables/UserTable";
import {useState} from "react";
import AddUserForm from "./forms/AddUserForm";
import EditUserForm from "./forms/EditUserForm";

const App=()=>{
    const usersData = [
        { id: 1, name: 'Tania', username: 'floppydiskette' },
        { id: 2, name: 'Craig', username: 'siliconeidolon' },
        { id: 3, name: 'Ben', username: 'benisphere' },
    ];

    const [users,setUsers] = useState(usersData);
    const [editing,setEditing] = useState(false);
    const initialFormState = {
        id:null,
        name:"",
        username:"",
    }
    const [currentUser,setCurrentUser] = useState(initialFormState);

    const addUser=(user)=>{

        user.id = users.length + 1;
        setUsers([...users,user]);
    }
    const editRow= user=>{
        setEditing(true);
        setCurrentUser({id:user.id,name:user.name,username:user.username});
    }
    const updateUser=(id,updatedUser)=>{
        setEditing(false);
        setUsers(users.map(user=>user.id === id ? updatedUser:user));
    }
    const delUser=(id)=>{
       setUsers(users.filter(
           user=> user.id !==id
       ))
        setEditing(false);
        setCurrentUser(initialFormState);
    }

    return (
        <div className="container">
            <h1>CRUD App with Hooks</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {
                        editing ?
                            <>
                                <h2>Edit User</h2>
                                <EditUserForm
                                    currentUser={currentUser}
                                    updateUser={updateUser}
                                    setEditing={setEditing}
                                />
                            </>

                        :
                            <>
                                <h2>Add User</h2>
                                <AddUserForm addUser={addUser}/>
                            </>
                    }

                </div>
                <div className="flex-large">
                    <h2>View Users</h2>
                    <UserTable users={users} delUser={delUser} editRow={editRow}/>
                </div>
            </div>

        </div>
    );
}

export default App;
