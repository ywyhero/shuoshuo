<template>
    <div class="header">
            <div class="header-box">
                <div class="header-left">
                    <!-- <router-link class="header-left-first header-left-val" to="/home">说说首页</router-link> -->
                    <router-link class="header-left-val" :class="hash === 'home' ? 'active' : ''" to="/home">全部说说</router-link>
                    <router-link class="header-left-val" :class="hash === 'my' ? 'active' : ''" to="/my">我的说说</router-link>
                    <router-link class="header-left-val" :class="hash === 'allmembers' ? 'active' : ''" to="/allmembers">全部成员</router-link>
                </div>
                <div class="header-right">
                    <img src="./../assets/images/default.jpg" width="24" height="24"/> 
                    <span>{{username}}</span>
                    <span class="header-right-btn" @click="loginOut">退出</span>    
                </div>
            </div>
        </div>
</template>
<style scoped>
@import './header.css';
</style>
<script>
    import axios from 'axios'
    import Vue from 'vue'
    export default{
        data(){
            return{
                username: '',
                hash: ''
            }
        },
        methods:{
            async getUserInfo () {
                let { data } = await axios({
                    url: '/api/user',
                    method: 'post'
                })
                if(data.code === -1){
                    this.$router.push('/login');
                    return
                }
                if(data.code === 1){
                    this.username = data.username
                }
            },
            async loginOut(){
                let { data } = await axios({
                    url:'/api/loginout',
                    method: 'post'
                })
                if(data.code === 1){
                    this.$router.push('/login')
                }
            },
            
        },
        mounted(){
            this.getUserInfo()
            this.hash = this.$route.name;
        }
    }
</script>
