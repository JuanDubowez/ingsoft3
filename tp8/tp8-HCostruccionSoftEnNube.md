# Trabajo Práctico 8 - Herramientas de construcción de software en la nube

## Pros y Contras
- Listar los pros y contras de este tipo de herramientas
> ### Ventajas de las herramientas de CI en la nube
> - **Gran disponibilidad:** La gran ventaja que tiene es que nos permite tener gran disponibilidad sin tener que crear la infraestructura del servidor desde cero. Permite el acceso desde multiples puntos y no tenemos que preocuparnos por el mantenimiento del hardware.
> - **Costos bajo control**: No se necesita de una gran inversión inicial como seria en el caso de que nosotros tendriamos que diseñar e implementar la infraestructura desde cero y ademas sumado esto tenemos un mayor conocimiento de los gastos gracias a las predicciones de gastos mensuales que estas plataformas nos otorgan.
> - **Escalabilidad**: Nos otorga la posiblidad de escalar en capacidad ya sea de procesamiento y/o almacenamiento de una manera muy sencilla sin tener que preocuparnos por el hardware, es por esto que es muy efectiva para startups o empresas que experimentan un gran crecimiento de su sistema brindando eficiencia a el uso de los recursos ya que este se va a adaptar a los consumos realizados.
> - **Infraestructura como código**: Es un concepto que asume que toda la infraestructura de una aplicación debe ser tratada en la misma forma en que se trata al codigo de la aplicacion. La "contenerización" de la aplicación facilita la comunicación entre los contenedores y la infraestructura como codigo para automatizar la operación de la plataforma.
> ### Desventajas de las herramientas de CI en la nube
> - **La disponibilidad de los datos y ubicación no es para todos**: Esto puede limitar las posibilidades de ajustar el servidor a necesidades particulares como si se podría realizar en caso de que se diseñe e implemente la infraestructura a medida.
> - **Costos altos cuando se hace uso de gran cantidad de recursos**: Puede ser que con un gran tráfico el mantenimiento del mismo resulte en grandes costos comparandolo con una implementación propia a pesar de que est requiere de una gran inversión inicial.

## Configurando GitHub Actions
- Proyecto spring-boot, pero utilizando GitHub Actions.
- Codigo build.yml
~~~
# This is a basic workflow to help you get started with Actions

name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    paths:
    - 'tp6/spring-boot/**'
    branches: [ main ]
  pull_request:
    paths:
    - 'tp6/spring-boot/**'  
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Install Java JDK with maven
      - name: Set up JDK 8
        uses: actions/setup-java@v2
        with:
          java-version: '8'
          distribution: 'adopt'
          cache: maven
          
      # Compile the application
      - name: Build with Maven
        run: |
          cd tp6/spring-boot/
          mvn -B package --file pom.xml
~~~
- En GitHub, en el repositorio donde se encuentra la aplicación spring-boot, ir a la opción Actions y crear un nuevo workflow.

![githubActions](../imgs/githubActionsRun.png)

## Utilizando nuestros proyectos con Docker
- Repetir el ejercicio 7 del trabajo práctico trabajo práctico 7, pero utilizando GitHub Actions.
~~~
name: CI

# Controls when the workflow will run
on:
  # Triggers the workflow on push or pull request events but only for the master branch
  push:
    paths:
    - 'tp6/spring-boot/**'
    branches: [ main ]
  pull_request:
    paths:
    - 'tp6/spring-boot/**'  
    branches: [ main ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest
    
    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v2

      # Install Java JDK with maven
      - name: Set up JDK 8
        uses: actions/setup-java@v2
        with:
          java-version: '8'
          distribution: 'adopt'
          cache: maven
          
      # Compile the application
      - name: Build with Maven
        run: |
          cd tp6/spring-boot/
          mvn -B package --file pom.xml
     # define job to build and publish docker image
  
  build-and-push-docker-image:
    name: Build Docker image and push to repositories
    # run only when code is compiling 
    runs-on: ubuntu-latest

    # steps to perform in job
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      # setup Docker buld action
      - name: Set up Docker Buildx
        id: buildx
        uses: docker/setup-buildx-action@v2

      - name: Login to DockerHub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}
      
      - name: Build image and push to Docker Hub
        uses: docker/build-push-action@v2
        with:
          # relative path to the place where source code with Dockerfile is located
          context: ./tp6/spring-boot/
          # Note: tags has to be all lower-case
          tags: juandubowez/spring-boot-githubactions:latest 
          # build on feature branches, push only on master branch
          push: ${{ github.ref == 'refs/heads/main' }}

      - name: Image digest
        run: echo ${{ steps.docker_build.outputs.digest }}
~~~
- Generar secretos y los pasos necesarios para subir la imagen a Docker Hub.

![Generar secrets de Dockerhub para github actions](../imgs/GHActionsSecrets.png)

- El action corre correctamente y la imagen es creada y publicada en Dockerhub
  
![Imagen generada y publicada en Dockerhub con github actions](../imgs/DockerhubImgPushGHAction.png)