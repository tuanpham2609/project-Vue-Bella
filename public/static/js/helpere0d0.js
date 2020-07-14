// Vue.config.devtools = false;
Vue.filter('money', function (value) {
    return (value == undefined) ? '' : value.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.filter('only-day', function (value) {
    return moment(new Date(value * 1000)).format('DD/MM/YYYY');
});
Vue.filter('dd-mm-yyyy', function (value) {
    return helper.formatDate(new Date(value * 1000), 'dd/mm/yyyy');
})
Vue.filter('mm-dd-yyyy', function (value) {
    return helper.formatDate(new Date(value * 1000), 'mm/dd/yyyy');
})
Vue.use(VueForm, {
    validators: {
        matches: function (value, attrValue) {
            if (!attrValue) {
                return true;
            }
            return value === attrValue;
        },
        phone: function (value) {
            var pattern = /^\d+$/;
            return pattern.test(value);
        },
    }
});
Number.prototype.formatMoney = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};
Vue.filter('number_format',function(value){
    return (value == undefined) ? '' : value.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});
Vue.component('inputSpinner',{
    template:'<div class="input-group">\
            <a @click.stop.prevent="_descrease" class="input-group-addon">\
                <i class="fa fa-minus"></i>\
            </a>\
            <span class="form-control">{{value}}</span>\
            <a @click.stop.prevent="_increase" class="input-group-addon">\
                <i class="fa fa-plus"></i>\
            </a>\
        </div>',
    props:{
        value : {},
        min: {
            default : 1,
        },
        max :{},
        change : {},
        id : {}
    },
    data : function(){
        return {
            
        }
    },
    methods:{
        _increase : function(){
            var value ;
            if( this.max != undefined && this.value >= this.max){
                value = this.max;
            }else{
                value = this.value + 1;
            }
            if( typeof this.change == 'function'){
                this.change(this.id , value);
            }
            this.$emit('input', value);
        },
        _descrease : function(){
            var value ;
            if( this.value <= this.min){
                value = this.min;
            }else{
                value = this.value - 1;
            }
            if( typeof this.change == 'function'){
                this.change(this.id , value);
            }
            this.$emit('input', value);
        }
    },
    watch :{
        'value' : function(value){
            
        }
    }
});

Vue.component('datepicker', {
    template: '<input type="text" class="datepicker"  readonly/>',
    props: {
        value: {

        },
        max: {

        },
        min: {

        }
    },
    mounted: function () {
        var options = {
            dateFormat: "dd/mm/yy",
            changeYear: true,
            changeMonth: true,
            // yearRange: '1980:2050',
            onClose: this.onClose
        }
        if (this.min != undefined && this.min != '' && _.isDate(new Date(this.min * 1000))) {
            var date = moment(this.min * 1000).add(1, 'days');
            options.minDate = new Date(date);
        }
        if (this.max != undefined && this.max != '' && _.isDate(new Date(this.max * 1000))) {
            var date = moment(this.max * 1000).add(-1, 'days');
            options.minDate = new Date(date);
        }
        $(this.$el).datepicker(options);

        if (this.value == null) {
            $(this.$el).datepicker('setDate', this.value);
        } else {
            if (this.value != undefined && this.value != '' && _.isDate(new Date(this.value * 1000))) {
                $(this.$el).datepicker('setDate', new Date(this.value * 1000));
            } else {
                this.$emit('input', null);
            }
        }
    },
    methods: {
        onClose: function (date) {
            this.$emit('input', helper.toDateTime(date) / 1000);
        },
    },
    watch: {
        'value': function (newval) {
            if (newval == null) {
                $(this.$el).datepicker('setDate', newval);
            } else {
                if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                    $(this.$el).datepicker('setDate', new Date(newval * 1000));
                } else {
                    this.$emit('input', null);
                }
            }
        },
        'min': function (newval) {
            if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                var date = moment(newval * 1000).add(1, 'days');
                $(this.$el).datepicker('option', 'minDate', new Date(date));
            }
        },
        'max': function (newval) {
            if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                var date = moment(newval * 1000).add(-1, 'days');
                $(this.$el).datepicker('option', 'maxDate', new Date(date));
            }
        },
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

Vue.component('datepicker', {
    template: '<input type="text" class="datepicker"  readonly/>',
    props: {
        value: {},
        max: {},
        min: {}
    },
    mounted: function () {
        var options = {
            dateFormat: "dd/mm/yy",
            changeYear: true,
            changeMonth: true,
            yearRange: '1970:2050',
            onClose: this.onClose
        }
        if (this.min != undefined && this.min != '' && _.isDate(new Date(this.min * 1000))) {
            var date = moment(this.min * 1000).add(1, 'days');
            options.minDate = new Date(date);
        }
        if (this.max != undefined && this.max != '' && _.isDate(new Date(this.max * 1000))) {
            var date = moment(this.max * 1000).add(-1, 'days');
            options.minDate = new Date(date);
        }
        $(this.$el).datepicker(options);

        if (this.value == null) {
            $(this.$el).datepicker('setDate', this.value);
        } else {
            if (this.value != undefined && this.value != '' && _.isDate(new Date(this.value * 1000))) {
                $(this.$el).datepicker('setDate', new Date(this.value * 1000));
            } else {
                this.$emit('input', null);
            }
        }
    },
    methods: {
        onClose: function (date) {
            var num = moment(date, "DD-MM-YYYY").valueOf() / 1000;
            this.$emit('input', num);
            // this.$emit('input', helper.toDateTime(date) / 1000);
        },
    },
    watch: {
        'value': function (newval) {
            if (newval == null) {
                $(this.$el).datepicker('setDate', newval);
            } else {
                if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                    $(this.$el).datepicker('setDate', new Date(newval * 1000));
                } else {
                    this.$emit('input', null);
                }
            }
        },
        'min': function (newval) {
            if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                var date = moment(newval * 1000).add(1, 'days');
                $(this.$el).datepicker('option', 'minDate', new Date(date));
            }
        },
        'max': function (newval) {
            if (newval != undefined && newval != '' && _.isDate(new Date(newval * 1000))) {
                var date = moment(newval * 1000).add(-1, 'days');
                $(this.$el).datepicker('option', 'maxDate', new Date(date));
            }
        },
    }
});
function Helper() {
    var methods = this;
    var init = function() {

    }
    methods.formatDate = function(date, format) {
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
    }

    methods.showNotification = function(message, icon , type, time) {
        $.notify({
            icon: icon,
            message: message
        }, {
            type: type,
            timer: time,
            delay: 500,
            newest_on_top: true,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutRight'
            },
        });
    }

    methods.createId = function() {
        var idStrLen = 32;
        var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
        idStr += (new Date()).getTime().toString(36) + "_";
        do {
            idStr += (Math.floor((Math.random() * 35))).toString(36);
        } while (idStr.length < idStrLen);

        return (idStr);
    }
    init();
    return this;

}
var helper = new Helper();