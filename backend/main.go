package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"sezzle-calculator/backend/handlers"
)

func main() {
	r := mux.NewRouter()
	
	// Habilitar CORS para desarrollo
	r.Use(corsMiddleware)
	
	r.HandleFunc("/api/calculate", handlers.CalculatorHandler).Methods("POST")
	r.HandleFunc("/api/health", handlers.HealthCheck).Methods("GET")
	
	log.Println("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}
		
		next.ServeHTTP(w, r)
	})
}