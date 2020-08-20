const controller=require('../controller/chat')
module.exports =  (router) => {
  /* 登录界面 */
  router.get('/',controller.login)

  /* 接收马上登陆按钮请求的post */
  router.post('/chat/login',controller.chatLogin)

  /* 聊天界面 */
  router.get('/chat',controller.chat)

  router.post('/chat/addContent',controller.addContent)

  router.get('/chat/getContent',controller.getContent)


}
  