<template>
    <div class="home">
        <vine-header></vine-header>
        <div class="member">
            <div class="member-box">
                <div class="member-box-bottom">
                    <ul>
                        <li v-for="(list, index) in lists" :key="index">
                            <span class="member-box-bottom-name">{{list.username}}</span>
                            <span class="member-box-bottom-content">{{list.content}}</span>
                            <div v-if="list.username === username">
                                <span class="member-box-bottom-delete" @click='removeList(index)'>删除</span>
                            </div>
                            <div v-else>
                                <span class="member-box-bottom-delete" @click='like(index)'>点赞:{{list.count}}</span>    
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
@import './membershuo.css';
</style>
<script>
    import axios from 'axios'
    import {Pagination} from 'element-ui'
    import header from './../../controller/header.vue'
    import Vue from 'vue'
    Vue.use(Pagination)
    export default{
        name: 'member',
        data(){
            return{
                lists: [],
                totalCount: 0,
                username: ''
            }
        },
        components:{
            'vine-header': header
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
            },
            async handleCurrentChange(val){
                await this.getLists(val - 1)
            },
            async getLists (page) {
                let name = this.$route.params.id;
                let {data} = await axios({
                    url: '/api/member',
                    method: 'post',
                    data:{
                        limit: 10,
                        skip: page,
                        username: name
                    }
                })
                if(data.code === 1){
                    this.lists = data.lists
                    this.totalCount = data.total;
                }
            }
        },
        mounted(){
            this.getUserInfo();
            this.getLists(0);
        }
    }
</script>