"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"
import { DemoLoginButton } from "./demo-login-button"

export function AuthSection() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-heading">Welcome to Planora</CardTitle>
              <CardDescription className="text-base">Join our luxury event planning community</CardDescription>
            </CardHeader>
            <CardContent>
              <DemoLoginButton />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="login" className="text-sm">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">
                    Client
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="text-sm">
                    Vendor
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  <TabsContent value="login" className="mt-0">
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <LoginForm />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="register" className="mt-0">
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <RegisterForm />
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="vendor" className="mt-0">
                    <motion.div
                      key="vendor"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <VendorRegisterForm />
                    </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
