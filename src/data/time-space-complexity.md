## Time Complexity Quick Reference Table

| Operation/Structure                  | Time Complexity          | Example                             |
| ------------------------------------ | ------------------------ | ----------------------------------- |
| **Single variable assignment**       | O(1)                     | `int x = 5;`                        |
| **Arithmetic operation**             | O(1)                     | `a + b`, `c * d`                    |
| **Array access by index**            | O(1)                     | `arr[i]`                            |
| **HashMap get/put**                  | O(1) average, O(n) worst | `map.get(key)`                      |
| **ArrayList get/set**                | O(1)                     | `list.get(i)`                       |
| **Simple for loop (n iterations)**   | O(n)                     | `for(i=0;i<n;i++)`                  |
| **Nested loops (both n)**            | O(n²)                    | `for(i=0;i<n;i++) for(j=0;j<n;j++)` |
| **Binary search**                    | O(log n)                 | While loop halving search space     |
| **Linear search**                    | O(n)                     | Scanning entire array               |
| **Bubble/Selection sort**            | O(n²)                    | Nested loops comparing elements     |
| **Merge/Quick sort**                 | O(n log n)               | Divide and conquer                  |
| **Recursion with n depth**           | O(n)                     | Simple recursion like factorial     |
| **Recursion dividing by 2**          | O(log n)                 | Binary search recursion             |
| **Recursion with 2 calls (n depth)** | O(2ⁿ)                    | Fibonacci without memoization       |

## Detailed Time Complexity Examples

### O(1) - Constant Time

```java
// Operation time doesn't depend on input size
public int constantTime(int[] arr, int index) {
    int x = arr[index];        // O(1) - array access
    int sum = x + 5;           // O(1) - arithmetic
    boolean check = sum > 10;  // O(1) - comparison
    return sum;                // O(1) - return
}
// Total: O(1)
```

### O(log n) - Logarithmic Time

```java
// Problem size halves each iteration
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;

    while (left <= right) {           // Runs log₂(n) times
        int mid = left + (right - left) / 2;  // O(1)
        if (arr[mid] == target) return mid;   // O(1)
        else if (arr[mid] < target) left = mid + 1;  // O(1)
        else right = mid - 1;         // O(1)
    }
    return -1;
}
// Time: O(log n)
```

### O(n) - Linear Time

```java
// Single loop, visits each element once
public int findMax(int[] arr) {
    int max = arr[0];           // O(1)

    for (int i = 1; i < arr.length; i++) {  // Runs n-1 times
        if (arr[i] > max) {      // O(1)
            max = arr[i];        // O(1)
        }
    }
    return max;                  // O(1)
}
// Time: O(n)
```

### O(n log n) - Linearithmic Time

```java
// Divide and conquer algorithms
public void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;     // O(1)
        mergeSort(arr, left, mid);               // T(n/2)
        mergeSort(arr, mid + 1, right);          // T(n/2)
        merge(arr, left, mid, right);            // O(n)
    }
}
// Recurrence: T(n) = 2T(n/2) + O(n)
// Time: O(n log n)
```

### O(n²) - Quadratic Time

```java
// Nested loops, each running n times
public void bubbleSort(int[] arr) {
    int n = arr.length;

    for (int i = 0; i < n - 1; i++) {           // Runs n times
        for (int j = 0; j < n - i - 1; j++) {   // Runs ~n times
            if (arr[j] > arr[j + 1]) {           // O(1)
                // swap
                int temp = arr[j];               // O(1)
                arr[j] = arr[j + 1];             // O(1)
                arr[j + 1] = temp;               // O(1)
            }
        }
    }
}
// Time: O(n²)
```

### O(2ⁿ) - Exponential Time

```java
// Recursive with 2 calls, no memoization
public int fibonacci(int n) {
    if (n <= 1) return n;           // Base case O(1)
    return fibonacci(n - 1) + fibonacci(n - 2);  // 2 calls
}
// Recurrence: T(n) = T(n-1) + T(n-2) + O(1)
// Time: O(2ⁿ)
```

## Common Time Complexities Graph

```
Time
 ↑
 |                    O(2ⁿ)
 |                  ↗
 |               O(n²)
 |             ↗
 |          O(n log n)
 |        ↗
 |     O(n)
 |   ↗
 | O(log n)
 |↗
 | O(1)
 +--------------------------------→ Input Size (n)
```

