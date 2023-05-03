<template>
    <div>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page=currentPage
                       :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
    </div>
</template>


<script>
export default {
  name: 'Pagination',

  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => ([10, 20, 50, 100])
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },

  methods: {
    handleSizeChange(pageSize) {
      this.$emit('handleSizeChange', pageSize)
    },
    handleCurrentChange(page) {
      this.$emit('handleCurrentChange', page)
    }
  }
};
</script>


<style lang="less" scoped>
.el-pagination {
  background-color: #ffffff;
  margin-top: 10px;
  padding: 8px 13px;
  text-align: right;
}
</style>
