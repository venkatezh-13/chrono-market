import { useState } from "react"
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "support@marketcirculars.com",
    description: "Send us an email anytime"
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+91 98765 43210",
    description: "Mon-Fri from 9am to 6pm"
  },
  {
    icon: MapPin,
    title: "Address",
    content: "Mumbai, Maharashtra",
    description: "India"
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "9:00 AM - 6:00 PM",
    description: "Monday to Friday"
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions about our platform? Need technical support? 
          Want to suggest new features? We'd love to hear from you.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{info.title}</h3>
                        <p className="text-foreground font-medium">{info.content}</p>
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                  size="lg"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How often is data updated?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform monitors exchanges 24/7 and updates data in real-time 
                as soon as new circulars are published.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Which exchanges are supported?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Currently we support NSE, BSE, and MCX. We're working on adding 
                more exchanges based on user demand.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Is the service free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, our basic service is completely free. We may introduce 
                premium features in the future for advanced users.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How reliable is the data?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We source data directly from official exchange websites and 
                maintain 99.9% uptime with automated monitoring and alerts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}