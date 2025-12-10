"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, MapPin, DollarSign, Users, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/shared/lib/utils"
import { useTranslation } from "@/hooks/use-translation" // Add this import

interface CreateEventModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface EventFormData {
  title: string
  eventType: string
  date: Date
  time: string
  location: string
  budget: number
  guestCount: number
  description: string
}

const eventTypes = [
  "Wedding",
  "Corporate Event",
  "Birthday Party",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Holiday Party",
  "Fundraiser",
  "Product Launch",
  "Other",
]

export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
  const [step, setStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useTranslation() // Add this hook

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>()

  const onSubmit = async (data: EventFormData) => {
    setIsLoading(true)
    try {
      // TODO: Implement actual event creation
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: t('events.create.success.title'),
        description: t('events.create.success.description'),
      })
      onOpenChange(false)
      setStep(1)
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('events.create.error.description'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">{t('events.create.title')}</DialogTitle>
          <DialogDescription>{t('events.create.description')}</DialogDescription>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                i === step
                  ? "bg-primary text-white"
                  : i < step
                    ? "bg-green-500 text-white"
                    : "bg-muted text-muted-foreground",
              )}
            >
              {i}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="title">{t('events.create.fields.title')}</Label>
                  <Input
                    id="title"
                    placeholder={t('events.create.placeholders.title')}
                    {...register("title", {
                      required: t('events.create.validation.titleRequired')
                    })}
                  />
                  {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventType">{t('events.create.fields.eventType')}</Label>
                  <Select onValueChange={(value) => setValue("eventType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('events.create.placeholders.eventType')} />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {t(`events.types.${type.toLowerCase().replace(' ', '')}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && <p className="text-sm text-destructive">{errors.eventType.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t('events.create.fields.description')}</Label>
                  <Textarea
                    id="description"
                    placeholder={t('events.create.placeholders.description')}
                    className="min-h-[100px]"
                    {...register("description")}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('events.create.fields.date')}</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : t('events.create.placeholders.date')}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => {
                            setDate(date)
                            setValue("date", date!)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">{t('events.create.fields.time')}</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="time"
                        type="time"
                        className="pl-10"
                        {...register("time", {
                          required: t('events.create.validation.timeRequired')
                        })}
                      />
                    </div>
                    {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">{t('events.create.fields.location')}</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      placeholder={t('events.create.placeholders.location')}
                      className="pl-10"
                      {...register("location", {
                        required: t('events.create.validation.locationRequired')
                      })}
                    />
                  </div>
                  {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="guestCount">{t('events.create.fields.guestCount')}</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="guestCount"
                      type="number"
                      placeholder="150"
                      className="pl-10"
                      {...register("guestCount", {
                        required: t('events.create.validation.guestCountRequired'),
                        min: {
                          value: 1,
                          message: t('events.create.validation.guestCountMin')
                        },
                      })}
                    />
                  </div>
                  {errors.guestCount && <p className="text-sm text-destructive">{errors.guestCount.message}</p>}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="budget">{t('events.create.fields.budget')}</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="50000"
                      className="pl-10"
                      {...register("budget", {
                        required: t('events.create.validation.budgetRequired'),
                        min: {
                          value: 100,
                          message: t('events.create.validation.budgetMin')
                        },
                      })}
                    />
                  </div>
                  {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
                  <p className="text-sm text-muted-foreground">
                    {t('events.create.budgetHelp')}
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">{t('events.create.nextSteps.title')}</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('events.create.nextSteps.step1')}</li>
                    <li>• {t('events.create.nextSteps.step2')}</li>
                    <li>• {t('events.create.nextSteps.step3')}</li>
                    <li>• {t('events.create.nextSteps.step4')}</li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              {t('common.previous')}
            </Button>

            {step < 3 ? (
              <Button type="button" onClick={nextStep}>
                {t('common.next')}
              </Button>
            ) : (
              <Button
                type="submit"
                className="gradient-royal text-white"
                disabled={isLoading}
              >
                {isLoading ? t('events.create.creating') : t('events.create.createButton')}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}