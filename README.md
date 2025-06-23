
# PromptCraft-AI

A full-stack application built with Spring Boot, Spring AI, React, and MySQL, integrating OpenAI's APIs (GPT, DALL-E, TTS) to provide AI-driven functionalities. The application allows users to chat with an AI, generate stock photos, create recipes based on ingredients, convert text responses to audio, and submit feedback on generated content. This project demonstrates proficiency in modern web development, AI integration, and database management, making it a standout addition to a developer's portfolio.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

The PromptCraft-AI offers a rich set of features that showcase full-stack development and AI integration:

### AI-Powered Chat

- Engage in natural language conversations using OpenAI's GPT model.
- Receive text responses and convert them to audio for accessibility.

### Stock Photo Generation

- Generate high-quality images using OpenAI's DALL-E model.
- Customize image size (e.g., 256x256, 512x512, 1024x1024) and quality (standard, HD).
- Submit feedback (ratings and comments) on generated images.

### Recipe Generation

- Create recipes based on user-provided ingredients using OpenAI's GPT model.
- Listen to recipes via text-to-speech and submit feedback on the output.

### Text-to-Speech (TTS)

- Convert chat responses and recipes into audio using OpenAI's TTS-1 model.
- Supports MP3 playback in the browser, enhancing accessibility.

### User Feedback System

- Rate and comment on generated images and recipes, with data stored in a MySQL database.
- Enables user interaction analysis and quality improvement.

### Responsive UI

- Built with React and styled with Tailwind CSS for a modern, mobile-friendly interface.
- Features conditional rendering, loading states, and error handling for a seamless experience.

### Robust Backend

- RESTful APIs with CORS handling for secure frontend-backend communication.
- MySQL integration with Spring Data JPA for persistent feedback storage.

## Tech Stack

### Backend

- Java 17: Programming language for robust backend development.
- Spring Boot 3.2.5: Framework for building RESTful APIs and microservices.
- Spring AI 0.8.1: Integration with OpenAI's GPT, DALL-E, and TTS models.
- Spring Data JPA: For database operations with MySQL.
- MySQL: Relational database for storing user feedback.
- Maven: Dependency management and build tool.

### Frontend

- React 18.2.0: JavaScript library for building interactive UIs.
- Tailwind CSS 3.4.1: Utility-first CSS framework for styling.
- Node.js & npm: Runtime and package manager for frontend development.

### Other Tools

- OpenAI API: Powers chat, image generation, and TTS functionalities.
- Git & GitHub: Version control and project hosting.

## Project Structure

```plaintext
PromptCraft-AI/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/promptcraft/
│   │   │   │   ├── PromptCraftAIApplication.java
│   │   │   │   ├── config/CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── ChatController.java
│   │   │   │   │   ├── ImageController.java
│   │   │   │   │   ├── RecipeController.java
│   │   │   │   │   ├── TTSController.java
│   │   │   │   │   └── FeedbackController.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── ChatService.java
│   │   │   │   │   ├── ImageService.java
│   │   │   │   │   ├── RecipeService.java
│   │   │   │   │   ├── TTSService.java
│   │   │   │   │   └── FeedbackService.java
│   │   │   │   ├── entity/Feedback.java
│   │   │   │   ├── repository/FeedbackRepository.java
│   │   │   │   └── model/
│   │   │   │       ├── ChatRequest.java
│   │   │   │       ├── ImageRequest.java
│   │   │   │       ├── RecipeRequest.java
│   │   │   │       ├── TTSRequest.java
│   │   │   │       └── FeedbackRequest.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql
│   ├── pom.xml
│   └── README.md
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatComponent.jsx
│   │   │   ├── ImageComponent.jsx
│   │   │   ├── RecipeComponent.jsx
│   │   │   └── FeedbackForm.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
└── README.md
```

## Prerequisites

- Java 17 (JDK)
- Maven (for backend build)
- Node.js and npm (for frontend development)
- MySQL (local or cloud instance)
- OpenAI API Key (obtain from OpenAI)
- Git (for cloning the repository)

## Setup Instructions

### Backend Setup

```bash
git clone https://github.com/your-username/PromptCraft-AI.git
cd PromptCraft-AI/backend
```

**Configure the OpenAI API key:**

Open `src/main/resources/application.properties`.

Set:

```properties
spring.ai.openai.api-key=your-openai-api-key
```

Or export it as an environment variable:

```bash
export OPENAI_API_KEY=your-openai-api-key
```

**Configure MySQL:**

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/promptcraft_db?createDatabaseIfNotExist=true
spring.datasource.username=your-username
spring.datasource.password=your-password
```

**Install dependencies and build the project:**

```bash
mvn clean install
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

Initialize Tailwind CSS (if not already configured):

```bash
npx tailwindcss init
```

### Database Setup

Ensure MySQL is running.

Create the database:

```sql
CREATE DATABASE promptcraft_db;
```

The `schema.sql` file will create the required tables on startup.

## Running the Application

**Start the Backend:**

```bash
cd backend
mvn spring-boot:run
```

Runs on: `http://localhost:8080`

**Start the Frontend:**

```bash
cd frontend
npm start
```

Runs on: `http://localhost:3000`

Access the application at: [http://localhost:3000](http://localhost:3000)

## Future Enhancements

- User Authentication with Spring Security + JWT
- Image Download as PNG/JPEG
- Admin dashboard for Feedback Analytics
- Multi-Voice TTS support
- Redis caching for optimization

## Contributing

Contributions are welcome!

```bash
# Fork the repository
# Create a feature branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push your branch
git push origin feature/your-feature
```

Open a pull request to merge.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

**Author**: [Your Name]  
**Email**: your.email@example.com  
**GitHub**: your-username  
**LinkedIn**: your-linkedin-profile

> This project was developed as part of a portfolio to demonstrate full-stack development skills with AI integration.  
> For OpenAI API pricing or details, visit: https://x.ai/api
