import java.io*;
import java.io.BufferedReader;

package b12;


public class B12
{

    
    public static void main(String[] args) 
            throws Exception;
    {
    int s1 , s2, s3, s4; 
    BufferedReader br= new BufferReader(new InputStreamReader(System.in));
    System.out.println("Enter the numbers to add");
    s2=Integer.parseInt(br.readLine());
    s3=Integer.parseInt(br.readLine());
    s4=Integer.parseInt(br.readLine());
    s1 = s2 + s3 + s4;
    System.out.println(" S1 value = " + s1);
    }
    
}
