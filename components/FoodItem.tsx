import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Minus, Plus, Pencil } from 'lucide-react'

interface FoodItemProps {
  name: string
  weight: number
  onRemove: () => void
  onUpdateWeight: (newWeight: number) => void
}

export default function FoodItem({ name, weight, onRemove, onUpdateWeight }: FoodItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newWeight, setNewWeight] = useState(weight)

  const handleWeightChange = (change: number) => {
    const updatedWeight = Math.max(0, newWeight + change)
    setNewWeight(updatedWeight)
    onUpdateWeight(updatedWeight)
  }

  return (
    <div className="flex items-center justify-between mb-2 p-3 bg-muted/50 rounded">
      <span className="font-medium min-w-[100px]">{name}</span>
      <div className="flex items-center gap-2">
        {isEditing ? (
          <Input
            type="number"
            value={newWeight}
            onChange={(e) => {
              const value = parseInt(e.target.value)
              setNewWeight(isNaN(value) ? 0 : value)
            }}
            className="w-20 h-8"
            onBlur={() => {
              onUpdateWeight(newWeight)
              setIsEditing(false)
            }}
            autoFocus
          />
        ) : (
          <span className="min-w-[60px] text-center">{weight}g</span>
        )}
        <div className="flex items-center gap-1">
          <Button 
            onClick={() => handleWeightChange(-10)}
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => handleWeightChange(10)}
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant="ghost"
            size="sm"
            className="h-8 px-2"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            onClick={onRemove}
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

