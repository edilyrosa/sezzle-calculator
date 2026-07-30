# Sezzle Calculator – Full‑Stack Application

A complete calculator application built with **React (TypeScript)** on the frontend and **Go** on the backend.
It performs basic arithmetic, exponentiation, square root, percentage, and a *percent‑of* operation (`30 %× 200 = 60`).
The frontend communicates with a REST API, validates inputs, and shows live previews.

---

## 📋 Table of Contents

- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
  - [Backend (Go)](#backend-go)
  - [Frontend (React)](#frontend-react)
- [API Usage &amp; Examples](#api-usage--examples)
- [Design Decisions &amp; Assumptions](#design-decisions--assumptions)
- [Testing](#testing)
- [AI Prompts Used](#ai-prompts-used)
- [Project Structure](#project-structure)

---

## 🚀 Setup Instructions

### Prerequisites

- **Go** 1.21+ ([download](https://go.dev/dl/))
- **Node.js** 18+ and **npm** ([download](https://nodejs.org/))
- **Git** (optional, for cloning)

### Clone the repository

```bash
git clone <your-repository-url>
cd sezzle-calculator
🏃 Running the Application
Backend (Go)
bash
cd backend
go mod download
go run main.go
The server starts on http://localhost:8080.
You should see:

text
Server starting on :8080
Frontend (React)
Open a new terminal (keep the backend running) and run:

bash
cd frontend
npm install
npm start
The app starts on http://localhost:3000 and proxies API requests to the backend.

📡 API Usage & Examples
The backend exposes a single REST endpoint.

Endpoint
POST /api/calculate

Request Body (JSON)
Field	Type	Required	Description
operation	string	✅ Yes	add, subtract, multiply, divide, exponentiate, sqrt, percentage, percentOf
a	number	For binary ops	First operand
b	number	For binary ops	Second operand
num	number	For unary ops	Single number (sqrt, percentage)
Successful Response
json
{
  "result": 8
}
Error Response
json
{
  "error": "division by zero"
}
cURL Examples
Addition

bash
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":5,"b":3}'
# Response: {"result":8}
Division by zero

bash
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"divide","a":10,"b":0}'
# Response: {"error":"division by zero"}
Square Root

bash
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"sqrt","num":16}'
# Response: {"result":4}
Percent Of (30% of 200)

bash
curl -X POST http://localhost:8080/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"percentOf","a":30,"b":200}'
# Response: {"result":60}
🧠 Design Decisions & Assumptions
Architecture
Separation of concerns: UI logic (React) is completely decoupled from business logic (Go API).

RESTful API: The backend is stateless, making it horizontally scalable.

Type safety: TypeScript on the frontend and strong static typing in Go reduce runtime errors.

Frontend
Live preview: As the user types an expression (e.g., 30 × 2), the frontend immediately fetches a preview of the result from the backend (if a binary operation is pending).

Accumulation: The calculator chains operations naturally. If you type 4 + 3 = 7, then press - 2, it computes 7 - 2 = 5 without needing to press = again.

Responsive design: The UI adapts to mobile screens using CSS media queries.

Backend
Input validation: Every request validates that required operands are present.

Edge cases: Explicitly handles division by zero, negative square roots, and unsupported operations.

CORS: Enabled for development; for production, a reverse proxy (like nginx) is recommended.

Coverage: Core calculator logic has 100% test coverage (all operations and error paths tested).

Assumptions
The backend runs on port 8080 and the frontend on port 3000.

The percentOf operation calculates (a / 100) * b (e.g., 30 %× 200 = 60).

The frontend uses Create React App's built-in proxy to avoid CORS issues in development.

All numbers are floating-point; results are rounded to 8 decimal places.

🧪 Testing
Backend (Go)
bash
cd backend
go test -v ./...
go test -cover ./...
Coverage report (HTML):

bash
go test -coverprofile=cov.out ./calculator
go tool cover -html=cov.out
Current coverage for calculator package: 100%.

Frontend (React)
bash
cd frontend
npm test                 # Run in watch mode
npm test -- --coverage   # Generate coverage report
Coverage report is saved in frontend/coverage/lcov-report/index.html.
All components and API client are covered (Display, Keypad, Calculator, and API client).

Build and run
bash
Frontend: http://localhost:3000

Backend: http://localhost:8080

Stop
bash
🤖 AI Prompts Used
"Create a full-stack calculator with React frontend and Go backend, including error handling."

"Write unit tests for Go calculator operations covering edge cases like division by zero"

"Design a clean React UI with responsive mobile support for a calculator"

"Implement CORS middleware in Go to allow frontend communication"

"Add percentOf operation (e.g. 30% of 200) to Go backend"

"Write frontend tests with React Testing Library and Jest for Calculator, Display, Keypad and API client"

"Fix frontend tests avoiding duplicate text selectors and act() warnings"

📁 Project Structure
text
sezzle-calculator/
├── backend/
│   ├── calculator/
│   │   ├── calculator.go          # Core logic
│   │   └── calculator_test.go     # Unit tests (100% coverage)
│   ├── handlers/
│   │   ├── handlers.go            # HTTP handlers
│   │   └── handlers_test.go       # (optional, currently empty)
│   ├── main.go                    # Server entry point
│   ├── main_test.go               # Integration tests
│   ├── go.mod
│   ├── go.sum
│   
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.ts          # API client
│   │   │   └── client.test.ts
│   │   ├── components/
│   │   │   ├── Display.tsx
│   │   │   ├── Display.test.tsx
│   │   │   ├── Keypad.tsx
│   │   │   └── Keypad.test.tsx
│   │   ├── Calculator.tsx         # Main logic
│   │   ├── Calculator.test.tsx
│   │   ├── Calculator.css
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   
└── README.md                      # This file
📜 License
MIT – free to use for educational and evaluation purposes.

✍️ Author
Edily Mora Luzardo – submitted for the Sezzle Software Engineer II assignment.
```
