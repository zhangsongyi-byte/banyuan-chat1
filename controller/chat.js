const services = require('../services/chat')
const {insertOne}=require('../models/chat')
const moment=require('moment')
const {getRandomAvatar}=require('../common/utils')



/* 登录界面 */
async function login(ctx, next) {
  await ctx.render('login')
}


/* 接收前端发出的ajax请求 */
async function chatLogin(ctx, next) {
  const { nickName } = ctx.request.body

  const avatar=getRandomAvatar()

    /* 通过cookies保存传进来的nickName  stringify是将nickName转化成字符串  maxAge设置cookies保存时间为1天*/
  ctx.cookies.set('user', JSON.stringify({ nickName,avatar}), { maxAge: 24 * 60 * 60 * 1000 })
  if (nickName) {
    ctx.response.body = { status: 'success' }
  }


}

/* 跳转到聊天界面 */
async function chat(ctx, next) {
    /* 获取传进来的nickName */
  let user = ctx.cookies.get('user')

  if (user) {
        /* 如果user名不为空，则解析成一个对象 */
    user = JSON.parse(user)
        /* 如果解析后的nickName不为空，则跳转到聊天界面，如果为空，则重定向到登录界面 */
    if (user.nickName) {
      const contents=await services.getContent()
      ctx.state = {
        nickName: user.nickName,
        contents
      }

      await ctx.render('chat', ctx.state)
    } else {
      ctx.redirect('/')
    }
  } else {
    ctx.redirect('/')
  }
}


/* 聊天输入内容 */
  /* 前端向后端发出增加聊天内容的请求，成功的时候需要将输入的内容添加到chat-content页面中去 */
async function addContent(ctx, next) {
  const { content } = ctx.request.body
  let user = ctx.cookies.get('user')

  if (user) {
    const { nickName,avatar} = JSON.parse(user)
    let data = {
      nickName,
      avatar,
      content,
      createdAt:new Date()
    }
    await services.addContent(data)
  }
  let result=await services.getContent({})
  ctx.response.body={
    result,
    status:'success'
  }

}


/* 当别人登录你的聊天室时，需要重新发送一个ajax请求，重新从数据库里面拿新的数据 */
async function getContent(ctx,next){
  const contents=await services.getContent()

  ctx.response.body={
    contents
  }
}


module.exports = {
  login,
  chatLogin,
  chat,
  addContent,
  getContent
}