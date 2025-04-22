flowchart TD
    A[Launch Application]
    B[User Login / Onboarding]
    C[Dashboard]
    D[New Project Wizard]
    E[Project Details]
    F[Select AI Tools]
    G[Questionnaire]
    H[Create Docs]
    I[Edge Function Call]
    J[Generate Docs Async]
    K[Display Generated Docs]
    L[Download ZIP]
    M[Version Control History]
    N[Starter Kits Selection]
    O[Global Theme Toggle & Logout]

    A --> B
    B --> C
    C --> D
    C --> N
    C --> O
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    K --> M