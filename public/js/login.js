let loginBtn=document.getElementsByClassName('login-button')[0]
let loginInput=document.getElementsByClassName('login-input')[0]

// console.log(loginBtn)
loginBtn.onclick=function(){
  let nickName=loginInput.value
//   console.log(nickName)
  if(nickName){
    $.ajax({
      type:'post',
      url:'http://localhost:3000/chat/login',
      data:{
        nickName
      },
      success:(result)=>{
        if(result.status==='success'){
          location.href='/chat'
        }
      },
      error:()=>{
        console.log('error')
      }
    })
  }
  
}