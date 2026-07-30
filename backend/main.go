// package main

// import (
// 	"log"
// 	"net/http"

// 	"github.com/gorilla/mux"
// 	"sezzle-calculator/backend/handlers"
// )

// func main() {
// 	r := mux.NewRouter()

// 	// Habilitar CORS para desarrollo
// 	r.Use(corsMiddleware)

// 	r.HandleFunc("/api/calculate", handlers.CalculatorHandler).Methods("POST")
// 	r.HandleFunc("/api/health", handlers.HealthCheck).Methods("GET")

// 	log.Println("Server starting on :8080")
// 	log.Fatal(http.ListenAndServe(":8080", r))
// }

// func corsMiddleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("Access-Control-Allow-Origin", "*")
// 		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
// 		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

// 		if r.Method == "OPTIONS" {
// 			w.WriteHeader(http.StatusOK)
// 			return
// 		}

// 		next.ServeHTTP(w, r)
// 	})
// }

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

	// Obtener el puerto desde la variable de entorno (Render)
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // fallback para desarrollo local
	}

	log.Printf("Server starting on :%s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
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
