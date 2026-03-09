export interface Section {
  title: string;
  tag: string;
  interview: string;
  code: string;
  keyPoints?: string[];
}

export interface TrapQuestion {
  question: string;
  answer: string;
}

export interface Topic {
  id: string;
  label: string;
  icon: string;
  colorClass: string;
  sections: Section[];
  trapQuestions?: TrapQuestion[];
}

export const topics: Topic[] = [
  {
    id: "oops",
    label: "OOP Concepts",
    icon: "⚙️",
    colorClass: "topic-oop",
    sections: [
      {
        title: "Class & Object",
        tag: "Foundation",
        keyPoints: [
          "A class is a blueprint; an object is an instance of that blueprint",
          "Every Java file must have at least one class",
          "Objects have state (fields) and behavior (methods)",
          "Use `new` keyword to instantiate objects"
        ],
        interview: `"A class is a blueprint — like a cookie cutter. The object is the actual cookie. In Java, everything lives inside a class. When I built a banking app, I created an Account class once and instantiated thousands of account objects from it."`,
        code: `public class Account {
    private String owner;
    private double balance;

    public Account(String owner, double balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(double amount) {
        this.balance += amount;
    }
}

// Object creation — each has its own state
Account acc1 = new Account("Rahul", 5000.0);
Account acc2 = new Account("Priya", 12000.0);`
      },
      {
        title: "Encapsulation",
        tag: "Data Protection",
        keyPoints: [
          "Make fields private, expose via getters/setters",
          "Enables validation inside setters",
          "Controls access to internal state",
          "Foundation of secure Java design"
        ],
        interview: `"Make fields private, expose via getters/setters. The key insight is CONTROL — not just hiding. When balance is private, I know exactly which method modified it. In Java, this also enables validation inside setters."`,
        code: `public class Employee {
    private double salary; // can't touch directly

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        if (salary < 0)
            throw new IllegalArgumentException("Invalid salary");
        this.salary = salary; // validated before setting
    }
}`
      },
      {
        title: "Inheritance",
        tag: "IS-A Relationship",
        keyPoints: [
          "Child class inherits from parent using `extends`",
          "Use only for true IS-A relationships",
          "Java supports single class inheritance",
          "A class can implement multiple interfaces"
        ],
        interview: `"Child class inherits from parent using 'extends'. I only use it for true IS-A relationships. An Admin IS-A User makes sense. Java supports single inheritance for classes but a class can implement multiple interfaces."`,
        code: `public class User {
    protected String name;
    protected String email;

    public void login() {
        System.out.println(name + " logged in");
    }
}

public class Admin extends User {
    private String adminCode;

    public void deleteUser(int userId) {
        System.out.println("User " + userId + " deleted");
    }
}

Admin a = new Admin();
a.login(); // inherited — works!`
      },
      {
        title: "Polymorphism",
        tag: "Many Forms",
        keyPoints: [
          "Compile-time: method overloading (same name, different params)",
          "Runtime: method overriding (parent ref, child object)",
          "JVM decides which method to call based on actual object type",
          "Enables flexible and extensible code"
        ],
        interview: `"Two types in Java — compile-time (method overloading) and runtime (method overriding). Runtime polymorphism is powerful — same reference type, different behavior. The JVM decides which method to call based on the actual object, not the reference type."`,
        code: `// Runtime Polymorphism — Overriding
class Payment {
    public void process() {
        System.out.println("Processing payment");
    }
}

class UPI extends Payment {
    @Override
    public void process() {
        System.out.println("Processing via UPI");
    }
}

// Parent ref, child object — JVM picks right method
Payment p = new UPI();
p.process(); // prints "Processing via UPI"

// Compile-time Polymorphism — Overloading
class Calculator {
    public int add(int a, int b)       { return a + b; }
    public double add(double a, double b) { return a + b; }
    public String add(String a, String b) { return a + b; }
}`
      },
      {
        title: "Abstraction",
        tag: "Hide Complexity",
        keyPoints: [
          "Abstract class: partial implementation, can have fields",
          "Interface: pure contract, traditionally no state",
          "Java 8 added default methods to interfaces",
          "Use abstract class for shared code, interface for shared behavior"
        ],
        interview: `"Two ways in Java — abstract classes and interfaces. Abstract class for partial implementation, interface for pure contract. Key difference: abstract class HAS state (fields), interface traditionally doesn't. Java 8 added default methods to interfaces."`,
        code: `abstract class Vehicle {
    protected String brand;

    public void startEngine() {        // concrete — shared
        System.out.println("Vroom!");
    }

    public abstract void fuelType();   // subclass must define
}

interface Electric {
    void chargeBattery();

    default void showRange() {         // Java 8 default method
        System.out.println("Range: 400km");
    }
}

class Tesla extends Vehicle implements Electric {
    public void fuelType()      { System.out.println("Electric"); }
    public void chargeBattery() { System.out.println("Charging..."); }
}`
      },
      {
        title: "Composition — Strong HAS-A",
        tag: "Child Dies with Parent",
        keyPoints: [
          "Child CANNOT exist without the parent",
          "Composed object is created INSIDE the parent",
          "Prefer over inheritance when no true IS-A relationship",
          "Example: House has Rooms — destroy House, Rooms gone"
        ],
        interview: `"Composition is a strong HAS-A where the child CANNOT exist without the parent. A House HAS Rooms — destroy the House, Rooms are gone too. In code, the composed object is created INSIDE the parent. Prefer this over inheritance when there's no true IS-A relationship."`,
        code: `// Room cannot exist without House — created internally
public class Room {
    private String type;
    private int sqft;

    public Room(String type, int sqft) {
        this.type = type;
        this.sqft = sqft;
    }
}

public class House {
    private final List<Room> rooms;

    public House() {
        this.rooms = new ArrayList<>();
        this.rooms.add(new Room("Bedroom", 200));  // created inside
        this.rooms.add(new Room("Kitchen", 150));
        // House destroyed → Rooms destroyed
    }
}

// Stack using composition (better than Stack extends Vector!)
public class Stack<T> {
    private final Deque<T> storage = new ArrayDeque<>(); // HAS-A

    public void push(T item) { storage.push(item); }
    public T pop()            { return storage.pop(); }
    public T peek()           { return storage.peek(); }
    // No accidental Deque methods exposed to callers!
}`
      },
      {
        title: "Aggregation — Weak HAS-A",
        tag: "Child Lives Independently",
        keyPoints: [
          "Child CAN exist independently of parent",
          "Object is PASSED IN via constructor or setter",
          "Example: Department has Professors — department closes, professors remain",
          "Weaker coupling than composition"
        ],
        interview: `"Aggregation is a WEAK HAS-A — the child CAN exist independently. A Department HAS Professors, but if the Department is closed, the Professors still exist. In code, the object is PASSED IN via constructor or setter — not created inside."`,
        code: `// Professor exists independently of Department
public class Professor {
    private String name;
    private String subject;

    public Professor(String name, String subject) {
        this.name = name;
        this.subject = subject;
    }
}

public class Department {
    private String name;
    private List<Professor> professors; // passed IN — not created here

    public Department(String name, List<Professor> professors) {
        this.name = name;
        this.professors = professors; // aggregation
    }
}

// Professor created BEFORE and survives AFTER Department
Professor p1 = new Professor("Dr. Sharma", "Math");
Professor p2 = new Professor("Dr. Gupta", "Physics");

List<Professor> staff = Arrays.asList(p1, p2);
Department dept = new Department("Science", staff);

// dept = null? p1 and p2 still alive ✅`
      },
      {
        title: "Composition vs Aggregation vs Inheritance",
        tag: "Key Comparison",
        keyPoints: [
          "IS-A = Inheritance (Dog IS-A Animal)",
          "Strong HAS-A = Composition (Heart in Body)",
          "Weak HAS-A = Aggregation (Student in University)",
          "Ask: 'Can the child exist without the parent?'"
        ],
        interview: `"Three relationship types. IS-A = Inheritance (Dog IS-A Animal). Strong HAS-A = Composition (Heart in a Body — Heart dies with Body). Weak HAS-A = Aggregation (Student in University — Student survives). Ask: 'Can the child exist without the parent?' YES → Aggregation, NO → Composition."`,
        code: `// IS-A — Inheritance
class Animal { void breathe() {} }
class Dog extends Animal { void bark() {} }

// Strong HAS-A — Composition
class Heart {
    void pump() { System.out.println("Pumping..."); }
}

class Body {
    private final Heart heart = new Heart(); // created inside

    public void live() { heart.pump(); }
    // Body destroyed → Heart destroyed
}

// Weak HAS-A — Aggregation
class Student {
    String name;
    Student(String name) { this.name = name; }
}

class University {
    private List<Student> students; // passed from outside

    University(List<Student> students) {
        this.students = students;
    }
    // University closed → students still exist
}

// Decision rule:
// "Can the child exist without the parent?"
//   YES  →  Aggregation (weak HAS-A)
//   NO   →  Composition (strong HAS-A)
//   IS-A →  Inheritance`
      }
    ]
  },
  {
    id: "interface",
    label: "Interfaces",
    icon: "🔌",
    colorClass: "topic-interface",
    sections: [
      {
        title: "Interface vs Abstract Class",
        tag: "Most Asked",
        keyPoints: [
          "Interface = pure contract, no state",
          "Abstract class = partial implementation with fields",
          "Java 8+ interfaces can have default and static methods",
          "A class can implement multiple interfaces but extend only one class"
        ],
        interview: `"Interface = pure contract, no state. Abstract class = partial implementation, can have fields. Use interface when unrelated classes share behavior (Flyable, Serializable). Use abstract class when related classes share code. From Java 8, interfaces can have default and static methods."`,
        code: `interface Flyable {
    void fly();                        // abstract by default

    default void land() {              // Java 8 default
        System.out.println("Landing...");
    }

    static void checkWeather() {       // Java 8 static
        System.out.println("Weather OK");
    }
}

abstract class Bird {
    protected String name;             // has state (fields)

    public void breathe() {
        System.out.println("Breathing");
    }

    public abstract void speak();      // subclass decides
}

// Extend ONE abstract class, implement MULTIPLE interfaces
class Eagle extends Bird implements Flyable {
    public void speak() { System.out.println("Screech!"); }
    public void fly()   { System.out.println("Soaring!"); }
}`
      },
      {
        title: "Functional Interface & Lambdas",
        tag: "Java 8+",
        keyPoints: [
          "Interface with exactly ONE abstract method",
          "@FunctionalInterface annotation for compile-time safety",
          "Lambdas provide concise syntax for functional interfaces",
          "Built-in: Predicate, Function, Consumer, Supplier"
        ],
        interview: `"Interface with exactly ONE abstract method. Java 8 introduced @FunctionalInterface and lambdas. Runnable, Comparator, Predicate, Function are all functional interfaces — the backbone of Java Streams."`,
        code: `@FunctionalInterface
interface Validator {
    boolean validate(String input); // single abstract method
}

// Old way — anonymous class
Validator v1 = new Validator() {
    public boolean validate(String input) {
        return input.contains("@");
    }
};

// New way — lambda (same thing, cleaner!)
Validator v2 = input -> input.contains("@");

// Built-in functional interfaces
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

names.stream()
     .filter(n -> n.length() > 3)    // Predicate<String>
     .map(String::toUpperCase)        // Function<String,String>
     .sorted()
     .forEach(System.out::println);`
      }
    ]
  },
  {
    id: "solid",
    label: "SOLID Principles",
    icon: "🏛️",
    colorClass: "topic-solid",
    sections: [
      {
        title: "S — Single Responsibility",
        tag: "One Job",
        keyPoints: [
          "One class, one reason to change",
          "Split responsibilities into separate classes",
          "Easier to test and maintain",
          "Each class should do one thing well"
        ],
        interview: `"One class, one reason to change. If my UserService handles DB operations AND sends emails — it has two reasons to change. Split them. Easier to test too — I can test EmailService without touching UserService."`,
        code: `// BAD — too many responsibilities
class UserService {
    public void createUser(User u) { /* DB */ }
    public void sendWelcomeEmail(User u) { /* Email */ }
    public void generateReport() { /* PDF */ }
}

// GOOD — one job each
class UserRepository {
    public void save(User u) { /* only DB */ }
}

class EmailService {
    public void sendWelcome(User u) { /* only email */ }
}

class UserService {
    private UserRepository repo;
    private EmailService emailSvc;

    public void createUser(User u) {
        repo.save(u);
        emailSvc.sendWelcome(u);
    }
}`
      },
      {
        title: "O — Open/Closed",
        tag: "Extend, Don't Modify",
        keyPoints: [
          "Open for extension, closed for modification",
          "Add new features via new classes, not editing existing ones",
          "Use interfaces and polymorphism",
          "Protects tested, working code"
        ],
        interview: `"Open for extension, closed for modification. Adding new features should mean adding new classes, not editing tested code. Use interfaces so new behavior is added by creating new classes only."`,
        code: `// BAD — adding new discount = editing this method
class DiscountService {
    public double apply(String type, double price) {
        if (type.equals("STUDENT")) return price * 0.8;
        if (type.equals("SENIOR"))  return price * 0.7;
        return price;
    }
}

// GOOD — add new class, zero edits to existing code
interface DiscountStrategy {
    double apply(double price);
}

class StudentDiscount implements DiscountStrategy {
    public double apply(double p) { return p * 0.8; }
}

class DiwaliDiscount implements DiscountStrategy { // new — no edits elsewhere
    public double apply(double p) { return p * 0.5; }
}

class DiscountService {
    public double apply(DiscountStrategy s, double price) {
        return s.apply(price);
    }
}`
      },
      {
        title: "L — Liskov Substitution",
        tag: "Safe Substitution",
        keyPoints: [
          "Substituting a child for a parent should never break behavior",
          "Classic violation: Square extending Rectangle",
          "Fix with common abstractions (interfaces)",
          "Ensures reliable polymorphism"
        ],
        interview: `"If I substitute a child object where a parent is expected, nothing should break. Classic violation: Square extending Rectangle — setting width on a Square also changes height, breaking Rectangle's contract."`,
        code: `// VIOLATION — Square breaks Rectangle's contract
class Rectangle {
    protected int width, height;
    public void setWidth(int w)  { this.width = w; }
    public void setHeight(int h) { this.height = h; }
    public int area()            { return width * height; }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int w) {
        this.width = w;
        this.height = w; // side-effect! breaks contract
    }
}

Rectangle r = new Square();
r.setWidth(5);
r.setHeight(3);
System.out.println(r.area()); // expects 15, gets 9

// FIX — common abstraction, no inheritance between them
interface Shape  { int area(); }
class Rectangle implements Shape { /* ... */ }
class Square    implements Shape { /* ... */ }`
      },
      {
        title: "I — Interface Segregation",
        tag: "Slim Interfaces",
        keyPoints: [
          "Don't force classes to implement unneeded methods",
          "Break fat interfaces into focused ones",
          "Java supports multiple interface implementation",
          "Small interfaces = flexible design"
        ],
        interview: `"Don't force classes to implement methods they don't need. Break fat interfaces into focused ones. Since Java classes can implement multiple interfaces, there's no excuse for a fat one."`,
        code: `// BAD — OldPrinter forced to implement scan/fax
interface Machine {
    void print(String doc);
    void scan(String doc);
    void fax(String doc);
}

class OldPrinter implements Machine {
    public void print(String doc) { System.out.println("Printing"); }
    public void scan(String doc)  { throw new UnsupportedOperationException(); }
    public void fax(String doc)   { throw new UnsupportedOperationException(); }
}

// GOOD — each class takes only what it needs
interface Printable { void print(String doc); }
interface Scannable  { void scan(String doc);  }
interface Faxable    { void fax(String doc);   }

class OldPrinter implements Printable {
    public void print(String doc) { System.out.println("Printing"); }
}

class AllInOne implements Printable, Scannable, Faxable {
    public void print(String d) { /* ... */ }
    public void scan(String d)  { /* ... */ }
    public void fax(String d)   { /* ... */ }
}`
      },
      {
        title: "D — Dependency Inversion",
        tag: "Inject, Don't Hardcode",
        keyPoints: [
          "High-level modules depend on abstractions, not concrete classes",
          "Inject dependencies via constructors",
          "Enables easy testing with mocks",
          "This is what Spring's @Autowired does"
        ],
        interview: `"High-level modules shouldn't depend on low-level modules — both depend on abstractions. Don't 'new up' dependencies inside a class, inject them. This is exactly what Spring's @Autowired does, and it makes code testable."`,
        code: `// BAD — tightly coupled, can't swap DB or test
class OrderService {
    private MySQLRepo repo = new MySQLRepo(); // hardcoded

    public void place(Order o) { repo.save(o); }
}

// GOOD — depend on interface, inject implementation
interface OrderRepository {
    void save(Order o);
}

class MySQLRepo implements OrderRepository {
    public void save(Order o) { System.out.println("MySQL"); }
}

class MongoRepo implements OrderRepository {
    public void save(Order o) { System.out.println("Mongo"); }
}

class OrderService {
    private final OrderRepository repo; // abstraction

    public OrderService(OrderRepository repo) { // injected
        this.repo = repo;
    }

    public void place(Order o) { repo.save(o); }
}

// Spring: @Autowired injects automatically
// Tests: new OrderService(new MockRepo())`
      }
    ],
    trapQuestions: [
      { question: "Which SOLID principle does Spring's @Autowired implement?", answer: "Dependency Inversion. It injects abstractions — your class depends on an interface, Spring decides the implementation at runtime." },
      { question: "Can you violate SOLID and write good code?", answer: "Yes — for small scripts or prototypes, SOLID adds overhead. It shines in large codebases where requirements evolve. Apply judgment, not dogma." },
      { question: "Which is hardest to follow?", answer: "Open/Closed — predicting all future extension points is hard. Refactor toward OCP when you notice editing the same class repeatedly." }
    ]
  },
  {
    id: "patterns",
    label: "Design Patterns",
    icon: "🧩",
    colorClass: "topic-patterns",
    sections: [
      {
        title: "Singleton Pattern",
        tag: "One Instance",
        keyPoints: [
          "One instance for the entire application",
          "Use cases: DB pool, Logger, Config",
          "Bill Pugh (static inner class) is preferred in Java",
          "Thread-safe without synchronization overhead"
        ],
        interview: `"One instance for the entire app — DB connection pool, Logger, Config. Bill Pugh (static inner class) is the best Java approach — lazily loaded and thread-safe without synchronization overhead."`,
        code: `// Bill Pugh Singleton — preferred
public class Logger {
    private Logger() {}

    private static class Holder {       // loaded only when accessed
        private static final Logger INSTANCE = new Logger();
    }

    public static Logger getInstance() {
        return Holder.INSTANCE;         // JVM guarantees thread safety
    }

    public void log(String msg) {
        System.out.println("[LOG] " + msg);
    }
}

// Double-Checked Locking — explicit thread control
public class DBPool {
    private static volatile DBPool instance;

    private DBPool() {}

    public static DBPool getInstance() {
        if (instance == null) {
            synchronized (DBPool.class) {
                if (instance == null) {   // double-check after lock
                    instance = new DBPool();
                }
            }
        }
        return instance;
    }
}

Logger.getInstance().log("App started");`
      },
      {
        title: "Factory Pattern",
        tag: "Delegate Creation",
        keyPoints: [
          "Delegate object creation to a factory method",
          "Caller specifies what, not how to build",
          "Follows Open/Closed principle",
          "Spring's ApplicationContext is a factory"
        ],
        interview: `"Delegate object creation to a factory. Caller says what it wants, not how to build it. Follows Open/Closed — add new types by adding new classes. Spring's ApplicationContext IS a factory."`,
        code: `interface Notification {
    void send(String message);
}

class EmailNotification implements Notification {
    public void send(String msg) { System.out.println("Email: " + msg); }
}

class SMSNotification implements Notification {
    public void send(String msg) { System.out.println("SMS: " + msg); }
}

class NotificationFactory {
    public static Notification create(String type) {
        switch (type) {
            case "EMAIL": return new EmailNotification();
            case "SMS":   return new SMSNotification();
            default: throw new IllegalArgumentException("Unknown: " + type);
        }
    }
}

Notification n = NotificationFactory.create("SMS");
n.send("Your OTP is 4521");`
      },
      {
        title: "Observer Pattern",
        tag: "Event Driven",
        keyPoints: [
          "When one object changes, all dependents are notified",
          "Decouples publisher from subscribers",
          "Spring's ApplicationEvent uses this pattern",
          "Perfect for order processing pipelines"
        ],
        interview: `"When one object changes, all dependents are notified. Spring's ApplicationEvent is built on this. Perfect for order processing — place an order, trigger email + inventory + analytics without coupling the services."`,
        code: `interface OrderObserver {
    void onOrderPlaced(String orderId);
}

class EmailService implements OrderObserver {
    public void onOrderPlaced(String id) {
        System.out.println("Email sent: " + id);
    }
}

class InventoryService implements OrderObserver {
    public void onOrderPlaced(String id) {
        System.out.println("Stock reduced: " + id);
    }
}

class OrderService {
    private List<OrderObserver> observers = new ArrayList<>();

    public void subscribe(OrderObserver o) { observers.add(o); }

    public void placeOrder(String orderId) {
        System.out.println("Order placed: " + orderId);
        observers.forEach(o -> o.onOrderPlaced(orderId));
    }
}

OrderService svc = new OrderService();
svc.subscribe(new EmailService());
svc.subscribe(new InventoryService());
svc.placeOrder("ORD-001"); // both notified!`
      },
      {
        title: "Builder Pattern",
        tag: "Complex Objects",
        keyPoints: [
          "Fluent API for constructing objects with many optional fields",
          "Avoids telescoping constructors",
          "Lombok's @Builder generates this automatically",
          "Java's StringBuilder is a classic example"
        ],
        interview: `"When a class has many optional fields, constructors get ugly. Builder gives a fluent API. Java's StringBuilder is the classic example. Mention Lombok's @Builder which generates this boilerplate automatically."`,
        code: `public class User {
    private final String name;    // required
    private final String email;   // required
    private final String phone;   // optional
    private final int age;        // optional

    private User(Builder b) {
        this.name  = b.name;
        this.email = b.email;
        this.phone = b.phone;
        this.age   = b.age;
    }

    public static class Builder {
        private String name, email, phone;
        private int age;

        public Builder(String name, String email) {
            this.name = name; this.email = email;
        }
        public Builder phone(String p) { this.phone = p; return this; }
        public Builder age(int a)      { this.age = a;   return this; }
        public User build()            { return new User(this); }
    }
}

User user = new User.Builder("John", "john@gmail.com")
    .phone("9876543210")
    .age(28)
    .build();`
      }
    ]
  },
  {
    id: "strings",
    label: "Strings",
    icon: "📝",
    colorClass: "topic-strings",
    sections: [
      {
        title: "String Immutability & String Pool",
        tag: "Core Concept",
        keyPoints: [
          "String is immutable — every modification creates a new object",
          "String Pool in heap shares same literal objects",
          "Thread-safe and safe as HashMap key",
          "Use `equals()` for content comparison, not `==`"
        ],
        interview: `"String is immutable in Java — once created, you can't change it. Every modification creates a new object. Java has a String Pool (intern pool) in heap — same literals share one object. This is why String is thread-safe and safe as a HashMap key."`,
        code: `// String Pool — literals are shared
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2);       // true — same pool object

// new keyword bypasses pool
String s3 = new String("hello");
System.out.println(s1 == s3);       // false — different object
System.out.println(s1.equals(s3));  // true — same content

// Immutability — each operation creates new object
String str = "Java";
str.concat(" Interview");           // original str unchanged!
System.out.println(str);            // still "Java"

str = str.concat(" Interview");     // reassign to capture new object
System.out.println(str);            // "Java Interview"

// Why immutable?
// 1. Thread-safe by default
// 2. Safe HashMap key (hashcode never changes)
// 3. Security — passwords, file paths can't be tampered`
      },
      {
        title: "String vs StringBuilder vs StringBuffer",
        tag: "Must Know",
        keyPoints: [
          "String: immutable, slow for concatenation in loops",
          "StringBuilder: mutable, fast, NOT thread-safe",
          "StringBuffer: mutable, thread-safe (synchronized), slower",
          "Use StringBuilder in 99% of cases"
        ],
        interview: `"String is immutable — every concat in a loop creates a new object, very slow. StringBuilder is mutable and fast but NOT thread-safe. StringBuffer is mutable and thread-safe (synchronized) but slower. Use StringBuilder in 99% of cases."`,
        code: `// String in loop — BAD (creates 1000 objects!)
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;   // new String object every iteration
}

// StringBuilder — GOOD (mutable, single object)
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    sb.append(i);  // modifies same object
}
String result2 = sb.toString();

// Key StringBuilder methods
StringBuilder sb2 = new StringBuilder("Hello");
sb2.append(" World");        // Hello World
sb2.insert(5, ",");          // Hello, World
sb2.delete(5, 6);            // Hello World
sb2.reverse();               // dlroW olleH
sb2.replace(0, 5, "Bye");    // Bye olleH
sb2.length();                // 9
sb2.charAt(0);               // 'B'

// StringBuffer — same API, but synchronized for threads
StringBuffer sbf = new StringBuffer("thread");
sbf.append("-safe");         // synchronized method`
      },
      {
        title: "Key String Methods",
        tag: "Cheat Sheet",
        keyPoints: [
          "Most important: charAt, substring, indexOf, split, trim",
          "Search: contains, startsWith, endsWith",
          "Transform: replace, replaceAll, toUpperCase",
          "Convert: toCharArray, valueOf, parseInt"
        ],
        interview: `"These come up in coding rounds constantly. Most important: charAt, substring, indexOf, split, trim/strip, replace, startsWith, endsWith, toCharArray, compareTo, contains."`,
        code: `String s = "  Hello World  ";

// Basics
s.length()                    // 15
s.trim()                      // "Hello World"
s.strip()                     // Java 11 unicode-aware trim
s.toLowerCase()               // "  hello world  "
s.toUpperCase()               // "  HELLO WORLD  "

// Search
s.contains("World")           // true
s.indexOf("World")            // 8
s.lastIndexOf("l")            // 9
s.startsWith("  Hello")       // true
s.endsWith("  ")              // true

// Extract
s.trim().charAt(6)            // 'W'
s.trim().substring(6)         // "World"
s.trim().substring(0, 5)      // "Hello"
"a,b,c".split(",")            // ["a","b","c"]

// Transform
s.replace("World", "Java")    // "  Hello Java  "
s.replaceAll("\\\\s+", "-")     // "--Hello-World--"

// Check
"".isEmpty()                  // true
"  ".isBlank()                // true (Java 11)
"abc".equals("abc")           // true
"abc".equalsIgnoreCase("ABC") // true

// Convert
"abc".toCharArray()           // ['a','b','c']
String.valueOf(123)           // "123"
Integer.parseInt("123")       // 123
String.join("-","a","b","c")  // "a-b-c"`
      },
      {
        title: "Coding: Reverse & Palindrome",
        tag: "Interview Q",
        keyPoints: [
          "StringBuilder.reverse() — simplest for production",
          "Two-pointer char array — O(1) space, interview favorite",
          "Palindrome: clean input first, then two-pointer check",
          "Always ask: handle null? Ignore case/spaces?"
        ],
        interview: `"Multiple approaches — StringBuilder.reverse() is simplest for production. Two-pointer char array is O(1) space, preferred in interviews. For palindrome, always clarify: ignore case? Spaces? Special characters?"`,
        code: `// Reverse: StringBuilder — simplest
public String reverse(String s) {
    if (s == null) return null;
    return new StringBuilder(s).reverse().toString();
}

// Reverse: Two-pointer — interview favorite, O(1) space
public String reverse2(String s) {
    if (s == null || s.length() <= 1) return s;
    char[] chars = s.toCharArray();
    int left = 0, right = chars.length - 1;
    while (left < right) {
        char temp = chars[left];
        chars[left++] = chars[right];
        chars[right--] = temp;
    }
    return new String(chars);
}

// Palindrome: Two-pointer — O(n) time, O(1) space
public boolean isPalindrome(String s) {
    if (s == null) return false;
    s = s.toLowerCase().replaceAll("[^a-z0-9]", "");
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left++) != s.charAt(right--)) return false;
    }
    return true;
}

System.out.println(isPalindrome("A man a plan a canal Panama")); // true`
      },
      {
        title: "Coding: Anagram, Duplicates, First Unique",
        tag: "Interview Q",
        keyPoints: [
          "Anagram check: frequency array O(n)",
          "Find duplicates: HashMap count",
          "First non-repeating: LinkedHashMap preserves insertion order",
          "These are the most common String coding questions"
        ],
        interview: `"Most common String coding questions. Anagram check: frequency array O(n). Find duplicates: HashMap count. First non-repeating: LinkedHashMap preserves insertion order — that's the key insight they're testing."`,
        code: `// 1. Check anagram — frequency array
public boolean isAnagram(String s1, String s2) {
    if (s1.length() != s2.length()) return false;
    int[] count = new int[26];
    for (char c : s1.toCharArray()) count[c - 'a']++;
    for (char c : s2.toCharArray()) count[c - 'a']--;
    for (int n : count) if (n != 0) return false;
    return true;
}
// isAnagram("listen", "silent") → true

// 2. Find duplicate characters
public void findDuplicates(String s) {
    Map<Character, Integer> freq = new HashMap<>();
    for (char c : s.toCharArray())
        freq.put(c, freq.getOrDefault(c, 0) + 1);
    freq.forEach((c, cnt) -> {
        if (cnt > 1) System.out.println(c + " : " + cnt);
    });
}
// findDuplicates("programming") → r:2, g:2, m:2

// 3. First non-repeating character
public char firstUnique(String s) {
    Map<Character, Integer> map = new LinkedHashMap<>(); // preserves order!
    for (char c : s.toCharArray())
        map.put(c, map.getOrDefault(c, 0) + 1);
    for (Map.Entry<Character, Integer> e : map.entrySet())
        if (e.getValue() == 1) return e.getKey();
    return '-';
}
// firstUnique("aabbcdd") → 'c'`
      }
    ]
  },
  {
    id: "springboot",
    label: "Spring Boot",
    icon: "🍃",
    colorClass: "topic-spring",
    sections: [
      {
        title: "What is Spring Boot",
        tag: "Foundation",
        keyPoints: [
          "Auto-configuration based on classpath dependencies",
          "Starter POMs eliminate version conflicts",
          "Embedded server (Tomcat/Jetty) — run as fat JAR",
          "@SpringBootApplication = @Configuration + @ComponentScan + @EnableAutoConfiguration"
        ],
        interview: `"Spring Boot eliminates setup. It works on three principles: AUTO-CONFIGURATION (detects classpath, creates beans automatically), STARTER POMs (one dependency pulls all compatible libs), and EMBEDDED SERVER (fat JAR with Tomcat inside, perfect for Docker)."`,
        code: `@SpringBootApplication
// = @Configuration + @ComponentScan + @EnableAutoConfiguration
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
        // Bootstraps Spring context, runs auto-config,
        // starts embedded Tomcat on port 8080
    }
}

// application.properties
// server.port=8081
// spring.datasource.url=jdbc:mysql://localhost:3306/mydb
// spring.datasource.username=root
// spring.datasource.password=secret
// spring.jpa.hibernate.ddl-auto=update
// spring.jpa.show-sql=true`
      },
      {
        title: "Stereotype Annotations",
        tag: "Bean Registration",
        keyPoints: [
          "@Component — generic Spring-managed bean",
          "@Service — business logic layer (semantic)",
          "@Repository — data access + exception translation",
          "@RestController = @Controller + @ResponseBody"
        ],
        interview: `"All four tell Spring 'register this as a bean'. @Component is generic. @Service signals business logic. @Repository adds exception translation. @RestController returns JSON automatically."`,
        code: `@Component
public class EmailValidator {
    public boolean isValid(String email) {
        return email != null && email.contains("@");
    }
}

@Service
public class OrderService {
    public Order placeOrder(Cart cart, User user) {
        // business logic...
        return order;
    }
}

@Repository
public class UserRepository {
    @PersistenceContext
    private EntityManager em;

    public User findById(Long id) {
        return em.find(User.class, id);
        // HibernateException → DataAccessException automatically
    }
}

@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
        // Automatically converted to JSON
    }
}`
      },
      {
        title: "Dependency Injection",
        tag: "DI Deep Dive",
        keyPoints: [
          "Constructor injection (preferred) — final fields, easy to test",
          "Setter injection — for optional dependencies",
          "Field injection (@Autowired) — avoid in production",
          "@Qualifier and @Primary resolve multiple bean conflicts"
        ],
        interview: `"Spring's IoC container injects dependencies. Constructor injection is preferred — fields are final, can't be null, easy to test. @Primary picks default bean, @Qualifier specifies by name."`,
        code: `interface PaymentGateway { void pay(double amount); }

@Component("stripeGateway")
@Primary  // Spring picks THIS one by default
public class StripeGateway implements PaymentGateway {
    public void pay(double amount) { System.out.println("Stripe: " + amount); }
}

@Component("paypalGateway")
public class PaypalGateway implements PaymentGateway {
    public void pay(double amount) { System.out.println("PayPal: " + amount); }
}

// Constructor Injection — PREFERRED
@Service
public class CheckoutService {
    private final PaymentGateway gateway;

    public CheckoutService(
        @Qualifier("paypalGateway") PaymentGateway gateway) {
        this.gateway = gateway;
    }
}

// @Value — inject from application.properties
@Service
public class JwtService {
    @Value("\${app.jwt.secret}")
    private String jwtSecret;

    @Value("\${app.jwt.expiry:3600}")    // 3600 is default
    private int expirySeconds;
}`
      },
      {
        title: "Spring Data JPA",
        tag: "Database Layer",
        keyPoints: [
          "@Entity maps class to DB table; @Id is primary key",
          "Extend JpaRepository for free CRUD operations",
          "Derived query methods from method names",
          "@Transactional ensures atomicity — rollback on exception"
        ],
        interview: `"Spring Data JPA eliminates boilerplate DAO code. Extend JpaRepository for free CRUD. Method names become queries automatically. @Transactional wraps in DB transaction — if anything throws, everything rolls back."`,
        code: `@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders;
}

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByNameContainingIgnoreCase(String name);

    @Query("SELECT u FROM User u WHERE u.active = true")
    List<User> findActiveUsers();
}

@Service
public class OrderService {
    @Transactional  // all-or-nothing
    public Order placeOrder(OrderRequest req) {
        Order order = orderRepo.save(new Order(req));
        inventoryService.reduce(req.getProductId(), req.getQuantity());
        emailService.sendConfirmation(order);
        return order; // if email fails, order rolls back
    }
}`
      },
      {
        title: "Spring Security",
        tag: "Authentication & Authorization",
        keyPoints: [
          "Chain of filters intercepts every HTTP request",
          "Authentication = who you are; Authorization = what you can do",
          "SecurityFilterChain @Bean (new way, not WebSecurityConfigurerAdapter)",
          "BCrypt for password hashing — never plain text"
        ],
        interview: `"Spring Security works as a filter chain. Authentication proves identity, Authorization checks permissions. Use SecurityFilterChain @Bean (modern approach). For REST APIs: disable CSRF, set stateless sessions, add JWT filter."`,
        code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter,
                UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}

@RestController
public class UserController {
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() { return userService.findAll(); }

    @GetMapping("/users/me")
    @PreAuthorize("isAuthenticated()")
    public User getMyProfile(Authentication auth) {
        return userService.findByEmail(auth.getName());
    }
}`
      },
      {
        title: "Global Exception Handling",
        tag: "Error Handling",
        keyPoints: [
          "@ControllerAdvice intercepts exceptions from all controllers",
          "Return consistent error response structure",
          "@Valid triggers JSR-303 validation on @RequestBody",
          "Never expose stack traces to clients"
        ],
        interview: `"Never let raw stack traces reach the client. @ControllerAdvice intercepts exceptions globally. Return consistent error structure with status, timestamp, and message. Use @Valid for input validation."`,
        code: `public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, Long id) {
        super(resource + " not found with id: " + id);
    }
}

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
            ResourceNotFoundException ex) {
        ErrorResponse err = new ErrorResponse(
            404, "Not Found", ex.getMessage(), LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex) {
        List<FieldError> errors = ex.getBindingResult()
            .getFieldErrors().stream()
            .map(fe -> new FieldError(fe.getField(), fe.getDefaultMessage()))
            .toList();
        ErrorResponse err = new ErrorResponse(
            400, "Validation Failed", "Input invalid", LocalDateTime.now());
        return ResponseEntity.badRequest().body(err);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
        ErrorResponse err = new ErrorResponse(
            500, "Internal Error", "Something went wrong", LocalDateTime.now());
        return ResponseEntity.internalServerError().body(err);
    }
}`
      }
    ],
    trapQuestions: [
      { question: "@Component vs @Bean?", answer: "@Component is class-level, auto-scanned. @Bean is method-level inside @Configuration — used for third-party classes you can't annotate." },
      { question: "@RestController vs @Controller?", answer: "@RestController = @Controller + @ResponseBody. Every method returns JSON. @Controller returns view names." },
      { question: "When does @Transactional NOT work?", answer: "Self-invocation — calling a @Transactional method from within the same class bypasses the Spring proxy. Also doesn't work on private methods." },
      { question: "@PathVariable vs @RequestParam?", answer: "@PathVariable extracts from URL path: /users/{id}. @RequestParam from query string: /users?id=5." }
    ]
  },
  {
    id: "annotations",
    label: "Annotations",
    icon: "🏷️",
    colorClass: "topic-annotations",
    sections: [
      {
        title: "Core Spring Annotations",
        tag: "Bean Management",
        keyPoints: [
          "@Component, @Service, @Repository, @Controller — bean registration",
          "@Bean for third-party classes in @Configuration",
          "@Autowired, @Qualifier, @Primary — dependency injection",
          "@PostConstruct, @PreDestroy — lifecycle hooks"
        ],
        interview: `"These are the foundation. @Component family registers beans. @Autowired injects them. @PostConstruct runs after creation, @PreDestroy before shutdown."`,
        code: `// Bean Registration