## How to Calculate Time Complexity

### Step 1: Identify Basic Operations

```java
int sum = 0;                    // O(1)
for (int i = 0; i < n; i++) {   // Runs n times
    sum += i;                   // O(1) each iteration
}
// Total: n * O(1) = O(n)
```

### Step 2: Analyze Loops

```java
// Single loop: O(n)
for (int i = 0; i < n; i++) { }

// Nested loops: O(n²)
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) { }
}

// Consecutive loops: O(n) + O(m) = O(n + m)
for (int i = 0; i < n; i++) { }
for (int j = 0; j < m; j++) { }
```

### Step 3: Analyze Recursion

```java
// Halving problem size: O(log n)
function(n) -> function(n/2)  // Each step reduces by half

// Linear reduction: O(n)
function(n) -> function(n-1)  // Each step reduces by 1

// Multiple recursive calls: O(cⁿ)
function(n) -> function(n-1) + function(n-2)  // Exponential
```

## Time Complexity by Data Structure Operations

| Data Structure         | Access   | Search   | Insert   | Delete   |
| ---------------------- | -------- | -------- | -------- | -------- |
| **Array**              | O(1)     | O(n)     | O(n)     | O(n)     |
| **Sorted Array**       | O(1)     | O(log n) | O(n)     | O(n)     |
| **Linked List**        | O(n)     | O(n)     | O(1)\*   | O(1)\*   |
| **HashMap**            | O(1)     | O(1)     | O(1)     | O(1)     |
| **TreeMap**            | O(log n) | O(log n) | O(log n) | O(log n) |
| **Binary Search Tree** | O(log n) | O(log n) | O(log n) | O(log n) |
| **Heap**               | O(1)\*\* | O(n)     | O(log n) | O(log n) |

\*At known position  
\*\*For min/max only

## Rules of Thumb for Time Complexity

1. **Drop constants**: O(2n) → O(n)
2. **Drop lower terms**: O(n² + n) → O(n²)
3. **Different inputs matter**: O(n + m) not O(n)
4. **Worst case matters**: Unless specified otherwise
5. **Log base doesn't matter**: O(log₂ n) = O(log n)

## Interview Tips

1. **Always state both time and space complexity**
2. **Explain your reasoning** - "We have one loop, so O(n)"
3. **Identify bottlenecks** - The slowest operation determines complexity
4. **Consider trade-offs** - Sometimes O(n) space for O(1) time is worth it

For our binary search solution: **Time complexity is O(log n)** because each iteration halves the search space, and we have O(1) operations per iteration.

## Space Complexity Quick Reference Table

| Operation/Structure                      | Space Complexity | Example                                           |
| ---------------------------------------- | ---------------- | ------------------------------------------------- |
| **Single variable (int, boolean, etc.)** | O(1)             | `int x = 5;`                                      |
| **Fixed-size array (int[100])**          | O(1)             | `int[] arr = new int[100];`                       |
| **Variable-size array (int[n])**         | O(n)             | `int[] arr = new int[n];`                         |
| **2D array (int[n][n])**                 | O(n²)            | `int[][] matrix = new int[n][n];`                 |
| **ArrayList with n elements**            | O(n)             | `ArrayList<Integer> list = new ArrayList<>();`    |
| **HashMap with n entries**               | O(n)             | `HashMap<Integer, String> map = new HashMap<>();` |
| **HashSet with n elements**              | O(n)             | `HashSet<Integer> set = new HashSet<>();`         |
| **String of length n**                   | O(n)             | `String str = "abc...";`                          |
| **Recursion depth = n**                  | O(n)             | `factorial(n)` calls itself n times               |
| **Recursion depth = log n**              | O(log n)         | Binary search recursion                           |
| **No extra space (in-place)**            | O(1)             | Swapping elements in array                        |

## Detailed Space Complexity Examples

### O(1) - Constant Space

```java
// Memory usage doesn't change with input size
public int sumArray(int[] arr) {  // arr is input (not counted)
    int total = 0;        // O(1) - one integer
    int i = 0;            // O(1) - one integer

    for (i = 0; i < arr.length; i++) {
        total += arr[i];  // No new variables created
    }

    return total;         // O(1) - return value
}
// Total space: 2 integers = O(1)
// Regardless of arr having 10 or 10 million elements
```

