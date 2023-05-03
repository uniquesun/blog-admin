<template>
    <div>
        <breadcrumb :data="breadcrumbData"></breadcrumb>
        <div class="comment-content">
            还没有计划添加评论~
        </div>
    </div>

</template>


<script>
import breadcrumb from "@/components/breadcrumb.vue";

export default {
  name: 'CommentView',
  components: {breadcrumb},
  data() {
    return {
      breadcrumbData: [
        {
          title: '首页',
          href: '/'
        },
        {
          title: '评论'
        }
      ],
    }
  }
};
</script>


<style lang="less" scoped>
.comment-content {
  background-color: var(--bs-white);
  min-height: 300px;
  padding: 10px;
}
</style>