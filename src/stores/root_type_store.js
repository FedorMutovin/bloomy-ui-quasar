import { defineStore } from 'pinia'

export const useRootTypeStore = defineStore('RootTypeStore', {
  state: () => ({
    root_types: [
      {
        id: 1,
        name: 'wish',
        icon: 'mdi-notebook-heart-outline'
      },
      {
        id: 2,
        name: 'goal',
        icon: 'mdi-sprout-outline'
      },
      {
        id: 3,
        name: 'task',
        icon: 'mdi-clipboard-text-outline'
      },
      {
        id: 4,
        name: 'action',
        icon: 'mdi-check-circle-outline'
      },
      {
        id: 5,
        name: 'thought',
        icon: 'mdi-thought-bubble-outline'
      }
    ]
  }),

  getters: {
    getIconByRootName: (state) => (rootName) => {
      const rootType = state.root_types.find(type => type.name === rootName)
      return rootType ? rootType.icon : null
    },
    rootNames: (state) => {
      return state.root_types.map(type => type.name)
    },
    getRootTypeByName: (state) => (rootName) => {
      return state.root_types.find(type => type.name === rootName) || null
    }
  }
})
