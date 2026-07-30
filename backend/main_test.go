// backend/main_test.go
package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"sezzle-calculator/backend/handlers"
)

func TestCalculatorHandler(t *testing.T) {
	tests := []struct {
		name       string
		payload    map[string]interface{}
		wantStatus int
		wantError  bool
	}{
		{
			name: "Addition",
			payload: map[string]interface{}{
				"operation": "add",
				"a":         5.0,
				"b":         3.0,
			},
			wantStatus: http.StatusOK,
			wantError:  false,
		},
		{
			name: "Division by zero",
			payload: map[string]interface{}{
				"operation": "divide",
				"a":         10.0,
				"b":         0.0,
			},
			wantStatus: http.StatusBadRequest,
			wantError:  true,
		},
		{
			name: "Square root negative",
			payload: map[string]interface{}{
				"operation": "sqrt",
				"num":       -4.0,
			},
			wantStatus: http.StatusBadRequest,
			wantError:  true,
		},
		{
			name: "Square root positive",
			payload: map[string]interface{}{
				"operation": "sqrt",
				"num":       16.0,
			},
			wantStatus: http.StatusOK,
			wantError:  false,
		},
		{
			name: "Multiplication",
			payload: map[string]interface{}{
				"operation": "multiply",
				"a":         4.0,
				"b":         6.0,
			},
			wantStatus: http.StatusOK,
			wantError:  false,
		},
		{
			name: "Exponentiation",
			payload: map[string]interface{}{
				"operation": "exponentiate",
				"a":         2.0,
				"b":         10.0,
			},
			wantStatus: http.StatusOK,
			wantError:  false,
		},
		{
			name: "Percentage",
			payload: map[string]interface{}{
				"operation": "percentage",
				"num":       50.0,
			},
			wantStatus: http.StatusOK,
			wantError:  false,
		},
		{
			name: "Unsupported operation",
			payload: map[string]interface{}{
				"operation": "modulo",
				"a":         5.0,
				"b":         2.0,
			},
			wantStatus: http.StatusBadRequest,
			wantError:  true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			body, _ := json.Marshal(tt.payload)
			req := httptest.NewRequest(http.MethodPost, "/api/calculate", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")

			rr := httptest.NewRecorder()
			handler := http.HandlerFunc(handlers.CalculatorHandler)
			handler.ServeHTTP(rr, req)

			if rr.Code != tt.wantStatus {
				t.Errorf("got status %v, want %v", rr.Code, tt.wantStatus)
			}
		})
	}
}
