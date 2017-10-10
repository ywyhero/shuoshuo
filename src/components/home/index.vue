<template>
    <div class="home">
        <vine-header></vine-header>
        <div class="content">
            <div class="content-box">
                <div class="content-box-top">
                    <img src="./../../assets/images/default.jpg" alt="头像">
                    <div class="content-box-top-right">
                        <span>{{username}}</span>
                        <textarea cols="80" rows="5" v-model="content"></textarea>
                        <div class="content-box-top-right-btn">
                            <div class="content-box-top-btn" @click="publicInfo">发布</div>
                        </div>
                    </div>
                </div>
                <div class="content-box-bottom">
                    <ul>
                        <li v-for="(list, index) in lists" :key="index">
                            <span class="content-box-bottom-name">{{list.username}}</span>
                            <span class="content-box-bottom-content">{{list.content}}</span>
                            <div v-if="list.username === username">
                                <span class="content-box-bottom-delete" @click='removeList(index)'>删除</span>
                            </div>
                            <div v-else>
                                <span class="content-box-bottom-delete" @click='like(index)'>点赞:{{list.count}}</span>    
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="pagination" v-show="totalCount > 10">
                     <el-pagination
                        layout="prev, pager, next"
                        :total="totalCount"
                        @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import './index.css';
</style>
<script>
    import axios from 'axios'
    import {Pagination} from 'element-ui'
    import Vue from 'vue'
    import header from './../../controller/header.vue'
    Vue.use(Pagination)
    export default{
        name: 'home',
        data () {
            return{
                username: '',
                content: '',
                lists: [],
                totalCount: 0,
                count: 0
            }
        },
        components:{
            'vine-header': header
        },
        methods: {
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
            async publicInfo(){
                let { data } = await axios({
                    url:'/api/public',
                    method: 'post',
                    data:{
                        'content': this.content
                    }
                })
                if(data.code === 1){
                    await this.getLists(0);
                    this.content = '';
                }
            },
            async handleCurrentChange(val){
                await this.getLists(val - 1)
            },
            async getLists(page){
                let { data } = await axios({
                    url:'/api/lists',
                    method: 'post',
                    data:{
                        limit: 10,
                        skip: page
                    }
                })
                this.lists = data.lists;
                this.totalCount = data.total;
            },
            async removeList(index){
                let {data} = await axios({
                    url: '/api/remove',
                    method: 'post',
                    data:{
                        'content': this.lists[index].content
                    }
                })
                if(data.code === 1){
                    await this.getLists(0);
                }
            },
            async like (index) {
                let {data} = await axios({
                    url: '/api/like',
                    method: 'post',
                    data:{
                        'content': this.lists[index].content,
                        'count': this.lists[index].count + 1
                    }
                })
                if(data.code === 1){
                    await this.getLists(0);
                }
            }
        },
        mounted(){
            this.getUserInfo();
            this.getLists(0);
        }
    }
</script>
