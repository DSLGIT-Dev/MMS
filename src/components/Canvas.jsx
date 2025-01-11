import { useDrop } from 'react-dnd'
import useWorkflowStore from '../store/workflowStore'
import WorkflowNode from './WorkflowNode'

export default function Canvas() {
  const { nodes, addNode } = useWorkflowStore()

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'workflowItem',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const canvasRect = document.getElementById('canvas').getBoundingClientRect()
      
      addNode({
        type: item.type,
        label: item.label,
        position: {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
        },
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }))

  return (
    <div
      id="canvas"
      ref={drop}
      className={`flex-1 relative bg-white ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      {nodes.map((node) => (
        <WorkflowNode key={node.id} {...node} />
      ))}
    </div>
  )
}