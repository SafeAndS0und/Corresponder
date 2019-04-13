import Vue from 'vue'
import DND from '../assets/js/drag_n_drop'

Vue.directive('dnd', {
  componentUpdated: DND
})
