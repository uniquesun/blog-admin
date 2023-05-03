<template>
    <div>
        <el-upload
                class="avatar-uploader"
                :action="uploaderUrl"
                :headers="headers"
                :multiple="multiple"
                :name="name"
                :limit="limit"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import store from "@/store";

export default {
  name: "uploader",
  props: [
    {
      action: {
        type: String,
        required: true,
        default:''
      }
    }
  ],
  data() {
    return {
      uploaderUrl: 'http://blog.site/admin/v1/file',
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      },
      imageUrl: '',
      multiple: false,
      limit: 1,
      name: 'file'
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.includes('image');
      if (!isJPG) {
        this.$message.error('必须上传图片');
      }
      return isJPG;
    }
  }
}
</script>

<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px solid paleturquoise;
  border-radius: 8px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>