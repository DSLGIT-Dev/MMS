import { useState } from 'react'
import useWorkflowStore from '../store/workflowStore'

export default function CustomToolbar() {
  const [recipeName, setRecipeName] = useState('')
  const { saveRecipe, calculateTotalTime } = useWorkflowStore()
  
  const handleSaveRecipe = () => {
    if (!recipeName.trim()) return
    saveRecipe(recipeName)
    setRecipeName('')
  }

  const totalTime = calculateTotalTime()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="recipeName" className="block text-sm font-medium text-gray-700">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter recipe name"
            />
          </div>
          <button
            onClick={handleSaveRecipe}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Recipe
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Total Process Time: {totalTime} minutes
        </div>
      </div>
    </div>
  )
}