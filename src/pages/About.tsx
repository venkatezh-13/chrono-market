import { Shield, Zap, Globe, Users, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Real-time Data",
    description: "Get instant access to circulars as soon as they're published by exchanges"
  },
  {
    icon: Globe,
    title: "Multi-Exchange Coverage",
    description: "Comprehensive coverage of NSE, BSE, MCX with plans to expand to more exchanges"
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description: "99.9% uptime with enterprise-grade security and data protection"
  },
  {
    icon: Users,
    title: "User-Friendly",
    description: "Intuitive interface designed for both beginners and professional traders"
  }
]

const milestones = [
  {
    year: "2024",
    title: "Platform Launch",
    description: "Launched with NSE, BSE, and MCX integration"
  },
  {
    year: "2024",
    title: "10K+ Circulars",
    description: "Successfully tracked over 10,000 regulatory announcements"
  },
  {
    year: "2024",
    title: "Advanced Filtering",
    description: "Introduced smart filtering and search capabilities"
  }
]

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About MarketCirculars
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're revolutionizing how traders and investors access critical market information 
          by providing real-time regulatory announcements from major Indian stock exchanges 
          in one unified, easy-to-use platform.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            To democratize access to critical market information by aggregating regulatory 
            announcements, corporate actions, and trading updates from multiple exchanges 
            into a single, searchable platform. We believe that timely access to accurate 
            information is fundamental to making informed investment decisions.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="h-full">
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
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-primary flex-shrink-0" />
                  {index < milestones.length - 1 && (
                    <div className="w-px h-16 bg-border mt-4" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-2xl font-bold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-semibold">{milestone.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 rounded-lg p-8 mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Live Monitoring</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">3</div>
            <div className="text-muted-foreground">Major Exchanges</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">10K+</div>
            <div className="text-muted-foreground">Circulars Tracked</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">Built with Modern Technology</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our platform is built using cutting-edge technology to ensure fast, reliable, 
          and secure access to market data. We use advanced caching mechanisms, real-time 
          data processing, and robust APIs to deliver information as quickly as possible.
        </p>
      </section>
    </div>
  )
}