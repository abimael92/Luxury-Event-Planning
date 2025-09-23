// components/landing/hero-section.tsx
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

interface HeroSectionProps {
  onStartPlanning: () => void
}

export function HeroSection({ onStartPlanning }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-luxury font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Planora
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <p className="text-lg text-muted-foreground font-medium"> Event Planning</p>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
          </motion.div>

          <motion.div className="mb-12">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">
              Your Personal Event{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Planner
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Connect with premium vendors, manage events, and create unforgettable experiences with our curated marketplace.
            </p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="gradient-royal text-white px-8 py-6 text-lg font-semibold group"
              onClick={onStartPlanning}
            >
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 px-8 py-6 text-lg font-semibold hover:bg-primary/5 transition-all duration-300 bg-transparent"
            >
              Browse Vendors
            </Button>
          </motion.div>
          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { title: "Event Planning", desc: "Comprehensive tools to plan every detail of your special event", icon: "ri-calendar-event-line", bg: "bg-purple-500" },
              { title: "Premium Vendors", desc: "Curated network of top-rated vendors and service providers", icon: "ri-team-line", bg: "bg-pink-500" },
              { title: "Budget Management", desc: "Track expenses and manage your budget with precision", icon: "ri-wallet-line", bg: "bg-teal-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
              >
                <div className={`${feature.bg} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <i className={`${feature.icon} text-white text-2xl`}></i>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>

  )
}