**Memory Visualization:**

```
Input Array (not counted) → [1, 2, 3, 4, ..., 1,000,000]
Our Variables:              total (4 bytes), i (4 bytes) = 8 bytes total
```

### O(n) - Linear Space

```java
// Creates new array proportional to input size
public int[] copyArray(int[] original) {
    int n = original.length;           // O(1)
    int[] copy = new int[n];           // O(n) - creates n-size array

    for (int i = 0; i < n; i++) {
        copy[i] = original[i];         // Filling array
    }

    return copy;
}
// Space: O(n) for the copy array
```

**Memory Visualization:**

```
original → [1, 2, 3, 4, 5] (n=5)
copy     → [0, 0, 0, 0, 0] (n=5 integers = 20 bytes)
Total extra space: 20 bytes = O(n)
```

### O(n) - Recursive Space

```java
// Each recursive call adds to call stack
public int factorial(int n) {
    if (n <= 1) return 1;              // Base case
    return n * factorial(n - 1);       // Recursive call
}

// factorial(5) call stack:
// factorial(5) ─┐
// factorial(4)  │
// factorial(3)  │ 5 stack frames
// factorial(2)  │ each frame has parameters + return address
// factorial(1) ─┘

// Space Complexity: O(n) - n stack frames
```

**Stack Memory Visualization:**

```
Call Stack for factorial(5):
┌─────────────┐
│ factorial(1)│ ← n=1, return address
├─────────────┤
│ factorial(2)│ ← n=2
├─────────────┤
│ factorial(3)│ ← n=3
├─────────────┤
│ factorial(4)│ ← n=4
├─────────────┤
│ factorial(5)│ ← n=5
└─────────────┘
5 frames × ~32 bytes = 160 bytes = O(n)
```

### O(log n) - Logarithmic Space

```java
// Recursive binary search - depth is log n
public int binarySearchRecursive(int[] arr, int target, int left, int right) {
    if (left > right) return -1;       // Base case

    int mid = left + (right - left) / 2;  // O(1) space

    if (arr[mid] == target) return mid;
    else if (arr[mid] < target)
        return binarySearchRecursive(arr, target, mid + 1, right);  // Only 1 call
    else
        return binarySearchRecursive(arr, target, left, mid - 1);
}

// For array of size 16, depth = log₂(16) = 4 stack frames
// Space: O(log n)
```

**Stack Depth Visualization:**

```
Array size: 16 elements
binarySearch(0, 15)  ─┐
binarySearch(8, 15)   │
binarySearch(8, 11)   │ 4 stack frames (log₂16 = 4)
binarySearch(8, 9)    │
binarySearch(8, 8)   ─┘
Space: O(log n)
```

### O(n²) - Quadratic Space

```java
// Creates n x n matrix
public int[][] createIdentityMatrix(int n) {
    int[][] matrix = new int[n][n];     // O(n²) space

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == j) matrix[i][j] = 1;
            else matrix[i][j] = 0;
        }
    }

    return matrix;
}
// Space: O(n²) - n² integers
```

**Memory Visualization:**

```
For n=3:
matrix = [
    [1, 0, 0],  // 3 integers
    [0, 1, 0],  // 3 integers
    [0, 0, 1]   // 3 integers
]
Total: 9 integers = 36 bytes = n² = 9
```

## Space Complexity Calculation Rules

### Rule 1: Add Space for All Variables

```java
public void example(int n) {
    int a = 5;              // O(1)
    int b = 10;             // O(1)
    int[] arr = new int[n]; // O(n)
    String s = "hello";     // O(1) - constant string

    // Total: O(1 + 1 + n + 1) = O(n)
}
```

### Rule 2: Space is NOT Added for Reused Variables

```java
public void example(int n) {
    int x = 0;                    // O(1)

    for (int i = 0; i < n; i++) {
        int temp = i;             // O(1) - reused each iteration
        x += temp;                // Same temp variable reused
    }
    // Total: O(1) - temp doesn't create n copies
}
```

### Rule 3: Account for Recursion Stack

