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
          empty-badge-image="https://image.flaticon.com/icons/svg/37/37496.svg"
          empty-trophy-image="https://image.flaticon.com/icons/svg/37/37496.svg"
          points-image="https://cdn3.iconfinder.com/data/icons/games-4-1/247/Star-512.png"
          badge-image="https://cdn4.iconfinder.com/data/icons/awards-26/270932/14-512.png"
          trophy-image="https://www.shareicon.net/download/2016/08/01/805319_award_512x512.png"
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
