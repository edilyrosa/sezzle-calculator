// backend/calculator/calculator.go
package calculator

import (
	"errors"
	"math"
)

type Operation string

const (
	Add          Operation = "add"
	Subtract     Operation = "subtract"
	Multiply     Operation = "multiply"
	Divide       Operation = "divide"
	Exponentiate Operation = "exponentiate"
	SquareRoot   Operation = "sqrt"
	Percentage   Operation = "percentage"
	PercentOf    Operation = "percentOf"
)

type Request struct {
	Operation Operation `json:"operation"`
	A         *float64  `json:"a,omitempty"`
	B         *float64  `json:"b,omitempty"`
	Num       *float64  `json:"num,omitempty"`
}

type Response struct {
	Result float64 `json:"result"`
	Error  string  `json:"error,omitempty"`
}

func Calculate(req Request) (Response, error) {
	switch req.Operation {
	case Add:
		return binaryOp(req.A, req.B, func(a, b float64) float64 { return a + b })
	case Subtract:
		return binaryOp(req.A, req.B, func(a, b float64) float64 { return a - b })
	case Multiply:
		return binaryOp(req.A, req.B, func(a, b float64) float64 { return a * b })
	case Divide:
		if req.B != nil && *req.B == 0 {
			return Response{}, errors.New("division by zero")
		}
		return binaryOp(req.A, req.B, func(a, b float64) float64 { return a / b })
	case Exponentiate:
		return binaryOp(req.A, req.B, math.Pow)
	case SquareRoot:
		if req.Num == nil {
			return Response{}, errors.New("missing number for sqrt")
		}
		if *req.Num < 0 {
			return Response{}, errors.New("cannot calculate square root of negative number")
		}
		return Response{Result: math.Sqrt(*req.Num)}, nil
	case Percentage:
		if req.Num == nil {
			return Response{}, errors.New("missing number for percentage")
		}
		return Response{Result: *req.Num / 100}, nil

	case PercentOf:
		return binaryOp(req.A, req.B, func(a, b float64) float64 {
			return (a / 100) * b
		})

	default:
		return Response{}, errors.New("unsupported operation")
	}
}

func binaryOp(a, b *float64, fn func(float64, float64) float64) (Response, error) {
	if a == nil || b == nil {
		return Response{}, errors.New("missing operands")
	}
	return Response{Result: fn(*a, *b)}, nil
}
