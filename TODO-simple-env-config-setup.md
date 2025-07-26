# TODO: Simple Environment Configuration Setup

## Simple Plan: Environment Configuration Setup

### **Step 1: Install Required Package**
- [ ] Install dotenv package
```bash
npm install dotenv
```

### **Step 2: Create Environment Files**

#### Create `.env` file:
- [ ] Create `.env` file with actual configuration
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

#### Create `.env.example` file:
- [ ] Create `.env.example` file for documentation
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

### **Step 3: Update .gitignore**
- [ ] Add `.env` to gitignore to exclude sensitive data
```
node_modules/
.env
```

### **Step 4: Create config.js**
- [ ] Create centralized configuration file
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

### **Step 5: Update database.js**
- [ ] Import config and use environment variables
```javascript
const config = require('./config');

const pool = new Pool(config.database);
```

### **Step 6: Update index.js**
- [ ] Load environment variables and use config
```javascript
require('dotenv').config();
const config = require('./config');

const PORT = config.server.port;
```

### **Step 7: Test Configuration**
- [ ] Test the application with new configuration
```bash
npm run dev
```

---

## **Files to Create/Modify:**

### **Create:**
- [ ] `.env` - Environment variables file
- [ ] `.env.example` - Environment template file
- [ ] `config.js` - Centralized configuration

### **Modify:**
- [ ] `database.js` - Use config for database connection
- [ ] `index.js` - Load environment variables
- [ ] `.gitignore` - Exclude .env file

### **Install:**
- [ ] `dotenv` package

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