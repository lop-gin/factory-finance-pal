
# Forms Documentation

This document explains the form structure and functionality for the invoice and sales receipt forms.

## Common Form Structure

Both the invoice and sales receipt forms follow a similar structure:

1. **Header**: Contains the form title and action buttons.
2. **Customer Information**: For entering customer details and billing address.
3. **Date Fields**: Date selection fields appropriate for each document type.
4. **Items Table**: For adding, editing, and removing items.
5. **Message**: For adding a message to the document.
6. **Action Buttons**: Save, cancel, and clear options.

## Form Hooks

The forms use a custom hook system to manage state and actions:

### useDocumentForm

This is the base hook that provides common functionality for all document types:

- Document state management
- Customer information updates
- Item management (add, update, remove)
- Totals calculation
- Other fees management
- Document saving

### useInvoiceForm

Extends the base hook with invoice-specific functionality:

- Invoice number generation
- Terms management
- Due date calculation based on terms
- Default values for invoice fields

### useSalesReceiptForm

Extends the base hook with sales receipt-specific functionality:

- Receipt number generation
- Default values for sales receipt fields

## Key Components

### ItemsTable

The ItemsTable component is broken down into several subcomponents:

- **ItemRow**: Handles the display and editing of a single item
- **TableHeader**: Displays the column headers
- **TableActions**: Contains buttons for adding and clearing items
- **OtherFees**: Input fields for other fees
- **DocumentSummary**: Displays subtotal, tax, and total amounts

### DateFields

Provides specialized input fields for dates and related data:

- **DateField**: Calendar selector for dates
- **TermsSelect**: Dropdown for selecting payment terms
- **SalesRepField**: Input for sales representative information

### CustomerSection

Handles customer information with fields for:

- Customer selection
- Company name
- Email
- Billing address

## Differences Between Forms

The main differences between the invoice and sales receipt forms are:

### Invoice Form

- Has fields for invoice date, due date, and terms
- Calculates due date based on selected terms
- Uses "Invoice" throughout the UI

### Sales Receipt Form

- Only has a sale date field (no due date or terms)
- Simpler date section
- Uses "Receipt" throughout the UI

## Form Validation

Form validation is currently minimal but could be expanded. The current validation includes:

- Preventing removal of the last item in the items table
- Basic number format validation for quantities and amounts
- Required fields are not enforced yet
