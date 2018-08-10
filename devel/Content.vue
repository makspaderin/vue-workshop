<template>
  <div
    id="content"
    class="dummy-content-container">
    <div class="dummy-content">
      <div class="cb-row">
        <h1
          id="donk"
          data-cy="main-content-header">{{ header }}</h1>
        <div
          id="content-start">
          Content start
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},

  props: {
    header: { type: String, default: 'Default header' }
  }
};
</script>

<style lang="scss">
@import '../src/style.scss';

.dummy-content-container {
  margin-top: 0px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;

  .dummy-content {
    margin-top: 0px;
    margin-bottom: 50px;
    width: 1170px;
    min-height: 2000px;
    background-color: white;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-right: 15px;
    position: relative;
  }

  .cb-row {
    position: relative;
  }
}
#donk {
  margin-top: 100px;
}
#content-start {
  margin-top: 400px;
  margin-bottom: 400px;
}
</style>