@Component          // generic Spring bean
@Service            // business logic layer
@Repository         // data access + exception translation
@Controller         // MVC controller — returns view names
@RestController     // @Controller + @ResponseBody — returns JSON
@Configuration      // source of @Bean definitions

// Bean Definition
@Bean               // method-level bean declaration
@Scope("prototype") // singleton(default)/prototype/request/session
@Primary            // default choice when multiple beans of same type
@Lazy               // create on first use, not at startup

// Dependency Injection
@Autowired          // inject by type
@Qualifier("name")  // specify which bean by name
@Value("\${key}")    // inject from properties file

// Lifecycle
@PostConstruct      // run after bean creation
@PreDestroy         // run before shutdown`
      },
      {
        title: "Spring MVC & REST Annotations",
        tag: "Web Layer",
        keyPoints: [
          "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping",
          "@PathVariable from URL, @RequestParam from query string",
          "@RequestBody deserializes JSON to Java object",
          "@Valid triggers validation on request body"
        ],
        interview: `"Know the difference between each @Mapping annotation and how to extract data from URL path, query params, request body, and headers."`,
        code: `// Request Mapping
@RequestMapping     // base URL mapping
@GetMapping         // HTTP GET — fetch data
@PostMapping        // HTTP POST — create resource
@PutMapping         // HTTP PUT — full replace
@PatchMapping       // HTTP PATCH — partial update
@DeleteMapping      // HTTP DELETE — remove resource

// Request Data
@PathVariable       // from URL path: /users/{id}
@RequestParam       // from query: ?page=2
@RequestBody        // JSON body → Java object
@RequestHeader      // read HTTP header
@CookieValue        // read cookie value

// Response
@ResponseBody       // return JSON (included in @RestController)
@ResponseStatus     // set HTTP status code
@CrossOrigin        // enable CORS

// Validation & Errors
@Valid              // trigger validation
@ControllerAdvice   // global exception handler
@ExceptionHandler   // handle specific exception type`
      },
      {
        title: "JPA & Database Annotations",
        tag: "ORM",
        keyPoints: [
          "@Entity, @Table, @Id, @GeneratedValue — entity mapping",
          "@OneToMany, @ManyToOne, @ManyToMany — relationships",
          "FetchType.LAZY vs EAGER — performance implications",
          "@Transactional — atomic operations"
        ],
        interview: `"JPA annotations map objects to tables. Know @Entity, @Id, relationships, and especially LAZY vs EAGER fetch types."`,
        code: `// Entity Mapping
@Entity             // marks JPA entity (DB table)
@Table(name="tbl")  // customize table name
@Id                 // primary key
@GeneratedValue     // auto-generate PK
@Column             // customize column
@Transient          // skip this field

// Relationships
@OneToOne           // User → UserProfile
@OneToMany          // User → List<Order>
@ManyToOne          // Order → User
@ManyToMany         // Student ↔ Course
@JoinColumn         // foreign key column
@MappedBy           // non-owning side

// FetchType: LAZY (on demand) vs EAGER (immediately)
// LAZY default: @OneToMany, @ManyToMany
// EAGER default: @ManyToOne, @OneToOne

// Query
@Query              // custom JPQL or native SQL
@Modifying          // for UPDATE/DELETE queries
@Transactional      // wrap in DB transaction`
      }
    ],
    trapQuestions: [
      { question: "@Component vs @Service vs @Repository — real difference?", answer: "@Component is generic. @Service is semantic. @Repository activates exception translation — Hibernate exceptions become Spring's DataAccessException." },
      { question: "@Transactional on a private method — does it work?", answer: "No. Spring AOP uses proxies. Private methods can't be overridden, so the proxy can't intercept them." },
      { question: "@Cacheable vs @CachePut?", answer: "@Cacheable skips the method on cache hit. @CachePut always runs and updates cache. Use @CachePut on writes to keep cache in sync." }
    ]
  }
];

