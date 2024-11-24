import { useState } from 'react'
import FoodItem from './FoodItem'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from 'lucide-react'

interface PlateProps {
  id: number
  foodItems: { name: string; weight: number }[]
  updatePlate: (id: number, foodItems: { name: string; weight: number }[]) => void
  removePlate: (id: number) => void
}

export default function Plate({ id, foodItems, updatePlate, removePlate }: PlateProps) {
  const [newItemName, setNewItemName] = useState('')
  const [newItemWeight, setNewItemWeight] = useState('')
  const [isIncremental, setIsIncremental] = useState(false)

  const addFoodItem = () => {
    if (newItemName && newItemWeight) {
      let updatedFoodItems;
      const newWeight = parseInt(newItemWeight)

      if (isIncremental) {
        const totalCurrentWeight = foodItems.reduce((sum, item) => sum + item.weight, 0)
        const remainingWeight = Math.max(0, newWeight - totalCurrentWeight)

        if (remainingWeight > 0) {
          updatedFoodItems = [
            ...foodItems,
            { name: newItemName, weight: remainingWeight }
          ]
        } else {
          updatedFoodItems = [...foodItems]
        }
      } else {
        updatedFoodItems = [
          ...foodItems,
          { name: newItemName, weight: newWeight }
        ]
      }

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

  const totalWeight = foodItems.reduce((sum, item) => sum + item.weight, 0)

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
        <div className="flex items-center space-x-2 w-full mb-2">
          <Switch
            id={`incremental-${id}`}
            checked={isIncremental}
            onCheckedChange={setIsIncremental}
          />
          <Label htmlFor={`incremental-${id}`}>Incremental</Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>When enabled, the new item's weight will be the difference between the total entered weight and the current plate weight.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
          placeholder={isIncremental ? "Total plate weight (g)" : "Weight (g)"}
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
      <div className="mt-4 text-right text-sm text-muted-foreground">
        Total plate weight: {totalWeight}g
      </div>
    </div>
  )
}

