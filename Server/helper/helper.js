const users=[];
const adduser=({socket_id,name,user_id,room_id})=>{
    const exist=users.find(user=>user.user_id === user_id && user.room_id === room_id)
    if(exist){
        return {error:`You (${exist.name}) are  already exist in this room`}
    }
    else{
        const user={socket_id,name,user_id,room_id};
        users.push(user);
        console.log("user list",users);
        return {user}
    }
}
 
const getUser=(socket_id)=>{
  const found=users.find(user=>user.socket_id === socket_id);
  return found
}

const removeUser=({socket_id})=>{
    const index=users.find(user=>user.socket_id === socket_id)
    if(index !==-1){
        return users.splice(index,1)[0]
    }
}

module.exports={adduser,getUser,removeUser };