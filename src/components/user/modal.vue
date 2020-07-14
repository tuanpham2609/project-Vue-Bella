<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

<template>
      
    <div>
        <transition name="modal ">
            <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">

                <div class="modal-header">
                    <button type="button" @click="$emit('close')" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                </div>

                <div class="modal-body">
                    <vue-cropper
                        ref="cropper"
                        :src="imgSrc"
                        alt="Source Image"
                        :guides="true"
                        :view-mode="2"
                        drag-mode="crop"
                        :auto-crop-area="1"
                        :background="true"
                        :rotatable="true"
                            :img-style="{ 'width': '400px', 'height': '300px' }"
                    >
                    </vue-cropper>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" @click="$emit('close')">Đóng</button>
                    <button type="button" class="btn btn-green btn-submit" @click="cropImage" ><i class="fa fa-spin fa-spinner hide"></i>&nbsp;&nbsp;Cập nhật</button>
                </div>
                </div>
            </div>
            </div>
        </transition>
    </div>
       
</template>
<script>
import VueCropper from 'vue-cropperjs';
export default {
    props:['imgSrc',],
    components : {
        VueCropper
    },
    data: function () {
        return {
            cropImg: '',
        }
    },
    methods: {

         cropImage() {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
            this.$emit('cropImage', this.cropImg);
        },
        rotate() {
            // guess what this does :)
            this.$refs.cropper.rotate(90);
        },
    }
     
     
}
</script>
