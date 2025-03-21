
# Project Structure Documentation

This document provides an overview of the project structure and the purpose of each directory and key files.

## Directory Structure

### `/src/app`
Contains the main application pages organized by route structure:
- `dashboard/` - Dashboard page and layout
- `dashboard/sales/invoice/` - Invoice creation page
- `dashboard/sales/receipt/` - Sales receipt creation page

### `/src/components`
Contains reusable UI components organized by functionality:

#### `/src/components/forms`
Form-related components used in the invoice and receipt pages:
- `CustomerSection.tsx` - Customer information input section
- `DateFields.tsx` - Date input components and terms selection
- `DocumentTotal.tsx` - Displays total amounts for documents
- `FormMessage.tsx` - Message input for forms
- `ItemsTable/` - Components for the items table in invoices and receipts
- `SalesRepresentative.tsx` - Sales rep selection component

#### `/src/components/ui`
Shadcn UI components and custom UI elements:
- `button.tsx`, `input.tsx`, etc. - Base UI components 
- `loading-spinner.tsx` - Loading spinner animation
- `page-loader.tsx` - Full page loading overlay

### `/src/hooks`
Custom React hooks:
- `useDocumentForm.ts` - Base hook for document form functionality
- `useInvoiceForm.ts` - Hook specific to invoice forms
- `useSalesReceiptForm.ts` - Hook specific to sales receipt forms

### `/src/lib`
Utility functions:
- `document-utils.ts` - Utility functions for documents (formatting, calculations)
- `utils.ts` - General utility functions

### `/src/pages`
Contains standalone pages:
- `Index.tsx` - Home/landing page
- `NotFound.tsx` - 404 page

### `/src/types`
TypeScript type definitions:
- `document.ts` - Types for invoices, receipts, and related data structures

## Key Workflows

1. **Dashboard Navigation**:
   - User sees dashboard with options to create invoices or receipts
   - Animated cards provide visual feedback

2. **Document Creation**:
   - Both invoice and receipt creation use similar components
   - Forms include customer information, line items, and totals
   - Documents can be saved or canceled

3. **Line Item Management**:
   - Items can be added, edited, or removed from documents
   - Tax and other fees are calculated automatically
