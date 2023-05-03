<template>
    <div class="content-home">
        <img src="../../assets/images/branner.jpg">
        <div class="content">
            <h3 class="title">欢迎来到我的博客后台</h3>
            <div class="todo">
                <h5>TODO</h5>
                <ul>
                    <li>抽象组件</li>
                    <li>响应式</li>
                    <li>代码规范优化</li>
                    <li>vue最佳实践优化</li>
                </ul>
            </div>
            <div class="todo">
                <h5>后续学习</h5>
                <ul>
                    <li>vue框架原理</li>
                    <li>vue最佳实践</li>
                    <li>组件化思想与优化</li>
                </ul>
            </div>
        </div>

    </div>
</template>


<script>
export default {
  name: 'HomeView',
};
</script>

<style lang="less" scoped>
.content-home {
  display: flex;

  img {
    width: 50%;
    border-radius: 10px 0 0 10px;
  }

  .content {
    width: 50%;
    padding: 20px;
    background-color: var(--bs-white);
    border-radius: 0 10px 10px 0;

    .title {
      color: var(--bs-danger);
      text-align: center;
    }

  }

  .todo {
    margin-top: 10px;

    ul {
      padding-left: 30px;
      margin-top: 10px;
      font-size: 14px;
      color: #333;
      
      li{
        padding: 5px;
      }
      
    }
  }

}
</style>

