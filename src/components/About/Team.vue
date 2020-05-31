<template>
  <el-container>
    <el-row style="display:flex;justify-content: center">
      <el-col :xs="24" :md="24" :lg="8" :xl="8">
        <img alt="Vue logo" src="../../assets/Identifyme-logo.png" />
        <p>
          Đội ngũ phát triển hệ thống Identify.Me gồm hai thành viên trẻ, năng
          động, thích phiêu lưu khám phá
        </p>
        <!-- <br /> -->
        <p>
          Cùng với sự hỗ trợ, giải đáp thắc mắc một cách nhiệt tình từ cộng
          đồng, và đặc biệt là Thạc sĩ Đặng Lê Bảo Chương - giảng viên khoa Mạng
          máy tính và Truyền thông - ĐH CNTT - ĐHQG TP.HCM
        </p>
        <!-- <br /> -->
        <p>
          Từ những điều kiện trên, chúng tôi đã phát triển hệ thống Identify.Me,
          ứng dụng mô hình Self-Sovereign Identity để quản lý các thông tin định
          danh (như bằng đại học, chứng chỉ việc làm,...), cùng các thông tin cá
          nhân.
        </p>
        <p>
          Và với đặc điểm của SSI, người dùng sẽ trực tiếp quản lý những thông
          tin đó (có quyết định chia sẻ thông tin đó cho bên thứ ba hay không.),
          đồng thời cùng sự hỗ trợ của công nghệ blockchain, mức độ tin cậy của
          các thông tin được người dùng cung cấp gần như được chứng thực 100%
        </p>
        <p>
          Tuy chỉ ớ mức độ demo, nhưng chúng tôi sẽ cố gắng giải thích cách hoạt
          động của hệ thống và chúng tôi cũng mong muốn mô hình này ngày càng
          được phát triển mạnh mẽ hơn nữa.
        </p>
        <el-divider content-position="left">Đội ngũ,</el-divider>
        <el-divider content-position="center">
          <a
            href="https://github.com/xuanthu01"
            target="_blank"
            rel="noopener"
            style="text-decoration: none;"
            >Thu, Pham Xuan</a
          >
        </el-divider>
        <el-divider content-position="center">
          <a
            href="https://github.com/thinhnnd"
            target="_blank"
            rel="noopener"
            style="text-decoration: none;"
            >Thinh, Nguyen Nie Duc</a
          >
        </el-divider>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {};
</script>

<style scope>
.el-divider__text {
  background-color: #eff3f7;
}
</style>
