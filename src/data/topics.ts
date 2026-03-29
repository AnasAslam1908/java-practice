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
          "Use `new` keyword to instantiate objects",
        ],
        interview: `"A class is just a template. Like if I'm building a user management system, I don't write separate code for every user — I create a User class once and create objects from it. Each object has its own name, email, password but follows the same structure"`,
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
Account acc2 = new Account("Priya", 12000.0);`,
      },
      {
        title: "Encapsulation",
        tag: "Data Protection",
        keyPoints: [
          "Make fields private, expose via getters/setters",
          "Enables validation inside setters",
          "Controls access to internal state",
          "Foundation of secure Java design",
        ],
        interview: `"It's about protecting your data. Imagine a bank — you can't just walk in and change your balance directly. You have to go through a teller (a method). Same idea — I make sensitive fields private and expose only what's needed through getters/setters"`,
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
}`,
      },
      {
        title: "Inheritance",
        tag: "IS-A Relationship",
        keyPoints: [
          "Child class inherits from parent using `extends`",
          "Use only for true IS-A relationships",
          "Java supports single class inheritance",
          "A class can implement multiple interfaces",
        ],
        interview: `""Instead of copy-pasting code, I let one class borrow from another. Like if I have an Admin and a Customer — both are users, both have login/logout. So I put that in a User base class and extend it. Admin gets extra permissions on top.."`,
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
a.login(); // inherited — works!`,
      },
      {
        title: "Polymorphism",
        tag: "Many Forms",
        keyPoints: [
          "Compile-time: method overloading (same name, different params)",
          "Runtime: method overriding (parent ref, child object)",
          "JVM decides which method to call based on actual object type",
          "Enables flexible and extensible code",
        ],
        interview: `"It means the same action can behave differently depending on the object type. It has two types in Java — compile-time (method overloading) and runtime (method overriding). Runtime polymorphism is powerful — same reference type, different behavior. The JVM decides which method to call based on the actual object, not the reference type."`,
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
}`,
      },
      {
        title: "Abstraction",
        tag: "Hide Complexity",
        keyPoints: [
          "Abstract class: partial implementation, can have fields",
          "Interface: pure contract, traditionally no state",
          "Java 8 added default methods to interfaces",
          "Use abstract class for shared code, interface for shared behavior",
        ],
        interview: `"It's about hiding complexity. When I built an API layer, the caller didn't need to know whether data was coming from a database or cache. I abstracted that behind a DataService interface. The caller just says getData() and doesn't care about the rest MoreOver
        Two ways in Java — abstract classes and interfaces. Abstract class for partial implementation, interface for pure contract. Key difference: abstract class HAS state (fields), interface traditionally doesn't. Java 8 added default methods to interfaces."`,
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
}`,
      },
      {
        title: "Association",
        tag: "General HAS-A Relationship",
        keyPoints: [
          "Objects are related but independent",
          "Created OUTSIDE the parent and passed in (or referenced)",
          "Parent holds a reference to the associated object",
          "Example: Company HAS Employees — employees can change jobs",
        ],
        interview: `"Association is just saying two objects are related. A Company HAS Employees. But it's loose coupling — the Employee can work for multiple companies (in real world) or change jobs. In code, I create the Employee outside and pass it to Company, or the Company just holds a reference. If Company closes, Employees still exist and can join another company."`,
        code: `// Employee exists independently
public class Employee {
    private String name;
    private String role;

    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public String getName() { return name; }
}

// Company has association with Employee
public class Company {
    private String name;
    private List<Employee> employees;

    public Company(String name) {
        this.name = name;
        this.employees = new ArrayList<>();
    }

    public void hireEmployee(Employee emp) {
        this.employees.add(emp);  // reference is added (not created)
    }

    public void removeEmployee(Employee emp) {
        this.employees.remove(emp);
    }
}

// Usage: Employee exists independently, associated with Company
Employee e1 = new Employee("Rahul", "Developer");
Employee e2 = new Employee("Priya", "Designer");

Company google = new Company("Google");
google.hireEmployee(e1);
google.hireEmployee(e2);

Company amazon = new Company("Amazon");
amazon.hireEmployee(e1);  // same employee, associated with multiple companies

