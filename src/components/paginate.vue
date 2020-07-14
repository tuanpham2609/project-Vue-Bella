<template>
    <ul class="pagination pagination-split" v-if="total > 1">
        <li class="page-item first" :class="{disabled : page == 1}"  @click.stop.prevent="first">
            <a href="#" class="page-link">
                <i class="fa fa-angle-double-left"></i>
            </a>
        </li>
        <li class="page-item prev" :class="{disabled : page == 1}" @click.stop.prevent="prev">
            <a href="#" class="page-link">
                <i class="fa fa-angle-left"></i>
            </a>
        </li>
        <li class="page-item" v-for="(item,index) in total" @click.stop.prevent="setPage(item)" v-if="show(item)" :key="index"  :class=" { active : item == current} "   >
           <a href="#" class="page-link">{{item}}</a>
        </li>
        <li class="page-item next" :class="{disabled : page == total}">
            <a href="#" class="page-link" @click.stop.prevent="next">
                <i class="fa fa-angle-right"></i>
            </a>
        </li>
        <li class="page-item last" :class="{disabled : page == total}" @click.stop.prevent="last">
            <a href="#" class="page-link">
                <i class="fa fa-angle-double-right"></i>
            </a>
        </li>
    </ul>   
</template>
<script>
    export default{
        props: {
            current: {

            },
            total: {

            },
            pageshow: {
                type: Number,
                default: 5,
            }
        },
        data() {
            return {
                page: (this.current) ? this.current : 1,
            }
        },
        methods: {
            setPage(index) {
                $('#loading-box').removeClass('close')
                this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
                this.page = index
            },
            show(index) {
                if (this.current <= 3) {
                    if (index <= this.pageshow) {
                        return true
                    } else {
                        return false
                    }
                } else if (this.current > this.total - 3) {
                    if (index > this.total - this.pageshow) {
                        return true
                    } else {
                        return false
                    }
                }
                return Math.abs(index - this.current) < 3
            },
            prev() {
                if (this.page > 1) {
                    $('#loading-box').removeClass('close')
                    this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
                    this.page--
                }
            },
            next() {
                if (this.page < this.total) {
                    $('#loading-box').removeClass('close')
                    this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
                    this.page++
                }
            },
            first() {
                $('#loading-box').removeClass('close')
                this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
                this.page = 1
            },
            last() {
                $('#loading-box').removeClass('close')
                this.$store.state.timeout = setTimeout(()=>{$('#loading-box').addClass('close')}, 800)
                this.page = this.total
            }
        },
        watch: {
            'page': function (newval, oldval) {
                if (newval != oldval) {
                    this.$emit('input', newval)
                }
            },
            'current': function (newval) {
                if (this.page != newval) {
                    this.page = newval
                }
            }
        }
        
    }
</script>