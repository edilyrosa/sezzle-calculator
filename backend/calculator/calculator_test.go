// backend/calculator/calculator_test.go
package calculator

import "testing"

func TestCalculate_PercentOf(t *testing.T) {
	a := 30.0
	b := 200.0
	req := Request{Operation: PercentOf, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 60.0 {
		t.Errorf("expected 60, got %v", resp.Result)
	}
}

// TestCalculate_Add
func TestCalculate_Add(t *testing.T) {
	a := 5.0
	b := 3.0
	req := Request{Operation: Add, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 8.0 {
		t.Errorf("expected 8, got %v", resp.Result)
	}
}

// TestCalculate_Subtract
func TestCalculate_Subtract(t *testing.T) {
	a := 10.0
	b := 4.0
	req := Request{Operation: Subtract, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 6.0 {
		t.Errorf("expected 6, got %v", resp.Result)
	}
}

// TestCalculate_Multiply
func TestCalculate_Multiply(t *testing.T) {
	a := 7.0
	b := 6.0
	req := Request{Operation: Multiply, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 42.0 {
		t.Errorf("expected 42, got %v", resp.Result)
	}
}

// TestCalculate_Divide
func TestCalculate_Divide(t *testing.T) {
	a := 15.0
	b := 3.0
	req := Request{Operation: Divide, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 5.0 {
		t.Errorf("expected 5, got %v", resp.Result)
	}
}

// TestCalculate_DivideByZero (ya lo tienes, pero asegúrate de que esté)
func TestCalculate_DivideByZero(t *testing.T) {
	a := 10.0
	b := 0.0
	req := Request{Operation: Divide, A: &a, B: &b}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for division by zero, got nil")
	}
}

// TestCalculate_Exponentiate
func TestCalculate_Exponentiate(t *testing.T) {
	a := 2.0
	b := 10.0
	req := Request{Operation: Exponentiate, A: &a, B: &b}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 1024.0 {
		t.Errorf("expected 1024, got %v", resp.Result)
	}
}

// TestCalculate_SquareRoot
func TestCalculate_SquareRoot(t *testing.T) {
	num := 16.0
	req := Request{Operation: SquareRoot, Num: &num}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 4.0 {
		t.Errorf("expected 4, got %v", resp.Result)
	}
}

// TestCalculate_Percentage
func TestCalculate_Percentage(t *testing.T) {
	num := 200.0
	req := Request{Operation: Percentage, Num: &num}
	resp, err := Calculate(req)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if resp.Result != 2.0 {
		t.Errorf("expected 2, got %v", resp.Result)
	}
}

// TestCalculate_MissingOperands
func TestCalculate_MissingOperands(t *testing.T) {
	a := 5.0
	req := Request{Operation: Add, A: &a, B: nil}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for missing operands, got nil")
	}
}

// TestCalculate_SquareRootMissingNum
func TestCalculate_SquareRootMissingNum(t *testing.T) {
	req := Request{Operation: SquareRoot, Num: nil}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for missing num, got nil")
	}
}

// TestCalculate_SquareRootNegative
func TestCalculate_SquareRootNegative(t *testing.T) {
	num := -4.0
	req := Request{Operation: SquareRoot, Num: &num}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for negative sqrt, got nil")
	}
}

// TestCalculate_PercentageMissingNum
func TestCalculate_PercentageMissingNum(t *testing.T) {
	req := Request{Operation: Percentage, Num: nil}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for missing num in percentage, got nil")
	}
}

// TestCalculate_UnsupportedOperation
func TestCalculate_UnsupportedOperation(t *testing.T) {
	req := Request{Operation: "modulo"}
	_, err := Calculate(req)
	if err == nil {
		t.Error("expected error for unsupported operation, got nil")
	}
}
