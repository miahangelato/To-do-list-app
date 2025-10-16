# To-Do List Application - Project Report

## 📋 Project Overview

A full-stack task management application built with modern web technologies, featuring user authentication, calendar-based task organization, and a responsive design. The application is containerized using Docker for easy deployment and development.

---

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern UI framework
- **Vite 4.4.5** - Fast build tool and dev server
- **CSS3** - Custom styling with animations and responsive design
- **Axios** - HTTP client for API communication

### Backend
- **Node.js 20** - JavaScript runtime
- **Express.js** - Web application framework
- **Prisma ORM** - Database toolkit with type safety
- **PostgreSQL 16** - Relational database

### DevOps
- **Docker & Docker Compose** - Containerization
- **Nodemon** - Auto-restart development server

---

## ✨ Key Features

### 1. User Authentication System
- **User Registration**
  - Secure password confirmation
  - Email validation
  - Duplicate user detection
  
- **User Login**
  - JWT token-based authentication
  - Session persistence
  - Secure password handling

- **User Context Management**
  - Global authentication state
  - Protected routes
  - Automatic logout functionality

### 2. Task Management

#### Create Tasks
- Task title and description
- Due date and time selection
- Automatic user association
- Real-time validation

#### View Tasks
- **Calendar View**
  - Monthly calendar grid
  - Tasks displayed on due dates
  - Visual task indicators
  - Date navigation (previous/next month)
  - Current date highlighting

- **List View**
  - Complete task list
  - Task completion checkboxes
  - Delete functionality
  - Due date display

#### Update Tasks
- Mark tasks as complete/incomplete
- Edit task details
- Update due dates

#### Delete Tasks
- Single-click task removal
- Confirmation for data safety

### 3. Task Filtering System
- **Filter by Status**
  - All tasks
  - Active (incomplete) tasks
  - Completed tasks

- **Filter by Date**
  - Today's tasks
  - This week's tasks
  - This month's tasks
  - Custom date range

- **Real-time Filtering**
  - Instant results
  - Combined filter support

### 4. User Interface Features

#### Responsive Design
- Mobile-friendly layout (320px+)
- Tablet optimization (640px+)
- Desktop experience (1200px+)
- Adaptive navigation and spacing

#### Visual Elements
- Custom loading animations
- Gradient backgrounds
- Hover effects and transitions
- Animated task cards
- Modern color scheme

#### Layout
- Two-column design (sidebar + main content)
- Fixed sidebar for filters and form
- Scrollable main content area
- Collapsible sections for mobile

### 5. Calendar Integration
- **Monthly Calendar Display**
  - 7-day week grid
  - Day of month numbers
  - Task count per day
  - Color-coded task indicators

- **Date Management**
  - Timezone handling
  - Local date normalization
  - Due date comparison logic

### 6. Custom Components

#### Loader Component
- Animated spinner rings
- Gradient text effects
- Clipboard icon animation
- Professional loading screen

#### Authentication Forms
- **SignInForm**: Standalone login component
- **SignUpForm**: Standalone registration component
- Form validation
- Error handling
- Password visibility toggle

---

## 🗂️ Project Structure

```
SOFTDEV3-FINAL-1/
├── BE/my-express-app/              # Backend application
│   ├── src/
│   │   ├── controllers/            # Request handlers
│   │   │   ├── TaskController.js   # Task CRUD operations
│   │   │   └── UserController.js   # User auth operations
│   │   ├── routes/                 # API routes
│   │   │   ├── TaskRouter.js
│   │   │   └── UserRouter.js
│   │   └── server.js               # Express server setup
│   ├── prisma/
│   │   ├── schema.prisma           # Database schema
│   │   └── migrations/             # Database migrations
│   ├── package.json
│   └── .env                        # Environment variables
│
├── FE/my-react-app/                # Frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/               # Authentication components
│   │   │   │   ├── SignInForm.jsx
│   │   │   │   └── SignUpForm.jsx
│   │   │   ├── Todo/               # Task components
│   │   │   │   ├── TaskFilter.jsx
│   │   │   │   ├── TaskForm.jsx
│   │   │   │   ├── TaskList.jsx    # Calendar view
│   │   │   │   └── TaskListView.jsx # List view
│   │   │   └── Loader.jsx          # Loading component
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx       # Authentication page
│   │   │   └── TodoPage.jsx        # Main application page
│   │   ├── context/
│   │   │   └── UserContext.jsx     # Global user state
│   │   ├── hooks/
│   │   │   └── useAuth.js          # Authentication hook
│   │   ├── api/
│   │   │   ├── task.js             # Task API calls
│   │   │   └── user.js             # User API calls
│   │   └── styles/                 # CSS stylesheets
│   └── package.json
│
└── docker-compose.yml              # Docker orchestration
```

---

