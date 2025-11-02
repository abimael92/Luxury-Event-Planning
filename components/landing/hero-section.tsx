"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Logo/Brand */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl -m-4" />
              <h1 className="text-6xl md:text-8xl font-luxury font-bold text-transparent [-webkit-text-stroke:3px_white] absolute inset-0">
                Planora
              </h1>
              {/* Gradient fill layer */}
              <h1 className="text-6xl md:text-8xl font-luxury font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent relative [text-shadow:0_0_30px_rgba(255,255,255,0.5)] ">
                Planora
              </h1>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-800 animate-pulse" />
              <Sparkles className="absolute -bottom-2 -left-2 w-4 h-4 text-purple-800 animate-pulse delay-1000" />
            </div>

            <div className="flex items-center justify-center gap-2 mt-8">
              {/* <Sparkles className="w-5 h-5 text-accent text-purple-800 " /> */}
              <p className="text-xl font-cinzel  text-purple-800 font-medium"> Event Planning</p>
              {/* <Sparkles className="w-5 h-5 text-accent" /> */}
            </div>
          </motion.div>

          {/* Hero Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-balance mb-6">
              Your Personal Event{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Planner
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-purple-800 text-balance max-w-3xl mx-auto leading-relaxed">
              Connect with premium vendors, manage events, and create unforgettable experiences with our curated
              marketplace.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="gradient-royal text-white hover:glow-primary transition-all duration-300 px-8 py-6 text-lg font-semibold group"
            >
              Start Planning
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/20 bg-white/10 backdrop-blur-sm hover:border-primary/40 px-8 py-6 text-lg font-semibold hover:bg-primary/5 transition-all duration-300 "
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
              { title: "Curated Vendors", desc: "Premium DJs, venues, catering & more" },
              { title: "Smart Planning", desc: "Budget tracking & timeline management" },
              { title: "Secure Payments", desc: "Escrow protection & easy contracts" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                className="text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/20 transition-all duration-300"
              >
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
