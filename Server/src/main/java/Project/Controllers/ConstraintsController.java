package Project.Controllers;

import Project.Models.ConstraintsResponse;
import Project.Models.DistrictBounds;
import Project.Models.Districting;
import Project.Services.ConstraintsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
public class ConstraintsController {

    @Autowired
    private ConstraintsService constraintsService = new ConstraintsService();

    @GetMapping("/constraints/{popType}/{minority}/{numDistricts}/{threshold}/{compactness}/{equalPopThres}/{incumbents}")
    public ResponseEntity<ConstraintsResponse> getConstrainedJob(@PathVariable String popType, @PathVariable String minority, @PathVariable int numDistricts, @PathVariable int threshold,
                                                                 @PathVariable double compactness, @PathVariable double equalPopThres, @PathVariable List<String> incumbents){
        Object[] districtingsInfo = constraintsService.getConstrainedDistrictings(popType, minority, numDistricts, threshold, compactness, equalPopThres, incumbents);
        int afterEqualPopThres = (int)districtingsInfo[0];
        int afterMinority = (int)districtingsInfo[1];
        int afterCompactness = (int)districtingsInfo[2];
        int afterIncumbents = (int)districtingsInfo[3];
        int remaining = (int)districtingsInfo[4];
        List<Integer> ids = (List<Integer>)districtingsInfo[5];
        List<Double[]> info = (List<Double[]>)districtingsInfo[6];
//        List<Optional<Districting>> districtings = (List<Optional<Districting>>)districtingsInfo[3];
//        List<Integer> districtingIds = new ArrayList<>();
//        List<List<Double>> districtingInfo = new ArrayList<>();

//        for(int i = 0; i < districtings.size(); i++){
//            Optional<Districting> curr = districtings.get(i);
//            districtingIds.add(curr.get().getId());
//
//            List<Double> vals = new ArrayList<>();
//            vals.add(curr.get().getCompactness());
//            vals.add(curr.get().getDevArea());
//            vals.add(curr.get().getDevPop());
//            districtingInfo.add(vals);
//        }

        return new ResponseEntity<>(ConstraintsResponse.fromEntity(afterEqualPopThres, afterMinority, afterCompactness, afterIncumbents, remaining, ids, info), HttpStatus.OK);

    }
}
