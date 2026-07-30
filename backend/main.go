package main

import (
	"log"
	"net/http"
	"os"

	"sezzle-calculator/backend/handlers"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.Use(corsMiddleware)

	r.HandleFunc("/api/calculate", handlers.CalculatorHandler).Methods("POST")
	r.HandleFunc("/api/health", handlers.HealthCheck).Methods("GET")

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server starting on port " + port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
