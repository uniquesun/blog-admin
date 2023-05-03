<template>
    <div>
        <!-- 面包屑 -->
        <breadcrumb :data="breadcrumbData"></breadcrumb>


        <el-row class="search">
            <el-col :span="6">
                <el-input prefix-icon="el-icon-search" size="small" placeholder="搜索标题 (enter)"
                          @keyup.e.enter.native="search"
                          v-model="query.title"></el-input>
            </el-col>
            <el-col :span="6" :offset="12" style="text-align: right">
                <el-button icon="el-icon-plus" plain size="small" round @click="createArticle">创建</el-button>
            </el-col>
        </el-row>


        <el-table :data="articles" fit show-header highlight-current-row empty-text="-" @sort-change="sortChange">
            <el-table-column prop="subtitle" label="小标题" width="150"></el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column prop="categories" label="分类" width="200">
                <template v-slot="scope">
                    <el-tag size="small" style="margin-right: 3px" v-for="category in scope.row.categories">{{ category.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="tags" label="标签" width="200">
                <template v-slot="scope">
                    <el-tag type="info" size="small" style="margin-right: 3px" v-for="tag in scope.row.tags">{{ tag.name }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" width="140">
                <template v-slot="scope">
                    <span>发布：</span>
                    <el-switch
                            v-model="scope.row.is_published"
                            active-color="#13ce66"
                            inactive-color="#C0C0C0"
                            @change="changeIsPublished($event,scope.row.id)"
                    >
                    </el-switch>
                    <br>
                    <span>推荐：</span>
                    <el-switch
                            v-model="scope.row.is_recommend"
                            active-color="#13ce66"
                            @change="changeIsRecommend($event,scope.row.id)"
                            inactive-color="#C0C0C0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" sortable="custom" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="50">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                          <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <el-button type="text" size="small" @click="handleEdit(scope.row)"
                                           icon="el-icon-edit-outline">编辑
                                </el-button>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <el-button type="text" size="small" @click="handleDelete(scope.row)"
                                           icon="el-icon-delete">删除
                                </el-button>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <pagination :total="total" :current_page="current_page" @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"></pagination>
    </div>
</template>


<script>
import breadcrumb from '@/components/breadcrumb.vue';
import pagination from '@/components/pagination.vue';

export default {
  name: 'ArticleView',

  components: {
    breadcrumb,
    pagination
  },

  data() {
    return {
      breadcrumbData: [
        {
          title: '首页',
          href: '/'
        },
        {
          title: '分类'
        }
      ],
      articles: [],
      total: 0,
      current_page: 1,
      query: {
        page: 1,
        page_size: 10,
        order: 'id',
        sort: 'desc',
        title: ''
      }
    };
  },

  mounted() {
    this.getArticle()
  },

  methods: {
    async getArticle() {
      const response = await this.$http.article.index(this.query)
      this.articles = response.data
      this.total = response.meta.total
      this.current_page = response.meta.current_page
    },
    handleSizeChange(page_size) {
      this.query.page_size = page_size
      this.getArticle()
    },
    handleCurrentChange(page) {
      this.query.page = page
      this.getArticle()
    },
    async handleDelete(row) {
      await this.$http.article.del(row.id)
      let index = this.articles.findIndex(item => {
        if (item.id === row.id) return true;
      })
      this.articles.splice(index, 1)
    },
    handleEdit(row) {
      this.$router.push(`/article/${row.id}/edit`)
    },
    sortChange(column, prop, order) {
      if (column.prop) {
        this.query.sort = (column.order === 'ascending' ? 'asc' : 'desc');
        this.query.order = column.prop
        this.getArticle(this.query)
      } else {
        this.getArticle(this.query)
      }
    },
    search() {
      this.getArticle(this.query)
    },
    async changeIsPublished(state, id) {
      const res = await this.$http.article.update(id, {
        'is_published': state
      })
      if(!res.status) this.$message.error(res.message)
    },
    async changeIsRecommend(state, id) {
      const res = await this.$http.article.update(id, {
        'is_recommend': state
      })
      if (!res.status) this.$message.error(res.message)
    },
    createArticle() {
      this.$router.push('/article/create')
    }
  },
};
</script>


<style lang="less" scoped>
.search {
  background-color: var(--bs-white);
  margin: 13px 0;
  padding: 6px;
}
</style>