<template>
    <div class="login">
        <div class="login_box">
            <div class="login_box_title">用户登陆</div>
            <div class="login_username">
                <span>用户名：</span>
                <input type="text" name="username" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="login_password">
                <span>密码：</span>
                <input type="password" name="password" placeholder="请输入密码" v-model="password">
            </div>
            <span @click="login" class="login_btn">登陆</span>
            <router-link class="login_tips" to="/register">没有账号？赶快注册吧</router-link>
        </div>
    </div>
</template>
<style scoped>
@import './login.css';
</style>
<script>
    import Vue from 'vue'
    import {MessageBox} from 'element-ui'
    import axios from 'axios'
    export default{
        name: 'login',
        data(){
            return{
                username: '',
                password:''
            }
        },
        methods:{
            async login(){
                let { data } = await axios({
                    url: '/api/login',
                    method: 'post',
                    data:{
                        'username': this.username,
                        'password': this.password
                    }
                })
                if(data.code === -1) {
                    MessageBox(data.msg, '提示')
                } else if(data.code === -2) {
                    MessageBox(data.msg, '提示')
                } else if(data.code === -5){
                    MessageBox(data.msg, '提示')
                }else if(data.code === 1){
                    this.$router.push('/home')
                }
            }
        }
    }
</script>

