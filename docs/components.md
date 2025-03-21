
# Components Documentation

This document provides details about the key components used in the application.

## Form Components

### CustomerSection

Renders the customer information section of the document forms.

**Features:**
- Customer dropdown selection
- Company dropdown selection
- Email input
- Billing address textarea

### ItemsTable

A complex component that renders a table of items with editable rows.

**Sub-components:**
- `ItemRow`: Renders a single row in the table
- `TableHeader`: Renders the column headers
- `TableActions`: Contains buttons for adding and clearing items
- `DocumentSummary`: Displays subtotal, tax, and total amounts
- `OtherFees`: Input fields for other fees

**Features:**
- Select rows to edit
- Add, remove, and update items
- Calculate subtotals and totals
- Handle other fees

### SalesRepresentative

A component that renders a dropdown for selecting a sales representative.

**Features:**
- Can be configured for different representative types
- Uses a dropdown with predefined options

### DocumentTotal

Displays the total amount and balance due for a document.

**Features:**
- Shows both total amount and balance due
- Handles undefined values to avoid NaN

### PageLoader

A loading screen shown during page transitions.

**Features:**
- Uses framer-motion for animations
- Shows a spinner and customizable message
- Fades in and out smoothly

## UI Components

### LoadingSpinner

A simple spinner component for loading states.

**Features:**
- Configurable sizes (sm, md, lg)
- Customizable colors via className

## Implementation Notes

Many components are designed to be reusable across different document types. They accept props for their values and provide callbacks for changes, making them flexible and maintainable.

Components often use Tailwind CSS for styling and shadcn/ui for UI elements like buttons, inputs, and selects.

Dropdown components (like SalesRepresentative and parts of CustomerSection) use the Select component from shadcn/ui.

The ItemsTable component is the most complex, as it handles both displaying and editing a potentially large number of items, along with calculations for subtotals and taxes.
