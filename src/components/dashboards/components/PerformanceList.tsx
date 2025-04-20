
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

interface PerformanceItem {
  name: string
  subject: string
  performance: number
}

interface PerformanceListProps {
  title: string
  items: PerformanceItem[]
}

export const PerformanceList = ({ title, items }: PerformanceListProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item) => (
            <li key={item.name} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.subject}</p>
              </div>
              <div className="flex items-center">
                <span className={`font-medium ${
                  item.performance >= 80 ? 'text-green-600' : 'text-amber-600'
                } mr-2`}>
                  {item.performance}%
                </span>
                {item.performance >= 80 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
