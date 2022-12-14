# Trabajo Práctico 9 - Pruebas de unidad

## 1- Familiarizarse con algunos conceptos del framework JUnit:

| JUnit 4                            | Descripción                                                                                                                                                                                                                                                                                                                       |
|------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| import org.junit.*                 | Instrucción de importación para usar las siguientes anotaciones.                                                                                                                                                                                                                                                                  |
| @Test                              | Identifica un método como un método de prueba.                                                                                                                                                                                                                                                                                    |
| @Before                            | Ejecutado antes de cada prueba. Se utiliza para preparar el entorno de prueba (por ejemplo, leer datos de entrada, inicializar la clase).                                                                                                                                                                                         |
| @After                             | Ejecutado después de cada prueba. Se utiliza para limpiar el entorno de prueba (por ejemplo, eliminar datos temporales, restablecer los valores predeterminados). También puede ahorrar memoria limpiando costosas estructuras de memoria.                                                                                        |
| @BeforeClass                       | Ejecutado una vez, antes del comienzo de todas las pruebas. Se usa para realizar actividades intensivas de tiempo, por ejemplo, para conectarse a una base de datos. Los métodos marcados con esta anotación deben definirse static para que funcionen con JUnit.                                                                  |
| @AfterClass                        | Ejecutado una vez, después de que se hayan terminado todas las pruebas. Se utiliza para realizar actividades de limpieza, por ejemplo, para desconectarse de una base de datos. Los métodos anotados con esta anotación deben definirse static para que funcionen con JUnit.                                                       |
| @Ignore o @Ignore("Why disabled")  | Marca que la prueba debe ser deshabilitada. Esto es útil cuando se ha cambiado el código subyacente y el caso de prueba aún no se ha adaptado. O si el tiempo de ejecución de esta prueba es demasiado largo para ser incluido. Es una mejor práctica proporcionar la descripción opcional, por qué la prueba está deshabilitada. |
| @Test (expected = Exception.class) | Falla si el método no arroja la excepción nombrada.                                                                                                                                                                                                                                                                               |
| @Test(timeout=100)                 | Falla si el método tarda más de 100 milisegundos.                                                                                                                                                                                                                                                                                 |

| Declaración                                          | Descripción                                                                                                                                                                                                                    |
|------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fail ([mensaje])                                   | Deja que el método falle. Se puede usar para verificar que no se llegue a una determinada parte del código o para realizar una prueba de falla antes de implementar el código de prueba. El parámetro del mensaje es opcional. |
| assertTrue ([mensaje,] condición booleana)           | Comprueba que la condición booleana es verdadera.                                                                                                                                                                              |
| assertFalse ([mensaje,] condición booleana)          | Comprueba que la condición booleana es falsa.                                                                                                                                                                                  |
| assertEquals ([mensaje,] esperado, real)             | Comprueba que dos valores son iguales. Nota: para las matrices, la referencia no se verifica en el contenido de las matrices.                                                                                                  |
| assertEquals ([mensaje,] esperado, real, tolerancia) | Pruebe que los valores float o double coincidan. La tolerancia es el número de decimales que debe ser el mismo.                                                                                                                |
| assertNull (objeto [mensaje,])                       | Verifica que el objeto sea nulo.                                                                                                                                                                                               |
| assertNotNull (objeto [mensaje,])                    | Verifica que el objeto no sea nulo.                                                                                                                                                                                            |
| assertSame ([mensaje,] esperado, real)               | Comprueba que ambas variables se refieren al mismo objeto.                                                                                                                                                                     |
| assertNotSame ([mensaje,] esperado, real)            | Comprueba que ambas variables se refieren a diferentes objetos.                                                                                                                                                                |

## Utilizando Unit Test
- ¿En el proyecto spring-boot para qué está esta dependencia en el pom.xml?
~~~
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
~~~
> Esta dependencia incluye varias librerias para testear, como por ejemplo, Junit y Mockito.

- Analizar el codigo del Unit test:
~~~
public class HelloWorldServiceTest {
	@Test
	public void expectedMessage() {
		HelloWorldService helloWorldService = new HelloWorldService();
		assertEquals("Expected correct message","Spring boot says hello from a Docker container",helloWorldService.getHelloMessage());
	}
}
~~~
> Es un metodo que no devuelve nada e instancia un objeto de clase HelloWorldService y compara si el mensaje esperado que es "Spring boot says hello form a Docker container" es igual al que devuelve el metodo getHelloMessage de la clase helloWorldService. Si funciona bien el metodo, deberian ser iguales.

