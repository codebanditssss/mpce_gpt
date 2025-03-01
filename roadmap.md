```mermaid
graph TD
    A[User Enters MPCE-GPT Dashboard] --> B[Dashboard Home]
    
    subgraph "User Onboarding"
        B --> C[User Input Form]
        C --> C1[Enter Demographics]
        C1 --> C2[Enter Financial Details]
        C2 --> C3[Upload Spending History]
        C3 --> D[Submit User Data]
        D --> E{First-time User?}
        E -->|Yes| F[Create User Profile]
        E -->|No| G[Update Existing Profile]
        F --> H[Generate Initial Forecast]
        G --> H
    end
    
    subgraph "Dashboard Interaction"
        H --> I[View Interactive Dashboard]
        I --> J[Expenditure Forecast Panel]
        I --> K[Spending Trends Visualization]
        I --> L[Financial Health Indicators]
        
        J --> J1[View 6-Month Forecast]
        J1 --> J2[Adjust Forecast Parameters]
        J2 --> J3[Regenerate Forecast]
        
        K --> K1[Filter by Time Period]
        K1 --> K2[Filter by Expense Category]
        K2 --> K3[Compare Predicted vs Actual]
        
        L --> L1[View Savings Recommendations]
        L1 --> L2[View Budget Alerts]
    end
    
    subgraph "Chatbot Interaction"
        I --> M[Open AI Chatbot Interface]
        M --> N[Ask Financial Question]
        N --> O[Receive AI Response]
        O --> P{Satisfactory Answer?}
        P -->|No| Q[Refine Question]
        Q --> N
        P -->|Yes| R[View Related Insights]
        R --> S[Apply Recommendations]
        S --> I
    end
    
    subgraph "Data Management"
        I --> T[Update Financial Data]
        T --> U[Manual Data Entry]
        T --> V[Connect Financial Accounts]
        U --> W[Recalculate Forecasts]
        V --> W
        W --> I
    end
    
    subgraph "Error Handling"
        C -->|Invalid Input| X[Show Validation Error]
        X --> C
        N -->|Unclear Query| Y[Request Clarification]
        Y --> N
        V -->|Connection Failed| Z[Show Connection Error]
        Z --> V
    end