```java
public int recursiveSum(int n) {
    if (n <= 0) return 0;
    return n + recursiveSum(n - 1);  // Each call adds to stack
}
// Space: O(n) - n stack frames
```

### Rule 4: Input Space Usually Not Counted

```java
public int processArray(int[] arr) {  // arr is input
    int sum = 0;          // O(1)
    // We don't count arr as it's given to us
    return sum;
}
// Space: O(1) - only sum variable
```

## Common Space Complexity Patterns

| Pattern                               | Space Complexity | Why                           |
| ------------------------------------- | ---------------- | ----------------------------- |
| **Iterative loop with few variables** | O(1)             | Variables reused              |
| **Creating 1 array of size n**        | O(n)             | New memory for n elements     |
| **Creating 2 arrays of size n**       | O(n)             | 2n = O(n) (constants dropped) |
| **Creating n arrays of size n**       | O(n²)            | n × n = n²                    |
| **Recursion depth = n**               | O(n)             | n stack frames                |
| **Recursion depth = log n**           | O(log n)         | log n stack frames            |
| **HashMap with n entries**            | O(n)             | n key-value pairs             |

## Step-by-Step Space Calculation

### Example 1: Find Duplicates

```java
public boolean hasDuplicates(int[] arr) {
    HashSet<Integer> seen = new HashSet<>();  // O(n) in worst case

    for (int num : arr) {
        if (seen.contains(num)) return true;  // No extra space
        seen.add(num);                         // Adds to HashSet
    }
    return false;
}
// Space: O(n) - HashSet can store up to n elements
```

### Example 2: Merge Two Arrays

```java
public int[] mergeArrays(int[] arr1, int[] arr2) {
    int n = arr1.length;          // O(1)
    int m = arr2.length;          // O(1)
    int[] result = new int[n + m]; // O(n + m) space

    // Merge logic here
    return result;
}
// Space: O(n + m) - creates array of combined size
```

### Example 3: In-Place Operation

```java
public void reverseArray(int[] arr) {
    int left = 0;                  // O(1)
    int right = arr.length - 1;    // O(1)

    while (left < right) {
        // Swap using single temp variable
        int temp = arr[left];      // O(1) - reused
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    // Space: O(1) - modifies input array, no extra space
}
```

## Space Complexity Interview Questions

### Q: What's the space complexity?

```java
public int[] buildArray(int n) {
    int[] result = new int[n];
    for (int i = 0; i < n; i++) {
        result[i] = i * 2;
    }
    return result;
}
```

**A: O(n)** - Creates array of size n

### Q: What's the space complexity?

```java
public void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            System.out.println(arr[i] + "," + arr[j]);
        }
    }
}
```

**A: O(1)** - No extra data structures, just loop variables

### Q: What's the space complexity?

```java
public int fibonacci(int n) {
    int[] dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}
```

**A: O(n)** - dp array of size n+1

### Q: What's the space complexity?

```java
public int fibonacciOptimized(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;  // O(1)
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;  // O(1) - reused
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}
```

**A: O(1)** - Only 3 variables regardless of n

## Quick Decision Tree for Space Complexity

```
Does the algorithm create new data structures?
    │
    ├─ NO → O(1)
    │
    └─ YES → What size?
            │
            ├─ Fixed size (int[100]) → O(1)
            │
            ├─ Size = n → O(n)
            │
            ├─ Size = n² → O(n²)
            │
            └─ Recursion → Count stack depth
                    │
                    ├─ Depth = n → O(n)
                    ├─ Depth = log n → O(log n)
                    └─ Depth = constant → O(1)
```

## Key Takeaways

1. **Input space is usually not counted** - Focus on extra space your algorithm uses
2. **Constants are dropped** - O(2n) = O(n), O(100) = O(1)
3. **Reused variables count once** - Loop variables don't multiply space
4. **Recursion stack matters** - Each recursive call adds to space
5. **Worst case matters** - HashMap might be O(n) in worst case

For our binary search solution: **Space complexity is O(1)** because we only use 3 integer variables (left, right, mid) regardless of input array size, and no recursion is used.

Quick Reference Table
Operation Space Complexity
Single variable (int, boolean, etc.) O(1)
Fixed-size array (int[100]) O(1)
Variable-size array (int[n]) O(n)
2D array (int[n][n]) O(n²)
Recursion depth = n O(n)
Recursion depth = log n O(log n)
HashMap with n entries O(n)

