"use client"

import { useState } from "react"
import Plate from "../components/Plate"
import Summary from "../components/Summary"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [plates, setPlates] = useState<{ id: number; foodItems: { name: string; weight: number }[] }[]>([])

  const addPlate = () => {
    setPlates([...plates, { id: plates.length + 1, foodItems: [] }])
  }

  const removePlate = (id: number) => {
    setPlates(plates.filter((plate) => plate.id !== id).map((plate, index) => ({ ...plate, id: index + 1 })))
  }

  const updatePlate = (id: number, foodItems: { name: string; weight: number }[]) => {
    setPlates(plates.map((plate) => (plate.id === id ? { ...plate, foodItems } : plate)))
  }

  const totalFoodItems = plates.reduce((total, plate) => total + plate.foodItems.length, 0)

  return (
    <div className="bg-background text-foreground flex items-center justify-center dark min-h-screen">
      <main className="flex-grow flex flex-col items-center p-4 w-full h-full">
        <h1 className="text-5xl font-bold mb-8 text-center">Food Consumption Tracker</h1>
        <div className="w-full max-w-4xl flex flex-col items-center">
          {plates.length === 0 ? (
            <Button onClick={addPlate} className="mb-6 px-8 py-4 text-xl font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Add New Plate
            </Button>
          ) : (
            <>
              {plates.map((plate) => (
                <Plate key={plate.id} id={plate.id} foodItems={plate.foodItems} updatePlate={updatePlate} removePlate={removePlate} />
              ))}
              <Button onClick={addPlate} className="mb-4 mt-4 px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Add Another Plate
              </Button>
            </>
          )}
          {totalFoodItems > 0 && <Summary plates={plates} />}
        </div>
      </main>
    </div>
  )
}
