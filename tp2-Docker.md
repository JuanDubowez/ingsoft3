# Docker
## Instalacion
- Para la instalación utilizo el comando: 
    
    sudo apt  install docker.io
    
- Probamos el funcionamiento corriendo un comando de prueba:
    ![img test instalacion de docker](/ingsoft3/imgs/testInstall_docker.png)

## Obtener imagenes 
- Obtener la imagen BusyBox con el siguiente comando:
  
    docker pull busybox

- Verificar qué versión y tamaño tiene la imagen bajada, obtener una lista de
imágenes locales con el siguiente comando:

    docker images
    
    ![img listado de imagenes bajadas](/ingsoft3/imgs/docker_images.png)

## Ejecutando contenedores
- Ejecutar un contenedor ingresando el siguiente comando:
  
    docker run busybox

    Al correr el comandpo, no se obtiene ningun resultado ya que no se esta ingresando ninguna instruccion mas.

- Ver contenedores ejecutados con el siguente comando:

    docker ps -a

    ![img listado de contenedores ejecutados](/ingsoft3/imgs/dockerps.png)
    Se obtiene el listado de ejecuciones de contenedores, mostrando el comando utilizado al correrlo.

## Ejecutando en modo interactivo
- Ejecutar un contenedor ingresando el siguiente comando:
    
    docker run -it busybox sh

- Ingresar comandos en la shell:
    ![img correr comando en modo interactivo](/ingsoft3/imgs/runinteractive.png)

## Borrando contenedores
- Para borrar un contenedor especifico ingresar el siguiente comando:
    
    docker rm nombre_o_id_del_contenedor

    ![img borrar contenedor ejecutado](/ingsoft3/imgs/dockerRm.png)

- Para eliminar todos los contenedores que no estan corriendo, ingresar el siguiente comando:
  
    docker rm $(docker ps -a -q -f status=exited)   
   
    ó
    
    docker container prune

     ![img borrar todos los contenedores ejecutados que no estan corriendo](/ingsoft3/imgs/dockerRmAll.png)

## Montando Volumenes
- Conectar un contenedor a un entorno exterior, con el siguiente comando:
  
    docker run -it -v C:\Users\misuario\Desktop:/var/escritorio busybox /bin/sh
    ![img montar volumen](/ingsoft3/imgs/montarVolume.png)

## Publicando Puertos
- Ejecutar una imagen con el siguiente comando:
    
    docker run -d daviey/nyan-cat-web
    ![img levantar puertos](/ingsoft3/imgs/levantarPuertos.png)

- El comando de arriba genera error porque no se levantó el puerto al ejecutar el contenedor, para ello ingresar el comando de la siguiente manera:

    docker run -d -p 80:80 daviey/nyan-cat-web
    ![img levantar puerto con docker](imgs/runLocalhost.png)

## Utilizando una Base de Datos
- Levantar una base de datos PostgreSQL:

    mkdir $HOME/.postgres
    
    docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -v $HOME/.postgres:/var/lib/postgresql/data -p 5432:5432 -d postgres:9.4

    ![img usar base de datos](imgs/usarBaseDato.png)

### Docker run y Docker exec
- En el comando **run** ingresamos un nombre al contenedor, seteamos variables de entorno (la contraseña)y creamos el volumen en un path determinado. Luego ingresamos el nombre de la imagen y exponemos el puerto.
- En el comando **exec** permite ingresar un comando en un contenedor corriendo, lo hacemos interactivo.