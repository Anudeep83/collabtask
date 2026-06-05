# CollabTask 

CollabTask is a real-time collaborative Kanban board application that allows multiple users to manage tasks simultaneously with instant updates across connected clients.

The application was built using Next.js, TypeScript, MongoDB Atlas, Socket.IO, Docker, and AWS EC2. Users can create, update, delete, and move tasks across workflow stages while all changes are synchronized in real time.

## Live Demo

**Live Application:** http://13.62.179.50:3000

## Features

### Task Management

* Create tasks
* Update task details
* Delete tasks
* Move tasks between columns
* Track task status

### Kanban Board

* Todo
* In Progress
* Done

### Real-Time Collaboration

* Instant task updates
* Live board synchronization
* Multi-user collaboration
* Socket.IO powered realtime events

### Activity Tracking

* Task creation history
* Task updates history
* Board activity monitoring

### Modern UI

* Responsive design
* Clean user experience
* Fast interactions
* Optimized performance

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* CSS

### Backend

* Next.js API Routes
* Node.js

### Database

* MongoDB Atlas

### Real-Time Communication

* Socket.IO
* Socket.IO Client

### DevOps & Deployment

* Docker
* Docker Compose
* AWS EC2
* Ubuntu Server

---

## Architecture

```text
Users
  │
  ▼
Next.js Frontend (Port 3000)
  │
  ├──────────────► MongoDB Atlas
  │
  ▼
Socket.IO Server (Port 3001)
  │
  ▼
Real-Time Updates
```

---

## Project Structure

```text
collabtask/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── api/
│
├── public/
│
├── Dockerfile
├── socket.Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd collabtask
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Run Development Server

```bash
npm run dev
```

### Run Socket Server

```bash
node server.js
```

---

## Docker Setup

### Build Containers

```bash
docker compose build
```

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

---

## AWS Deployment

### Infrastructure

* AWS EC2 (Ubuntu 24.04)
* Docker
* Docker Compose
* MongoDB Atlas
* Elastic IP

### Deployment Process

1. Launch EC2 instance
2. Configure Security Groups
3. Install Docker
4. Clone repository
5. Configure environment variables
6. Build Docker containers
7. Start services
8. Connect MongoDB Atlas
9. Configure Socket.IO
10. Verify realtime synchronization

---

## Security Group Configuration

| Port | Purpose          |
| ---- | ---------------- |
| 22   | SSH              |
| 80   | HTTP             |
| 3000 | Next.js App      |
| 3001 | Socket.IO Server |

---

## Challenges Solved

### AWS Deployment

* EC2 setup
* Security group configuration
* SSH access configuration

### Docker

* Multi-container deployment
* Docker Compose orchestration

### Performance

* Memory optimization
* Swap configuration
* Storage expansion

### Real-Time Features

* Socket.IO integration
* Live synchronization
* Multi-user updates

---

## Future Improvements

* User authentication
* Team workspaces
* Notifications
* File attachments
* Comments system
* Task priorities
* Due dates
* Role-based access control
* Custom domains
* HTTPS support

---

## Learning Outcomes

This project demonstrates:

* Full Stack Development
* Next.js
* TypeScript
* MongoDB
* REST APIs
* Real-Time Applications
* Socket.IO
* Docker
* AWS EC2
* Linux Server Management
* Production Deployment

---

## Author

**Anudeep**

Frontend Developer

GitHub: https://github.com/Anudeep83/collabtask.git

LinkedIn: www.linkedin.com/in/anudeep-tirukkovalluri-a68713217

---