## Time & Space Complexity Analysis

Complexity analysis measures how an algorithm's resource usage scales with input size **n**.

---

### Time Complexity

Measures **how many operations** an algorithm performs relative to input size.

**Rules:**

- Drop constants → `O(2n)` becomes `O(n)`
- Drop lower-order terms → `O(n² + n)` becomes `O(n²)`
- Worst case is usually what matters

---

### Common Complexities (Best → Worst)

| Complexity | Name         | Example               |
| ---------- | ------------ | --------------------- |
| O(1)       | Constant     | Array access          |
| O(log n)   | Logarithmic  | Binary search         |
| O(n)       | Linear       | Single loop           |
| O(n log n) | Linearithmic | Merge sort            |
| O(n²)      | Quadratic    | Nested loops          |
| O(2ⁿ)      | Exponential  | Recursion (Fibonacci) |

---

### Java Examples

#### O(1) — Constant

```java
int getFirst(int[] arr) {
    return arr[0]; // Always 1 operation, no matter array size
}
```

**Space:** O(1) — no extra memory used.

---

#### O(n) — Linear

```java
int sum(int[] arr) {
    int total = 0;           // 1 variable
    for (int x : arr) {      // loops n times
        total += x;          // 1 operation per loop
    }
    return total;
}
```

**Time:** O(n) — loop runs `n` times.
**Space:** O(1) — only one extra variable `total`, regardless of input size.

---

#### O(n²) — Quadratic (Nested Loops)

```java
void printPairs(int[] arr) {
    for (int i = 0; i < arr.length; i++) {       // n times
        for (int j = 0; j < arr.length; j++) {   // n times each
            System.out.println(arr[i] + ", " + arr[j]);
        }
    }
}
```

**Time:** O(n × n) = **O(n²)**
**Space:** O(1) — no extra data structures.

---

#### O(log n) — Logarithmic (Binary Search)

```java
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {           // halves search space each time
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target)  left = mid + 1;
        else                         right = mid - 1;
    }
    return -1;
}
```

**Time:** O(log n) — input is halved each iteration.
**Space:** O(1) — only a few variables.

---

#### O(n) Space — Extra Data Structure

```java
int[] copyArray(int[] arr) {
    int[] copy = new int[arr.length]; // allocates n space
    for (int i = 0; i < arr.length; i++) {
        copy[i] = arr[i];
    }
    return copy;
}
```

**Time:** O(n)
**Space:** O(n) — new array grows with input.

---

#### O(n) Space — Recursion (Call Stack)

```java
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1); // n recursive calls on the stack
}
```

**Time:** O(n) — called `n` times.
**Space:** O(n) — each call occupies a stack frame.

---

### How to Analyze Any Code — Mental Checklist

```
1. Single loop            → O(n)
2. Nested loops           → O(n^depth)
3. Halving each step      → O(log n)
4. Loop + halving         → O(n log n)
5. Recursion branches×2   → O(2ⁿ)

Space:
1. Fixed variables        → O(1)
2. Array/list of size n   → O(n)
3. Recursion depth d      → O(d)
4. 2D matrix n×n          → O(n²)
```

The key insight is to **count how the number of operations or memory grows as n increases**, not the exact count.

## Great Question!

### Why Loop Variables Are Still O(1) Space

Yes, variables inside loops **do count** — but they are **fixed in number** regardless of input size. That's the key.

```java
int sum(int[] arr) {
    int total = 0;   // 1 variable
    int i = 0;       // 1 variable
    // ↑ These don't grow. Whether arr has 10 or 10 million elements,
    //   you still only have 2 variables.
    for (i = 0; i < arr.length; i++) {
        total += arr[i];
    }
    return total;
}
```

**Space = O(1)** because the count of variables is **constant**, not dependent on `n`.

> **Rule:** It's not about _how many variables_ — it's about _does memory usage grow with input size?_

---

### The Contrast — When It DOES Grow

```java
int[] storeDoubles(int[] arr) {
    int[] result = new int[arr.length]; // ← grows with n!
    int temp = 0;                       // ← fixed, O(1)
    for (int i = 0; i < arr.length; i++) {
        temp = arr[i] * 2;      // temp is reused each iteration, not accumulated
        result[i] = temp;
    }
    return result;
}
```