export const cheatSheetItems = [
  { term: "Overloading", def: "Same class, same name, different params", colorClass: "topic-oop" },
  { term: "Overriding", def: "Parent-child, same sig, @Override", colorClass: "topic-interface" },
  { term: "Composition", def: "Strong HAS-A, child dies with parent", colorClass: "topic-oop" },
  { term: "Aggregation", def: "Weak HAS-A, child lives independently", colorClass: "topic-strings" },
  { term: "Abstract class", def: "Partial impl, can have fields", colorClass: "topic-solid" },
  { term: "Interface", def: "Contract only, multiple impl", colorClass: "topic-patterns" },
  { term: "Singleton", def: "Bill Pugh static inner class", colorClass: "topic-annotations" },
  { term: "String Pool", def: "Literals shared, new() bypasses it", colorClass: "topic-strings" },
  { term: "StringBuilder", def: "Mutable, fast, not thread-safe", colorClass: "topic-spring" },
  { term: "@Transactional", def: "Self-invocation = proxy bypassed!", colorClass: "topic-solid" },
  { term: "Circuit Breaker", def: "Fail fast + fallback = resilience", colorClass: "topic-interface" },
  { term: "AOP @Around", def: "Wraps entire method — most powerful", colorClass: "topic-patterns" },
];
