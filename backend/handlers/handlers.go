// package handlers

// import (
// 	"encoding/json"
// 	"net/http"
// 	"sezzle-calculator/backend/calculator"
// )

// type ErrorResponse struct {
// 	Error string `json:"error"`
// }

// func CalculatorHandler(w http.ResponseWriter, r *http.Request) {
// 	if r.Method != http.MethodPost {
// 		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
// 		return
// 	}

// 	var req calculator.Request
// 	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
// 		sendError(w, "Invalid request body", http.StatusBadRequest)
// 		return
// 	}

// 	resp, err := calculator.Calculate(req)
// 	if err != nil {
// 		sendError(w, err.Error(), http.StatusBadRequest)
// 		return
// 	}

// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(http.StatusOK)
// 	json.NewEncoder(w).Encode(resp)
// }

// func HealthCheck(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
// }

// func sendError(w http.ResponseWriter, message string, status int) {
// 	w.Header().Set("Content-Type", "application/json")
// 	w.WriteHeader(status)
// 	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
// }

package handlers

import (
	"encoding/json"
	"net/http"
	"sezzle-calculator/backend/calculator"
)

type ErrorResponse struct {
	Error string `json:"error"`
}

func CalculatorHandler(w http.ResponseWriter, r *http.Request) {
	// Manejar preflight OPTIONS
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	// Solo aceptamos POST
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req calculator.Request
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		sendError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	resp, err := calculator.Calculate(req)
	if err != nil {
		sendError(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)
}

func HealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
}

func sendError(w http.ResponseWriter, message string, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(ErrorResponse{Error: message})
}
