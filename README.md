# Assignment Management System

A role-based assignment management system designed for efficient and secure assignment handling. It includes user-friendly functionalities for both students and administrators.

---

## **Features**

### **1. Authentication**
- Secure user authentication system to protect user details.
- Passwords are stored securely using hashing algorithms (e.g., bcrypt).
- Session management using secure tokens (e.g., JWT).
- Support for "Forgot Password" functionality.

### **2. Register & Login**
- **Role-Based Access Control:** Different roles (e.g., Admin, User) with specific permissions.
- Easy registration for new users with role assignment.
- Login functionality tailored to user roles with dynamic redirection.
- Robust input validation to ensure security.

### **3. Upload Assignment**
- Users can upload assignments with necessary details like title, subject, and deadline.
- Supports file uploads (PDF, Word, etc.), stored securely.
- Uploaded assignments are marked as "Pending" for admin review.

### **4. Admin Functionalities**
#### **Get Assignments**
- View all submitted assignments with filters for users and statuses.

#### **Accept Assignments**
- Approve or reject assignments with user notifications.

#### **Delete Assignments**
- Delete outdated or irrelevant assignments with a confirmation prompt.

#### **Admin Dashboard**
- A clean and intuitive interface for managing assignments effectively.

---

## **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/assignment-management-system.git
