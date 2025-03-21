
# Integration Guide

This document provides guidance on how to integrate this project into a larger application or extend its functionality.

## Integrating with a Backend

The current implementation logs documents to the console when saved. To connect to a backend:

1. **Create API Services**:

```typescript
// src/services/api.ts
import axios from 'axios';
import { InvoiceType, SalesReceiptType } from '@/types/document';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';

export const saveInvoice = async (invoice: InvoiceType): Promise<InvoiceType> => {
  const response = await axios.post(`${API_URL}/invoices`, invoice);
  return response.data;
};

export const saveSalesReceipt = async (receipt: SalesReceiptType): Promise<SalesReceiptType> => {
  const response = await axios.post(`${API_URL}/receipts`, receipt);
  return response.data;
};

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
};

// Add more API functions as needed
```

2. **Update Form Hooks**:

```typescript
// Modify the saveDocument function in useDocumentForm.ts
const saveDocument = async () => {
  try {
    setIsLoading(true);
    if (isInvoice(document)) {
      await saveInvoice(document as InvoiceType);
    } else {
      await saveSalesReceipt(document as SalesReceiptType);
    }
    toast.success("Document saved successfully");
    // Optional: redirect to document list or clear form
  } catch (error) {
    console.error("Error saving document:", error);
    toast.error("Failed to save document");
  } finally {
    setIsLoading(false);
  }
};
```

## Adding Authentication

To add authentication:

1. **Create Auth Context**:

```typescript
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Implement authentication logic
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

2. **Add Protected Routes**:

```typescript
// src/app/dashboard/layout.tsx
import { useAuth } from '@/contexts/AuthContext';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader />
      <main>{children}</main>
    </div>
  );
}
```

## Adding PDF Generation

To add PDF generation functionality:

1. **Install Dependencies**:

```bash
npm install @react-pdf/renderer
```

2. **Create PDF Templates**:

```typescript
// src/components/pdf/InvoicePDF.tsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InvoiceType } from '@/types/document';

const styles = StyleSheet.create({
  // Define PDF styles
});

export const InvoicePDF: React.FC<{invoice: InvoiceType}> = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>INVOICE</Text>
        <Text>{invoice.invoiceNumber}</Text>
      </View>
      
      {/* Add more PDF content */}
    </Page>
  </Document>
);
```

3. **Add Download Button**:

```typescript
// Add to FormActions.tsx
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoicePDF } from '@/components/pdf/InvoicePDF';

// Add to the component props
document: InvoiceType | SalesReceiptType;

// Add to the component JSX
<PDFDownloadLink 
  document={isInvoice(document) ? 
    <InvoicePDF invoice={document as InvoiceType} /> : 
    <SalesReceiptPDF receipt={document as SalesReceiptType} />
  } 
  fileName={`${isInvoice(document) ? 'Invoice-' : 'Receipt-'}${document.id}.pdf`}
>
  {({ loading }) => (
    <Button variant="outline" disabled={loading}>
      {loading ? 'Generating PDF...' : 'Download PDF'}
    </Button>
  )}
</PDFDownloadLink>
```

## Implementing Customer Search

To add customer search functionality:

1. **Update CustomerSection**:

```typescript
// Modify CustomerSection.tsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCustomers } from '@/services/api';
import { Command, CommandInput, CommandList, CommandItem } from '@/components/ui/command';

// Inside the component
const { data: customers, isLoading } = useQuery({
  queryKey: ['customers'],
  queryFn: getCustomers
});

const [searchTerm, setSearchTerm] = useState('');
const [showSearch, setShowSearch] = useState(false);

const filteredCustomers = customers?.filter(c => 
  c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  c.company?.toLowerCase().includes(searchTerm.toLowerCase())
);

// Replace the button with a dropdown
<Popover open={showSearch} onOpenChange={setShowSearch}>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      {customer.name || 'Select a customer'}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80 p-0">
    <Command>
      <CommandInput 
        placeholder="Search customers..." 
        value={searchTerm}
        onValueChange={setSearchTerm}
      />
      <CommandList>
        {isLoading ? (
          <div className="py-6 text-center text-sm">Loading customers...</div>
        ) : filteredCustomers?.length === 0 ? (
          <div className="py-6 text-center text-sm">No customers found.</div>
        ) : (
          filteredCustomers?.map(customer => (
            <CommandItem
              key={customer.id}
              onSelect={() => {
                updateCustomer(customer);
                setShowSearch(false);
              }}
            >
              <span>{customer.name}</span>
              {customer.company && (
                <span className="text-muted-foreground"> - {customer.company}</span>
              )}
            </CommandItem>
          ))
        )}
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
```

## Styling Customization

To customize the styling:

1. **Update Tailwind Config**:

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // Add more custom colors
        },
      },
    },
  },
};
```

2. **Create Theme Context**:

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

This integration guide covers the main points for extending the project to work with backend services, authentication, PDF generation, and custom styling.
