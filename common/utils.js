const _=require('lodash')
const moment=require('moment')


/* 获取随机头像 */
function getRandomAvatar(){
  const avatars = [
    'http://by-image.oss-cn-shanghai.aliyuncs.com/frontend/chat/avatar1.png',
    'http://by-image.oss-cn-shanghai.aliyuncs.com/frontend/chat/avatar2.png',
    'http://by-image.oss-cn-shanghai.aliyuncs.com/frontend/chat/avatar3.png',
    'http://by-image.oss-cn-shanghai.aliyuncs.com/frontend/chat/avatar4.png',
    'http://by-image.oss-cn-shanghai.aliyuncs.com/frontend/chat/avatar5.png'
  ]
  let index=_.random(0,4)

  return avatars[index]

}

function formatTime(time){
  return moment(time).locale('zh_cn').format('YYYYMMMMDo aH:m:s')
}

module.exports={
  getRandomAvatar,
  formatTime
}