<template>
    <div class="user-my-myInfo">
       <div class="user_header">
           <div class="header_left">
               <button @click="showHeader" >选择头像</button>
               <div class="headerBox">
                   <div class="header">
                        <img :src="require('../../../assets/avatar/' + imgIndex +'.png')"/>
                   </div>
               </div>
           </div>
           <div class="header_right">
               <h6>头像预览</h6>
               <div class="previewBox">
                   <img :src="require('../../../assets/avatar/' + imgIndex +'.png')"/>
               </div>
               <button class="save" @click="saveHeader">保存头像</button>
           </div>
       </div>
      <div class="header_list" v-show="visable">
          <li v-for="(i, index) in new Array(20)" :key="index">
            <img :src="require('../../../assets/avatar/' + (index + 1) +'.png')" @click="chooseHeader(index)"/>
          </li>
      </div>
       <div class="user_info">
           <div class="user_name">
               <span>昵称</span><input v-model="userName" />
           </div>
           <div class="user_sex">
               <span>性别</span>
               <button class="man" ref="man" value=1 :class="{'focus':sex == 1}" :disabled="utils.gameUserInfo().data.sex > 0" @click="chooseSex(1)">
                   <img class="m" src="../../../assets/my/man.png" :aria-disabled="false" />男
                </button>
               <button class="woman" ref="woman" value=2 :class="{'focus': sex == 2}" :disabled="utils.gameUserInfo().data.sex > 0"  @click="chooseSex(2)" >
                   <img class="w" src="../../../assets/my/woman.png" />女</button>
           </div>
           <button class="btn" @click="saveInfo">保存</button>
       </div>
        
    </div>
</template>
<script>
import utils from '../../../utils/common'
export default {
    data() {
        return {
            imageUrl: '',
            visable: false,
            imgIndex:'',
            userName: '',
            sex: ''
        };
    },
    created(){
        let gameUserInfo = Object.assign(this.utils.gameUserInfo());
        if( gameUserInfo.data != '{}'){
            this.imgIndex = utils.gameUserInfo().data.head_portrait;
            this.userName = utils.gameUserInfo().data.nickname;
            this.sex =  utils.gameUserInfo().data.sex;
        }
    },
    methods:{
        showHeader(){
            var list =  document.querySelector('.header_list')
            if(list.style.display == "none"){
               this.visable = true;
            } else {
               this.visable = false;
            }   
        },
        chooseHeader(index){
            this.visable = false;
            this.imgIndex = index + 1;
        },
        chooseSex(e){
            this.sex = e; 
            let woman = this.$refs.woman;
            let man  = this.$refs.man;
            
            e == 2 ? woman.className = 'focus' :  man.className = 'unfocus';
            e == 1 ? man.className = 'focus' :  woman.className = 'unfocus';
        },
        //保存用户头像
        saveHeader(){
            var update_list=[
                {"column":"head_portrait", "value":this.imgIndex+''}
            ]
            this.$store.dispatch('MODIFY_INFO',{
                update_list:update_list
            }).then(responese=>{
                if(responese.code == 200){
                    this.$message.success('保存成功！');
                    var data = {
                        nickname: this.userName,
                        head_portrait:this.imgIndex,
                        sex:this.sex
                    }
                    //把修改后的数据存储到store中
                    this.$store.commit('SAVE_INFO',data)
                }else{
                    this.$message({
                        type:'error',
                        message:Response.msg
                    })
                }
            })
        },
        //修改用户信息
        saveInfo(){
            var update_list=[
                { "column": "nickname", "value": this.userName },
                { "column": "head_portrait", "value": this.imgIndex + '' },
                // {"column":"sex", "value":this.sex}
            ]
            if(this.sex == 0){
                update_list.push({ "column": "sex", "value": this.sex })
            }
            this.$store.dispatch('MODIFY_INFO', {
                update_list: update_list
            }).then((Response) => {
                if(Response.code == 200) {
                    this.$message.success('修改成功');
                    var data = {
                       nickname: this.userName,
                       head_portrait:this.imgIndex,
                       sex:this.sex
                    }
                    this.$refs.man.disabled = true;
                    this.$refs.woman.disabled = true;
                    //把修改后的数据存储到store中
                    this.$store.commit('SAVE_INFO',data)
                } else {
                    this.$message({
                        type:'error',
                        message:Response.msg
                    })
                }
            })
        }
    }
}
</script>
<style lang='less' scoped>
@import url('../../../assets/style.less');
.user-my-myInfo{
   .user_header{
       padding:40px 308px 40px 90px;
       display: flex;
       border-bottom:1px solid #1c2236;
       .header_left{
           flex:1;
           button{
               outline: none;
               background:none;
               border:1px solid @color-tip;
               width:80px;
               height: 30px;
               font-size:14px;
               color:@color-used;
               border-radius: 20px;
               position: relative;
               left:80px;
               top:15px;
           }
          .headerBox{
            width:240px;
            height: 240px;
            background:#141926;
            display: flex;
            justify-content: center;
            align-items:center;
            .header{
                img{
                    width:200px;
                    height: 200px;
                    border-radius: 50%;
                }
            }
          }
       }
       .header_right{
           display: flex;
           flex-direction: column;
           h6{
               font-size:18px;
               color:@color-tip;
               text-align: center;
           }
           .previewBox{
               width:158px;
               height:158px;
               border-radius: 50%;
               border:1px solid @color-checkout-default;
               background:#141926;
                margin:30px 0 27px 0;
                img{
                    width:100%;
                }
           }
           .save{
               width:118px;
               height: 34px;
               outline: none;
               background:none;
               border:1px solid #2a314a;
               font-size: 14px;
               color:@color-tip;
               margin:0 auto;
           }
       }
   }
   .header_list{
       position: absolute;
       margin: -20px 0 0 70px;
       width:680px;
       height:120px;
       border-radius: 20px;
       background:#141926;
       border:1px solid @color-checkout-default;
       display: flex;
       flex-wrap: wrap;
       padding:10px 35px;
       li{
            width:48px;
            height:48px;
            margin:5px 10px;
           img{
             width: 100%; 
           }
       }
   }
   .user_info{
       padding:40px 0 0 90px;
       .user_name,.user_sex{
            display: flex;
            align-items: center;
           span{
               font-size:16px;
               color:@color-tip;
               margin:0 20px 0 0;
           }
           input{
               outline:none;
               width:230px;
               height: 34px;
               background:none;
               font-size: 16px;
               color:#fff;
               padding-left:20px;
               border:1px solid @color-select;
           }
       }
       .user_sex{
           margin:40px 0 80px 0;
           button{
               width:76px;
               height: 32px;
               outline: none;
               border:1px solid #2c364a;
               text-align: center;
               background:none;
               font-size: 14px;
               color:#fff;
               img{
                   width: 12px;
                   margin:0 3px 0 0;
               }
           }
           button:focus{
               background: linear-gradient(#07e2c6, #069ee7);
           }
           .focus{
               background: linear-gradient(#07e2c6, #069ee7);
           }
       }
       .btn{
            width:118px;
            height: 34px;
            outline: none;
            border:none;
            margin:0 90px;
            text-align: center;
            background:none;
            font-size: 14px;
            color:#fff;
            background: linear-gradient(#07e2c6, #069ee7);
       }
   }
}
</style>