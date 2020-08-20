let loginBtn=document.getElementsByClassName('login-button')[0]
let loginInput=document.getElementsByClassName('login-input')[0]

loginInput.onkeydown=function(e){
  if(e.keyCode===13){
    enter()
  }
}

// console.log(loginBtn)
loginBtn.onclick=enter

function enter(){
  let nickName=loginInput.value
//   console.log(nickName)
  if(nickName){
    $.ajax({
      type:'post',
      url:'http://192.168.10.169:3000/chat/login',
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