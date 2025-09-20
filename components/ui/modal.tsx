"use client"

import { ReactNode } from "react"
import { Dialog } from "@headlessui/react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, description, children }: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-card rounded-lg p-6 shadow-xl w-full max-w-md">
          {title && <Dialog.Title className="text-lg font-bold mb-2">{title}</Dialog.Title>}
          {description && <Dialog.Description className="text-sm text-muted-foreground mb-4">{description}</Dialog.Description>}

          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
