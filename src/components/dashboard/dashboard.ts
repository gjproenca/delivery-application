import Vue from 'vue';
import DashboardHtml from './dashboard.html';
import { MapComponent } from '@/components/map/map';
import { LeftPanelComponent } from '@/components/index';
import { mapState } from 'vuex';

export const DashboardComponent = Vue.extend({
  name: 'DashboardComponent',
  template: DashboardHtml,
  components: {
    MapComponent,
    LeftPanelComponent,
  },
  data() {
    return {
      mapKey: 0,
    };
  },
  computed: {
    forceRerender() {
      this.mapKey += 1;
    },
    ...mapState(['selectedFinish']),
  },
  watch: {
    // if selectedFinish changes it means the user has selected
    // a new delivery so re-render the mapComponent to show new route
    selectedFinish() {
      this.mapKey += 1;
    },
  },
});
