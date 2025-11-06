# --- STAGE 1: BUILD THE APPLICATION (The Builder Stage) ---
# Use a robust, lightweight OpenJDK image for building
FROM maven:3.9-eclipse-temurin-21 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml file first to cache dependencies
COPY pom.xml .

# Download dependencies (this step is cached unless pom.xml changes)
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Package the application into a single executable JAR file
RUN mvn clean install -DskipTests

# --- STAGE 2: CREATE THE FINAL, LIGHTWEIGHT IMAGE (The Runtime Stage) ---
# Use a minimal JRE (Java Runtime Environment) image for the final app
FROM eclipse-temurin:21-jre-alpine

# Set the working directory
WORKDIR /app

# Expose the default port for Spring Boot
EXPOSE 8080

# Copy the executable JAR file from the 'build' stage
# The name 'backend-0.0.1-SNAPSHOT.jar' is derived from your pom.xml artifactId and version
COPY --from=build /app/target/noteM.jar noteM.jar

# This is the command that runs your application when the container starts
ENTRYPOINT ["java", "-jar", "noteM.jar"]