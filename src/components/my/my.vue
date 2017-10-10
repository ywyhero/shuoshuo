<template>
    <div class="home">
        <vine-header></vine-header>
        <div class="my">
            <div class="my-box">
                <div class="my-box-bottom">
                    <ul>
                        <li v-for="(list, index) in lists" :key="index">
                            <span class="my-box-bottom-name">{{list.username}}</span>
                            <span class="my-box-bottom-content">{{list.content}}</span>
                            <div>
                                <span class="my-box-bottom-delete" @click='removeList(index)'>删除</span>
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
@import './my.css';
</style>
<script>
    import axios from 'axios'
    import {Pagination} from 'element-ui'
    import header from './../../controller/header.vue'
    import Vue from 'vue'
    Vue.use(Pagination)
    export default{
        name: 'my',
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
             async removeList(index){
                let {data} = await axios({
                    url: '/api/remove',
                    method: 'post',
                    data:{
                        'content': this.lists[index].content
                    }
                })
                if(data.code === 1){
                    await this.my(0);
                }
            },
            async handleCurrentChange(val){
                await this.my(val - 1)
            },
            async my (page) {
                let {data} = await axios({
                    url: '/api/my',
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
            this.my(0);
        }
    }
</script>