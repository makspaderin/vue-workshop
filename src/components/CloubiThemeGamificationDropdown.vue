<template>
  <cloubi-dropdown
    :pointing="false"
    :floating="false"
    :event-bus="eventBus"
    :menu-style="menuStyle"
    :close-on-focus-out="false"
    label="gamification"
    hint="gamification"
    icon="gamepad"
    name="gamification"
    dropdown-id="gamification"
    title=""
    button-color="see-through"
    align="right">
    <template>
      <div class="gamification-dropdown-container">
        <cloubi-gamification-user-page
          :gamification-api="gamificationApi"
          :event-bus="eventBus"
        />
      </div>
    </template>
  </cloubi-dropdown>
</template>

<script>
export default {
  name: 'CloubiGamificationDropdown',

  components: {},

  props: {
    /**
     * GamificationApiWrapper instance
     */
    gamificationApi: { type: Object, required: true },
    /**
     * Event Bus instance.
     */
    eventBus: { type: Object, required: true }
  },

  computed: {
    menuStyle() {
      const style = {};
      style.overflow = 'scroll';
      style.height = `${window.innerHeight - 100}px`;
      return style;
    }
  }
};
</script>

<style lang="scss">
.gamification-dropdown-container {
  width: 790px;
}
</style>
