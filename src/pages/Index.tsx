import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, Bell, Filter, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Bell,
    title: "Real-time Notifications",
    description: "Get instant updates on new circulars from NSE, BSE, and MCX"
  },
  {
    icon: Filter,
    title: "Smart Filtering",
    description: "Filter by exchange, date, or circular type to find exactly what you need"
  },
  {
    icon: Search,
    title: "Advanced Search",
    description: "Search across all exchanges with powerful keyword matching"
  },
  {
    icon: BarChart3,
    title: "Market Analytics",
    description: "Analyze market trends and patterns from regulatory announcements"
  }
]

const stats = [
  { value: "10K+", label: "Circulars Tracked" },
  { value: "3", label: "Major Exchanges" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Live Monitoring" }
]

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Stay Ahead with Live Market Circulars
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Real-time access to NSE, BSE, and MCX regulatory announcements, 
              corporate actions, and market updates in one unified platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/circulars">
                  View Live Circulars
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Track Market Movements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform aggregates regulatory announcements from major Indian stock exchanges, 
              giving you comprehensive market intelligence in real-time.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="h-full transition-all duration-300 hover:shadow-elevated">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of traders and investors who rely on our platform 
            for timely market intelligence and regulatory updates.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/circulars">
              Start Monitoring Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}