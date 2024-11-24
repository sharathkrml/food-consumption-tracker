import { useState } from 'react'
import FoodItem from './FoodItem'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface PlateProps {
  id: number
  foodItems: { name: string; weight: number }[]
  updatePlate: (id: number, foodItems: { name: string; weight: number }[]) => void
  removePlate: (id: number) => void
}

export default function Plate({ id, foodItems, updatePlate, removePlate }: PlateProps) {
  const [newItemName, setNewItemName] = useState('')
  const [newItemWeight, setNewItemWeight] = useState('')

  const addFoodItem = () => {
    if (newItemName && newItemWeight) {
      const updatedFoodItems = [
        ...foodItems,
        { name: newItemName, weight: parseInt(newItemWeight) }
      ]
      updatePlate(id, updatedFoodItems)
      setNewItemName('')
      setNewItemWeight('')
    }
  }

  const removeFoodItem = (index: number) => {
    const updatedFoodItems = foodItems.filter((_, i) => i !== index)
    updatePlate(id, updatedFoodItems)
  }

  const updateFoodItemWeight = (index: number, newWeight: number) => {
    const updatedFoodItems = foodItems.map((item, i) => 
      i === index ? { ...item, weight: newWeight } : item
    )
    updatePlate(id, updatedFoodItems)
  }

  return (
    <div className="border border-border bg-card text-card-foreground p-6 mb-6 rounded-lg shadow-md w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Plate {id}</h2>
        <Button
          onClick={() => removePlate(id)}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </Button>
      </div>
      <div className="mb-4 flex flex-col items-center space-y-2">
        <Input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Food name"
          className="w-full"
        />
        <Input
          type="number"
          value={newItemWeight}
          onChange={(e) => setNewItemWeight(e.target.value)}
          placeholder="Weight (g)"
          className="w-full"
        />
        <Button 
          onClick={addFoodItem}
          className="w-full"
        >
          Add Food Item
        </Button>
      </div>
      {foodItems.map((item, index) => (
        <FoodItem 
          key={index} 
          name={item.name} 
          weight={item.weight} 
          onRemove={() => removeFoodItem(index)}
          onUpdateWeight={(newWeight) => updateFoodItemWeight(index, newWeight)}
        />
      ))}
    </div>
  )
}
