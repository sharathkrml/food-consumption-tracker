import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Total Consumption Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Food Item</TableHead>
            <TableHead>Total Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(totalConsumption).map(([name, weight]) => (
            <TableRow key={name}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{weight}g</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

