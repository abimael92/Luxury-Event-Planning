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
        </motion.div>
      </div>
    </section>
  )
}
