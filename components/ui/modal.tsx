"use client";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import React from 'react';


type ModalProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen, 
  onClose,
  children
}) => {

  return (
    <Dialog open={isOpen} onClose={() => onClose?.()} className="relative z-[999999]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="w-full max-w-screen-md bg-white p-6 shadow-lg rounded-lg text-left"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              {children}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal;