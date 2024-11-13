import { defineStore } from 'pinia'

export const useEventTypeStore = defineStore('EventTypeStore', {
  state: () => ({
    event_types: [
      {
        id: 1,
        name: 'Wish',
        icon: 'mdi-notebook-heart-outline',
        tab_path: '/core/wishes'
      },
      {
        id: 2,
        name: 'Goal',
        icon: 'mdi-sprout-outline',
        tab_path: '/core/goals'
      },
      {
        id: 3,
        name: 'Task',
        icon: 'mdi-clipboard-text-outline',
        tab_path: '/core/tasks'
      },
      {
        id: 4,
        name: 'Action',
        icon: 'mdi-check-circle-outline',
        tab_path: '/core/actions'
      }
    ]
  }),

  getters: {
    getIconByEventName: (state) => (eventName) => {
      const eventType = state.event_types.find(type => type.name === eventName)
      return eventType ? eventType.icon : null
    },
    eventNames: (state) => {
      return state.event_types.map(type => type.name)
    }
  }
})
