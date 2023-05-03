<template>
  <el-breadcrumb separator=" / ">
    <el-breadcrumb-item v-for="(item, index) in data">
      <a :href="item.href" v-if="item.href">{{ item.title }}</a>
      <span v-else>{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>


<script>
export default {
  name: 'Breadcrumb',

  props: ['data'],

  data () {
    return {

    };
  },

  mounted () {

  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.el-breadcrumb {
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
</style>