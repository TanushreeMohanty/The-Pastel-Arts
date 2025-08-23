# The-Pastel-Arts
E commerce website

Perfect! We can integrate **Google login/signup using Firebase Authentication**. Here’s a clear plan for **“The Pastel Arts”** with that feature:

---

## **Website: The Pastel Arts** (with Google Login)

### **1. Homepage**

* Hero Section: “Welcome to The Pastel Arts”
* Navigation Menu: Home | Shop | About | Contact | **Login/Signup**
* Featured Products: Diary, Pen, Pencil (with **Add to Cart**)

---

### **2. Authentication**

* **Login/Signup Button** (top-right)
* **Google Sign-In** using Firebase Auth
* After login, show **user profile icon** instead of login/signup

---

### **3. Product Pages**

* Product Image, Name, Price, Description
* Quantity Selector + Add to Cart Button

---

### **4. Shopping Cart**

* Show selected items, quantity, total price
* Update or remove items
* Proceed to checkout

---

### **5. Checkout Page**

* Pre-fill Name & Email from Google account
* Collect Address & Phone
* Order Summary
* Payment Options: COD / Simple Payment Gateway
* Confirmation: “Thank you for shopping at The Pastel Arts!”

---

### **6. Admin Panel (Optional)**

* Add/Edit/Delete products
* View orders

---

### **Implementation Notes**

1. **Firebase Setup**

   * Create Firebase project → Enable Google Auth
   * Install Firebase SDK in React app

2. **React Components**

   * `Auth.jsx`: Google Login button and authentication logic
   * `Navbar.jsx`: Show Login/Signup or user profile based on auth state
   * `ProductList.jsx` & `ProductDetail.jsx`
   * `Cart.jsx` & `Checkout.jsx`

3. **Cart & User Data**

   * Store cart temporarily in React state or localStorage
   * Store orders in Firebase Firestore

---

💡 **Next Step:** I can provide a **ready-to-use React + Firebase code structure** for “The Pastel Arts” with:

* Google login/signup
* Homepage
* Product pages (Diary, Pen, Pencil)
* Cart & Checkout

Do you want me to create that code?