![Corriendo el unit test manual](../imgs/runTestCode.png)

## Familiarizarse con algunos conceptos de Mockito

Mockito es un framework de simulación popular que se puede usar junto con JUnit. Mockito permite crear y configurar objetos falsos. El uso de Mockito simplifica significativamente el desarrollo de pruebas para clases con dependencias externas.

Si se usa Mockito en las pruebas, normalmente:

1. Se burlan las dependencias externas e insertan los mocks en el código bajo prueba
2. Se ejecuta el código bajo prueba
3. Se valida que el código se ejecutó correctamente

- Analizar el codigo del test:
~~~
public class ExampleInfoContributorTest {

	@Test
	public void infoMap() {
		Info.Builder builder = mock(Info.Builder.class);
		
		ExampleInfoContributor exampleInfoContributor = new ExampleInfoContributor();
		exampleInfoContributor.contribute(builder);
		
		verify(builder).withDetail(any(),any());
	}
}
~~~
> Crea un mock de la clase info.builder que tiene la informacion de la aplicacion de spring boot y verifica si se llama al metodo build. Si se llama pasa el test sino no.

## Utilizando Mocks
- Agregar un unit test a la clase HelloWorldServiceTest
  - Cuando se llame por primera vez al método getHelloMessage retorne "Hola Hola"
  - Cuando se llame por segunda vez al método getHelloMessage retorne "Hello Hello"

Debemos agregar al pom.xml la dependencia de mockito
~~~
<!-- Mockito -->
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-test</artifactId>
	<scope>test</scope>
	<exclusions>
		<exclusion>
			<groupId>org.mockito</groupId>
			<artifactId>mockito-core</artifactId>
		</exclusion>
	</exclusions>
</dependency>
<dependency>
	<groupId>org.mockito</groupId>
	<artifactId>mockito-core</artifactId>
	<version>2.23.4</version>
</dependency>
~~~
Y el codigo del test es el siguiente
~~~
@Test
public void callingMethod() {
	HelloWorldService helloWorldService = mock(HelloWorldService.class);
	when(helloWorldService.getHelloMessage()).thenReturn("Hola Hola").thenReturn("Hello Hello");
	
	assertEquals("Hola Hola", "Hola Hola", helloWorldService.getHelloMessage());
	assertEquals("Hello Hello", "Hello Hello", helloWorldService.getHelloMessage());
}
~~~

Crear la siguiente clase AbstractTest:
~~~
package sample.actuator;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SampleActuatorApplication.class)
@WebAppConfiguration
public abstract class AbstractTest {
    protected MockMvc mvc;

    @Autowired
    WebApplicationContext webApplicationContext;

    protected void setUp() {
        mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
}
~~~

- Agregar esta otra clase también en el mismo directorio
~~~
package sample.actuator;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


public class SampleControllerTest extends AbstractTest {

    @Override
    @Before
    public void setUp() {
        super.setUp();
    }

    @Test
    public void testRootMessage() throws Exception {
        String uri = "/";
        MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
                .accept( MediaType.APPLICATION_JSON_VALUE)).andReturn();

        String content = mvcResult.getResponse().getContentAsString();
        int status = mvcResult.getResponse().getStatus();
        assertEquals(200, status);
        assertEquals("Expected correct message","{\"message\":\"Spring boot says hello from a Docker container\"}",content);
    }
}
~~~
> La clase abstracta crea un mock de un mvc para crear una app web.
> El controllerTest antes que nada llama al metodo setUp de la clase abstacta el cual inicializa el contexto de la web app.
> Luego corre el metodo testRootMessage que hace un get de la direccion /, guarda el response en un string, tambien guarda el status del get en otra variable.
> Realiza la comparacion esperada del status( debe ser 200) y del mensaje devuelto que debe ser (Spring boot says hello from a docker container)

## Capturar los unit tests como parte del proceso de CI/CD
- Hacer los cambios en Jenkins (o en la herramienta de CICD utilizada) si es necesario, para capturar los resultados de los unit tests y mostrarlos en la ejecución del build.

- Agrego la siguiente linea al pipeline para capturar los resultados del unitest
>  junit '**/target/surefire-reports/TEST-*.xml'

![Durante el build son corridos los test](../imgs/testRunEnBuild.png)

![resultados capturados del pipeline en Jenkins](../imgs/resBuildJenkinsArtifacts.png)

![resultados de los test en Jenkins](../imgs/resTestArtifactPipeline.png)