<template>
    <div class="content">
        <breadcrumb :data="breadcrumbData"></breadcrumb>

        <div class="article-create">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="博客标题" prop="title">
                    <el-input v-model="form.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="slug" prop="slug">
                    <el-input v-model="form.slug" placeholder="slug，用于seo"></el-input>
                </el-form-item>
                <el-form-item label="小标题" prop="subtitle">
                    <el-input v-model="form.subtitle" placeholder="小标题"></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="发布">
                            <el-switch
                                    v-model="form.is_published"
                                    active-color="#13ce66"
                                    inactive-color="#C0C0C0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="首页推荐">
                            <el-switch
                                    v-model="form.is_recommend"
                                    active-color="#13ce66"
                                    inactive-color="#C0C0C0">
                            </el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="分类" prop="categories">
                            <el-select v-model="form.categories"
                                       multiple
                                       filterable
                                       remote
                                       :remote-method="searchCategory"
                                       placeholder="请选择分类">
                                <el-option v-for="category in categories"
                                           :label="category.name"
                                           :value="category.id"
                                           :key="category.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="标签" prop="tags">
                            <el-select v-model="form.tags"
                                       multiple
                                       allow-create
                                       filterable
                                       remote
                                       :remote-method="searchTag"
                                       placeholder="请选择标签">
                                <el-option v-for="tag in tags"
                                           :label="tag.name"
                                           :value="tag.name"
                                           :key="tag.id"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="图片" prop="image">
                    <!-- todo 应该优化成自己的上传组件-->
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
                </el-form-item>

                <el-form-item label="内容" prop="content">
                    <mavon-editor v-model="form.content" ref="mavonEditorRef" @imgAdd="imgAdd" @save="saveMd"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存博客</el-button>
                    <el-button @click="resetForm('form')">清空</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div style="height: 50px"></div>
    </div>
</template>

<script>
import breadcrumb from "@/components/breadcrumb.vue";
import uploader from "@/components/uploader.vue";
import store from "@/store";
import axios from "axios";

export default {
  name: "articleCreate",
  components: {breadcrumb, uploader},
  props: {
    id: {
      type: String,
      default: 0
    }
  },
  data() {
    return {
      breadcrumbData: [
        {
          title: '首页',
          href: '/'
        },
        {
          title: '博客列表',
          href: '/article'
        },
        {
          title: '创建博客'
        }
      ],
      form: {
        title: '',
        slug: '',
        subtitle: '',
        content: store.state.lastArticle,
        image: '',
        categories: [],
        tags: [],
        is_published: false,
        is_recommend: false
      },
      categories: [],
      tags: [],
      imageUrl: '',
      uploaderUrl: 'http://blog.site/admin/v1/file',
      headers: {
        'Authorization': 'Bearer ' + store.state.token
      },
      multiple: false,
      limit: 1,
      name: 'file',
      rules: {
        title: [
          {required: true, message: '请输入标题名称', trigger: 'blur'},
        ],
        slug: [
          {required: true, message: '请输入slug', trigger: 'blur'},
        ],
        subtitle: [
          {required: true, message: '请输入小标题', trigger: 'blur'},
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'},
        ],
        image: [
          {required: true, message: '请先上传图片', trigger: 'blur'},
        ],
        categories: [
          {required: true, message: '请先选择分类', trigger: 'blur'},
        ],
      },
      tag_query: {
        page: 1,
        page_size: 20,
        name: '',
      },
      category_query: {
        page: 1,
        page_size: 20,
        name: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          let response;
          if (this.id) {
            response = await this.$http.article.update(this.id, this.form)
          } else {
            response = await this.$http.article.create(this.form)
          }
          if (response.status) {
            this.$refs["form"].resetFields();
            this.imageUrl = ''
            await store.dispatch('updateLastArticle', '')
            return this.$message.success('保存博客成功~')
          }
          return this.$message.error(response.message)
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.form.image = res.data.path
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.includes('image');
      if (!isJPG) {
        this.$message.error('必须上传图片');
      }
      return isJPG;
    },
    searchTag(query) {
      if (query !== '') {
        setTimeout(() => {
          this.tag_query.name = query
          this.getTags(this.tag_query)
        }, 300);
      }
    },
    searchCategory(query) {
      if (query !== '') {
        setTimeout(() => {
          this.category_query.name = query
          this.getCategories(this.category_query)
        }, 300);
      }
    },
    async getTags(query) {
      const response = await this.$http.tag.index(query);
      this.tags = response.data
    },
    async getCategories(query) {
      const response = await this.$http.category.index(query);
      this.categories = response.data
    },
    imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append('file', $file);
      axios({
        url: 'http://blog.site/admin/v1/file',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + store.state.token
        },
      }).then((res) => {
        this.$refs.mavonEditorRef.$img2Url(pos, res.data.data.path);
      })
    },
    saveMd() {
      store.dispatch('updateLastArticle', this.form.content)
      this.$message.success('已保存到本地！')
    },
    async getArticle() {
      if (this.id) {
        const response = await this.$http.article.show(this.id)
        const article = response.data
        this.form.title = article.title
        this.form.subtitle = article.subtitle
        this.form.slug = article.slug
        this.form.content = article.content
        this.form.image = article.image
        this.form.is_published = article.is_published || false
        this.form.is_recommend = article.is_recommend || false
        this.form.categories = article.categories.map(v => {
          return v.id
        })
        this.form.tags = article.tags.map(v => {
          return v.name
        })
        this.imageUrl = article.image
      }
    }
  },
  mounted() {
    this.getCategories(this.category_query)
    this.getTags(this.tag_query)
    this.getArticle()
  },
}
</script>

<style lang="less" scoped>

.content {
  height: 100%;
  padding-bottom: 20px;
}

.article-create {
  background-color: #ffffff;
  padding: 15px 15px 30px 15px;
  border-radius: 10px;
}

.mavonEditor {
  width: 100%;
  height: 100%;
}

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
  border: 1px solid #b8c2cc;
  border-radius: 8px;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}


</style>