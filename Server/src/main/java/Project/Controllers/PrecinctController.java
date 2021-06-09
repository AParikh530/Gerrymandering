package Project.Controllers;

import Project.Models.Precinct;
import Project.Models.PrecinctResponse;
import Project.Services.PrecinctService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PrecinctController {

    @Autowired
    private PrecinctService precinctService;

    @GetMapping("/precincts")
    public ResponseEntity<List<PrecinctResponse>> getPrecincts(){
        List<PrecinctResponse> response = new ArrayList<>();
        Iterable<Precinct> precincts = precinctService.getPrecincts();
        for (Precinct precinct : precincts) {
            response.add(PrecinctResponse.fromEntity(precinct));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
