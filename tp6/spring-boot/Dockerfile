# FROM openjdk:8-jre-alpine

# EXPOSE 8080

# RUN mkdir /app

# COPY target/*.jar ./spring-boot-sample-actuator.jar

# ENV JAVA_OPTS="-Xms32m -Xmx128m"

# ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar spring-boot-sample-actuator.jar

# HEALTHCHECK --interval=1m --timeout=3s CMD wget -q -T 3 -s http://localhost:8090/actuator/health/ || exit 1
#----------------------------------------------------------------------------------------------------------
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_TOOL_CHAIN
COPY pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package

FROM openjdk:8-jre-alpine

ENV PORT=8080

EXPOSE 8080

RUN mkdir /app
COPY --from=MAVEN_TOOL_CHAIN /tmp/target/*.jar /app/spring-boot-application.jar

# ENV JAVA_OPTS="-Xms32m -Xmx128m"

# ENTRYPOINT exec java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -jar /app/spring-boot-application.jar

# HEALTHCHECK --interval=1m --timeout=3s CMD wget -q -T 3 -s http://localhost:8090/actuator/health/ || exit 1

CMD ["java", "-Xms32m", "-Xmx128m", "-jar", "-Dserver.port=${PORT}", "-Djava.security.egd=file:/dev/./urandom", "/app/spring-boot-application.jar"]