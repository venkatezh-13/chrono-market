import { useState, useEffect } from "react"
import { Search, Filter, Calendar, ExternalLink, Building2, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Circular {
  id: string
  title: string
  description: string
  exchange: 'NSE' | 'BSE' | 'MCX'
  date: string
  type: 'Corporate Action' | 'Regulatory' | 'Trading' | 'Compliance' | 'Market Update'
  isExDate?: boolean
  url: string
  company?: string
}

// Mock data - in real app this would come from API
const mockCirculars: Circular[] = [
  {
    id: '1',
    title: 'Ex-Date for Dividend Payment - RELIANCE',
    description: 'Record Date and Ex-Date for Dividend of Rs. 8.50 per share',
    exchange: 'NSE',
    date: '2024-08-15T10:30:00Z',
    type: 'Corporate Action',
    isExDate: true,
    url: '#',
    company: 'RELIANCE'
  },
  {
    id: '2',
    title: 'Trading Holiday on Account of Independence Day',
    description: 'Markets will remain closed on August 15, 2024',
    exchange: 'BSE',
    date: '2024-08-14T16:00:00Z',
    type: 'Market Update',
    url: '#'
  },
  {
    id: '3',
    title: 'New Margin Requirements for F&O Segment',
    description: 'Updated margin requirements effective from August 20, 2024',
    exchange: 'NSE',
    date: '2024-08-14T14:15:00Z',
    type: 'Regulatory',
    url: '#'
  },
  {
    id: '4',
    title: 'Gold Futures Contract Specifications Update',
    description: 'Revised contract specifications for Gold futures',
    exchange: 'MCX',
    date: '2024-08-14T11:45:00Z',
    type: 'Trading',
    url: '#'
  },
  {
    id: '5',
    title: 'Book Closure for Rights Issue - TATA STEEL',
    description: 'Book closure dates for Rights Issue in the ratio of 1:20',
    exchange: 'BSE',
    date: '2024-08-13T15:30:00Z',
    type: 'Corporate Action',
    isExDate: true,
    url: '#',
    company: 'TATA STEEL'
  }
]

const exchangeColors = {
  NSE: 'bg-blue-500',
  BSE: 'bg-green-500',
  MCX: 'bg-purple-500'
}

const typeColors = {
  'Corporate Action': 'bg-orange-500',
  'Regulatory': 'bg-red-500',
  'Trading': 'bg-blue-500',
  'Compliance': 'bg-yellow-500',
  'Market Update': 'bg-gray-500'
}

export default function Circulars() {
  const [circulars, setCirculars] = useState<Circular[]>(mockCirculars)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExchange, setSelectedExchange] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showExDateOnly, setShowExDateOnly] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const filterCirculars = (exchangeFilter?: string) => {
    const exchange = exchangeFilter || activeTab
    return circulars.filter(circular => {
      const matchesSearch = circular.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           circular.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (circular.company && circular.company.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesExchange = exchange === 'all' || circular.exchange === exchange
      
      const matchesType = selectedType === 'all' || circular.type === selectedType
      
      const matchesExDate = !showExDateOnly || circular.isExDate
      
      return matchesSearch && matchesExchange && matchesType && matchesExDate
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-IN'),
      time: date.toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      })
    }
  }

  const getExchangeCount = (exchange: string) => {
    if (exchange === 'all') return circulars.length
    return circulars.filter(c => c.exchange === exchange).length
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Market Circulars</h1>
        <p className="text-xl text-muted-foreground">
          Live updates from NSE, BSE, and MCX regulatory announcements
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search circulars, companies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Corporate Action">Corporate Action</SelectItem>
                <SelectItem value="Regulatory">Regulatory</SelectItem>
                <SelectItem value="Trading">Trading</SelectItem>
                <SelectItem value="Compliance">Compliance</SelectItem>
                <SelectItem value="Market Update">Market Update</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showExDateOnly ? "default" : "outline"}
              onClick={() => setShowExDateOnly(!showExDateOnly)}
              className="whitespace-nowrap"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Ex-Date Only
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Exchanges */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All
            <Badge variant="secondary" className="text-xs">
              {getExchangeCount('all')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="NSE" className="flex items-center gap-2">
            NSE
            <Badge variant="secondary" className="text-xs">
              {getExchangeCount('NSE')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="BSE" className="flex items-center gap-2">
            BSE
            <Badge variant="secondary" className="text-xs">
              {getExchangeCount('BSE')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="MCX" className="flex items-center gap-2">
            MCX
            <Badge variant="secondary" className="text-xs">
              {getExchangeCount('MCX')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="coming-soon" disabled>
            More...
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <div className="grid gap-4">
            {filterCirculars().length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No circulars found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              filterCirculars().map((circular) => {
                const { date, time } = formatDate(circular.date)
                return (
                  <Card key={circular.id} className="transition-all duration-300 hover:shadow-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-white ${exchangeColors[circular.exchange]}`}
                            >
                              <Building2 className="h-3 w-3 mr-1" />
                              {circular.exchange}
                            </Badge>
                            <Badge 
                              variant="outline"
                              className={`text-white ${typeColors[circular.type]}`}
                            >
                              {circular.type}
                            </Badge>
                            {circular.isExDate && (
                              <Badge variant="destructive">
                                <Calendar className="h-3 w-3 mr-1" />
                                Ex-Date
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg md:text-xl leading-tight">
                            {circular.title}
                          </CardTitle>
                          {circular.company && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Company: {circular.company}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col items-end text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {time}
                          </div>
                          <div>{date}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-base mb-4">
                        {circular.description}
                      </CardDescription>
                      <Button variant="outline" size="sm" asChild>
                        <a href={circular.url} target="_blank" rel="noopener noreferrer">
                          View Full Circular
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}