"use client"


import { useState } from "react"

export default function CreateEventModal() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Create Event
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Create Event</h2>
                        <p>Event creation modal coming soon...</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { motion, AnimatePresence } from "framer-motion"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { format } from "date-fns"
// import { CalendarIcon, MapPin, DollarSign, Users, Clock } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { cn } from "@/shared/lib/utils"

// interface CreateEventModalProps {
//     open: boolean
//     onOpenChange: (open: boolean) => void
// }

// interface EventFormData {
//     title: string
//     eventType: string
//     date: Date
//     time: string
//     location: string
//     budget: number
//     guestCount: number
//     description: string
// }

// const eventTypes = [
//     "Wedding",
//     "Corporate Event",
//     "Birthday Party",
//     "Anniversary",
//     "Baby Shower",
//     "Graduation",
//     "Holiday Party",
//     "Fundraiser",
//     "Product Launch",
//     "Other",
// ]

// export function CreateEventModal({ open, onOpenChange }: CreateEventModalProps) {
//     const [step, setStep] = useState(1)
//     const [date, setDate] = useState<Date>()
//     const [isLoading, setIsLoading] = useState(false)
//     const { toast } = useToast()

//     const {
//         register,
//         handleSubmit,
//         setValue,
//         watch,
//         formState: { errors },
//         reset,
//     } = useForm<EventFormData>()

//     const onSubmit = async (data: EventFormData) => {
//         setIsLoading(true)
//         try {
//             // TODO: Implement actual event creation API call
//             await new Promise((resolve) => setTimeout(resolve, 1000))

//             toast({
//                 title: "Event Created!",
//                 description: "Your event has been created successfully.",
//             })

