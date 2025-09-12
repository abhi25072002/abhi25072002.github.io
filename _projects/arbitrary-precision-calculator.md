---
title: "Arbitrary-Precision Calculator (C)"
course: Systems Programming
start_date: 2020-09
end_date: 2020-10
tools: [C, Finite State Machine, makefile]
image: /assets/images/arbitrary-precision-calculator.png
---

**Project Overview:**
Implemented a bc command-like tool in C capable of handling very large numbers, using custom user-defined data structures.

**Key Highlights:**
- Created a struct 'number' storing values as a doubly linked list, with sign and precision fields for arbitrary-precision arithmetic.
- Used a stack of numbers for infix expression evaluation and a finite state machine (FSM) for parsing and computation.
- Supported operations: addition, multiplication, subtraction, sdivision, exponentiation, negatives, and infix expression evaluation.

**Technologies Used:**
C, Finite State Machine, makefile

![Arbitrary-Precision Calculator](/assets/images/arbitrary-precision-calculator.png)