- `temp` and `i` → **O(1)** (fixed, reused)
- `result[]` → **O(n)** (grows with input)
- **Total Space: O(n)**

---

## HashMap & Other Data Structures

### HashMap — O(n) Space

```java
// Count frequency of each element
Map<Integer, Integer> frequencyCount(int[] arr) {
    Map<Integer, Integer> map = new HashMap<>(); // grows with unique elements

    for (int num : arr) {                        // O(n) time
        map.put(num, map.getOrDefault(num, 0) + 1); // O(1) per operation
    }

    return map;
}
```

|           | Complexity                           |
| --------- | ------------------------------------ |
| **Time**  | O(n) — one pass through array        |
| **Space** | O(n) — map can store up to n entries |

---

### HashMap Lookup — O(1) Time

```java
// Check if array has duplicates
boolean hasDuplicate(int[] arr) {
    Set<Integer> seen = new HashSet<>();  // O(n) space

    for (int num : arr) {                 // O(n) loop
        if (seen.contains(num)) return true; // O(1) ← HashMap lookup is constant!
        seen.add(num);                       // O(1)
    }
    return false;
}
```

> HashMap `get`, `put`, `containsKey` are all **O(1)** average time — that's their superpower.

---

### Two Sum using HashMap

```java
int[] twoSum(int[] arr, int target) {
    Map<Integer, Integer> map = new HashMap<>(); // stores value → index

    for (int i = 0; i < arr.length; i++) {  // O(n)
        int complement = target - arr[i];

        if (map.containsKey(complement)) {   // O(1) lookup
            return new int[]{map.get(complement), i};
        }

        map.put(arr[i], i);                  // O(1) insert
    }
    return new int[]{};
}
```

|           | Complexity                                 |
| --------- | ------------------------------------------ |
| **Time**  | O(n) — single loop, O(1) operations inside |
| **Space** | O(n) — map grows up to n entries           |

Without HashMap this would be **O(n²)** using nested loops — HashMap makes it **O(n)**. That's the trade-off: **spend space to save time.**

---

### ArrayList — Dynamic Growth

```java
List<Integer> getEvens(int[] arr) {
    List<Integer> evens = new ArrayList<>(); // starts empty, grows

    for (int num : arr) {       // O(n)
        if (num % 2 == 0) {
            evens.add(num);     // O(1) amortized
        }
    }
    return evens;
}
```

|           | Complexity                                 |
| --------- | ------------------------------------------ |
| **Time**  | O(n)                                       |
| **Space** | O(n) worst case — if all elements are even |

---

### Stack — O(n) Space

```java
// Check balanced parentheses
boolean isBalanced(String s) {
    Stack<Character> stack = new Stack<>(); // grows with input

    for (char c : s.toCharArray()) {   // O(n)
        if (c == '(') stack.push(c);   // O(1)
        else if (c == ')') {
            if (stack.isEmpty()) return false;
            stack.pop();               // O(1)
        }
    }
    return stack.isEmpty();
}
```

|           | Complexity                                |
| --------- | ----------------------------------------- |
| **Time**  | O(n)                                      |
| **Space** | O(n) — worst case all `(` pushed to stack |

---

### Quick Reference — Data Structure Complexities

| Structure  | Access | Search | Insert | Delete | Space |
| ---------- | ------ | ------ | ------ | ------ | ----- |
| Array      | O(1)   | O(n)   | O(n)   | O(n)   | O(n)  |
| ArrayList  | O(1)   | O(n)   | O(1)\* | O(n)   | O(n)  |
| HashMap    | O(1)   | O(1)   | O(1)   | O(1)   | O(n)  |
| HashSet    | —      | O(1)   | O(1)   | O(1)   | O(n)  |
| Stack      | O(n)   | O(n)   | O(1)   | O(1)   | O(n)  |
| LinkedList | O(n)   | O(n)   | O(1)   | O(1)   | O(n)  |

\*ArrayList insert is O(1) **amortized** — occasionally resizes at O(n)

---

### The Golden Rule to Remember

> **Time complexity** = count how many times operations **execute**
> **Space complexity** = count how much memory **accumulates** (variables that _grow_, not variables that _exist_)
