useEffect(() => {
    console.log(props.chatList);
 
  }, [props.chatList]);

  useEffect(() => {
  props.setchatList({chat_id:"1",name:"deneme",messages:[]})
  },[])

  useEffect(() => {
  props.addNewChat({chat_id:"2",name:'deneme2',messages:[]})
},[])

useEffect(() => {
  
  setTimeout(() => {  
    props.updateChatListMessage({chat_id:"1",message:'denemedsds5'})
  }
  , 2000);
},[])