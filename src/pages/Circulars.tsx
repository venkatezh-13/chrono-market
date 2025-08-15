import { useState, useEffect, useMemo } from "react"
import { Search, Calendar, ExternalLink, Building2, Clock, Download, RefreshCw, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Circular, CircularFilters } from "@/types/circular"
import { fetchAllCirculars, exportCircularsToCSV, onlyExDate } from "@/services/api"

const exchangeColors = {
  NSE: 'bg-financial-primary',
  BSE: 'bg-financial-success', 
  MCX: 'bg-financial-secondary'
}

const categoryColors = {
  'Corporate Action': 'bg-financial-warning',
  'Regulatory': 'bg-financial-error',
  'Trading': 'bg-financial-primary',
  'Compliance': 'bg-financial-secondary',
  'Market Update': 'bg-muted'
}

export default function Circulars() {
  const [circulars, setCirculars] = useState<Circular[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<CircularFilters>({
    exchange: 'all',
    query: '',
    exDateOnly: false
  })
  const [activeTab, setActiveTab] = useState<'all' | 'NSE' | 'BSE' | 'MCX'>('all')
  const { toast } = useToast()

  const loadCirculars = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true)
      else setRefreshing(true)
      setError(null)
      
      const data = await fetchAllCirculars({
        exchange: activeTab,
        query: filters.query,
        exDateOnly: filters.exDateOnly
      })
      
      setCirculars(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load circulars'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadCirculars()
  }, [activeTab, filters.exDateOnly])

  const filteredCirculars = useMemo(() => {
    if (!filters.query.trim()) return circulars
    const searchTerm = filters.query.toLowerCase()
    return circulars.filter(circular =>
      circular.title.toLowerCase().includes(searchTerm) ||
      (circular.category && circular.category.toLowerCase().includes(searchTerm))
    )
  }, [circulars, filters.query])

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

  const getExchangeCount = (exchange: 'all' | 'NSE' | 'BSE' | 'MCX') => {
    if (exchange === 'all') return circulars.length
    return circulars.filter(c => c.exchange === exchange).length
  }

  const handleExport = () => {
    exportCircularsToCSV(filteredCirculars)
    toast({
      title: "Export successful",
      description: `Exported ${filteredCirculars.length} circulars to CSV`
    })
  }

  const handleRefresh = () => {
    loadCirculars(false)
  }

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }))
  }

  const toggleExDateFilter = () => {
    setFilters(prev => ({ ...prev, exDateOnly: !prev.exDateOnly }))
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
              value={filters.query}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filters.exDateOnly ? "default" : "outline"}
              onClick={toggleExDateFilter}
              className="whitespace-nowrap"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Ex-Date Only
            </Button>
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={refreshing}
              className="whitespace-nowrap"
            >
              {refreshing ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={filteredCirculars.length === 0}
              className="whitespace-nowrap"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Exchanges */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'all' | 'NSE' | 'BSE' | 'MCX')} className="mb-6">
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading circulars...</span>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={() => loadCirculars()} variant="outline">
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredCirculars.length === 0 ? (
                <Card>
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground">No circulars found matching your criteria.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {filteredCirculars.map((circular) => {
                    const { date, time } = formatDate(circular.date)
                    const isExDate = onlyExDate(circular.title)
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
                                {circular.category && (
                                  <Badge 
                                    variant="outline"
                                    className={`text-white ${categoryColors[circular.category as keyof typeof categoryColors] || 'bg-muted'}`}
                                  >
                                    {circular.category}
                                  </Badge>
                                )}
                                {isExDate && (
                                  <Badge variant="destructive">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Ex-Date
                                  </Badge>
                                )}
                              </div>
                              <CardTitle className="text-lg md:text-xl leading-tight">
                                {circular.title}
                              </CardTitle>
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
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm" asChild>
                              <a href={circular.url} target="_blank" rel="noopener noreferrer">
                                View Full Circular
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}