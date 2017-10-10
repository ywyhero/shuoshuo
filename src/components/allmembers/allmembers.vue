<template>
    <div class="home">
        <vine-header></vine-header>
        <div class="allmenbers">
            <div class="allmenbers-box">
                <div class="allmenbers-box-bottom">
                    <ul>
                        <li v-for="(list, index) in lists" :key="index">
                            <span class="allmenbers-box-bottom-name">{{list.username}}</span>
                            <router-link class="allmenbers-box-bottom-delete" :to="'/member/' + list.username" @click='serarchDetail(index)'>查看详情></router-link>     
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
@import './allmembers.css';
</style>
<script>
    import axios from 'axios'
    import {Pagination} from 'element-ui'
    import header from './../../controller/header.vue'
    import Vue from 'vue'
    Vue.use(Pagination)
    export default{
        name: 'allmembers',
        data(){
            return{
                lists: [],
                totalCount: 0
            }
        },
        components:{
            'vine-header': header
        },
        methods:{
             async serarchDetail(index){
                let {data} = await axios({
                    url: '/api/remove',
                    method: 'post',
                    data:{
                        'content': this.lists[index].content
                    }
                })
                if(data.code === 1){
                    await this.allmembers(0);
                }
            },
            async handleCurrentChange(val){
                await this.allmembers(val - 1)
            },
            async allmembers (page) {
                let {data} = await axios({
                    url: '/api/allmembers',
                    method: 'post',
                    data:{
                        limit: 10,
                        skip: page
                    }
                })
                if(data.code === 1){
                    this.lists = data.lists
                    this.totalCount = data.total;
                }
            }
        },
        mounted(){
            this.allmembers(0);
        }
    }
</script>