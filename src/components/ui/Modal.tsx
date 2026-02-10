'use client';

import React, { useEffect } from 'react';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true
}: ModalProps) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-lg backdrop-blur-[4px] animate-fade-in"
            onClick={closeOnOverlayClick ? onClose : undefined}
        >
            <div
                className={[
                    'flex max-h-[calc(100vh-48px)] w-full flex-col rounded-xl border border-border bg-bg-secondary shadow-xl animate-slide-in-up',
                    size === 'sm' ? 'max-w-[400px]' : '',
                    size === 'md' ? 'max-w-[500px]' : '',
                    size === 'lg' ? 'max-w-[700px]' : '',
                    size === 'xl' ? 'max-w-[900px]' : '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby={title ? 'modal-title' : undefined}
            >
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between border-b border-border p-lg">
                        {title && (
                            <h2 id="modal-title" className="text-lg font-semibold text-text-primary">
                                {title}
                            </h2>
                        )}
                        {showCloseButton && (
                            <button
                                className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-all duration-150 hover:bg-bg-tertiary hover:text-text-primary"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                )}
                <div className="flex-1 overflow-y-auto p-lg">{children}</div>
                {footer && (
                    <div className="flex items-center justify-end gap-sm border-t border-border p-lg">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'primary';
    loading?: boolean;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    loading = false
}: ConfirmModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <div className="flex w-full justify-end gap-sm">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        {cancelText}
                    </Button>
                    <Button variant={variant} onClick={onConfirm} loading={loading}>
                        {confirmText}
                    </Button>
                </div>
            }
        >
            <p className="text-sm leading-relaxed text-text-secondary">{message}</p>
        </Modal>
    );
}
