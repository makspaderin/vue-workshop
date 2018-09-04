<template>
  <div class="cb-footer">
    <div class="text">Text1</div>
    <div class="link">Text2</div>
    <div class="link">Text3</div>
  </div>
</template>

<script>

export default {
  components: {
  },

  props: {
  },

  created() {
  },

  methods: {
  }
};
</script>

<style lang="scss">
// @import '../_variables.scss';

.cb-footer {
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #323643;

  .link {
    color: #ff570c;
    margin-left: 100px;
    margin-right: 100px;
  }

  .text {
    color: white;
    margin-left: 100px;
    margin-right: 100px;
  }
}

</style>