// e1 exists independently of both companies ✅`,
      },
      {
        title: "Association vs Inheritance",
        tag: "Design Decision",
        keyPoints: [
          "Inheritance (IS-A): Extend behavior, share code, true hierarchical relationship",
          "Association (HAS-A): Add related objects without modifying class structure",
          "Use Inheritance when: 'X IS-A Y' makes sense and you want to reuse code",
          "Use Association when: 'X HAS-A Y' and they're independent entities",
          "Inheritance forces tight coupling; Association allows loose coupling",
          "Inheritance creates tight coupling because child depends heavily on parent, while association provides loose coupling as objects interact without strong dependency.",
          "Favor composition/association over inheritance (design principle)",
        ],
        interview: `"Two different relationships. Inheritance is IS-A — Dog IS-A Animal. We extend the parent class, inherit its behavior, and override what we need. Use it for hierarchies. Association is HAS-A — Company HAS Employee. We're relating two objects without inheritance. Association is looser coupling — the objects are independent. A rule of thumb: prefer Association over Inheritance unless true IS-A relationship exists. Association is more flexible."`,
        code: `// ❌ BAD: Using Inheritance when Association is appropriate
class Person {
    String name;
    void eat() { System.out.println("Eating"); }
}

class Company extends Person {  // WRONG! Company IS NOT-A Person
    String companyName;
}

// ✅ GOOD: Using Association instead
class Company {
    String companyName;
    List<Employee> employees;

    public void hireEmployee(Employee emp) {
        employees.add(emp);
    }
}

class Employee {
    String name;
    void work() { System.out.println("Working"); }
}

// ----------

// ✅ CORRECT: Using Inheritance for true IS-A
class Animal {
    public void breathe() { System.out.println("Breathing"); }
}

class Dog extends Animal {  // Dog IS-A Animal ✅
    public void bark() { System.out.println("Woof!"); }
}

// ----------

// Real-world comparison:

// IS-A (Inheritance) - Animal → Dog, Cat
class Animal {
    public void sound() { System.out.println("Generic sound"); }
}

class Dog extends Animal {
    @Override
    public void sound() { System.out.println("Bark"); }
}

// HAS-A (Association) - Car → Engine, Wheel
class Engine {
    public void start() { System.out.println("Engine started"); }
}

class Car {
    private Engine engine;  // Association - Car HAS-A Engine

    public Car(Engine engine) {
        this.engine = engine;  // passed in from outside
    }

    public void start() {
        engine.start();
    }
}

// Usage
Engine turboDiesel = new Engine();
Car mycar = new Car(turboDiesel);
mycar.start();

// Key difference:
// Inheritance: Dog IS-A Animal (deep hierarchy, tightly coupled)
// Association: Car HAS-A Engine (flexible, loose coupling)`,
      },
      {
        title: "Composition — Strong HAS-A",
        tag: "Child Dies with Parent",
        keyPoints: [
          "Child CANNOT exist without the parent",
          "Composed object is created INSIDE the parent",
          "Prefer over inheritance when no true IS-A relationship",
          "Example: House has Rooms — destroy House, Rooms gone",
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
}`,
      },
      {
        title: "Aggregation — Weak HAS-A",
        tag: "Child Lives Independently",
        keyPoints: [
          "Child CAN exist independently of parent",
          "Object is PASSED IN via constructor or setter",
          "Example: Department has Professors — department closes, professors remain",
          "Weaker coupling than composition",
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

// dept = null? p1 and p2 still alive ✅`,
      },
      {
        title: "Composition vs Aggregation vs Inheritance",
        tag: "Key Comparison",
        keyPoints: [
          "IS-A = Inheritance (Dog IS-A Animal)",
          "Strong HAS-A = Composition (Heart in Body)",
          "Weak HAS-A = Aggregation (Student in University)",
          "Ask: 'Can the child exist without the parent?'",
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
//   IS-A →  Inheritance`,
      },
      {
        title: "Static Keyword in Java",
        tag: "Class-Level Members",
        keyPoints: [
          "Static belongs to class, not object",
          "Static members can be accessed without creating an object",
          "Static variable: one shared copy for all objects",
          "Static method: can directly access only static members",
          "Static block runs once when class is loaded",
          "Static nested class can be used without Outer object",
          "main() is static because JVM calls it without creating object",
          "Static memory is stored in Method Area (Class Area)",
        ],
        interview: `"The static keyword is for class-level members. That means it belongs to the class, not to each object. Static variables are shared by all objects, static methods can be called using ClassName.method(), and static blocks run when class loads. main() is static because JVM needs to call it without creating an object. In short: static means shared class-level behavior/data, accessible without object creation."`,
        code: `// 1) Static Variable (Class Variable)
    class Student {
      static String school = "ABC School"; // one shared copy
      String name;
    }

    Student s1 = new Student();
    Student s2 = new Student();
    System.out.println(Student.school); // same for all students

    // ----------

    // 2) Static Method
    class MathUtils {
      static int square(int x) {
        return x * x;
      }
    }

    int result = MathUtils.square(5); // no object needed

    // ----------

    // 3) Static Block
    class Test {
      static {
        System.out.println("Class Loaded");
      }
    }
    // runs when JVM loads Test class

    // ----------

    // 4) Static Nested Class
    class Outer {
      static class Inner {
        void show() {
          System.out.println("Inside inner");
        }
      }
    }

    Outer.Inner obj = new Outer.Inner(); // no Outer object needed

    // ----------

    // Why main() is static
    public class Main {
      public static void main(String[] args) {
        System.out.println("JVM calls main without creating object");
      }
    }

    // Interview one-liner:
    // "static is used for class-level members that are shared by all objects
    // and can be accessed without creating an object."

    // Real-life analogy:
    // Class = Template, Object = actual student
    // static = school name (same for everyone)
    // non-static = student name (different per object)`,
      },
      {
        title: "Static Binding vs Dynamic Binding",
        tag: "Method Resolution",
        keyPoints: [
          "Static binding = method resolved at compile-time based on reference type",
          "Dynamic binding = method resolved at runtime based on actual object type",
          "Static binding applies to static, private, final methods",
          "When a child defines same static method, it is Method Hiding (not overriding)",
          "Dynamic binding is how method overriding (polymorphism) works",
          "Overloading is always static binding; overriding is dynamic binding",
        ],
        interview: `"Binding means how the compiler/JVM decides which method to call. Static binding happens at compile-time — based on reference type. Dynamic binding happens at runtime — based on actual object type. Method overloading is static binding, method overriding is dynamic binding. For static methods, if child defines same method, it's called Method Hiding. Example: Animal ref = new Dog(); ref.staticMethod() calls Animal version because static methods belong to class and use reference type."`,
        code: `// Static Binding Example (Method Hiding)
    class Animal {
      static void staticMethod() {
        System.out.println("Animal static");
      }
    }

    class Dog extends Animal {
      static void staticMethod() {
        System.out.println("Dog static");  // Method Hiding (not overriding)
      }
    }

    // Static binding — decided at compile-time using REFERENCE type
    Animal ref = new Dog();
    ref.staticMethod();       // prints "Animal static"

    // Why? static methods belong to class, not object
    // So this is called METHOD HIDING

    // ----------

    // Dynamic Binding Example
    class Vehicle {
      public void start() {      // Can be overridden
        System.out.println("Vehicle started");
      }
    }

    class Car extends Vehicle {
      @Override
      public void start() {
        System.out.println("Car engine started");
      }
    }

    class Bike extends Vehicle {
      @Override
      public void start() {
        System.out.println("Bike engine started");
      }
    }

    // Dynamic binding — decided at runtime
    Vehicle v1 = new Car();
    v1.start();          // prints "Car engine started" (actual object type)

    Vehicle v2 = new Bike();
    v2.start();          // prints "Bike engine started" (actual object type)

    // ----------

    // Static Binding with final
    class Parent {
      public final void cannotOverride() {  // final methods = static binding
        System.out.println("Parent");
      }
    }

    class Child extends Parent {
      // Cannot override because method is final
      // public void cannotOverride() { }  // COMPILE ERROR
    }

    Parent p = new Child();
    p.cannotOverride();     // Always calls Parent version (static binding)

    // ----------

    // Combined Example: Static, Dynamic, Private, Final in one place
    class Animal {

      // Static method → static binding (compile-time)
      static void staticMethod() {
        System.out.println("Animal static method");
      }

      // Instance method → dynamic binding (runtime)
      void instanceMethod() {
        System.out.println("Animal instance method");
      }

      // Private method → not visible to child → static binding
      private void privateMethod() {
        System.out.println("Animal private method");
      }

      // Final method → cannot be overridden → static binding
      final void finalMethod() {
        System.out.println("Animal final method");
      }

      // Public method to access private
      void callPrivate() {
        privateMethod();
      }
    }

    class Dog extends Animal {

      // Hiding static method → static binding
      static void staticMethod() {
        System.out.println("Dog static method");
      }

      // Overriding instance method → dynamic binding
      @Override
      void instanceMethod() {
        System.out.println("Dog instance method");
      }

      // Private method → completely separate
      private void privateMethod() {
        System.out.println("Dog private method");
      }

      // Cannot override finalMethod → compile error if tried
      // void finalMethod() {}  // ❌
    }

    public class Main {
      public static void main(String[] args) {

        Animal ref2 = new Dog();

        // ✅ Static binding (reference type decides)
        ref2.staticMethod();        // Animal static method

        // ✅ Dynamic binding (object type decides)
        ref2.instanceMethod();      // Dog instance method

        // ✅ Private method → cannot access via reference
        // ref2.privateMethod();    // ❌ COMPILE ERROR

        // ✅ Access private via public method
        ref2.callPrivate();         // Animal private method

        // ✅ Final method → static binding
        ref2.finalMethod();         // Animal final method

        System.out.println("\\nDirect class access:");

        // Static methods can be called directly
        Animal.staticMethod();      // Animal static method
        Dog.staticMethod();         // Dog static method
      }
    }`,
      },
      {
        title: "Association vs Aggregation vs Composition",
        tag: "Detailed Side-by-Side",
        keyPoints: [
          "Association: Just 'uses-a' relationship, loose coupling, no ownership",
          "Aggregation: 'Weak HAS-A', object passed in from outside, can exist independently",
          "Composition: 'Strong HAS-A', object created inside, child depends on parent",
          "Decision: Can the child exist without the parent? YES→Aggregation, NO→Composition",
          "Association has lowest coupling, Composition has highest",
        ],
        interview: `"Three types of relationships. Association is just 'uses-a' — Teacher USES Student (no ownership, method-level). Aggregation is 'weak HAS-A' — University HAS Department, but Department can exist without University (passed in from outside). Composition is 'strong HAS-A' — Car HAS Engine, Engine cannot exist without Car (created inside). The key question: Can the child exist without the parent? YES→Aggregation, NO→Composition, Neither→Association."`,
        code: `// 1️⃣ Association (Loose Coupling) — Just "uses-a"
class Student {
    String name;
}

class Teacher {
    void teach(Student s) {   // just using Student, no ownership
        System.out.println("Teaching " + s.name);
    }
}

// Key: No ownership, objects independent, just method-level usage

// ----------

// 2️⃣ Aggregation (Weak HAS-A) — Object stored but can exist independently
class Department {
    String name;

    Department(String name) {
        this.name = name;
    }
}

class University {
    Department dept;   // aggregation — passed in

    University(Department dept) {
        this.dept = dept;  // created OUTSIDE → passed inside
    }
}

// Usage:
Department d1 = new Department("CS");
University u1 = new University(d1);
// d1 = null? Department still exists ✅

// Key: Created outside, passed inside, can exist independently

// ----------

// 3️⃣ Composition (Strong HAS-A) — Object cannot exist without container
class Engine {
    void start() { System.out.println("Engine started"); }
}

class Car {
    private Engine engine = new Engine();  // created INSIDE — composition

    public void startCar() {
        engine.start();
    }
}

// Usage:
Car c1 = new Car();  // Engine auto-created
// Car destroyed → Engine destroyed ❌

// Key: Created inside, no external access, lifecycle dependent

// ----------

// COMPARISON TABLE:
// Feature          | Association | Aggregation | Composition
// Relation         | Uses        | Weak HAS-A  | Strong HAS-A
// Object Creation  | Outside     | Outside     | Inside
// Ownership        | No          | No          | Yes
// Dependency       | Low ✔       | Medium 🤏   | High ❌
// Lifecycle        | Independent | Independent | Dependent
// Can exist alone  | YES         | YES         | NO

// Example:
// Association: Teacher uses Student
// Aggregation: University has Department (but dept exists independently)
// Composition: Car has Engine (engine cannot exist without car)`,
      },
    ],
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
          "Interface defines WHAT a class must do, not HOW. It's a contract. Tomorrow if I add PayPal, I just implement the same interface — my checkout code doesn't change at all. That's the power.",
          "Interface = pure contract, no state",
          "Abstract class = partial implementation with fields",
          "Java 8+ interfaces can have default and static methods",
          "A class can implement multiple interfaces but extend only one class",
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
}`,
      },
      {
        title: "Functional Interface & Lambdas",
        tag: "Java 8+",
        keyPoints: [
          "Interface with exactly ONE abstract method",
          "@FunctionalInterface annotation for compile-time safety",
          "Lambdas provide concise syntax for functional interfaces",
          "Built-in: Predicate, Function, Consumer, Supplier",
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
     .forEach(System.out::println);`,
      },
    ],
  },
  {
    id: "solid",
    label: "SOLID Principles",
    icon: "🏛️",
    colorClass: "topic-solid",
    sections: [
      {
        title: "What is SOLID Principle?",
        tag: "Core Definition",
        keyPoints: [
          "SOLID is a set of 5 object-oriented design principles",
          "S = Single Responsibility",
          "O = Open/Closed",
          "L = Liskov Substitution",
          "I = Interface Segregation",
          "D = Dependency Inversion",
          "Helps build maintainable, scalable, and testable software",
        ],
        interview: `"SOLID is a collection of five design principles used in object-oriented programming to write clean, flexible, and maintainable code. S is Single Responsibility, O is Open/Closed, L is Liskov Substitution, I is Interface Segregation, and D is Dependency Inversion. Together, they reduce coupling, improve readability, and make systems easier to test and extend."`,
        code: `// SOLID at a glance
// S - Single Responsibility      -> One class, one reason to change
// O - Open/Closed                -> Open for extension, closed for modification
// L - Liskov Substitution        -> Child should safely replace parent
// I - Interface Segregation      -> Prefer small, focused interfaces
// D - Dependency Inversion       -> Depend on abstractions, not concrete classes

// Why SOLID?
// - Better maintainability
// - Easier testing
// - Lower coupling
// - Cleaner architecture`,
      },
      {
        title: "S — Single Responsibility",
        tag: "One Job",
        keyPoints: [
          "One class, one reason to change",
          "Split responsibilities into separate classes",
          "Easier to test and maintain",
          "Each class should do one thing well",
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
}`,
      },
      {
        title: "O — Open/Closed",
        tag: "Extend, Don't Modify",
        keyPoints: [
          "Open for extension, closed for modification",
          "Add new features via new classes, not editing existing ones",
          "Use interfaces and polymorphism",
          "Protects tested, working code",
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
}`,
      },
      {
        title: "L — Liskov Substitution",
        tag: "Safe Substitution",
        keyPoints: [
          "Substituting a child for a parent should never break behavior",
          "Classic violation: Square extending Rectangle",
          "Fix with common abstractions (interfaces)",
          "Ensures reliable polymorphism",
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
class Square    implements Shape { /* ... */ }`,
      },
      {
        title: "I — Interface Segregation",
        tag: "Slim Interfaces",
        keyPoints: [
          "Don't force classes to implement unneeded methods",
          "Break fat interfaces into focused ones",
          "Java supports multiple interface implementation",
          "Small interfaces = flexible design",
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
}`,
      },
      {
        title: "D — Dependency Inversion",
        tag: "Inject, Don't Hardcode",
        keyPoints: [
          "High-level modules depend on abstractions, not concrete classes",
          "Inject dependencies via constructors",
          "Enables easy testing with mocks",
          "This is what Spring's @Autowired does",
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
// Tests: new OrderService(new MockRepo())`,
      },
    ],
    trapQuestions: [
      {
        question: "Which SOLID principle does Spring's @Autowired implement?",
        answer:
          "Dependency Inversion. It injects abstractions — your class depends on an interface, Spring decides the implementation at runtime.",
      },
      {
        question: "Can you violate SOLID and write good code?",
        answer:
          "Yes — for small scripts or prototypes, SOLID adds overhead. It shines in large codebases where requirements evolve. Apply judgment, not dogma.",
      },
      {
        question: "Which is hardest to follow?",
        answer:
          "Open/Closed — predicting all future extension points is hard. Refactor toward OCP when you notice editing the same class repeatedly.",
      },
    ],
  },
  {
    id: "must-know",
    label: "Must-Know Topics",
    icon: "🔥",
    colorClass: "topic-oop",
    sections: [
      {
        title: "Array vs Linked List",
        tag: "Interview Style",
        keyPoints: [
          "Array uses contiguous memory and fixed size",
          "Linked List uses non-contiguous nodes with pointers and dynamic size",
          "Array gives O(1) indexed access, Linked List access is O(n)",
          "Insertion/deletion in middle is costly in arrays, pointer-based in Linked List",
          "Array is better for fast indexing; Linked List for frequent structural changes",
        ],
        interview: `"Both store multiple values, but storage strategy is different. Array is contiguous and fixed-size, so random access is fast O(1). Linked List stores nodes connected by references, so access is O(n), but insert/delete (when position/node is known) is efficient because you change pointers instead of shifting elements."`,
        code: `// Array example
int[] arr = new int[5];
arr[0] = 10;
arr[1] = 20;

// Memory (conceptual): [10][20][30][40][50]
// contiguous locations

// ----------

// Linked List node structure
class Node {
    int data;
    Node next;
}

// Memory (conceptual): [10 | *] -> [20 | *] -> [30 | null]
// non-contiguous nodes

// ----------

// Quick differences
// Feature       | Array          | Linked List
// Memory        | Contiguous     | Non-contiguous
// Size          | Fixed          | Dynamic
// Access        | O(1)           | O(n)
// Insert/Delete | O(n) middle    | O(1) if position/node known
// Extra Memory  | Low            | Extra pointer memory

// When to use:
// Array      -> fixed size, fast indexing
// LinkedList -> dynamic size, frequent insert/delete`,
      },
      {
        title: "What Is Stack Frame?",
        tag: "Must Know",
        keyPoints: [
          "A stack frame is memory created for each method call",
          "It stores local variables, method parameters, and return address",
          "Each recursive call creates a new frame on top of the stack",
          "Frames are removed automatically when method returns",
          "Too many frames can cause StackOverflowError",
        ],
        interview: `"A stack frame is a per-method memory block in the call stack. Whenever a method is invoked, JVM pushes a new frame containing parameters, local variables, and control info. When method completes, that frame is popped. In recursion, many frames are created quickly, which is why deep recursion can cause StackOverflowError."`,
        code: `// Call chain example
void a() {
    int x = 10;
    b(x);
}

void b(int n) {
    int y = n + 5;
    c(y);
}

void c(int value) {
    System.out.println(value);
}

// Stack (top to bottom while c() runs):
// [c frame: value]
// [b frame: n, y]
// [a frame: x]

// Recursion creates many frames
int fact(int n) {
    if (n == 1) return 1;
    return n * fact(n - 1); // new frame each call
}`,
      },
      {
        title: "How To Create Singleton Class",
        tag: "Must Know",
        keyPoints: [
          "Make constructor private to block direct object creation",
          "Expose one global access method (getInstance)",
          "Ensure only one instance exists for entire application",
          "Use Bill Pugh pattern for lazy, thread-safe initialization",
          "Use singleton for logger, config manager, and shared caches",
        ],
        interview: `"To create a singleton in Java, keep constructor private and expose a static getInstance() method. Best approach is Bill Pugh singleton using a static inner holder class. It gives lazy loading and thread safety without synchronized overhead."`,
        code: `public class AppConfig {
  private AppConfig() {} // 1) prevent new AppConfig()

  // 2) loaded only when getInstance() is first called
  private static class Holder {
    private static final AppConfig INSTANCE = new AppConfig();
  }

  // 3) global access point
  public static AppConfig getInstance() {
    return Holder.INSTANCE;
  }

  public String env() {
    return "prod";
  }
}

// Usage
AppConfig c1 = AppConfig.getInstance();
AppConfig c2 = AppConfig.getInstance();
System.out.println(c1 == c2); // true`,
      },
      {
        title: "For Loop vs Recursion",
        tag: "Interview Style",
        keyPoints: [
          "Both perform repeated work, but mechanism is different",
          "For loop is iterative and uses a single stack frame",
          "Recursion calls itself and creates a new stack frame per call",
          "Recursion must have a base case to avoid StackOverflowError",
          "Loops are typically faster and memory-efficient; recursion can be cleaner for trees/divide-and-conquer",
        ],
        interview: `"For loop is iterative and memory-efficient because execution stays in one method frame. Recursion solves a problem by self-calls and needs a base case. It is elegant for trees, backtracking, and divide-and-conquer, but can consume more memory and risk stack overflow if depth is high or base case is missing."`,
        code: `// For loop: print 1 to 5
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

// ----------

// Recursion: print 1 to 5
void print(int n) {
    if (n > 5) return; // base case

    System.out.println(n);
    print(n + 1);      // recursive call
}

print(1);

// ----------

// Example where recursion is natural
int factorial(int n) {
    if (n == 1) return 1;
    return n * factorial(n - 1);
}

// Comparison
// Feature     | For Loop         | Recursion
// Speed       | Usually faster   | Slightly slower
// Memory      | Low              | High (call stack)
// Risk        | No stack overflow| StackOverflowError possible
// Best Use    | Simple repetition| Trees, backtracking, divide&conquer`,
      },
      {
        title: "Linked List Types: Pros & Cons",
        tag: "Singly vs Doubly vs Circular",
        keyPoints: [
          "Singly Linked List: simple and memory-light but no reverse traversal",
          "Doubly Linked List: bi-directional traversal and easier deletion, but extra memory",
          "Circular Linked List: useful for round-robin, but loop conditions must be handled carefully",
          "Choose type based on traversal direction, memory budget, and operation pattern",
        ],
        interview: `"Singly is easiest and memory efficient, but reverse traversal is not possible. Doubly supports forward and backward traversal and easier node removal at the cost of extra pointer memory. Circular connects last node back to first, useful in round-robin scheduling, but wrong traversal condition can cause infinite loops."`,
        code: `// 1) Singly Linked List node
class SNode {
    int data;
    SNode next;
}
// [10 | *] -> [20 | *] -> [30 | null]

// 2) Doubly Linked List node
class DNode {
    int data;
    DNode prev;
    DNode next;
}
// null <- [10] <-> [20] <-> [30] -> null

// 3) Circular Linked List node (last.next = head)
class CNode {
    int data;
    CNode next;
}
// [10] -> [20] -> [30]
//   ^               |
//   |---------------|

// Quick comparison
// Feature            | Singly   | Doubly   | Circular
// Memory             | Low      | High     | Medium
// Reverse Traversal  | No       | Yes      | Possible (design-dependent)
// Implementation     | Easy     | Moderate | Moderate
// Risk               | Low      | Medium   | Infinite-loop risk

// Use cases
// Singly   -> simple stack/list
// Doubly   -> browser back/forward
// Circular -> CPU round-robin scheduling`,
      },
      {
        title: "Access Modifiers in Java",
        tag: "private/default/protected/public",
        keyPoints: [
          "private: accessible only within same class",
          "default (package-private): accessible within same package",
          "protected: same package + subclass access in other package",
          "public: accessible from anywhere",
          "Top-level classes can be only public or default",
          "private fields support encapsulation with getters/setters",
        ],
        interview: `"Access modifiers define visibility. private is most restrictive, public is most open. default allows package-only access, and protected additionally allows inheritance-based access across packages. For top-level classes, only public and default are allowed. We usually keep fields private and expose controlled access via methods for encapsulation."`,
        code: `// 1) private
class Student {
    private int marks = 90; // only inside Student
}

// 2) default (no modifier)
class Person {
    int age = 20; // package-private
}

// 3) protected
class Employee {
    protected String name;
}

// 4) public
public class Main {
    public int id;
}

// Access summary
// Modifier   | Same Class | Same Package | Subclass(Other Pkg) | Other Pkg
// private    | Yes        | No           | No                  | No
// default    | Yes        | Yes          | No                  | No
// protected  | Yes        | Yes          | Yes                 | No
// public     | Yes        | Yes          | Yes                 | Yes

// Encapsulation pattern
class SalaryBox {
    private int salary;

    public int getSalary() {
        return salary;
    }
}`,
      },
      {
        title: "Stateful vs Stateless (and JWT)",
        tag: "Interview Style",
        keyPoints: [
          "Stateful systems store client session data on the server",
          "Stateless systems keep no client session between requests",
          "In stateless APIs, each request must carry all auth context",
          "JWT is stateless because token contains claims and is self-validated",
          "Logout/revocation needs extra strategy (blacklist, short expiry, rotation)",
        ],
        interview: `"Stateful means server remembers client session (usually via HttpSession/cookie-backed session id). Stateless means server does not store per-client session; every request is independent and carries required auth data. JWT is considered stateless because token itself carries user identity/claims and server validates signature on each request without reading session state from server memory."`,
        code: `// Stateful flow (session-based)
POST /login -> server creates session in memory/redis
Set-Cookie: JSESSIONID=abc123

GET /orders -> browser sends JSESSIONID
Server loads user session from store

// Stateless flow (JWT-based)
POST /login -> server returns JWT
Authorization: Bearer eyJhbGciOi...

GET /orders -> client sends JWT each time
Server verifies signature + expiry, extracts claims
No server-side session lookup required

// Spring Security config for stateless JWT APIs
http
  .csrf(csrf -> csrf.disable())
  .sessionManagement(session ->
      session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));`,
      },
      {
        title: "What Is Session?",
        tag: "Web Basics",
        keyPoints: [
          "A session stores user-specific state across multiple HTTP requests",
          "Server creates a session after login and returns a session id cookie",
          "Browser sends that session id (for example JSESSIONID) in later requests",
          "Server uses the id to fetch user data like identity, roles, and cart",
          "Session ends on logout, timeout, or explicit invalidation",
        ],
        interview: `"HTTP is stateless, so session is used to remember a user between requests. After successful login, server creates a session object and sends a session id cookie to client. On each request, server reads that id and loads stored user context. This is called stateful authentication."`,
        code: `// Login success
HttpSession session = request.getSession(true);
session.setAttribute("userId", 101L);
session.setAttribute("role", "ADMIN");

// Next request (cookie carries JSESSIONID automatically)
HttpSession s = request.getSession(false);
if (s != null && s.getAttribute("userId") != null) {
    // user is logged in
}

// Logout
if (s != null) {
    s.invalidate();
}`,
      },
    ],
    trapQuestions: [
      {
        question: "Session vs Cookie in one line?",
        answer:
          "Cookie is a client-side storage mechanism; Session is server-side user state. In session-based auth, cookie usually carries only a session id (JSESSIONID) while actual user data stays on server.",
      },
    ],
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
          "Thread-safe without synchronization overhead",
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

Logger.getInstance().log("App started");`,
      },
      {
        title: "Factory Pattern",
        tag: "Delegate Creation",
        keyPoints: [
          "Delegate object creation to a factory method",
          "Caller specifies what, not how to build",
          "Follows Open/Closed principle",
          "Spring's ApplicationContext is a factory",
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
n.send("Your OTP is 4521");`,
      },
      {
        title: "Observer Pattern",
        tag: "Event Driven",
        keyPoints: [
          "When one object changes, all dependents are notified",
          "Decouples publisher from subscribers",
          "Spring's ApplicationEvent uses this pattern",
          "Perfect for order processing pipelines",
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
svc.placeOrder("ORD-001"); // both notified!`,
      },
      {
        title: "Builder Pattern",
        tag: "Complex Objects",
        keyPoints: [
          "Fluent API for constructing objects with many optional fields",
          "Avoids telescoping constructors",
          "Lombok's @Builder generates this automatically",
          "Java's StringBuilder is a classic example",
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
    .build();`,
      },
    ],
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
          "Use `equals()` for content comparison, not `==`",
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
// 3. Security — passwords, file paths can't be tampered`,
      },
      {
        title: "String vs StringBuilder vs StringBuffer",
        tag: "Must Know",
        keyPoints: [
          "String: immutable, slow for concatenation in loops",
          "StringBuilder: mutable, fast, NOT thread-safe",
          "StringBuffer: mutable, thread-safe (synchronized), slower",
          "Use StringBuilder in 99% of cases",
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
sbf.append("-safe");         // synchronized method`,
      },
      {
        title: "Key String Methods",
        tag: "Cheat Sheet",
        keyPoints: [
          "Most important: charAt, substring, indexOf, split, trim",
          "Search: contains, startsWith, endsWith",
          "Transform: replace, replaceAll, toUpperCase",
          "Convert: toCharArray, valueOf, parseInt",
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
String.join("-","a","b","c")  // "a-b-c"`,
      },
      {
        title: "Coding: Reverse & Palindrome",
        tag: "Interview Q",
        keyPoints: [
          "StringBuilder.reverse() — simplest for production",
          "Two-pointer char array — O(1) space, interview favorite",
          "Palindrome: clean input first, then two-pointer check",
          "Always ask: handle null? Ignore case/spaces?",
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

System.out.println(isPalindrome("A man a plan a canal Panama")); // true`,
      },
      {
        title: "Coding: Anagram, Duplicates, First Unique",
        tag: "Interview Q",
        keyPoints: [
          "Anagram check: frequency array O(n)",
          "Find duplicates: HashMap count",
          "First non-repeating: LinkedHashMap preserves insertion order",
          "These are the most common String coding questions",
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
// firstUnique("aabbcdd") → 'c'`,
      },
    ],
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
          "@SpringBootApplication = @Configuration + @ComponentScan + @EnableAutoConfiguration",
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
// spring.jpa.show-sql=true`,
      },
      {
        title: "Stereotype Annotations",
        tag: "Bean Registration",
        keyPoints: [
          "@Component — generic Spring-managed bean",
          "@Service — business logic layer (semantic)",
          "@Repository — data access + exception translation",
          "@RestController = @Controller + @ResponseBody",
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
}`,
      },
      {
        title: "Dependency Injection",
        tag: "DI Deep Dive",
        keyPoints: [
          "Constructor injection (preferred) — final fields, easy to test",
          "Setter injection — for optional dependencies",
          "Field injection (@Autowired) — avoid in production",
          "@Qualifier and @Primary resolve multiple bean conflicts",
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
}`,
      },
      {
        title: "Spring Data JPA",
        tag: "Database Layer",
        keyPoints: [
          "@Entity maps class to DB table; @Id is primary key",
          "Extend JpaRepository for free CRUD operations",
          "Derived query methods from method names",
          "@Transactional ensures atomicity — rollback on exception",
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
}`,
      },
      {
        title: "Spring Security",
        tag: "Authentication & Authorization",
        keyPoints: [
          "Chain of filters intercepts every HTTP request",
          "Authentication = who you are; Authorization = what you can do",
          "SecurityFilterChain @Bean (new way, not WebSecurityConfigurerAdapter)",
          "BCrypt for password hashing — never plain text",
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
}`,
      },
      {
        title: "Global Exception Handling",
        tag: "Error Handling",
        keyPoints: [
          "@ControllerAdvice intercepts exceptions from all controllers",
          "Return consistent error response structure",
          "@Valid triggers JSR-303 validation on @RequestBody",
          "Never expose stack traces to clients",
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
}`,
      },
    ],
    trapQuestions: [
      {
        question: "@Component vs @Bean?",
        answer:
          "@Component is class-level, auto-scanned. @Bean is method-level inside @Configuration — used for third-party classes you can't annotate.",
      },
      {
        question: "@RestController vs @Controller?",
        answer:
          "@RestController = @Controller + @ResponseBody. Every method returns JSON. @Controller returns view names.",
      },
      {
        question: "When does @Transactional NOT work?",
        answer:
          "Self-invocation — calling a @Transactional method from within the same class bypasses the Spring proxy. Also doesn't work on private methods.",
      },
      {
        question: "@PathVariable vs @RequestParam?",
        answer:
          "@PathVariable extracts from URL path: /users/{id}. @RequestParam from query string: /users?id=5.",
      },
    ],
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
          "@PostConstruct, @PreDestroy — lifecycle hooks",
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
@PreDestroy         // run before shutdown`,
      },
      {
        title: "Spring MVC & REST Annotations",
        tag: "Web Layer",
        keyPoints: [
          "@GetMapping, @PostMapping, @PutMapping, @DeleteMapping",
          "@PathVariable from URL, @RequestParam from query string",
          "@RequestBody deserializes JSON to Java object",
          "@Valid triggers validation on request body",
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
@ExceptionHandler   // handle specific exception type`,
      },
      {
        title: "JPA & Database Annotations",
        tag: "ORM",
        keyPoints: [
          "@Entity, @Table, @Id, @GeneratedValue — entity mapping",
          "@OneToMany, @ManyToOne, @ManyToMany — relationships",
          "FetchType.LAZY vs EAGER — performance implications",
          "@Transactional — atomic operations",
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
@Transactional      // wrap in DB transaction`,
      },
    ],
    trapQuestions: [
      {
        question: "@Component vs @Service vs @Repository — real difference?",
        answer:
          "@Component is generic. @Service is semantic. @Repository activates exception translation — Hibernate exceptions become Spring's DataAccessException.",
      },
      {
        question: "@Transactional on a private method — does it work?",
        answer:
          "No. Spring AOP uses proxies. Private methods can't be overridden, so the proxy can't intercept them.",
      },
      {
        question: "@Cacheable vs @CachePut?",
        answer:
          "@Cacheable skips the method on cache hit. @CachePut always runs and updates cache. Use @CachePut on writes to keep cache in sync.",
      },
    ],
  },
  {
    id: "datastructures",
    label: "Data Structures",
    icon: "🗂️",
    colorClass: "topic-ds",
    sections: [
      {
        title: "Arrays",
        tag: "Foundation",
        keyPoints: [
          "Fixed-size, contiguous memory, zero-indexed",
          "O(1) random access by index",
          "O(n) insertion/deletion (shift elements)",
          "Use ArrayList for dynamic sizing in Java",
        ],
        interview: `"Arrays store elements in contiguous memory, giving O(1) access by index. The trade-off is fixed size and O(n) insert/delete because elements must shift. In Java I use ArrayList when I need dynamic sizing — it's backed by an array that auto-resizes."`,
        code: `// Fixed-size array
int[] nums = new int[5];
nums[0] = 10;
nums[1] = 20;

// Array with initializer
String[] names = {"Alice", "Bob", "Charlie"};

// Iterate
for (int i = 0; i < names.length; i++) {
    System.out.println(names[i]);
}

// ArrayList — dynamic array
List<Integer> list = new ArrayList<>();
list.add(10);       // O(1) amortized
list.add(20);
list.get(0);        // O(1) — random access
list.remove(0);     // O(n) — shifts elements
list.size();        // 1

// Arrays utility
int[] arr = {5, 3, 1, 4, 2};
Arrays.sort(arr);                    // O(n log n)
int idx = Arrays.binarySearch(arr, 3); // O(log n)
Arrays.fill(arr, 0);                // fill all with 0`,
      },
      {
        title: "Linked List",
        tag: "Dynamic Structure",
        keyPoints: [
          "Nodes linked via pointers — no contiguous memory needed",
          "O(1) insert/delete at head; O(n) to find by index",
          "Singly vs Doubly linked (Java's LinkedList is doubly)",
          "Use when frequent insert/delete at ends, rare random access",
        ],
        interview: `"LinkedList nodes point to the next (and optionally previous) node. Insert/delete at head is O(1) — no shifting. But random access is O(n) because you must traverse. Java's LinkedList is doubly-linked and implements both List and Deque."`,
        code: `// Java's built-in LinkedList (doubly-linked)
LinkedList<String> list = new LinkedList<>();
list.addFirst("A");   // O(1)
list.addLast("C");    // O(1)
list.add(1, "B");     // O(n) — traverse to index

list.getFirst();      // O(1) — "A"
list.get(1);          // O(n) — "B"

list.removeFirst();   // O(1)
list.removeLast();    // O(1)

// Custom singly-linked node
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

// Reverse a linked list — classic interview question
ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev; // new head
}`,
      },
      {
        title: "Stack",
        tag: "LIFO",
        keyPoints: [
          "Last In, First Out (LIFO) principle",
          "push(), pop(), peek() — all O(1)",
          "Use Deque (ArrayDeque) instead of legacy Stack class",
          "Use cases: undo, back button, expression evaluation, DFS",
        ],
        interview: `"Stack follows LIFO — last element in is first out. In Java, don't use the legacy Stack class (it extends Vector, which is synchronized). Use ArrayDeque as a stack — push/pop/peek are all O(1)."`,
        code: `// Use ArrayDeque as Stack (preferred over Stack class)
Deque<Integer> stack = new ArrayDeque<>();
stack.push(10);      // add to top
stack.push(20);
stack.push(30);

stack.peek();        // 30 — look without removing
stack.pop();         // 30 — remove from top
stack.isEmpty();     // false
stack.size();        // 2

// Classic: Valid Parentheses
boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '{') stack.push('}');
        else if (c == '[') stack.push(']');
        else if (stack.isEmpty() || stack.pop() != c)
            return false;
    }
    return stack.isEmpty();
}

isValid("({[]})"); // true
isValid("([)]");   // false`,
      },
      {
        title: "Queue",
        tag: "FIFO",
        keyPoints: [
          "First In, First Out (FIFO) principle",
          "offer(), poll(), peek() — all O(1) with LinkedList/ArrayDeque",
          "Use cases: BFS, task scheduling, message queues",
          "LinkedList or ArrayDeque as implementation",
        ],
        interview: `"Queue follows FIFO — first in, first out. Like a line at a coffee shop. In Java, use LinkedList or ArrayDeque as the implementation. Key operations: offer (enqueue), poll (dequeue), peek — all O(1)."`,
        code: `// Queue using LinkedList
Queue<String> queue = new LinkedList<>();
queue.offer("Task 1");   // enqueue
queue.offer("Task 2");
queue.offer("Task 3");

queue.peek();            // "Task 1" — front, no remove
queue.poll();            // "Task 1" — dequeue
queue.size();            // 2

// BFS using Queue — level-order traversal
void bfs(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);

    while (!queue.isEmpty()) {
        TreeNode node = queue.poll();
        System.out.print(node.val + " ");

        if (node.left != null)  queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}`,
      },
      {
        title: "Deque (Double-Ended Queue)",
        tag: "Flexible",
        keyPoints: [
          "Insert/remove from both front and back in O(1)",
          "Can be used as both Stack and Queue",
          "ArrayDeque — faster than LinkedList for most cases",
          "Use cases: sliding window, palindrome check",
        ],
        interview: `"Deque supports insert/remove at both ends in O(1). ArrayDeque is the go-to implementation — faster than LinkedList due to cache locality. It can serve as both a stack (push/pop) and a queue (offerLast/pollFirst)."`,
        code: `Deque<Integer> deque = new ArrayDeque<>();

// Stack operations (use one end)
deque.push(1);       // addFirst
deque.pop();         // removeFirst

// Queue operations (use both ends)
deque.offerLast(1);  // enqueue at back
deque.pollFirst();   // dequeue from front

// Double-ended operations
deque.addFirst(10);
deque.addLast(20);
deque.addFirst(5);
// deque: [5, 10, 20]

deque.peekFirst();   // 5
deque.peekLast();    // 20
deque.removeFirst(); // 5
deque.removeLast();  // 20

// Sliding Window Maximum (classic interview)
// Use deque to track max in window of size k
int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> dq = new ArrayDeque<>(); // stores indices
    int[] result = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!dq.isEmpty() && dq.peekFirst() < i - k + 1)
            dq.pollFirst();
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
            dq.pollLast();
        dq.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[dq.peekFirst()];
    }
    return result;
}`,
      },
      {
        title: "HashMap / Hash Table",
        tag: "Key-Value",
        keyPoints: [
          "O(1) average for get, put, containsKey",
          "Uses hashCode() + equals() for key lookup",
          "Handles collisions: chaining (Java 8: treeify at 8)",
          "Not thread-safe — use ConcurrentHashMap for threads",
        ],
        interview: `"HashMap gives O(1) average lookup using hashCode. Keys must properly implement hashCode() and equals(). Java 8 converts chains to red-black trees at 8 nodes for O(log n) worst case. For thread safety, use ConcurrentHashMap."`,
        code: `Map<String, Integer> map = new HashMap<>();
map.put("Alice", 90);
map.put("Bob", 85);

map.get("Alice");           // 90
map.containsKey("Bob");     // true
map.getOrDefault("Eve", 0); // 0

map.remove("Bob");
map.size();                 // 1

// Iterate
for (Map.Entry<String, Integer> e : map.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}

// Frequency count — most common pattern
String s = "abracadabra";
Map<Character, Integer> freq = new HashMap<>();
for (char c : s.toCharArray()) {
    freq.merge(c, 1, Integer::sum);
}
// {a=5, b=2, r=2, c=1, d=1}

// LinkedHashMap — preserves insertion order
Map<String, Integer> ordered = new LinkedHashMap<>();

// TreeMap — sorted by key, O(log n)
Map<String, Integer> sorted = new TreeMap<>();`,
      },
      {
        title: "Set",
        tag: "Unique Elements",
        keyPoints: [
          "Stores unique elements only — no duplicates",
          "HashSet: O(1) add/remove/contains, unordered",
          "TreeSet: O(log n), sorted — backed by red-black tree",
          "LinkedHashSet: O(1), preserves insertion order",
        ],
        interview: `"Set guarantees uniqueness. HashSet gives O(1) operations but no order. TreeSet gives sorted order at O(log n). LinkedHashSet preserves insertion order. Choose based on whether you need ordering."`,
        code: `Set<String> set = new HashSet<>();
set.add("Java");
set.add("Python");
set.add("Java");    // duplicate — ignored

set.size();         // 2
set.contains("Java"); // true
set.remove("Python");

// Remove duplicates from list
List<Integer> nums = Arrays.asList(1, 2, 2, 3, 3, 4);
List<Integer> unique = new ArrayList<>(new HashSet<>(nums));
// [1, 2, 3, 4] — order not guaranteed

// TreeSet — sorted
Set<Integer> sorted = new TreeSet<>(Arrays.asList(5, 1, 3, 2, 4));
// [1, 2, 3, 4, 5]
((TreeSet<Integer>) sorted).first(); // 1
((TreeSet<Integer>) sorted).last();  // 5

// Set operations
Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3));
Set<Integer> b = new HashSet<>(Arrays.asList(2, 3, 4));

Set<Integer> union = new HashSet<>(a);
union.addAll(b);        // [1, 2, 3, 4]

Set<Integer> inter = new HashSet<>(a);
inter.retainAll(b);     // [2, 3]

Set<Integer> diff = new HashSet<>(a);
diff.removeAll(b);      // [1]`,
      },
      {
        title: "Tree & Binary Tree",
        tag: "Hierarchical",
        keyPoints: [
          "Hierarchical structure — root, children, leaves",
          "Binary tree: each node has at most 2 children",
          "Traversals: inorder, preorder, postorder, level-order",
          "Height-balanced trees ensure O(log n) operations",
        ],
        interview: `"A tree is hierarchical — each node has zero or more children. A binary tree limits this to two. Three classic traversals: inorder (left-root-right), preorder (root-left-right), postorder (left-right-root). BFS gives level-order."`,
        code: `class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// Inorder: Left → Root → Right (sorted for BST)
void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    System.out.print(root.val + " ");
    inorder(root.right);
}

// Preorder: Root → Left → Right
void preorder(TreeNode root) {
    if (root == null) return;
    System.out.print(root.val + " ");
    preorder(root.left);
    preorder(root.right);
}

// Max depth of binary tree
int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(
        maxDepth(root.left),
        maxDepth(root.right)
    );
}

// Level-order (BFS)
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null)  queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
      },
      {
        title: "Binary Search Tree (BST)",
        tag: "Sorted Tree",
        keyPoints: [
          "Left child < parent < right child",
          "O(log n) search/insert/delete for balanced BSTs",
          "Inorder traversal gives sorted output",
          "Degenerates to O(n) if unbalanced — fix with AVL/Red-Black",
        ],
        interview: `"BST maintains left < root < right invariant. This gives O(log n) search when balanced. Inorder traversal of a BST gives sorted output — that's a common interview trick. If unbalanced, it degenerates to a linked list with O(n) operations."`,
        code: `class BST {
    TreeNode root;

    // Search — O(log n) average
    TreeNode search(TreeNode node, int target) {
        if (node == null || node.val == target) return node;
        if (target < node.val) return search(node.left, target);
        return search(node.right, target);
    }

    // Insert — O(log n) average
    TreeNode insert(TreeNode node, int val) {
        if (node == null) return new TreeNode(val);
        if (val < node.val)
            node.left = insert(node.left, val);
        else if (val > node.val)
            node.right = insert(node.right, val);
        return node;
    }

    // Validate BST — classic interview question
    boolean isValidBST(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return isValidBST(node.left, min, node.val)
            && isValidBST(node.right, node.val, max);
    }

    // Lowest Common Ancestor in BST
    TreeNode lca(TreeNode root, int p, int q) {
        if (p < root.val && q < root.val)
            return lca(root.left, p, q);
        if (p > root.val && q > root.val)
            return lca(root.right, p, q);
        return root; // split point = LCA
    }
}`,
      },
      {
        title: "Heap / Priority Queue",
        tag: "Priority Access",
        keyPoints: [
          "Complete binary tree with heap property",
          "Min-heap: parent ≤ children (Java default)",
          "O(log n) insert/remove, O(1) peek at min/max",
          "Use cases: top-K, median finding, Dijkstra's",
        ],
        interview: `"A heap is a complete binary tree where the parent is always smaller (min-heap) or larger (max-heap) than children. Java's PriorityQueue is a min-heap by default. Insert and remove are O(log n), peek is O(1). Essential for top-K problems."`,
        code: `// Min-Heap (default in Java)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(30);
minHeap.offer(10);
minHeap.offer(20);

minHeap.peek();    // 10 — smallest
minHeap.poll();    // 10 — remove smallest

// Max-Heap
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(30);
maxHeap.offer(10);
maxHeap.offer(20);
maxHeap.peek();    // 30 — largest

// Top K Frequent Elements — classic interview
int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int n : nums) freq.merge(n, 1, Integer::sum);

    PriorityQueue<Map.Entry<Integer, Integer>> heap =
        new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
    heap.addAll(freq.entrySet());

    int[] result = new int[k];
    for (int i = 0; i < k; i++)
        result[i] = heap.poll().getKey();
    return result;
}`,
      },
      {
        title: "Graph",
        tag: "Connections",
        keyPoints: [
          "Nodes (vertices) connected by edges",
          "Directed vs undirected, weighted vs unweighted",
          "Representations: adjacency list (sparse) vs matrix (dense)",
          "Traversals: BFS (shortest path), DFS (explore fully)",
        ],
        interview: `"A graph is nodes connected by edges. Adjacency list is preferred for sparse graphs (most real-world cases). BFS finds shortest path in unweighted graphs, DFS explores all paths. Know both iterative and recursive DFS."`,
        code: `// Adjacency List representation
Map<Integer, List<Integer>> graph = new HashMap<>();
graph.put(0, Arrays.asList(1, 2));
graph.put(1, Arrays.asList(0, 3));
graph.put(2, Arrays.asList(0, 3));
graph.put(3, Arrays.asList(1, 2));

// BFS — shortest path in unweighted graph
void bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        System.out.print(node + " ");
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
}

// DFS — recursive
void dfs(Map<Integer, List<Integer>> graph,
         int node, Set<Integer> visited) {
    visited.add(node);
    System.out.print(node + " ");
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}`,
      },
      {
        title: "Trie (Prefix Tree)",
        tag: "String Search",
        keyPoints: [
          "Tree structure for efficient prefix-based string search",
          "Each node represents a character",
          "O(m) search/insert where m = word length",
          "Use cases: autocomplete, spell check, IP routing",
        ],
        interview: `"A Trie stores strings character-by-character in a tree. Each path from root represents a prefix. Search and insert are O(m) where m is word length — independent of how many words are stored. Perfect for autocomplete and prefix matching."`,
        code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEnd = true;
    }

    boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }

    boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private TrieNode find(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}

Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");     // true
trie.search("app");       // false
trie.startsWith("app");   // true`,
      },
      {
        title: "Disjoint Set (Union-Find)",
        tag: "Connected Components",
        keyPoints: [
          "Tracks connected components in a graph",
          "Two operations: find (which set?) and union (merge sets)",
          "Path compression + union by rank → near O(1) amortized",
          "Use cases: Kruskal's MST, cycle detection, connected components",
        ],
        interview: `"Union-Find tracks which elements belong to the same group. Find returns the root of a set, Union merges two sets. With path compression and union by rank, both operations are nearly O(1). Essential for Kruskal's MST and detecting cycles in undirected graphs."`,
        code: `class UnionFind {
    int[] parent, rank;

    UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    // Find with path compression
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]); // compress
        return parent[x];
    }

    // Union by rank
    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false; // already connected
        if (rank[px] < rank[py]) parent[px] = py;
        else if (rank[px] > rank[py]) parent[py] = px;
        else { parent[py] = px; rank[px]++; }
        return true;
    }

    boolean connected(int x, int y) {
        return find(x) == find(y);
    }
}

// Detect cycle in undirected graph
boolean hasCycle(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    for (int[] e : edges) {
        if (!uf.union(e[0], e[1])) return true;
    }
    return false;
}`,
      },
    ],
    trapQuestions: [
      {
        question: "When would you use LinkedList over ArrayList?",
        answer:
          "When you need frequent insertions/deletions at the head or middle. ArrayList wins for random access and iteration due to cache locality.",
      },
      {
        question: "HashMap vs TreeMap vs LinkedHashMap?",
        answer:
          "HashMap: O(1) unordered. TreeMap: O(log n) sorted by key. LinkedHashMap: O(1) insertion-ordered. Choose based on ordering needs.",
      },
      {
        question: "Why use ArrayDeque instead of Stack class?",
        answer:
          "Stack extends Vector (synchronized, slow). ArrayDeque is faster, not synchronized, and implements the Deque interface properly.",
      },
      {
        question: "What happens when HashMap exceeds load factor?",
        answer:
          "It doubles capacity and rehashes all entries. Default load factor is 0.75, initial capacity is 16.",
      },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "🗄️",
    colorClass: "topic-db",
    sections: [
      {
        title: "Relational Databases",
        tag: "Foundation",
        keyPoints: [
          "Data stored in tables with rows and columns",
          "Schema-defined structure with data types",
          "Relationships via foreign keys",
          "Examples: PostgreSQL, MySQL, Oracle, SQL Server",
        ],
        interview: `"A relational database organizes data into tables with predefined schemas. Tables relate to each other through foreign keys. The strength is data integrity through constraints, ACID transactions, and a powerful query language (SQL). PostgreSQL and MySQL are the most common."`,
        code: `-- Create a table with constraints
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (email, name)
VALUES ('john@example.com', 'John Doe');

-- Query data
SELECT id, name, email
FROM users
WHERE created_at > '2024-01-01'
ORDER BY name ASC;

-- Update
UPDATE users SET name = 'Jane Doe'
WHERE id = 1;

-- Delete
DELETE FROM users WHERE id = 1;`,
      },
      {
        title: "SQL vs NoSQL",
        tag: "Key Comparison",
        keyPoints: [
          "SQL: structured, schema-enforced, ACID, vertical scaling",
          "NoSQL: flexible schema, BASE, horizontal scaling",
          "NoSQL types: document, key-value, column, graph",
          "Choose based on data structure, scale, and consistency needs",
        ],
        interview: `"SQL databases enforce a schema and provide ACID guarantees — great for financial data, relationships, and complex queries. NoSQL offers flexible schemas and horizontal scaling — ideal for high-volume, rapidly evolving data like social feeds or IoT. It's not one vs the other — many systems use both."`,
        code: `-- SQL: Structured, relational
CREATE TABLE orders (
    id INT PRIMARY KEY,
    user_id INT REFERENCES users(id),
    total DECIMAL(10,2),
    status VARCHAR(20)
);

SELECT u.name, COUNT(o.id) as order_count
FROM users u
JOIN orders o ON u.id = o.user_id
GROUP BY u.name;

-- NoSQL (MongoDB-style document)
-- {
--   "_id": "abc123",
--   "name": "John",
--   "orders": [
--     { "total": 99.99, "status": "shipped" },
--     { "total": 45.00, "status": "delivered" }
--   ]
-- }

-- When to use what:
-- SQL:   Banking, ERP, e-commerce (relationships matter)
-- NoSQL: Real-time analytics, content mgmt, IoT
--        (flexibility + scale matter)`,
      },
      {
        title: "Primary Key & Foreign Key",
        tag: "Constraints",
        keyPoints: [
          "Primary key: uniquely identifies each row, cannot be NULL",
          "Foreign key: references primary key of another table",
          "Composite key: multiple columns forming the primary key",
          "Foreign keys enforce referential integrity",
        ],
        interview: `"A primary key uniquely identifies each row — it must be unique and non-null. A foreign key creates a relationship by referencing another table's primary key. This enforces referential integrity — you can't insert an order for a user that doesn't exist."`,
        code: `-- Primary Key
CREATE TABLE users (
    id INT PRIMARY KEY,        -- unique, not null
    email VARCHAR(255) UNIQUE  -- also unique, but not PK
);

-- Composite Primary Key
CREATE TABLE enrollments (
    student_id INT,
    course_id INT,
    enrolled_at DATE,
    PRIMARY KEY (student_id, course_id)  -- composite
);

-- Foreign Key with constraints
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE      -- delete orders if user deleted
        ON UPDATE CASCADE      -- update FK if PK changes
);

-- This will FAIL if user_id 999 doesn't exist:
INSERT INTO orders (user_id, total)
VALUES (999, 49.99);  -- ERROR: foreign key violation`,
      },
      {
        title: "Indexes",
        tag: "Performance",
        keyPoints: [
          "Speed up SELECT queries at the cost of slower writes",
          "B-Tree index: default, good for range queries and equality",
          "Hash index: O(1) equality lookups only",
          "Composite index: multi-column, leftmost prefix rule",
        ],
        interview: `"An index is like a book's index — instead of scanning every page, you jump to the right one. B-Tree indexes handle both equality and range queries. The trade-off: faster reads but slower writes because the index must be updated. Don't over-index — each index costs storage and write performance."`,
        code: `-- Create index on frequently queried column
CREATE INDEX idx_users_email ON users(email);

-- Composite index — order matters!
CREATE INDEX idx_orders_user_date
ON orders(user_id, created_at);

-- This query USES the composite index:
SELECT * FROM orders
WHERE user_id = 5 AND created_at > '2024-01-01';

-- This also uses it (leftmost prefix):
SELECT * FROM orders WHERE user_id = 5;

-- This does NOT use it (skips leftmost column):
SELECT * FROM orders WHERE created_at > '2024-01-01';

-- Unique index — enforces uniqueness
CREATE UNIQUE INDEX idx_unique_email
ON users(email);

-- Check if index is being used
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'john@example.com';
-- Look for "Index Scan" vs "Seq Scan"

-- Drop index
DROP INDEX idx_users_email;`,
      },
      {
        title: "Normalization",
        tag: "Design",
        keyPoints: [
          "1NF: atomic values, no repeating groups",
          "2NF: 1NF + no partial dependencies on composite keys",
          "3NF: 2NF + no transitive dependencies",
          "Denormalize strategically for read-heavy workloads",
        ],
        interview: `"Normalization reduces data redundancy. 1NF means atomic values. 2NF eliminates partial dependencies. 3NF removes transitive dependencies. In practice, I normalize for write-heavy systems and denormalize for read-heavy ones — it's a trade-off between consistency and performance."`,
        code: `-- UNNORMALIZED (bad)
-- | order_id | customer | items           |
-- | 1        | John     | iPhone, AirPods |

-- 1NF: Atomic values, no repeating groups
CREATE TABLE orders_1nf (
    order_id INT,
    customer VARCHAR(100),
    item VARCHAR(100),
    PRIMARY KEY (order_id, item)
);

-- 2NF: Remove partial dependencies
CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

CREATE TABLE orders_2nf (
    id INT PRIMARY KEY,
    customer_id INT REFERENCES customers(id)
);

CREATE TABLE order_items (
    order_id INT REFERENCES orders_2nf(id),
    item VARCHAR(100),
    price DECIMAL(10,2),
    PRIMARY KEY (order_id, item)
);

-- 3NF: Remove transitive dependencies
-- Bad: orders has zip_code AND city (city depends on zip)
-- Fix: separate address table`,
      },
      {
        title: "ACID Properties",
        tag: "Transactions",
        keyPoints: [
          "Atomicity: all or nothing — partial commits impossible",
          "Consistency: DB moves from one valid state to another",
          "Isolation: concurrent transactions don't interfere",
          "Durability: committed data survives crashes",
        ],
        interview: `"ACID guarantees reliable transactions. Atomicity means all-or-nothing. Consistency ensures valid state transitions. Isolation prevents concurrent transactions from interfering. Durability means committed data survives crashes. This is why banks use relational databases."`,
        code: `-- ACID in action: Bank Transfer
BEGIN TRANSACTION;

-- Debit from Account A
UPDATE accounts SET balance = balance - 500
WHERE id = 1 AND balance >= 500;

-- Credit to Account B
UPDATE accounts SET balance = balance + 500
WHERE id = 2;

-- If both succeed → COMMIT
COMMIT;

-- If anything fails → ROLLBACK (Atomicity)
-- ROLLBACK;

-- Isolation levels (weakest to strongest):
-- READ UNCOMMITTED  → dirty reads possible
-- READ COMMITTED    → no dirty reads (PostgreSQL default)
-- REPEATABLE READ   → no non-repeatable reads (MySQL default)
-- SERIALIZABLE      → full isolation, slowest

SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;`,
      },
      {
        title: "Joins",
        tag: "Combining Data",
        keyPoints: [
          "INNER JOIN: only matching rows from both tables",
          "LEFT JOIN: all from left + matching from right",
          "RIGHT JOIN: all from right + matching from left",
          "FULL OUTER JOIN: all rows from both tables",
        ],
        interview: `"INNER JOIN returns only matching rows. LEFT JOIN returns everything from the left table plus matches from the right — unmatched rows get NULLs. This is the most common in practice. FULL OUTER JOIN returns everything from both sides."`,
        code: `-- Sample data
-- users: {1, Alice}, {2, Bob}, {3, Charlie}
-- orders: {101, user_id=1}, {102, user_id=1}, {103, user_id=4}

-- INNER JOIN: only matches
SELECT u.name, o.id as order_id
FROM users u
INNER JOIN orders o ON u.id = o.user_id;
-- Alice, 101  |  Alice, 102
-- (Bob excluded — no orders)
-- (order 103 excluded — no user 4)

-- LEFT JOIN: all users + their orders
SELECT u.name, o.id as order_id
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Alice, 101  |  Alice, 102
-- Bob, NULL   |  Charlie, NULL

-- RIGHT JOIN: all orders + their users
SELECT u.name, o.id as order_id
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
-- Alice, 101  |  Alice, 102  |  NULL, 103

-- FULL OUTER JOIN: everything
SELECT u.name, o.id as order_id
FROM users u
FULL OUTER JOIN orders o ON u.id = o.user_id;

-- Self Join: employees with their managers
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`,
      },
      {
        title: "Isolation Levels",
        tag: "Concurrency",
        keyPoints: [
          "READ UNCOMMITTED: fastest, allows dirty reads",
          "READ COMMITTED: prevents dirty reads (PostgreSQL default)",
          "REPEATABLE READ: prevents non-repeatable reads (MySQL default)",
          "SERIALIZABLE: full isolation, highest consistency, lowest throughput",
        ],
        interview: `"Isolation levels control the trade-off between consistency and performance. READ COMMITTED prevents dirty reads — you only see committed data. REPEATABLE READ ensures you see the same data if you query twice in one transaction. SERIALIZABLE is the strictest — transactions behave as if they run one at a time."`,
        code: `-- Dirty Read (READ UNCOMMITTED)
-- T1: UPDATE accounts SET balance = 0 WHERE id = 1;
-- T2: SELECT balance FROM accounts WHERE id = 1; → sees 0
-- T1: ROLLBACK;
-- T2 read uncommitted data! (dirty read)

-- Non-Repeatable Read (READ COMMITTED)
-- T1: SELECT balance WHERE id = 1; → 1000
-- T2: UPDATE balance = 500 WHERE id = 1; COMMIT;
-- T1: SELECT balance WHERE id = 1; → 500 (changed!)

-- Phantom Read (REPEATABLE READ)
-- T1: SELECT * WHERE age > 25; → 5 rows
-- T2: INSERT INTO users (age) VALUES (30); COMMIT;
-- T1: SELECT * WHERE age > 25; → 6 rows (phantom!)

-- Set isolation level
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN;
SELECT * FROM inventory WHERE product_id = 1;
-- No other transaction can modify this row
UPDATE inventory SET qty = qty - 1 WHERE product_id = 1;
COMMIT;`,
      },
      {
        title: "CAP Theorem",
        tag: "Distributed Systems",
        keyPoints: [
          "Consistency: every read gets the latest write",
          "Availability: every request gets a response",
          "Partition Tolerance: system works despite network failures",
          "You can only guarantee 2 out of 3 during a partition",
        ],
        interview: `"CAP theorem says in a distributed system during a network partition, you must choose between consistency and availability. CP systems (like HBase) reject requests to stay consistent. AP systems (like Cassandra) serve stale data to stay available. In practice, it's about the trade-off during failures."`,
        code: `-- CAP Theorem — pick 2 during a partition
--
-- CP (Consistency + Partition Tolerance):
--   • HBase, MongoDB (with majority reads)
--   • Rejects requests if can't guarantee latest data
--   • Use for: banking, inventory
--
-- AP (Availability + Partition Tolerance):
--   • Cassandra, DynamoDB, CouchDB
--   • Always responds, may serve stale data
--   • Use for: social media feeds, analytics
--
-- CA (Consistency + Availability):
--   • Traditional RDBMS (single node)
--   • Not partition-tolerant — not truly distributed
--
-- Real-world example:
-- Shopping cart (AP): better to show slightly stale cart
--   than show an error page
-- Payment processing (CP): better to reject than
--   double-charge

-- Most systems are "eventually consistent" (AP)
-- with tunable consistency levels`,
      },
      {
        title: "Sharding",
        tag: "Horizontal Scaling",
        keyPoints: [
          "Split data across multiple database instances",
          "Shard key determines which shard stores each row",
          "Horizontal scaling — add more machines, not bigger ones",
          "Challenges: cross-shard queries, rebalancing, hotspots",
        ],
        interview: `"Sharding splits data horizontally across multiple databases. Each shard holds a subset of the data based on a shard key. It enables horizontal scaling — handling more data by adding machines. The challenge is choosing the right shard key to avoid hotspots and making cross-shard queries efficient."`,
        code: `-- Sharding by user_id (range-based)
-- Shard 1: user_id 1 - 1,000,000
-- Shard 2: user_id 1,000,001 - 2,000,000
-- Shard 3: user_id 2,000,001 - 3,000,000

-- Sharding by hash
-- shard = hash(user_id) % num_shards
-- Distributes evenly but range queries are hard

-- Application-level routing
-- int shard = userId % NUM_SHARDS;
-- DataSource ds = shardMap.get(shard);
-- ds.query("SELECT * FROM orders WHERE user_id = ?", userId);

-- Challenges:
-- 1. Cross-shard JOINs are expensive
-- 2. Auto-increment IDs need global coordination
-- 3. Rebalancing when adding shards
-- 4. Hot spots if shard key has skewed distribution

-- Shard key selection:
-- Good: user_id (even distribution)
-- Bad:  country (US shard overloaded)
-- Bad:  created_at (latest shard always hot)`,
      },
      {
        title: "Replication",
        tag: "High Availability",
        keyPoints: [
          "Copy data across multiple servers for redundancy",
          "Master-slave: one writer, multiple readers",
          "Master-master: multiple writers (conflict resolution needed)",
          "Synchronous vs asynchronous replication trade-offs",
        ],
        interview: `"Replication copies data across servers for high availability and read scaling. Master-slave is most common — writes go to the master, reads can go to any replica. The trade-off is replication lag — a read from a replica might return slightly stale data. Synchronous replication eliminates lag but adds write latency."`,
        code: `-- Master-Slave Replication
--
-- [Client] → WRITE → [Master]
--                       ↓ (replicate)
-- [Client] → READ  → [Slave 1]
-- [Client] → READ  → [Slave 2]
--
-- Benefits:
-- • Read scaling: distribute reads across replicas
-- • Failover: promote slave to master if master dies
-- • Backups: backup from slave without affecting master

-- Replication Lag
-- Master: UPDATE users SET name='Jane' WHERE id=1;
-- Slave (100ms later): still shows 'John'
-- Solution: read-after-write from master

-- Synchronous vs Async
-- Sync:  Master waits for slave ACK → consistent, slower
-- Async: Master doesn't wait → faster, risk of data loss
-- Semi-sync: Wait for at least 1 slave → compromise

-- PostgreSQL streaming replication config:
-- primary: wal_level = replica
-- replica: primary_conninfo = 'host=master port=5432'`,
      },
    ],
    trapQuestions: [
      {
        question: "When would you denormalize a database?",
        answer:
          "For read-heavy workloads where JOIN performance is a bottleneck. Common in analytics, dashboards, and caching layers. Accept data redundancy for query speed.",
      },
      {
        question: "Can you have both ACID and horizontal scaling?",
        answer:
          "It's very hard. Google Spanner does it with TrueTime. CockroachDB approximates it. Most systems sacrifice strict consistency for scalability (eventual consistency).",
      },
      {
        question: "INDEX on every column — good idea?",
        answer:
          "No. Each index slows writes and uses storage. Only index columns used in WHERE, JOIN, and ORDER BY clauses that are queried frequently.",
      },
      {
        question: "LEFT JOIN vs LEFT OUTER JOIN?",
        answer:
          "They're identical. OUTER is optional syntax. Same for RIGHT JOIN = RIGHT OUTER JOIN.",
      },
    ],
  },
  {
    id: "microservices",
    label: "Microservices & Spring Cloud",
    icon: "☁️",
    colorClass: "topic-micro",
    sections: [
      {
        title: "Microservices Architecture",
        tag: "Foundation",
        keyPoints: [
          "Services are independently deployable",
          "Each service focuses on one business capability",
          "Services communicate using REST APIs or message brokers",
          "Enables independent scaling",
        ],
        interview: `"Microservices architecture is a software design approach where a large application is divided into small independent services. Each service handles a specific business capability and communicates with other services using APIs or messaging."`,
        code: `// Instead of one monolithic e-commerce application:
// User Service       → handles user registration, login
// Order Service      → handles order creation, tracking
// Payment Service    → handles payment processing
// Inventory Service  → handles stock management

// Each service runs as its own Spring Boot application
@SpringBootApplication
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

@SpringBootApplication
public class OrderServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrderServiceApplication.class, args);
    }
}`,
      },
      {
        title: "Spring Cloud",
        tag: "Framework",
        keyPoints: [
          "Provides tools for building distributed systems",
          "Solves configuration management, service discovery, fault tolerance",
          "Built on top of Spring Boot",
          "Integrates with Netflix OSS, Resilience4j, and more",
        ],
        interview: `"Spring Cloud provides tools and frameworks for building distributed systems and microservices. It solves common microservice challenges such as configuration management, service discovery, and fault tolerance."`,
        code: `// Core Spring Cloud dependencies (pom.xml)
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>2023.0.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

// Key modules:
// spring-cloud-config       → centralized configuration
// spring-cloud-netflix      → Eureka service discovery
// spring-cloud-openfeign    → declarative REST clients
// spring-cloud-gateway      → API gateway
// spring-cloud-circuitbreaker → fault tolerance`,
      },
      {
        title: "Config Server",
        tag: "Configuration",
        keyPoints: [
          "Centralized configuration management for all microservices",
          "Configuration stored in Git repository",
          "Services fetch config at runtime",
          "Supports environment-specific profiles",
        ],
        interview: `"A Config Server provides centralized configuration management for microservices. Configuration files are stored in a central repository such as Git and fetched by services at runtime."`,
        code: `@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}

// application.properties
server.port=8888
spring.cloud.config.server.git.uri=https://github.com/config-repo`,
      },
      {
        title: "Config Client",
        tag: "Configuration",
        keyPoints: [
          "Microservice that retrieves config from Config Server",
          "Uses bootstrap.properties to locate Config Server",
          "Config loaded before application context starts",
          "Supports dynamic refresh with @RefreshScope",
        ],
        interview: `"A Config Client is a microservice that retrieves its configuration from the Config Server during startup. It connects using the Config Server URI defined in bootstrap.properties."`,
        code: `// bootstrap.properties
spring.application.name=user-service
spring.cloud.config.uri=http://localhost:8888

// The Config Server will serve:
// /{application}/{profile}
// e.g., /user-service/dev → user-service-dev.properties

@RefreshScope
@RestController
public class UserController {
    @Value("\${greeting.message}")
    private String message;

    @GetMapping("/greeting")
    public String greet() {
        return message;
    }
}`,
      },
      {
        title: "Service Discovery",
        tag: "Discovery",
        keyPoints: [
          "Allows services to dynamically locate each other",
          "No hardcoded IP addresses or ports",
          "Services register themselves on startup",
          "Clients query registry to find service instances",
        ],
        interview: `"Service discovery allows microservices to dynamically locate other services without hardcoding their IP addresses. Services register with a registry on startup and other services look them up by name."`,
        code: `// Without service discovery:
String url = "http://192.168.1.50:8081/users";  // hardcoded!

// With service discovery:
String url = "http://user-service/users";  // resolved dynamically

// Flow:
// 1. user-service starts → registers with Eureka
// 2. order-service needs user-service
// 3. order-service asks Eureka: "Where is user-service?"
// 4. Eureka returns: 192.168.1.50:8081
// 5. order-service calls that address`,
      },
      {
        title: "Eureka Server",
        tag: "Service Registry",
        keyPoints: [
          "Service registry that tracks all running microservices",
          "Services send periodic heartbeats",
          "Removes services that stop sending heartbeats",
          "Provides a dashboard to view registered services",
        ],
        interview: `"Eureka Server is a service registry that keeps track of all running microservices in the system. Each service registers itself and sends heartbeats to indicate it's alive."`,
        code: `@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}

// application.properties
server.port=8761
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false

// Dashboard available at http://localhost:8761`,
      },
      {
        title: "Eureka Client",
        tag: "Service Registry",
        keyPoints: [
          "Microservice that registers itself with Eureka Server",
          "Discovers other services by their registered name",
          "Sends heartbeats to maintain registration",
          "Automatically deregisters on shutdown",
        ],
        interview: `"A Eureka Client is a microservice that registers itself with the Eureka Server and discovers other services. It uses the service name instead of hardcoded URLs."`,
        code: `// application.properties
spring.application.name=user-service
eureka.client.service-url.defaultZone=http://localhost:8761/eureka

@SpringBootApplication
@EnableDiscoveryClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

// Now other services can call:
// http://user-service/users  → resolved by Eureka`,
      },
      {
        title: "OpenFeign",
        tag: "Communication",
        keyPoints: [
          "Declarative REST client for inter-service communication",
          "Define interface + annotations, Spring implements it",
          "Integrates with Eureka for service discovery",
          "Supports load balancing automatically",
        ],
        interview: `"OpenFeign is a declarative REST client used to simplify communication between microservices. You define an interface with annotations and Spring generates the implementation."`,
        code: `@FeignClient(name = "user-service")
public interface UserClient {

    @GetMapping("/users/{id}")
    User getUser(@PathVariable Long id);

    @PostMapping("/users")
    User createUser(@RequestBody User user);
}

// Usage in OrderService
@Service
public class OrderService {
    @Autowired
    private UserClient userClient;

    public Order createOrder(Long userId) {
        User user = userClient.getUser(userId);
        return new Order(user, LocalDateTime.now());
    }
}`,
      },
      {
        title: "Circuit Breaker",
        tag: "Fault Tolerance",
        keyPoints: [
          "Prevents repeated calls to a failing service",
          "Three states: Closed (normal), Open (failing), Half-Open (testing)",
          "Returns fallback responses when circuit is open",
          "Protects system from cascading failures",
        ],
        interview: `"A Circuit Breaker prevents repeated calls to a failing service. When failures exceed a threshold, the circuit opens and fallback responses are returned instead."`,
        code: `// Circuit Breaker States:
// CLOSED    → requests flow normally
// OPEN      → requests blocked, fallback returned
// HALF-OPEN → limited requests to test recovery

// Failure threshold reached → CLOSED → OPEN
// Wait duration expires     → OPEN → HALF-OPEN
// Test requests succeed     → HALF-OPEN → CLOSED
// Test requests fail        → HALF-OPEN → OPEN

// Without circuit breaker:
// Service A → Service B (down) → timeout → retry → timeout
// Thread pool exhausted → Service A also fails!

// With circuit breaker:
// Service A → Circuit Breaker → fallback response (instant)`,
      },
      {
        title: "Resilience4j",
        tag: "Fault Tolerance",
        keyPoints: [
          "Lightweight fault tolerance library for Spring Boot",
          "Implements Circuit Breaker, Retry, Rate Limiter, Bulkhead",
          "Annotation-driven with @CircuitBreaker, @Retry",
          "Replaces Netflix Hystrix (deprecated)",
        ],
        interview: `"Resilience4j is a lightweight fault tolerance library used with Spring Boot to implement patterns such as Circuit Breaker, Retry, Rate Limiter, and Bulkhead. It replaced the deprecated Netflix Hystrix."`,
        code: `@CircuitBreaker(name = "userService", fallbackMethod = "fallbackUser")
public User getUser(Long id) {
    return userClient.getUser(id);
}

public User fallbackUser(Long id, Exception ex) {
    return new User(id, "Fallback User");
}

// Retry pattern
@Retry(name = "userService", fallbackMethod = "fallbackUser")
public User getUserWithRetry(Long id) {
    return userClient.getUser(id);
}

// application.yml configuration
// resilience4j.circuitbreaker.instances.userService:
//   sliding-window-size: 10
//   failure-rate-threshold: 50
//   wait-duration-in-open-state: 5s`,
      },
      {
        title: "API Gateway",
        tag: "Routing",
        keyPoints: [
          "Single entry point for all client requests",
          "Routes requests to appropriate microservices",
          "Handles cross-cutting concerns: auth, rate limiting, logging",
          "Spring Cloud Gateway is the recommended implementation",
        ],
        interview: `"An API Gateway acts as the single entry point for all client requests and routes them to appropriate microservices. It handles authentication, rate limiting, and request aggregation."`,
        code: `@SpringBootApplication
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}

// application.yml
// spring.cloud.gateway.routes:
//   - id: user-service
//     uri: lb://user-service
//     predicates:
//       - Path=/api/users/**
//   - id: order-service
//     uri: lb://order-service
//     predicates:
//       - Path=/api/orders/**

// Client → Gateway (port 8080)
//   /api/users/1   → routed to user-service
//   /api/orders/5  → routed to order-service`,
      },
      {
        title: "Message Queues",
        tag: "Async Communication",
        keyPoints: [
          "Enable asynchronous communication between microservices",
          "Loose coupling — sender doesn't wait for receiver",
          "Improved scalability and resilience",
          "Common implementations: Kafka, RabbitMQ",
        ],
        interview: `"Message queues enable asynchronous communication between microservices. Instead of directly calling another service, a service sends a message to a queue which is processed by another service independently."`,
        code: `// Synchronous (tight coupling)
// Order Service → calls → Payment Service (blocks)

// Asynchronous with message queue (loose coupling)
// Order Service → publishes message → Queue
// Payment Service → consumes message → processes

// Benefits:
// 1. Order Service doesn't wait for Payment Service
// 2. If Payment Service is down, message stays in queue
// 3. Multiple consumers can process in parallel
// 4. Easy to add new consumers without changing producer`,
      },
      {
        title: "Apache Kafka",
        tag: "Event Streaming",
        keyPoints: [
          "Distributed event streaming platform",
          "High-throughput, fault-tolerant messaging",
          "Key concepts: Producer, Consumer, Topic, Broker",
          "Used for event-driven architectures and real-time pipelines",
        ],
        interview: `"Apache Kafka is a distributed event streaming platform used for high-throughput, fault-tolerant messaging between services. Producers publish events to topics, and multiple consumers can independently read from those topics."`,
        code: `// Kafka Producer
@Service
public class OrderProducer {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    public void publishOrder(Order order) {
        kafkaTemplate.send("orders", "Order Created: " + order.getId());
    }
}

// Kafka Consumer
@Service
public class InventoryConsumer {
    @KafkaListener(topics = "orders", groupId = "inventory-group")
    public void handleOrder(String message) {
        System.out.println("Updating inventory: " + message);
    }
}

// Flow: Order Service → Topic "orders" → Inventory Service
//                                       → Notification Service`,
      },
      {
        title: "RabbitMQ",
        tag: "Message Broker",
        keyPoints: [
          "Message broker for reliable service communication",
          "Key concepts: Producer, Queue, Consumer, Exchange",
          "Exchange routes messages to appropriate queues",
          "Supports multiple routing strategies (direct, topic, fanout)",
        ],
        interview: `"RabbitMQ is a message broker that enables reliable communication between services using queues and message routing. Producers send messages to an exchange which routes them to the appropriate queue."`,
        code: `// RabbitMQ Producer
@Service
public class OrderPublisher {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void publishOrder(Order order) {
        rabbitTemplate.convertAndSend(
            "order.exchange", "order.created", order
        );
    }
}

// RabbitMQ Consumer
@Service
public class NotificationConsumer {
    @RabbitListener(queues = "order.queue")
    public void handleOrder(Order order) {
        System.out.println("Sending email for: " + order.getId());
    }
}

// Flow: Producer → Exchange → Queue → Consumer`,
      },
      {
        title: "Event-Driven Architecture",
        tag: "Design Pattern",
        keyPoints: [
          "Services communicate by publishing and subscribing to events",
          "No direct synchronous API calls between services",
          "Enables loose coupling and independent scaling",
          "Works with Kafka, RabbitMQ, or other message brokers",
        ],
        interview: `"Event-driven architecture is a design pattern where services communicate by publishing and subscribing to events instead of direct synchronous API calls. Multiple services can react to the same event independently."`,
        code: `// Event-driven flow:
// Order Service publishes → OrderCreatedEvent

// Consumers react independently:
// Inventory Service → updates stock
// Notification Service → sends confirmation email
// Analytics Service → records metrics

@Service
public class OrderService {
    @Autowired
    private ApplicationEventPublisher publisher;

    public void createOrder(Order order) {
        orderRepository.save(order);
        publisher.publishEvent(new OrderCreatedEvent(order));
    }
}

@EventListener
public void onOrderCreated(OrderCreatedEvent event) {
    inventoryService.updateStock(event.getOrder());
}`,
      },
      {
        title: "Distributed Tracing",
        tag: "Observability",
        keyPoints: [
          "Tracks requests across multiple microservices",
          "Assigns unique trace IDs to each request flow",
          "Helps debug performance issues in distributed systems",
          "Common tools: Zipkin, Jaeger, Spring Cloud Sleuth",
        ],
        interview: `"Distributed tracing tracks a request as it flows through multiple microservices. It assigns a unique trace ID so developers can follow the entire request path and identify bottlenecks."`,
        code: `// Without tracing:
// "Why is the /orders endpoint slow?"
// Is it Order Service? User Service? Payment Service?

// With distributed tracing (Zipkin + Sleuth):
// Trace ID: abc-123 follows the request everywhere

// Gateway → Order Service → User Service → Payment Service
// abc-123    abc-123         abc-123        abc-123

// application.properties
spring.application.name=order-service
spring.sleuth.sampler.probability=1.0
spring.zipkin.base-url=http://localhost:9411

// Each log includes trace ID:
// [order-service, abc-123, span-456] Processing order...`,
      },
      {
        title: "Saga Pattern",
        tag: "Transactions",
        keyPoints: [
          "Manages distributed transactions across microservices",
          "Sequence of local transactions with compensating actions",
          "Two types: Choreography (event-based) and Orchestration (coordinator)",
          "Compensating transaction = rollback action",
        ],
        interview: `"Saga Pattern manages distributed transactions across microservices using a sequence of local transactions with compensating actions. If any step fails, previous steps are rolled back."`,
        code: `// Distributed transaction problem:
// Order → Payment → Inventory (all must succeed or rollback)
// Can't use @Transactional across services!

// Saga Pattern solution:
// Step 1: Order Service → creates order (PENDING)
// Step 2: Payment Service → processes payment
// Step 3: Inventory Service → updates stock

// If Payment fails → compensate → cancel order

@Service
public class OrderSagaOrchestrator {
    public void createOrderSaga(Order order) {
        try {
            orderService.createOrder(order);
            paymentService.processPayment(order);
            inventoryService.updateStock(order);
        } catch (PaymentException e) {
            orderService.cancelOrder(order);  // compensate
        }
    }
}`,
      },
      {
        title: "Load Balancing",
        tag: "Scalability",
        keyPoints: [
          "Distributes requests across multiple service instances",
          "Improves availability and performance",
          "Client-side: Spring Cloud LoadBalancer",
          "Server-side: Nginx, HAProxy, cloud load balancers",
        ],
        interview: `"Load balancing distributes incoming requests across multiple instances of a service to improve availability and performance. Spring Cloud LoadBalancer provides client-side load balancing with Eureka."`,
        code: `// Without load balancing:
// All requests → single instance (overloaded!)

// With load balancing:
// Request 1 → Instance A (port 8081)
// Request 2 → Instance B (port 8082)
// Request 3 → Instance C (port 8083)

// Spring Cloud LoadBalancer (client-side)
@LoadBalanced
@Bean
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// Automatically distributes calls across instances
restTemplate.getForObject(
    "http://user-service/users/1", User.class
);
// Eureka returns multiple instances, LoadBalancer picks one`,
      },
    ],
    trapQuestions: [
      {
        question: "Microservices vs Monolith — which is always better?",
        answer:
          "Neither. Monolith is simpler for small teams and early-stage products. Microservices add complexity (networking, distributed transactions, deployment). Choose based on scale and team size.",
      },
      {
        question: "Can microservices share a database?",
        answer:
          "Anti-pattern. Each service should own its data. Shared DB creates tight coupling. Use APIs or events to share data between services.",
      },
      {
        question: "What happens if Eureka Server goes down?",
        answer:
          "Services use cached registry. They can still communicate using last known addresses. But new services can't register until Eureka is back.",
      },
      {
        question: "Kafka vs RabbitMQ — when to use which?",
        answer:
          "Kafka for high-throughput event streaming and log aggregation. RabbitMQ for traditional message queuing with complex routing. Kafka retains messages, RabbitMQ deletes after consumption.",
      },
    ],
  },
  {
    id: "spring-security",
    label: "Spring Security Deep Dive",
    icon: "🛡️",
    colorClass: "topic-spring",
    sections: [
      {
        title: "Authentication vs Authorization",
        tag: "Core Concepts",
        keyPoints: [
          "Authentication = who you are (identity proof)",
          "Authorization = what you can access (permissions/roles)",
          "Authentication usually runs first, authorization runs after",
          "Both depend on SecurityContext set for the current request",
        ],
        interview: `"Authentication answers 'Who are you?' and Authorization answers 'What can you do?'. Example: login with username/password (authentication), then checking role ADMIN for /admin endpoint (authorization). In Spring Security, this context lives in SecurityContext and is reused during the request."`,
        code: `// Authentication object after successful login
Authentication auth = new UsernamePasswordAuthenticationToken(
    userDetails,
    null,
    userDetails.getAuthorities() // ROLE_USER, ROLE_ADMIN, etc.
);

SecurityContextHolder.getContext().setAuthentication(auth);

// Authorization examples
@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) { }

@PreAuthorize("hasAuthority('ORDER_READ')")
public List<Order> getOrders() { return List.of(); }`,
      },
      {
        title: "Request Flow: FilterChain → AuthenticationManager",
        tag: "Pipeline",
        keyPoints: [
          "Every request first enters SecurityFilterChain",
          "Authentication filter extracts credentials/token",
          "Filter creates Authentication and delegates to AuthenticationManager",
          "Manager delegates to provider(s) and returns authenticated token",
        ],
        interview: `"Think of Spring Security as an airport security line. Request enters SecurityFilterChain. A specific filter (like UsernamePasswordAuthenticationFilter or a JWT filter) extracts credentials and builds an Authentication token. That token is sent to AuthenticationManager, which asks providers to verify it. If valid, authenticated user is saved into SecurityContext; then authorization checks are applied."`,
        code: `Client Request
   -> DelegatingFilterProxy
   -> FilterChainProxy
   -> SecurityFilterChain (ordered filters)
        -> UsernamePasswordAuthenticationFilter (form login)
           OR JwtAuthenticationFilter (token login)
        -> AuthenticationManager.authenticate(authentication)
        -> ProviderManager
           -> DaoAuthenticationProvider / JwtAuthProvider / others
        -> SecurityContextHolder.setAuthentication(authenticated)
        -> AuthorizationFilter checks access rules
   -> Controller method

// If auth fails -> AuthenticationEntryPoint (401)
// If access denied -> AccessDeniedHandler (403)`,
      },
      {
        title: "Inside AuthenticationManager & ProviderManager",
        tag: "Internal Delegation",
        keyPoints: [
          "AuthenticationManager is an interface, ProviderManager is default implementation",
          "ProviderManager loops providers in order and picks the first that can authenticate",
          "Each AuthenticationProvider declares supported token type via supports(...)",
          "DaoAuthenticationProvider uses UserDetailsService + PasswordEncoder",
          "Can delegate to parent AuthenticationManager when local providers cannot authenticate",
        ],
        interview: `"ProviderManager is a chain-of-responsibility implementation. Step 1: it receives an unauthenticated token. Step 2: it iterates providers in configured order. Step 3: each provider is asked supports(tokenClass). Step 4: first supporting provider tries authenticate(). If success, authenticated token is returned with authorities and credentials usually erased. If provider throws AuthenticationException, the chain may continue or fail based on exception type. If no provider supports it, ProviderNotFoundException is thrown. A parent AuthenticationManager can be configured as fallback for multi-module setups."`,
        code: `@Bean
AuthenticationManager authenticationManager(AuthenticationConfiguration config)
        throws Exception {
    return config.getAuthenticationManager();
}

@Bean
UserDetailsService userDetailsService(UserRepository repo) {
    return username -> repo.findByEmail(username)
        .map(user -> new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            List.of(new SimpleGrantedAuthority("ROLE_USER"))
        ))
        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
}

@Bean
PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// Conceptual flow inside ProviderManager
Authentication authenticate(Authentication request) {
  for (AuthenticationProvider provider : providers) {
    if (!provider.supports(request.getClass())) continue;
    Authentication result = provider.authenticate(request);
    if (result != null) {
      eraseCredentialsIfNeeded(result);
      publishSuccessEvent(result);
      return result;
    }
  }
  if (parentManager != null) return parentManager.authenticate(request);
  throw new ProviderNotFoundException("No provider for token");
}

// Common providers you should know:
// DaoAuthenticationProvider        -> username/password + UserDetailsService
// JwtAuthenticationProvider(custom)-> JWT validation
// AnonymousAuthenticationProvider  -> anonymous auth token support
// RememberMeAuthenticationProvider -> remember-me token`,
      },
      {
        title: "AuthenticationProvider Deep Dive",
        tag: "Provider Internals",
        keyPoints: [
          "AuthenticationProvider has 2 methods: supports(...) and authenticate(...)",
          "supports(...) only declares compatibility; authenticate(...) does real verification",
          "Successful provider returns authenticated token with GrantedAuthority list",
          "Custom providers are best for OTP, API key, SSO assertions, and custom JWT rules",
        ],
        interview: `"AuthenticationProvider is the strategy that performs real credential verification. ProviderManager only orchestrates. In DaoAuthenticationProvider, authenticate() loads user using UserDetailsService, checks account state (locked/disabled/expired), compares password with PasswordEncoder.matches(), and then returns authenticated UsernamePasswordAuthenticationToken with roles."`,
        code: `public class ApiKeyAuthenticationToken extends AbstractAuthenticationToken {
  private final String apiKey;
  private final Object principal;

  public ApiKeyAuthenticationToken(String apiKey) {
    super(null);
    this.apiKey = apiKey;
    this.principal = null;
    setAuthenticated(false);
  }

  public ApiKeyAuthenticationToken(Object principal,
                   Collection<? extends GrantedAuthority> auths) {
    super(auths);
    this.apiKey = null;
    this.principal = principal;
    setAuthenticated(true);
  }

  @Override public Object getCredentials() { return apiKey; }
  @Override public Object getPrincipal() { return principal; }
}

@Component
public class ApiKeyAuthenticationProvider implements AuthenticationProvider {
  @Override
  public boolean supports(Class<?> authType) {
    return ApiKeyAuthenticationToken.class.isAssignableFrom(authType);
  }

  @Override
  public Authentication authenticate(Authentication auth) {
    String apiKey = (String) auth.getCredentials();
    if (!"secret-key-123".equals(apiKey)) {
      throw new BadCredentialsException("Invalid API key");
    }
    return new ApiKeyAuthenticationToken(
      "service-client",
      List.of(new SimpleGrantedAuthority("ROLE_SERVICE"))
    );
  }
}`,
      },
      {
        title: "Username/Password Login: Exact Runtime Steps",
        tag: "Execution Trace",
        keyPoints: [
          "Client submits credentials (JSON/form)",
          "Authentication filter builds unauthenticated token",
          "AuthenticationManager authenticates and returns authorities",
          "SecurityContext is set, then success handler/response is sent",
        ],
        interview: `"Runtime sequence: request hits login endpoint, filter reads username/password, creates UsernamePasswordAuthenticationToken (unauthenticated), delegates to manager, provider validates credentials, returns authenticated token with roles, then SecurityContext is updated. After that, downstream authorization sees user as logged in."`,
        code: `// Pseudo-flow inside authentication filter
String username = request.getParameter("username");
String password = request.getParameter("password");

Authentication input =
    new UsernamePasswordAuthenticationToken(username, password);

Authentication output = authenticationManager.authenticate(input);

SecurityContextHolder.getContext().setAuthentication(output);

// output.isAuthenticated() == true
// output.getAuthorities() contains roles/permissions`,
      },
      {
        title: "Authorization Phase: URL and Method Security",
        tag: "Access Control",
        keyPoints: [
          "URL rules are checked in filter chain first",
          "Method-level checks happen with @PreAuthorize/@PostAuthorize",
          "Authorities are evaluated from Authentication object",
          "Unauthorized = 401, forbidden = 403",
        ],
        interview: `"Authorization has two layers. First, request-level rules in HttpSecurity (like /admin/** requires ADMIN). Second, method-level rules using @PreAuthorize for business-layer protection. 401 means not authenticated; 403 means authenticated but lacking permission."`,
        code: `@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            );
        return http.build();
    }
}

@PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
public void approveRefund(Long orderId) { }`,
      },
      {
        title: "JWT Flow in Stateless APIs",
        tag: "Production Pattern",
        keyPoints: [
          "Login endpoint authenticates once and returns JWT",
          "Subsequent requests carry Bearer token",
          "Custom JWT filter validates token before UsernamePasswordAuthenticationFilter",
          "SessionCreationPolicy.STATELESS avoids server-side session storage",
        ],
        interview: `"For REST APIs, common flow is stateless JWT. User logs in once, gets token, then sends it in Authorization header for each request. JWT filter validates token, loads user authorities, and sets SecurityContext. No HttpSession is created on server."`,
        code: `@Bean
SecurityFilterChain filterChain(HttpSecurity http,
                                JwtAuthenticationFilter jwtFilter) throws Exception {
    http
        .csrf(csrf -> csrf.disable())
        .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    return http.build();
}

public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain)
            throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            // validate token, load user, set SecurityContext...
        }
        chain.doFilter(req, res);
    }
}`,
      },
      {
        title: "OAuth2 Grant Types (What to Use Today)",
        tag: "OAuth2",
        keyPoints: [
          "Authorization Code + PKCE is recommended for web/mobile/public clients",
          "Client Credentials is for service-to-service (no end-user)",
          "Refresh Token renews access tokens without forcing user re-login",
          "Resource Owner Password grant is legacy/deprecated and should be avoided",
        ],
        interview: `"Grant type means how a client gets an access token. For user-facing apps, use Authorization Code with PKCE. For machine-to-machine calls, use Client Credentials. Use Refresh Token to obtain new short-lived access tokens safely. Avoid password grant in modern systems because it forces clients to handle user passwords directly."`,
        code: `// 1) Authorization Code + PKCE (recommended)
// Browser/mobile -> Authorization Server /authorize
// User logs in + consents
// App gets authorization_code
// App exchanges code + code_verifier at /token -> access_token (+ refresh_token)

// 2) Client Credentials (service-to-service)
// service A sends client_id + client_secret to /token
// receives access_token representing the client app (not a user)

// 3) Refresh Token
// client sends refresh_token to /token
// receives new access_token (and possibly rotated refresh_token)

// 4) Device Code (for TV/CLI without browser)
// device gets user_code + verification_uri
// user authorizes on another device
// device polls /token until authorized

// Legacy/avoid:
// Resource Owner Password Credentials (password grant)
// Implicit grant (replaced by auth code + PKCE)

// Spring note:
// Spring Authorization Server supports modern OAuth2/OIDC flows.
// Spring Security Resource Server validates access tokens on APIs.`,
      },
      {
        title: "Session vs JWT vs OAuth2 (Quick Comparison)",
        tag: "Interview Table",
        keyPoints: [
          "Session = server-side login state (cookie holds session id), best for traditional MVC apps",
          "JWT = self-contained signed token, great for stateless APIs and microservices",
          "OAuth2 = authorization/delegation protocol, not a token format by itself",
          "OIDC (on top of OAuth2) adds identity/login; OAuth2 alone focuses on API authorization",
          "Revocation differs: session can be killed centrally; JWT usually needs short expiry + refresh rotation + blocklist",
          "Common real-world combo: OAuth2/OIDC login + JWT access token + refresh token",
        ],
        interview: `"These three are often confused because they appear together, but they solve different layers. Session and JWT are ways to carry authenticated state. OAuth2 is a delegation protocol for obtaining access to protected resources. If the interviewer asks 'which one is better?', answer: it depends on architecture. Session is simplest for monoliths and strict central logout. JWT scales better for distributed stateless APIs. OAuth2/OIDC is needed when you have SSO, social login, or third-party delegated access."`,
        code: `| Approach | What It Is | How It Works | State Location | Strength | Trade-off |
|---|---|---|---|---|---|
| Session | Server-managed auth state | User logs in -> server creates session -> browser sends session cookie each request | Server (memory/Redis/DB), cookie stores session id only | Easy logout/revocation, simple security model | Horizontal scaling needs shared session store or sticky sessions |
| JWT | Signed token with claims | User logs in -> server issues JWT -> client sends Bearer token -> API verifies signature | Mostly client-side token; server keeps minimal state | Stateless, API-friendly, microservice-ready | Token revocation and immediate logout are harder |
| OAuth2 | Delegated authorization framework | Client obtains access token from Authorization Server using a grant flow | Depends on implementation (often JWT access token) | Standard for SSO and third-party API delegation | More complexity (clients, scopes, consent, token lifecycle) |

// OIDC note:
// If your goal is "user login/identity", use OpenID Connect (OIDC) on top of OAuth2.

// Revocation strategy:
// Session: invalidate session id on server -> immediate logout.
// JWT: short-lived access token (5-15 min) + refresh token rotation + token blacklist for critical revokes.

// Decision cheat-sheet:
// 1) Server-rendered app + same backend + simple ops -> Session.
// 2) Mobile + SPA + API gateway + microservices -> JWT-based access tokens.
// 3) SSO, Google/Microsoft login, partner API delegation -> OAuth2/OIDC (Auth Code + PKCE).

// Spring Security mapping:
// Session: stateful config + formLogin()/oauth2Login().
// JWT API: SessionCreationPolicy.STATELESS + resource server/JWT filter.
// OAuth2/OIDC: spring-security-oauth2-client / Spring Authorization Server.`,
      },
      {
        title: "Failure Handling, SecurityContext, and Thread Flow",
        tag: "Advanced",
        keyPoints: [
          "AuthenticationException -> AuthenticationEntryPoint (usually 401)",
          "AccessDeniedException -> AccessDeniedHandler (usually 403)",
          "SecurityContextHolder is thread-local by default",
          "Context must be propagated explicitly in async executors",
        ],
        interview: `"Two common failure paths: unauthenticated request triggers AuthenticationEntryPoint (401), insufficient privileges triggers AccessDeniedHandler (403). SecurityContext is thread-bound (ThreadLocal), so when using @Async or custom executors you must propagate context to child threads if needed."`,
        code: `@Bean
SecurityFilterChain chain(HttpSecurity http) throws Exception {
    http.exceptionHandling(ex -> ex
        .authenticationEntryPoint((req, res, e) -> {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("Unauthorized");
        })
        .accessDeniedHandler((req, res, e) -> {
            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            res.getWriter().write("Forbidden");
        })
    );
    return http.build();
}

Authentication auth = SecurityContextHolder
    .getContext()
    .getAuthentication();`,
      },
    ],
    trapQuestions: [
      {
        question:
          "Does Spring Security call AuthenticationManager for every request in JWT mode?",
        answer:
          "Not always. Many JWT filters validate token directly and set SecurityContext. AuthenticationManager is typically used at login (username/password exchange).",
      },
      {
        question: "401 vs 403 in one line?",
        answer:
          "401 = not authenticated (or invalid token). 403 = authenticated but not authorized for this resource.",
      },
      {
        question:
          "Why is PasswordEncoder mandatory with DaoAuthenticationProvider?",
        answer:
          "Because stored passwords must be hashed (BCrypt/Argon2). Provider compares raw input against hashed value via PasswordEncoder.matches().",
      },
      {
        question: "FilterSecurityInterceptor vs AuthorizationFilter?",
        answer:
          "Both are authorization-related in different versions/styles. In modern Spring Security, AuthorizationFilter + AuthorizationManager is the common model.",
      },
      {
        question: "Which grant type should I choose by default for user login?",
        answer:
          "Authorization Code with PKCE. It is the modern secure default for browser, SPA, and mobile apps.",
      },
      {
        question: "Client Credentials vs Authorization Code in one line?",
        answer:
          "Client Credentials = app-to-app identity, no user. Authorization Code = user-delegated access with consent.",
      },
    ],
  },
  {
    id: "spring-ai",
    label: "Spring AI",
    icon: "🤖",
    colorClass: "topic-spring",
    sections: [
      {
        title: "What Is Spring AI?",
        tag: "Foundation",
        keyPoints: [
          "Spring AI provides abstractions for integrating LLMs in Spring apps",
          "Supports providers like OpenAI, Azure OpenAI, Anthropic, Ollama, and more",
          "Unifies chat, embedding, image, and moderation style APIs",
          "Lets you switch providers with minimal code changes",
        ],
        interview: `"Spring AI is a Spring ecosystem project that gives standard interfaces for LLM features such as chat completion and embeddings. It reduces provider-specific boilerplate and makes it easy to switch models while keeping Spring Boot style configuration and dependency injection."`,
        code: `// Why Spring AI?
// Without it: provider-specific SDK code everywhere
// With it: common abstractions + Spring configuration

// Typical building blocks:
// - ChatClient / ChatModel
// - EmbeddingModel
// - VectorStore
// - Advisors (memory, RAG, etc.)`,
      },
      {
        title: "Definitions: LLM, Model, Agent, Tool, Task",
        tag: "Must Know",
        keyPoints: [
          "LLM: a large language model trained on massive text to generate/understand language",
          "Model: a specific deployed variant (for example GPT-4o-mini, Claude Sonnet, Llama 3)",
          "Agent: an orchestration layer that plans steps and can call tools to complete goals",
          "Tool: an external function/system the model can invoke for real actions or data",
          "Task: a concrete objective given to model/agent, usually with constraints and expected output",
        ],
        interview: `"LLM is the broad AI capability, Model is the exact version you call in production, Agent is the decision-making workflow built around the model, Tool is a callable integration (API/DB/function), and Task is the specific job to complete. In simple words: model thinks, agent coordinates, tools act, task defines the goal."`,
        code: `// Quick mental map
// User Goal (Task)
//   -> handled by Agent
//        -> asks Model (LLM) for reasoning/next step
//        -> optionally calls Tool(s) for real data/actions
//        -> returns final answer/output

// Example in an interview assistant:
// Task: "Generate 10 Spring Boot interview questions"
// Model: gpt-4o-mini
// Agent: decides to first fetch user's level, then generate questions
// Tool: questionTemplateService.getByLevel("intermediate")
// Output: structured list of interview questions`,
      },
      {
        title: "Setup & Dependencies",
        tag: "Bootstrapping",
        keyPoints: [
          "Use Spring Boot starter for the provider you choose",
          "Keep API keys in environment variables, never hardcode",
          "Configure model name and base URL in application.properties/yml",
          "Use profiles to separate local/dev/prod model configs",
        ],
        interview: `"Setup is straightforward: add the Spring AI starter for your provider, configure API key and model in properties, then inject ChatClient or model beans. Keep keys in env variables and use different profiles for local and production."`,
        code: `<!-- pom.xml (example with OpenAI starter) -->
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>

// application.properties
spring.ai.openai.api-key=
spring.ai.openai.chat.options.model=gpt-4o-mini

// Better: inject from env
// spring.ai.openai.api-key=
// \${OPENAI_API_KEY}`,
      },
      {
        title: "ChatClient Basics",
        tag: "Core API",
        keyPoints: [
          "ChatClient is the easiest way to call LLM chat from Spring",
          "Use system/user prompts to control behavior",
          "You can request typed output mapping to DTOs",
          "Great for FAQ, summarization, and helper endpoints",
        ],
        interview: `"ChatClient provides a fluent API to send prompts and receive responses. In production, combine a strong system prompt, input validation, and timeouts/retries around model calls."`,
        code: `@RestController
@RequestMapping("/ai")
public class AiController {

    private final ChatClient chatClient;

    public AiController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/ask")
    public String ask(@RequestParam String q) {
        return chatClient.prompt()
                .system("You are a concise Java interview assistant")
                .user(q)
                .call()
                .content();
    }
}`,
      },
      {
        title: "Prompt Templates & Variables",
        tag: "Prompting",
        keyPoints: [
          "Use templates to avoid prompt duplication",
          "Inject variables safely rather than string concat",
          "Keep prompts short, explicit, and testable",
          "Version prompts like code for reliable behavior",
        ],
        interview: `"Prompt templates improve maintainability. Instead of building giant strings at runtime, keep reusable templates with placeholders and pass validated variables. This gives predictable outputs and easier debugging."`,
        code: `String template = """
You are a senior Java mentor.
Explain {topic} for {level} level in 5 bullet points.
""";

String response = chatClient.prompt()
        .user(u -> u.text(template)
                .param("topic", "ThreadLocal")
                .param("level", "intermediate"))
        .call()
        .content();`,
      },
      {
        title: "RAG with Vector Store",
        tag: "Knowledge Grounding",
        keyPoints: [
          "RAG grounds answers in your own documents",
          "Flow: ingest docs -> embed -> store vectors -> retrieve relevant chunks",
          "Reduces hallucinations by adding source context",
          "Use metadata filtering for tenant/domain isolation",
        ],
        interview: `"RAG is retrieval-augmented generation: first retrieve relevant context from a vector store, then send that context to the model in the prompt. This improves factual accuracy for domain-specific questions."`,
        code: `// Conceptual RAG flow
// 1) Ingest docs
// 2) Convert chunks to embeddings
// 3) Store in VectorStore
// 4) Retrieve top-k chunks for user question
// 5) Ask model with retrieved context

String answer = chatClient.prompt()
        .system("Answer only from provided context. If missing, say 'I don't know'.")
        .user("Question: Explain optimistic locking")
        .call()
        .content();`,
      },
      {
        title: "Tools / Function Calling",
        tag: "Actions",
        keyPoints: [
          "Models can call application functions via tools",
          "Use for weather, DB lookup, ticket status, internal APIs",
          "Always validate tool inputs before execution",
          "Log tool calls for audit and debugging",
        ],
        interview: `"Function calling allows the model to request deterministic operations from your backend. The model decides when a tool is needed, but your server executes and validates it securely."`,
        code: `@Service
public class UserLookupService {
    public String getUserPlan(String email) {
        // usually query DB or service
        return "PREMIUM";
    }
}

// Expose as callable tool in your AI flow and
// return structured result to the model for final answer.`,
      },
      {
        title: "Chat Memory",
        tag: "Conversation",
        keyPoints: [
          "Memory keeps context across turns in a conversation",
          "Use bounded memory to control token cost",
          "Persist by conversation/session id",
          "Do not store secrets or PII blindly in memory",
        ],
        interview: `"Without memory, each prompt is isolated. With chat memory, follow-up questions make sense because prior turns are included. In production, cap memory size and apply data retention policies."`,
        code: `// Example pattern:
// conversationId -> last N messages
// before model call: attach memory window
// after model call: append user + assistant messages

// Keep memory bounded to avoid token explosion.`,
      },
      {
        title: "Production Guardrails",
        tag: "Best Practices",
        keyPoints: [
          "Add timeouts, retries, and circuit breakers around model calls",
          "Use content filtering and output validation",
          "Track prompt/response metrics, latency, token usage, and errors",
          "Prefer fallback responses when provider is unavailable",
        ],
        interview: `"Treat LLM calls like external network dependencies. Add resilience patterns, sanitize inputs, validate outputs, and monitor token/latency costs. For critical flows, provide deterministic fallbacks."`,
        code: `// Suggested reliability checklist:
// 1) Timeout per model call
// 2) Retry with backoff for transient failures
// 3) Circuit breaker for provider outages
// 4) Structured logging for prompt id, latency, token usage
// 5) Fallback message when model call fails`,
      },
    ],
    trapQuestions: [
      {
        question: "Is Spring AI itself an LLM provider?",
        answer:
          "No. Spring AI is an integration framework/abstraction layer. Providers are OpenAI, Azure OpenAI, Anthropic, Ollama, etc.",
      },
      {
        question:
          "Does using JWT or stateless APIs mean AI calls are stateless too?",
        answer:
          "Not necessarily. API auth can be stateless while chat memory is still persisted per conversation for context.",
      },
      {
        question: "Can RAG eliminate hallucinations completely?",
        answer:
          "No. It reduces hallucinations by grounding context, but you still need prompt constraints and output validation.",
      },
      {
        question: "Should API keys be stored in source code for quick setup?",
        answer:
          "Never. Use environment variables or secret managers and keep keys out of repo and logs.",
      },
    ],
  },
];

export const cheatSheetItems = [
  {
    term: "Overloading",
    def: "Same class, same name, different params",
    colorClass: "topic-oop",
  },
  {
    term: "Overriding",
    def: "Parent-child, same sig, @Override",
    colorClass: "topic-interface",
  },
  {
    term: "Composition",
    def: "Strong HAS-A, child dies with parent",
    colorClass: "topic-oop",
  },
  {
    term: "Aggregation",
    def: "Weak HAS-A, child lives independently",
    colorClass: "topic-strings",
  },
  {
    term: "Abstract class",
    def: "Partial impl, can have fields",
    colorClass: "topic-solid",
  },
  {
    term: "Interface",
    def: "Contract only, multiple impl",
    colorClass: "topic-patterns",
  },
  {
    term: "Singleton",
    def: "Bill Pugh static inner class",
    colorClass: "topic-annotations",
  },
  {
    term: "String Pool",
    def: "Literals shared, new() bypasses it",
    colorClass: "topic-strings",
  },
  {
    term: "StringBuilder",
    def: "Mutable, fast, not thread-safe",
    colorClass: "topic-spring",
  },
  {
    term: "@Transactional",
    def: "Self-invocation = proxy bypassed!",
    colorClass: "topic-solid",
  },
  {
    term: "Circuit Breaker",
    def: "Fail fast + fallback = resilience",
    colorClass: "topic-micro",
  },
  {
    term: "AOP @Around",
    def: "Wraps entire method — most powerful",
    colorClass: "topic-patterns",
  },
  {
    term: "HashMap",
    def: "O(1) avg, hashCode + equals",
    colorClass: "topic-ds",
  },
  {
    term: "BST Inorder",
    def: "Left→Root→Right = sorted output",
    colorClass: "topic-ds",
  },
  {
    term: "ACID",
    def: "Atomic, Consistent, Isolated, Durable",
    colorClass: "topic-db",
  },
  {
    term: "LEFT JOIN",
    def: "All left rows + matching right",
    colorClass: "topic-db",
  },
  {
    term: "Eureka",
    def: "Service registry for discovery",
    colorClass: "topic-micro",
  },
  {
    term: "API Gateway",
    def: "Single entry point, routes requests",
    colorClass: "topic-micro",
  },
  {
    term: "Saga Pattern",
    def: "Distributed tx with compensations",
    colorClass: "topic-micro",
  },
  {
    term: "Kafka",
    def: "High-throughput event streaming",
    colorClass: "topic-micro",
  },
];
