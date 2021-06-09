package Project;

import Project.Controllers.StateController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(scanBasePackages = "Project")
public class App {

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

}