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
