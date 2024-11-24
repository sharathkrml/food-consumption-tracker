import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface SummaryProps {
  plates: { id: number; foodItems: { name: string; weight: number }[] }[]
}

export default function Summary({ plates }: SummaryProps) {
  const totalConsumption = plates.reduce((acc, plate) => {
    plate.foodItems.forEach(item => {
      if (acc[item.name]) {
        acc[item.name] += item.weight
      } else {
        acc[item.name] = item.weight
      }
    })
    return acc
  }, {} as { [key: string]: number })

  const totalWeight = Object.values(totalConsumption).reduce((sum, weight) => sum + weight, 0)

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-4">
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Total Consumption Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Food Item</TableHead>
                <TableHead className="text-right">Weight</TableHead>
                <TableHead className="text-right">Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(totalConsumption).map(([name, weight]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell className="text-right">{weight}g</TableCell>
                  <TableCell className="text-right">
                    {((weight / totalWeight) * 100).toFixed(1)}%
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">{totalWeight}g</TableCell>
                <TableCell className="text-right font-bold">100%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

