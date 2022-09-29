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
- En GitHub, en el repositorio donde se encuentra la aplicación spring-boot, ir a la opción Actions y crear un nuevo workflow.
- El nombre de archivo puede ser build.xml y tendrá un contenido similar al siguiente (el path donde se encuentra el código puede ser diferente):
