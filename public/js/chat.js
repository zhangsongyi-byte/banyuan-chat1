

let inputEle=document.getElementsByClassName('chat-input')[0]

let timer

let originData

newRender()

stopTimer()

longProlling()


function newRender(){
  $.ajax({
    type:'get',
    url:'http://192.168.10.169:3000/chat/getContent',
    data:{},
    success:(result)=>{
      originData=result.contents
    }
  })
}


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
            originData=result.result
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
        result=result.contents

        render(result)

        let times=0
        result.filter((item)=>{
          if(moment(originData[originData.length-1].createdAt).isBefore(moment(item.createdAt))){
            times++
            // console.log(times)
            // renderTips(times)
          }
        })
        console.log(times)
        if(times>0){
          renderTips(times)
        }else{
          console.log('没有新消息')
        }
      }
    })
  },5000)
}


/* 为了防止多个页面同时发送请求的时候出问题，所以在调用定时器之前，要先调用stopTimer*/
function stopTimer(){
  if(timer){
    clearInterval(timer)
  }
}

const newTips=document.getElementsByClassName('newTips')[0]
function renderTips(times){
  if(times>0){
    let html='你收到了'+times+'条新消息'
    $('.newTips').html(html)
    newTips.style.display='block'
  }
}


newTips.onclick=function(){
  scrollToBottom()
  newTips.style.display='none'
  newRender()
}