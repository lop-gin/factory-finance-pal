
# Project Structure Documentation

This document provides an overview of the project structure and organization.

## Directory Structure

```
src/
├── app/                  # Main application pages
│   └── dashboard/        # Dashboard pages
│       ├── sales/        # Sales-related pages
│       │   ├── invoice/  # Invoice pages
│       │   └── receipt/  # Receipt pages
├── components/           # Reusable UI components
│   ├── forms/            # Form-related components
│   │   └── ItemsTable/   # Table components for items
│   ├── invoice/          # Invoice-specific components
│   └── ui/               # UI components from shadcn/ui
├── hooks/                # React hooks
├── lib/                  # Utility functions and libraries
├── pages/                # Top-level pages (Home, NotFound)
└── types/                # TypeScript type definitions
```

## Key Folders

### /app
Contains the main page components organized by feature. Each page is a standalone component that represents a route in the application.

### /components
Houses all reusable UI components organized by their purpose:
- `forms/`: Components specific to forms like CustomerSection, ItemsTable, etc.
- `ui/`: UI components from the shadcn/ui library or custom UI components.

### /hooks
Custom React hooks that encapsulate reusable logic:
- `useInvoiceForm`: Manages invoice form state and operations
- `useSalesReceiptForm`: Manages sales receipt form state and operations
- `useDocumentForm`: Base hook that provides common functionality for document forms

### /lib
Utility functions and shared logic:
- `document-utils.ts`: Utilities for document handling like number generation and formatting

### /types
TypeScript type definitions that are shared across the application:
- `document.ts`: Defines types for invoices, sales receipts, and related entities
