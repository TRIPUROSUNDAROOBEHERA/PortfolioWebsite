# Entity-Relationship Diagram

```mermaid
erDiagram
    User ||--o{ BlogPost : authors
    User ||--o{ Project : manages
    Project }o--o{ Skill : utilizes
    BlogPost }o--o{ Tag : tagged
    ContactInquiry ||--o{ Notification : generates