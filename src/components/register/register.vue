<template>
    <div class="register">
        <div class="register_box">
            <span class="register_box_name">用户注册</span>
            <div class="register_username">
                <span>用户名：</span>
                <input type="text" name="username" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="register_password">
                    <span>密码：</span>
                    <input type="password" name="password" placeholder="请输入密码" v-model="password">
            </div>
            <span class="register_btn" @click="register">注册</span>
            <router-link class="register_tips" to="/login">已有账号？赶快登陆吧</router-link>
        </div>
        
    </div>
</template>
<style scoped>
@import './register.css';
</style>

<script>
    import Vue from 'vue'
    import {MessageBox} from 'element-ui'
    import axios from 'axios'
    export default {
        name: 'register',
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            async register(){
                let username = this.username;
                let password = this.password;
                let { data } =  await axios({url:'/api/register', method: 'post', data: {"username": username, "password": password}})
                if(data.code === -1){
                    MessageBox(data.msg, '提示')
                } else if( data.code === -2){
                    MessageBox(data.msg, '提示')
                } else if(data.code === -5){
                   MessageBox(data.msg, '提示')
                } else if(data.code === 1){
                    this.$router.push('/login')
                }
            }
        }
    }
</script>