//             // Reset form and close modal
//             reset()
//             setStep(1)
//             setDate(undefined)
//             onOpenChange(false)
//         } catch (error) {
//             toast({
//                 title: "Creation failed",
//                 description: "Please try again later.",
//                 variant: "destructive",
//             })
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const nextStep = () => {
//         // Basic validation before proceeding to next step
//         if (step === 1) {
//             const title = watch("title")
//             const eventType = watch("eventType")
//             if (!title || !eventType) {
//                 toast({
//                     title: "Missing information",
//                     description: "Please fill in all required fields.",
//                     variant: "destructive",
//                 })
//                 return
//             }
//         } else if (step === 2) {
//             const location = watch("location")
//             const guestCount = watch("guestCount")
//             if (!date || !location || !guestCount) {
//                 toast({
//                     title: "Missing information",
//                     description: "Please fill in all required fields.",
//                     variant: "destructive",
//                 })
//                 return
//             }
//         }
//         setStep(step + 1)
//     }

//     const prevStep = () => setStep(step - 1)

//     const handleOpenChange = (open: boolean) => {
//         if (!open) {
//             // Reset form when modal closes
//             reset()
//             setStep(1)
//             setDate(undefined)
//         }
//         onOpenChange(open)
//     }

//     return (
//         <Dialog open={open} onOpenChange={handleOpenChange}>
//             <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//                 <DialogHeader>
//                     <DialogTitle className="text-2xl font-heading">Create New Event</DialogTitle>
//                     <DialogDescription>Let's plan your perfect event together</DialogDescription>
//                 </DialogHeader>

//                 {/* Progress Indicator */}
//                 <div className="flex items-center justify-center space-x-2 mb-6">
//                     {[1, 2, 3].map((i) => (
//                         <div
//                             key={i}
//                             className={cn(
//                                 "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
//                                 i === step
//                                     ? "bg-primary text-white"
//                                     : i < step
//                                         ? "bg-green-500 text-white"
//                                         : "bg-muted text-muted-foreground",
//                             )}
//                         >
//                             {i}
//                         </div>
//                     ))}
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <AnimatePresence mode="wait">
//                         {step === 1 && (
//                             <motion.div
//                                 key="step1"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 className="space-y-4"
//                             >
//                                 <div className="space-y-2">
//                                     <Label htmlFor="title">Event Title *</Label>
//                                     <Input
//                                         id="title"
//                                         placeholder="Sarah & Michael's Wedding"
//                                         {...register("title", { required: "Event title is required" })}
//                                     />
//                                     {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="eventType">Event Type *</Label>
//                                     <Select onValueChange={(value) => setValue("eventType", value)}>
//                                         <SelectTrigger>
//                                             <SelectValue placeholder="Select event type" />
//                                         </SelectTrigger>
//                                         <SelectContent>
//                                             {eventTypes.map((type) => (
//                                                 <SelectItem key={type} value={type}>
//                                                     {type}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>
//                                     </Select>
//                                     {errors.eventType && <p className="text-sm text-destructive">{errors.eventType.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="description">Description</Label>
//                                     <Textarea
//                                         id="description"
//                                         placeholder="Tell us about your vision for this event..."
//                                         className="min-h-[100px]"
//                                         {...register("description")}
//                                     />
//                                 </div>
//                             </motion.div>
//                         )}

//                         {step === 2 && (
//                             <motion.div
//                                 key="step2"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 className="space-y-4"
//                             >
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="space-y-2">
//                                         <Label>Event Date *</Label>
//                                         <Popover>
//                                             <PopoverTrigger asChild>
//                                                 <Button
//                                                     variant="outline"
//                                                     className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
//                                                 >
//                                                     <CalendarIcon className="mr-2 h-4 w-4" />
//                                                     {date ? format(date, "PPP") : "Pick a date"}
//                                                 </Button>
//                                             </PopoverTrigger>
//                                             <PopoverContent className="w-auto p-0">
//                                                 <Calendar
//                                                     mode="single"
//                                                     selected={date}
//                                                     onSelect={(date) => {
//                                                         setDate(date)
//                                                         setValue("date", date!)
//                                                     }}
//                                                     initialFocus
//                                                 />
//                                             </PopoverContent>
//                                         </Popover>
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="time">Event Time *</Label>
//                                         <div className="relative">
//                                             <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                             <Input
//                                                 id="time"
//                                                 type="time"
//                                                 className="pl-10"
//                                                 {...register("time", { required: "Event time is required" })}
//                                             />
//                                         </div>
//                                         {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="location">Location *</Label>
//                                     <div className="relative">
//                                         <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                         <Input
//                                             id="location"
//                                             placeholder="The Grand Ballroom, Downtown"
//                                             className="pl-10"
//                                             {...register("location", { required: "Location is required" })}
//                                         />
//                                     </div>
//                                     {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="guestCount">Expected Guest Count *</Label>
//                                     <div className="relative">
//                                         <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                         <Input
//                                             id="guestCount"
//                                             type="number"
//                                             placeholder="150"
//                                             className="pl-10"
//                                             {...register("guestCount", {
//                                                 required: "Guest count is required",
//                                                 min: { value: 1, message: "Must have at least 1 guest" },
//                                                 valueAsNumber: true,
//                                             })}
//                                         />
//                                     </div>
//                                     {errors.guestCount && <p className="text-sm text-destructive">{errors.guestCount.message}</p>}
//                                 </div>
//                             </motion.div>
//                         )}

//                         {step === 3 && (
//                             <motion.div
//                                 key="step3"
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 exit={{ opacity: 0, x: -20 }}
//                                 className="space-y-4"
//                             >
//                                 <div className="space-y-2">
//                                     <Label htmlFor="budget">Total Budget *</Label>
//                                     <div className="relative">
//                                         <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//                                         <Input
//                                             id="budget"
//                                             type="number"
//                                             placeholder="50000"
//                                             className="pl-10"
//                                             {...register("budget", {
//                                                 required: "Budget is required",
//                                                 min: { value: 100, message: "Budget must be at least $100" },
//                                                 valueAsNumber: true,
//                                             })}
//                                         />
//                                     </div>
//                                     {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
//                                     <p className="text-sm text-muted-foreground">
//                                         This helps us recommend vendors within your price range
//                                     </p>
//                                 </div>

//                                 <div className="bg-muted/50 p-4 rounded-lg">
//                                     <h4 className="font-semibold mb-2">What's Next?</h4>
//                                     <ul className="text-sm text-muted-foreground space-y-1">
//                                         <li>• We'll create your event dashboard</li>
//                                         <li>• Browse and connect with premium vendors</li>
//                                         <li>• Track your budget and planning progress</li>
//                                         <li>• Manage contracts and payments securely</li>
//                                     </ul>
//                                 </div>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>

//                     <div className="flex justify-between mt-6">
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={prevStep}
//                             disabled={step === 1}
//                         >
//                             Previous
//                         </Button>

//                         {step < 3 ? (
//                             <Button type="button" onClick={nextStep}>
//                                 Next
//                             </Button>
//                         ) : (
//                             <Button
//                                 type="submit"
//                                 className="gradient-royal text-white"
//                                 disabled={isLoading}
//                             >
//                                 {isLoading ? "Creating Event..." : "Create Event"}
//                             </Button>
//                         )}
//                     </div>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }