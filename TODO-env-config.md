# TODO: Environment Configuration Setup

## Plan: Environment Configuration Setup

### **Phase 1: Basic Environment Setup**

#### 1.1 **Install Required Package**
- [ ] Install `dotenv` package: `npm install dotenv`

#### 1.2 **Create Environment Files**
- [ ] Create `.env` file for actual environment variables
- [ ] Create `.env.example` file for documentation
- [ ] Update `.gitignore` to exclude `.env` files

#### 1.3 **Move Database Credentials**
- [ ] Move hardcoded database credentials from `database.js` to `.env`
- [ ] Update database connection to use environment variables

### **Phase 2: Configuration Structure**

#### 2.1 **Environment Variables**
- [ ] Define database configuration variables:
  ```
  DB_USER=jairo
  DB_HOST=localhost
  DB_NAME=jairojobs
  DB_PASSWORD=jajnav5@
  DB_PORT=5432
  ```
- [ ] Add server configuration:
  ```
  PORT=3000
  NODE_ENV=development
  ```

#### 2.2 **Load Environment Variables**
- [ ] Add `require('dotenv').config()` at the top of `index.js`
- [ ] Update database connection to use `process.env` variables

### **Phase 3: Configuration Module**

#### 3.1 **Create Config File**
- [ ] Create `config.js` file for centralized configuration
- [ ] Export configuration object with environment variables
- [ ] Add default values for missing environment variables

#### 3.2 **Update Database Connection**
- [ ] Import config in `database.js`
- [ ] Use config object for database connection parameters

### **Phase 4: Environment-Specific Configs**

#### 4.1 **Development vs Production**
- [ ] Add environment-specific configurations
- [ ] Set different database URLs for different environments
- [ ] Configure logging levels based on environment

#### 4.2 **Validation**
- [ ] Add validation for required environment variables
- [ ] Provide helpful error messages for missing variables

---

## **Implementation Steps:**

### **Step 1: Install dotenv**
```bash
npm install dotenv
```

### **Step 2: Create .env file**
```env
# Database Configuration
DB_USER=jairo
DB_HOST=localhost
DB_NAME=jairojobs
DB_PASSWORD=jajnav5@
DB_PORT=5432

# Server Configuration
PORT=3000
NODE_ENV=development
```

### **Step 3: Create .env.example**
```env
# Database Configuration
DB_USER=your_username
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432

# Server Configuration
PORT=3000
NODE_ENV=development
```

### **Step 4: Update .gitignore**
```
node_modules/
.env
```

### **Step 5: Create config.js**
```javascript
require('dotenv').config();

module.exports = {
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  },
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  }
};
```

---

## **Benefits:**
- ✅ **Security**: No more hardcoded credentials in source code
- ✅ **Flexibility**: Easy to change configurations per environment
- ✅ **Documentation**: `.env.example` shows required variables
- ✅ **Version Control**: Sensitive data excluded from git
- ✅ **Deployment**: Easy to configure for different environments

---

## **Priority: HIGH**
This should be implemented immediately as it addresses the critical security vulnerability of hardcoded database credentials.

---

## **Current Status:**
- ✅ Variable naming inconsistencies fixed
- ✅ File renamed from `db_queries.js` to `database.js`
- 🔄 Environment configuration implementation pending

## **Notes:**
- This is the highest priority security improvement
- Should be implemented before any other security features
- Will make the application more secure and deployment-ready
- Consider implementing this before adding authentication features 