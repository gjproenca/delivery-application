import Vue from 'vue';
import LeftPanelHtml from './left-panel.html';
import './left-panel.scss';

export const LeftPanelComponent = Vue.extend({
  name: 'LeftPanelComponent',
  template: LeftPanelHtml,
  data() {
    return {
      item: 0,
      deliveries: [] as any[],
      selectedDlv: {},
    };
  },
  created() {
    this.$store.dispatch('getDeliveries');
    this.deliveries = this.$store.state.data.deliveries;

    // so we can see the array getting sorted as it is sorted in the json
    this.deliveries.reverse();

    // bubblesort to order the deliveries
    const len = this.deliveries.length;
    for (let i = len - 1; i >= 0; i--) {
      for (let j = 1; j <= i; j++) {
        if (this.deliveries[j].dueBy < this.deliveries[j - 1].dueBy) {
          const temp = this.deliveries[j - 1];
          this.deliveries[j - 1] = this.deliveries[j];
          this.deliveries[j] = temp;
        }
      }
    }

    this.$store.dispatch('setDeliveries', this.deliveries);
    this.$store.dispatch('setSelectedFinish', [this.deliveries[0].location._lat, this.deliveries[0].location._long]);
  },
  methods: {
    selectedDelivery(delivery: any) {
      this.$store.dispatch('setSelectedFinish', [
        delivery.location._lat,
        delivery.location._long,
      ]);
    },
  },
});
