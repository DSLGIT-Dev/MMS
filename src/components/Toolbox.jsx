import { useDrag } from 'react-dnd'
import { 
  CubeIcon, 
  CogIcon, 
  TruckIcon, 
  ClipboardDocumentCheckIcon, 
  ArchiveBoxIcon,
  BeakerIcon,
  ClockIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline'

const tools = [
  { 
    type: 'machine', 
    icon: CogIcon, 
    label: 'Machine',
    defaultProperties: {
      capacity: '',
      operatingHours: '',
      maintenanceSchedule: '',
      powerConsumption: '',
      processTime: '0'
    }
  },
  { 
    type: 'material', 
    icon: CubeIcon, 
    label: 'Raw Material',
    defaultProperties: {
      sku: '',
      price: '',
      quantity: '',
      unit: '',
      supplier: '',
      color: '',
      processTime: '0'
    }
  },
  { 
    type: 'process', 
    icon: BeakerIcon, 
    label: 'Process Step',
    defaultProperties: {
      description: '',
      temperature: '',
      pressure: '',
      processTime: '0'
    }
  },
  { 
    type: 'transport', 
    icon: TruckIcon, 
    label: 'Transport',
    defaultProperties: {
      vehicle: '',
      capacity: '',
      route: '',
      estimatedTime: '',
      processTime: '0'
    }
  },
  { 
    type: 'quality', 
    icon: ClipboardDocumentCheckIcon, 
    label: 'Quality Check',
    defaultProperties: {
      checkpoints: '',
      standards: '',
      inspector: '',
      frequency: '',
      processTime: '0'
    }
  },
  { 
    type: 'timer', 
    icon: ClockIcon, 
    label: 'Timer',
    defaultProperties: {
      duration: '',
      notification: '',
      processTime: '0'
    }
  },
  { 
    type: 'product', 
    icon: ArchiveBoxIcon, 
    label: 'Final Product',
    defaultProperties: {
      sku: '',
      price: '',
      weight: '',
      dimensions: '',
      packaging: '',
      processTime: '0'
    }
  },
  { 
    type: 'storage', 
    icon: BuildingStorefrontIcon, 
    label: 'Storage',
    defaultProperties: {
      capacity: '',
      temperature: '',
      humidity: '',
      location: '',
      processTime: '0'
    }
  }
]

export default function Toolbox() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Toolbox</h2>
      <div className="space-y-2">
        {tools.map((tool) => (
          <ToolboxItem key={tool.type} {...tool} />
        ))}
      </div>
    </div>
  )
}

function ToolboxItem({ type, icon: Icon, label, defaultProperties }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'workflowItem',
    item: { type, label, defaultProperties },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag}
      className={`flex items-center p-2 rounded cursor-move hover:bg-gray-50
        ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <Icon className="w-5 h-5 mr-2 text-gray-600" />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  )
}