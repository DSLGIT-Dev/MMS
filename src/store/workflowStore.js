import { create } from 'zustand'

const useWorkflowStore = create((set, get) => ({
  nodes: [],
  connections: [],
  recipes: [],
  inventory: [],
  
  addNode: (node) => set((state) => ({ 
    nodes: [...state.nodes, { 
      ...node, 
      id: Math.random().toString(36).substr(2, 9),
      properties: {
        ...node.defaultProperties,
        processTime: '0',
        startTime: '',
        endTime: '',
      }
    }] 
  })),

  updateNodePosition: (id, newPosition) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, position: newPosition } : node
    ),
  })),

  updateNodeProperties: (id, properties) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, properties: { ...node.properties, ...properties } } : node
    ),
  })),

  deleteNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    connections: state.connections.filter(
      conn => conn.sourceId !== id && conn.targetId !== id
    )
  })),

  addConnection: (sourceId, targetId) => set((state) => ({
    connections: [...state.connections, { sourceId, targetId, id: Math.random().toString(36).substr(2, 9) }]
  })),

  removeConnection: (connectionId) => set((state) => ({
    connections: state.connections.filter(conn => conn.id !== connectionId)
  })),

  saveRecipe: (name) => {
    const { nodes, connections } = get()
    set((state) => ({
      recipes: [...state.recipes, { name, nodes, connections, id: Math.random().toString(36).substr(2, 9) }]
    }))
  },

  loadRecipe: (recipeId) => {
    const recipe = get().recipes.find(r => r.id === recipeId)
    if (recipe) {
      set({ nodes: recipe.nodes, connections: recipe.connections })
    }
  },

  calculateTotalTime: () => {
    const { nodes, connections } = get()
    // Implement process time calculation logic here
    let totalTime = 0
    nodes.forEach(node => {
      totalTime += parseInt(node.properties.processTime || 0)
    })
    return totalTime
  },

  addToInventory: (product) => set((state) => ({
    inventory: [...state.inventory, {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    }]
  })),
}))

export default useWorkflowStore