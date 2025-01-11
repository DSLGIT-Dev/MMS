import useWorkflowStore from '../store/workflowStore'

export default function RecipeList() {
  const { recipes, loadRecipe } = useWorkflowStore()

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Saved Recipes</h3>
      <div className="space-y-2">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
          >
            <span className="text-sm text-gray-700">{recipe.name}</span>
            <button
              onClick={() => loadRecipe(recipe.id)}
              className="px-2 py-1 text-xs text-blue-600 hover:text-blue-700"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}