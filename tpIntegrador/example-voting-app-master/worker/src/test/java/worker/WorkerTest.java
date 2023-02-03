package worker;
import org.junit.Test;

import junit.framework.TestCase;

public class WorkerTest extends TestCase{
    @Test
    public void testGenerateInsertStatement() {
        String actual = Worker.generateInsertStatement("1", "a");
        String expected = "INSERT INTO votes (id, vote) VALUES ('1', 'a')";
        assertEquals(expected,actual);
    }

    @Test
    public void testGenerateUpdateStatement() {
        String actual = Worker.generateUpdateStatement("1", "a");
        String expected = "UPDATE votes SET vote = 'a' WHERE id = '1'";
        assertEquals(expected,actual);
    }
}