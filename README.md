# Incident Tracker

A full-stack incident management system built with Spring Boot and React for tracking and managing service incidents with different severity levels and statuses.

## Features

- 📊 Dashboard with real-time statistics
- 🔍 Advanced filtering and search capabilities
- 📄 Pagination support
- ✏️ Create and update incidents
- 🎯 Severity levels (SEV1-SEV4)
- 📈 Status tracking (OPEN, MITIGATED, RESOLVED)
- 🔄 Real-time updates

## Tech Stack

### Backend
- **Framework:** Spring Boot 4.0.2
- **Language:** Java 17
- **Database:** MySQL
- **Build Tool:** Maven
- **Key Dependencies:** 
  - Spring Data JPA
  - Spring Web MVC
  - Validation
  - Lombok

### Frontend
- **Framework:** React 19.2.0
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- MySQL 8.0+

## Setup Instructions

### Database Setup

1. Create a MySQL database:
```sql
CREATE DATABASE incident_tracker;
```

2. Configure database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/incident_tracker
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the project:
```bash
./mvnw clean install
```

3. Run the application:
```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8081`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Incidents

- `GET /api/incidents` - Get all incidents (with pagination, filtering, search)
- `GET /api/incidents/{id}` - Get incident by ID
- `POST /api/incidents` - Create new incident
- `PATCH /api/incidents/{id}` - Update incident
- `GET /api/incidents/stats` - Get dashboard statistics

### Query Parameters (for GET /api/incidents)

- `page` - Page number (default: 0)
- `size` - Page size (default: 5)
- `sortBy` - Sort field (default: createdAt)
- `direction` - Sort direction: asc/desc (default: desc)
- `serviceName` - Filter by service
- `severity` - Filter by severity (SEV1-SEV4)
- `status` - Filter by status (OPEN/MITIGATED/RESOLVED)
- `search` - Search in title and summary

## Project Structure

```
Internship-/
├── backend/                       # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/sahil/incidenttracker/demo/
│   │   │   │       ├── controller/     # REST Controllers
│   │   │   │       ├── dto/            # Data Transfer Objects
│   │   │   │       ├── entity/         # JPA Entities
│   │   │   │       ├── exception/      # Exception Handlers
│   │   │   │       ├── mapper/         # Entity-DTO Mappers
│   │   │   │       ├── repository/     # Data Access Layer
│   │   │   │       ├── service/        # Business Logic
│   │   │   │       └── specification/  # JPA Specifications
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/                      # Frontend (React)
    ├── src/
    │   ├── pages/                # React Pages
    │   │   ├── Dashboard.jsx
    │   │   ├── CreateIncident.jsx
    │   │   └── IncidentDetail.jsx
    │   ├── services/             # API Services
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Sample Data

The application automatically seeds 200 sample incidents on first startup for testing purposes.

## Screenshots

### Dashboard
View all incidents with filtering and pagination

### Create Incident
Form to create new incidents

### Incident Details
View and update individual incident status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Sahil Varyani

## Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- Tailwind CSS for the utility-first styling
