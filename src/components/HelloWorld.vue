<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Các thông tin cá nhân sẽ do chính bạn quản lý và quyết định có chia sẽ cho
      các bên thứ ba hay không,<br />
      để biết thêm chi tiết về SSI, vui lòng truy cập link sau:
      <a
        href="https://sovrin.org/faq/what-is-self-sovereign-identity/"
        target="_blank"
        rel="noopener"
        >What is self sovereign identity?</a
      >.
    </p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
