import Vue from 'vue'
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

Vue.filter('money', function (value) {
    var val = (value == undefined) ? '' : value.toString().replace(/,/g, "");
    val = parseFloat(val);
    val = val.toFixed(3);
    var explode = val.split('.');
    if( parseInt( explode[1] ) == 0 ){
        val = explode[0];
    }

    val = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    var find_dot = val.indexOf('.');
    if( find_dot != -1 ){
        var explode = val.split('.');
        var result = explode[0] + '.' + explode[1].replace(/,/g, "");
        return result;
    }
    return val;
})
Vue.component("menumenu", {
    template: ` 
    <div>
        <li  v-for="(item,index) in data" :key="index" class="list-group-item has-child">
                <router-link class="collapsed"  data-toggle="collapse" :data-target="'#'+item._id" v-if="!item.parent_id ||item.parent_id == '' " :to="item.Alias" >{{item.name}}</router-link>
                <ul :id="item._id"  class="collapse">
                    <li :class="['list-group-item',child.childs.length >0 ?'has-child':'']" v-for="(child,index1) in data" :key="index1" >      
                        <router-link class="collapsed" data-toggle="collapse" data-target="aaaa" :to="child.Alias" v-if="item._id && child.parent_id == item._id">{{child.name}}</router-link>
                        <ul id="aaaa"  class="collapse">   
                            <li :class="['list-group-item',child1.childs.length >0 ?'has-child':'']" v-for="(child1,index2) in data" :key="index2" > 

                                 <router-link :to="child1.Alias" v-if="child._id && child1.parent_id == child._id ">{{child1.name}}</router-link>
                            </li>   
                        </ul>
                    </li>
                </ul>
        </li>
    </div>`,
    props: ['data'],
    data: function() {
        return {
            open: false
        };
    },
    computed: {
        //   isFolder: function() {
        //     return this.model.children && this.model.children.length;
        //   }
    },
    methods: {

        //   changeType: function() {
        //     if (!this.isFolder) {
        //       Vue.set(this.model, "children", []);
        //       this.addChild();
        //       this.open = true;
        //     }
        //   },
        //   addChild: function() {
        //     this.model.children.push({
        //       name: "New Item"
        //     });
        //   }
    }
});
Vue.component("item", {
    template: `
        <div>
            <template  v-for="(item,index1) in model">

                    <li :class="['list-group-item',item.Sub.length > 0?'has-child':'',item.open?'open':'']">
                    <a  v-if="item.Sub.length >0"
                    class="collapsed"
                        @click="openMenu(item)">
                        {{ item.name }}
                    </a>
                    <router-link v-else 
                        :to="item.Alias"
                        :class="[item.open?'open':'']"
                        @click="openMenu(item)">
                        {{ item.name }}
                    </router-link>
                    <ul v-show="item.open" >
                        <template v-for="(child, index2) in item.Sub">
                        <li :class="['list-group-item',child.Sub.length > 0?'has-child':'',child.open?'open':'']">
                            <a v-if="child.Sub.length >  0 " @click="openMenu(child)">{{child.name}}</a>
                            <router-link v-else :to="child.Alias" @click="openMenu(child)">{{child.name}}</router-link>
                        </li>
                            <item v-if="child.open" :model="child.Sub">
                            </item>
                        </template>   
                    </ul>
                    </li>
            </template>
        </div>`,
    props: ['model']
    ,
    data: function() {
        return {
            open: false
        };
    },
    computed: {
        isFolder: function() {
            return this.model.children && this.model.children.length;
        }
    },
    created:function(){
        var _this = this;

    },
    methods: {
        reOpen(child){
            var _this = this;
            if(!child.hasOwnProperty('open')){

                child.open = false;
            }
            if(child.Sub.length > 0){

                child.Sub.forEach(function(ch){

                    _this.reOpen(ch);
                });
            }
        },
        openMenu:function(item){
            if(item.open == true){
                item.open = false;
            }else{
                item.open = true;
            }

            this.$forceUpdate();
        },
        toggle: function() {
            if (this.isFolder) {
                this.open = !this.open;
            }
        },
        changeType: function() {
            if (!this.isFolder) {
                Vue.set(this.model, "children", []);
                this.addChild();
                this.open = true;
            }
        },
        addChild: function() {
            this.model.children.push({
                name: "New Item"
            });
        }
    }
});
Vue.component('pagination', {
    props: ['current', 'total'],
    template: `
    <ul class="pagination pagination-split" v-if="total > 1">
        <li class="page-item first" :class="{disabled : page == 1}"  @click.stop.prevent="first">
        <a href="#" class="page-link"><i class="fa fa-fast-backward"></i></a>
        </li>
        <li class="page-item prev" :class="{disabled : page == 1}" @click.stop.prevent="prev">
        <a href="#" class="page-link"><i class="fa fa-backward"></i></a>
        </li>
        <li class="page-item"
        v-for="item in total" @click.stop.prevent="setPage(item)"
        v-if="show(item)"
        :class=" { active : item == current} "
        >
        <a href="#" class="page-link">{{item}}</a>
        </li>
        <li class="page-item next" :class="{disabled : page == total}">
        <a href="#" class="page-link" @click.stop.prevent="next"><i class="fa fa-forward"></i></a>
        </li>
        <li class="page-item last" :class="{disabled : page == total}" @click.stop.prevent="last">
        <a href="#" class="page-link"><i class="fa fa-fast-forward"></i></a>
        </li>
    </ul>
    `,
    mounted: function () {
        var vm = this;
    },
    data: function () {
        return {
            page: (this.current) ? this.current : 1,
        };
    },
    methods: {

        setPage(index) {
            this.page = index;
            // if (index != this.page) {
            //     this.page = index;
            // }
        },
        show(index) {
            if (this.current <= 3) {
                if (index <= 5) {
                    return true;
                } else {
                    return false
                }
            } else if (this.current > this.total - 3) {
                if (index > this.total - 5) {
                    return true;
                } else {
                    return false
                }
            }
            return Math.abs(index - this.current) < 3;
        },
        prev() {
            if (this.page > 1) {
                this.page--;
            }
        },
        next() {
            if (this.page < this.total) {
                this.page++;
            }
        },
        first() {
            this.page = 1;
        },
        last() {
            this.page = this.total;
        }
    },
    watch: {
        'page': function (newval, oldval) {
            if (newval != oldval) {
                this.$emit('input', newval)
            }
        }
    }
});
var helper = new Helper();
Vue.filter('dd', function (value) {
    return helper.formatDate(new Date(value * 1000), 'dd');
})
Vue.filter('mm-yyyy', function (value) {
    return helper.formatDate(new Date(value * 1000), 'mm/yyyy');
})
Vue.filter('dd-mm-yyyy', function (value) {
    return helper.formatDate(new Date(value * 1000), 'dd/mm/yyyy');
})
Vue.filter('mm-dd-yyyy', function (value) {
    return helper.formatDate(new Date(value * 1000), 'mm/dd/yyyy');
})
Vue.filter('full-time', function (value) {
    return moment(new Date(value * 1000)).format('HH:mm:ss DD/MM/YYYY');
})
function Helper() {

    var methods = this;

    methods.formatDate = function (date, format) {
        var date = new Date(date),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear(),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        if (!format) {
            format = "mm/dd/yyyy";
        }
        format = format.replace("mm", month.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("yyyy") > -1) {
            format = format.replace("yyyy", year.toString());
        } else if (format.indexOf("yy") > -1) {
            format = format.replace("yy", year.toString().substr(2, 2));
        }
        format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));
        if (format.indexOf("t") > -1) {
            if (hours > 11) {
                format = format.replace("t", "pm");
            } else {
                format = format.replace("t", "am");
            }
        }
        if (format.indexOf("HH") > -1) {
            format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("hh") > -1) {
            if (hours > 12) {
                hours -= 12;
            }
            if (hours === 0) {
                hours = 12;
            }
            format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("mm") > -1) {
            format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
        }
        if (format.indexOf("ss") > -1) {
            format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
        }
        return format;
    },
        /** map dữ liệu cho đối tượng có phân trang */
        methods.mappingResponse = function (resource, object) {
            if (!object.hasOwnProperty('pagination')) {
                object.pagination = {};
            }
            object.data = resource.hasOwnProperty('data') ? resource.data : [];
            for (var key in object.pagination) {

                if (resource.hasOwnProperty(key)) {
                    object.pagination[key] = resource[key];
                }
            }
            var delay = object.hasOwnProperty('delay') && !isNaN(object.delay) ? object.delay : 10;
            setTimeout(function () {
                object.loading = false;
            }, delay);
        }
}
