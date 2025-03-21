
# Utilities Documentation

This document explains the utility functions used in the application.

## document-utils.ts

This file contains utility functions for working with documents.

### formatCurrency

Formats a number as a currency string with 2 decimal places.

```typescript
formatCurrency(123.45) // returns "123.45"
```

### generateInvoiceNumber

Generates a random invoice number in the format `INV-XXXXX`.

```typescript
generateInvoiceNumber() // returns something like "INV-12345"
```

### generateReceiptNumber

Generates a random receipt number in the format `REC-XXXXX`.

```typescript
generateReceiptNumber() // returns something like "REC-12345"
```

### calculateDueDate

Calculates a due date based on an invoice date and payment terms.

```typescript
calculateDueDate(new Date("2023-01-01"), "Net 30") 
// returns a date 30 days after 2023-01-01
```

## utils.ts

Contains general utility functions used throughout the application.

### cn

A utility function that combines class names using `clsx` and `tailwind-merge`.

```typescript
cn("base-class", { "conditional-class": true }) 
// combines classes and handles Tailwind CSS conflicts
```

## Implementation Notes

The document utilities are specifically designed for the needs of the invoice and sales receipt systems. They handle tasks like:

- Generating unique but readable document numbers
- Formatting currency values consistently
- Date calculations for payment terms

These utilities are imported and used in various components and hooks to maintain consistency and avoid code duplication.
