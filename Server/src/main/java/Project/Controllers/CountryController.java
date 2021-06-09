package Project.Controllers;

import Project.Models.Country;
import Project.Services.CountryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@CrossOrigin(origins = "*")
@RestController
public class CountryController {

    @Autowired
    private CountryService countryService;

    @GetMapping("/US")
    public String getUSBounds(){
        Country country = countryService.getCountryById(1);
        ObjectMapper obj = new ObjectMapper();
        String jsonStr = "";
        try {
            jsonStr = obj.writeValueAsString(country);
        }
        catch (IOException e){
            e.printStackTrace();
        }

        return jsonStr;
    }
}
