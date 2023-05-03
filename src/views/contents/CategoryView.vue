<template>
    <div>
        <!-- 面包屑 -->
        <breadcrumb :data="breadcrumbData"></breadcrumb>

        <el-row class="search">
            <el-col :span="6">
                <el-input prefix-icon="el-icon-search" size="small" placeholder="搜索分类名 (enter)"
                          @keyup.e.enter.native="search"
                          v-model="query.name"></el-input>
            </el-col>
            <el-col :span="6" :offset="12" style="text-align: right">
                <el-button icon="el-icon-plus" plain size="small" round @click="drawer = true">创建</el-button>
            </el-col>
        </el-row>

        <!-- table -->
        <el-table :data="categories" fit show-header highlight-current-row empty-text="-">
            <el-table-column prop="id" label="ID" sortable width="80">
            </el-table-column>
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="is_recommend" label="推荐目录">
                <template v-slot="scope">
                    <el-switch
                            v-model="scope.row.is_recommend"
                            active-color="#13ce66"
                            @change="changeIsRecommend($event,scope.row.id)"
                            inactive-color="#C0C0C0">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-dropdown>
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
                        <el-dropdown-menu>
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

        <!-- 分页 -->
        <pagination :total="total" :current_page="current_page" @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"></pagination>

        <el-drawer
                title="创建分类"
                :visible.sync="drawer"
                direction="rtl"
        >
            <div class="create-category">
                <el-form :model="form" :rules="rules" ref="form" label-width="80px">
                    <el-form-item label="分类名" prop="name">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="父分类" prop="parent_id">
                        <el-select remote filterable
                                   :remote-method="searchCategory"
                                   v-model="form.parent_id">
                            <el-option label="无父分类" value=0></el-option>
                            <el-option v-for="category in categories"
                                       :label="category.name"
                                       :value="category.id"
                                       :key="category.id"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">立即创建</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-drawer>

    </div>
</template>


<script>
import breadcrumb from '@/components/breadcrumb.vue';
import pagination from '@/components/pagination.vue';

export default {
  name: 'CategoryView',

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
      categories: [],
      total: 0,
      current_page: 1,
      query: {
        page: 1,
        page_size: 10,
        order: 'id',
        sort: 'asc',
        name: ''
      },
      drawer: false,
      form: {
        name: '',
        parent_id: 0,
      },
      rules: {
        name: [
          {required: true, message: '请输入分类名', trigger: 'blur'},
        ],
        parent_id: [
          {required: true, message: '请选择父分类', trigger: 'change'}
        ],
      }
    };
  },

  mounted() {
    this.getCategory()
  },

  methods: {
    async getCategory() {
      const response = await this.$http.category.index(this.query)
      this.categories = response.data
      this.total = response.meta.total
      this.current_page = response.meta.current_page
    },
    handleSizeChange(page_size) {
      this.query.page_size = page_size
      this.getCategory()
    },
    handleCurrentChange(page) {
      this.query.page = page
      this.getCategory()
    },
    async handleDelete(row) {
      await this.$http.category.del(row.id)
      let index = this.categories.findIndex(item => {
        if (item.id === row.id) return true;
      })
      this.categories.splice(index, 1)
    },
    sortChange(column, prop, order) {
      if (column.prop) {
        this.query.sort = (column.order === 'ascending' ? 'asc' : 'desc');
        this.query.order = column.prop
        this.getCategory(this.query)
      } else {
        this.getCategory(this.query)
      }
    },
    search() {
      this.getCategory(this.query)
    },
    searchCategory(query) {
      if (query !== '') {
        setTimeout(() => {
          this.query.name = query
          this.getCategory(this.query)
        }, 300);
      }
    },
    submitForm() {
      this.$refs["form"].validate(async (valid) => {
        if (valid) {
          const response = await this.$http.category.create(this.form)
          if (response.status) {
            this.query.name = ''
            await this.getCategory()
            return this.$message.success("创建分类成功！")
          }
          return this.$message.error(response.message)
        }
      });
    },
    async changeIsRecommend(status, id) {
      const res = await this.$http.category.update(id, {
        is_recommend: status
      })
      if (!res.status) return this.$message.error(res.message)

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

.create-category {
  padding: 10px;
}
</style>