<script>
export default {};
</script>

<template>
  <header>
    <div class="logo-box">
      <img src="../../assets/img/logo.png" alt="Logo Millionaire" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #12148c;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo-box {
    height: 300px;
    width: 300px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