## 🔧 Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  tasks     Task[]
}
```

### Task Model
```prisma
model Task {
  id          Int       @id @default(autoincrement())
  title       String
  description String?
  completed   Boolean   @default(false)
  dueDate     DateTime?
  createdAt   DateTime  @default(now())
  userId      Int
  user        User      @relation(fields: [userId], references: [id])
}
```

---

## 🐳 Docker Configuration

### Services

#### Database Service
- **Image**: PostgreSQL 16
- **Port**: 5431:5432 (avoids local conflicts)
- **Credentials**: 
  - User: postgres
  - Password: 123ediwow
  - Database: softdev3-final
- **Features**: 
  - Persistent volume storage
  - Auto-restart policy

#### Backend Service
- **Image**: Node.js 20
- **Port**: 3000
- **Features**:
  - Auto npm install
  - Prisma migrations on startup
  - Hot reload with Nodemon
  - Environment variable injection

#### Frontend Service
- **Image**: Node.js 20
- **Port**: 5173
- **Features**:
  - Auto npm install
  - Vite dev server
  - Hot module replacement
  - Network accessible (--host flag)

---

## 🚀 How to Run

### Prerequisites
- Docker Desktop installed
- Ports 3000, 5173, 5431 available

### Starting the Application

```powershell
# Navigate to project directory
cd M:\SOFTDEV3-FINAL-1

# Start all services
docker-compose up -d

# Check service status
docker ps

# View logs
docker-compose logs -f
```

### Stopping the Application

```powershell
# Stop all services
docker-compose down

# Stop and remove volumes (clean slate)
docker-compose down -v
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Database**: localhost:5431

---

## 📊 API Endpoints

### User Authentication
- `POST /api/users/register` - Create new user account
- `POST /api/users/login` - Authenticate user and get token

### Task Management
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle task completion

---

## 🎨 User Interface Highlights

### Login Page
- Centered authentication form
- Animated background effects
- Toggle between sign-in and sign-up
- Responsive design with gradient overlays

### Todo Page
- **Header**: Navigation with user info and logout
- **Sidebar** (380px):
  - Task filters (status, date range)
  - New task creation form
  - Sticky positioning
- **Main Content**:
  - View toggle (Calendar/List)
  - Calendar grid with task display
  - List view with checkboxes
  - Responsive width (max 1600px)

### Visual Design
- Purple/blue gradient theme
- Smooth transitions and hover effects
- Card-based layout
- Custom scrollbars
- Loading animations

---

## 🔒 Security Features

- Password hashing (backend)
- JWT token authentication
- Protected API routes
- User-specific data isolation
- Environment variable management
- CORS configuration

---

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 640px
  - Single column layout
  - Stacked components
  - Reduced padding
  
- **Tablet**: 640px - 1200px
  - Adjusted spacing
  - Optimized grid layouts
  
- **Desktop**: 1200px+
  - Full two-column layout
  - Maximum content width: 1600px
  - Enhanced spacing

---

## ✅ Production Ready Features

- No console logs (clean production code)
- Error handling throughout application
- Graceful loading states
- Form validation
- Responsive design across devices
- Docker containerization for easy deployment
- Database migrations managed
- Environment-based configuration

---

## 🎯 Use Cases

1. **Personal Task Management**
   - Daily to-do lists
   - Project planning
   - Deadline tracking

2. **Team Collaboration**
   - Individual user accounts
   - Task assignment
   - Progress monitoring

3. **Academic Planning**
   - Assignment tracking
   - Exam preparation
   - Study schedule

4. **Project Management**
   - Milestone tracking
   - Deliverable management
   - Timeline visualization

---

## 📈 Future Enhancements

- Task priority levels
- Task categories/tags
- Recurring tasks
- Task attachments
- Email notifications
- Dark mode toggle
- Search functionality
- Task sharing between users
- Mobile application (React Native)
- Export tasks (PDF, CSV)

---

## 📝 Development Notes

### Code Quality
- Clean, modular architecture
- Separated concerns (components, API, context)
- Reusable components
- Consistent naming conventions
- No console logs in production code

### Performance
- Optimized database queries with Prisma
- Efficient state management
- Lazy loading potential
- Minimal re-renders
- Fast Vite build system

### Maintainability
- Clear folder structure
- Component-based architecture
- Environment configuration
- Docker containerization
- Database migration system

---

## 👥 User Workflow

1. **Registration**: User creates account with email and password
2. **Login**: User authenticates and receives token
3. **Dashboard**: User sees calendar view of tasks
4. **Create Task**: User adds new task with title, description, and due date
5. **View Tasks**: User switches between calendar and list view
6. **Filter Tasks**: User applies filters to find specific tasks
7. **Complete Task**: User marks tasks as done
8. **Delete Task**: User removes completed or unwanted tasks
9. **Logout**: User ends session securely

---

## 🏆 Project Achievements

✅ Full-stack application with modern technologies
✅ Dockerized for consistent development environment
✅ User authentication and authorization
✅ Complete CRUD operations for tasks
✅ Calendar integration with timezone handling
✅ Responsive design across all devices
✅ Clean, production-ready code
✅ Proper error handling and validation
✅ Professional UI/UX with animations
✅ Database migrations and schema management

---

## 📞 Technical Support

### Troubleshooting

**Port Conflicts**
```powershell
# Check what's using a port
netstat -ano | findstr :3000

# Kill process by PID
Stop-Process -Id <PID> -Force
```

**Container Issues**
```powershell
# View container logs
docker logs <container_name>

# Restart specific service
docker-compose restart backend

# Rebuild containers
docker-compose up -d --build
```

**Database Reset**
```powershell
# Reset database (WARNING: deletes all data)
docker-compose down -v
docker-compose up -d
```

---

## 📄 License & Credits

**Project**: To-Do List Application
**Repository**: To-do-list-app
**Owner**: miahangelato
**Branch**: master
**Date**: October 2025

---

**End of Report**
