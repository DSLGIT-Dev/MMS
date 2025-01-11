import { useState, useRef } from 'react'
import { useDrag } from 'react-dnd'
import { 
  CubeIcon, 
  CogIcon, 
  TruckIcon, 
  ClipboardDocumentCheckIcon, 
  ArchiveBoxIcon,
  BeakerIcon,
  ClockIcon,
  BuildingStorefrontIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'
import useWorkflowStore from '../store/workflowStore'

const iconMap = {
  machine: CogIcon,
  material: CubeIcon,
  process: BeakerIcon,
  transport: TruckIcon,
  quality: ClipboardDocumentCheckIcon,
  timer: ClockIcon,
  product: ArchiveBoxIcon,
  storage: BuildingStorefrontIcon,
}

export default function WorkflowNode({ id, type, label, position, properties = {} }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDraggingPosition, setIsDraggingPosition] = useState(false)
  const [localProperties, setLocalProperties] = useState(properties)
  const updateNodePosition = useWorkflowStore((state) => state.updateNodePosition)
  const updateNodeProperties = useWorkflowStore((state) => state.updateNodeProperties)
  const deleteNode = useWorkflowStore((state) => state.deleteNode)
  const addToInventory = useWorkflowStore((state) => state.addToInventory)
  const Icon = iconMap[type]
  
  const nodeRef = useRef(null)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  const handleMouseDown = (e) => {
    if (!isDraggingPosition) return
    
    const startX = e.clientX - position.x
    const startY = e.clientY - position.y
    
    const handleMouseMove = (e) => {
      const canvas = document.getElementById('canvas')
      const rect = canvas.getBoundingClientRect()
      const x = Math.min(Math.max(e.clientX - startX, 0), rect.width)
      const y = Math.min(Math.max(e.clientY - startY, 0), rect.height)
      
      updateNodePosition(id, { x, y })
    }
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      setIsDraggingPosition(false)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handlePropertyChange = (key, value) => {
    setLocalProperties(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    updateNodeProperties(id, localProperties)
    setIsEditing(false)
    
    if (type === 'product') {
      addToInventory({
        type: 'finished_product',
        ...localProperties
      })
    }
  }

  return (
    <div
      ref={(node) => {
        drag(node)
        nodeRef.current = node
      }}
      className={`absolute p-3 bg-white rounded-lg shadow-md
        ${isDragging ? 'opacity-50' : 'opacity-100'}
        ${isEditing ? 'min-w-[300px]' : ''}
        hover:shadow-lg transition-shadow`}
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        cursor: isDraggingPosition ? 'move' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icon className="w-5 h-5 mr-2 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsDraggingPosition(!isDraggingPosition)}
            className={`p-1 ${isDraggingPosition ? 'text-blue-500' : 'text-gray-500'} hover:text-gray-700`}
          >
            <ArrowsPointingOutIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-1 text-gray-500 hover:text-gray-700"
          >
            {isEditing ? <XMarkIcon className="w-4 h-4" /> : <PencilIcon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => deleteNode(id)}
            className="p-1 text-red-500 hover:text-red-700"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mt-3 space-y-2">
          {Object.entries(localProperties).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-600 capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => handlePropertyChange(key, e.target.value)}
                className="px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="w-full px-3 py-1 mt-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}