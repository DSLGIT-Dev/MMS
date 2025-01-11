import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Toolbox from './components/Toolbox'
import Canvas from './components/Canvas'
import CustomToolbar from './components/CustomToolbar'
import RecipeList from './components/RecipeList'
import './index.css'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex h-screen bg-gray-100">
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Toolbox />
          <RecipeList />
        </div>
        <Canvas />
        <CustomToolbar />
      </div>
    </DndProvider>
  )
}

export default App