/* 登录界面 */
async function login(ctx,next){
  await ctx.render('login')
}


/* 接收前端发出的ajax请求 */
async function chatLogin(ctx,next){
  const{nickName}=ctx.request.body

  /* 通过cookies保存传进来的nickName  stringify是将nickName转化成字符串  设置cookies保存时间为1天*/
  ctx.cookies.set('user',JSON.stringify({nickName}),{maxAge:24*60*60*1000})

  if(nickName){
    ctx.response.body={status:'success'}
  }

  
}

/* 跳转到聊天界面 */
async function chat(ctx,next){
    /* 获取传进来的nickName */
  let user=ctx.cookies.get('user')

  if(user){
      /* 如果user名不为空，则解析成一个对象 */
    user=JSON.parse(user)
    // console.log(user.nickName)
    /* 如果解析后的nickName不为空，则跳转到聊天界面，如果为空，则重定向到登录界面 */
    if(user.nickName){
      await ctx.render('chat') 
    }else{
      ctx.redirect('/')
    }
  }else{
    ctx.redirect('/')
  }
  

}


module.exports={
  login,
  chatLogin,
  chat
}