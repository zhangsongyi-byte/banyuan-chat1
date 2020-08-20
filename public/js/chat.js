// const { result } = require('lodash')


let inputEle=document.getElementsByClassName('chat-input')[0]


let timer

let originData

stopTimer()

// longProlling()


window.onload=function(){
  $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'))
}

inputEle.onkeydown=function(e){
  let key=e.which
  if(key==13){
    let value=inputEle.value
    if(value){
      $.ajax({
        type:'post',
        url:'http://192.168.10.169:3000/chat/addContent',
        data:{
          content:value
        },
        success:(result)=>{
          if(result.status==='success'){
            inputEle.value=''
            $('chat-content').html('')
            render(result.result)
          }
        }
      })

    }
       
  }
}


/* input完之后自动重新渲染页面 */
function render(result){
  let html=''
  result.forEach((item)=>{
    html+=`<div class="chat-content-container">
            <div class="chat-detail clearFix">
                <div class="chat-detail-left">
                    <img src="${item.avatar}" style="width:45px; height:45px; border-radius:50%">
                    <div class="chat-name">${item.nickName}</div>
                </div>
                <div class="chat-detail-right">
                    ${item.content}
                </div>
            </div>
             <div class="chat-time">

            ${moment(item.createdAt).locale('zh_cn').format('YYYYMMMMDo   aH:mm:ss')}
        </div>
        </div>`
  })
  $('.chat-content').html(html) 


  // originData=result


  // for(let i=0;i<result.length-1;i++){
  //   for(let j=0;j<result.length-i-1;j++){
  //     if(result[j].createdAt>result[j+1].createdAt){
  //       let temp=result[j+1].createdAt
  //       result[j+1].createdAt=result[j].createdAt
  //       result[j].createdAt=temp
  //     }
  //   }
  // }

  // let newResult=result
  // console.log(result)

  // originData.filter((item)=>{
  //   if(item.createdAt>newResult[newResult.length-1].createdAt){
  //     alert('有一条新消息')
  //   }
  // })

  /* 当输入完成，enter之后也会自动到底部 */
  scrollToBottom()
}

/* 刷新的时候自动到底部 */
function scrollToBottom(){
  let ele=document.getElementsByClassName('chat-content')[0]
  /* scrollTop:是chat-content头部的高度，scrollHeight：是整个div的高度，包括隐藏高度 */

  ele.scrollTop=ele.scrollHeight
}


/* 设置定时器，当别人登陆你的聊天室时，隔两秒，你会在你的页面上实时看到别人发送的信息，成功之后也需要重新渲染页面*/
function longProlling(){
  timer=setInterval(()=>{
    $.ajax({
      type:'get',
      url:'http://192.168.10.169:3000/chat/getContent',
      data:{},
      success:(result)=>{
        render(result.contents)
      }
    })
  },2000)
}


/* 为了防止多个页面同时发送请求的时候出问题，所以在调用定时器之前，要先调用stopTimer*/
function stopTimer(){
  if(timer){
    clearInterval(timer)
  }
}