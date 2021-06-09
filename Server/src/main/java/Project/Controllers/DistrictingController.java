package Project.Controllers;

import Project.Models.District;
import Project.Models.DistrictBounds;
import Project.Models.DistrictingBoundsResponse;
import Project.Services.DistrictingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class DistrictingController {

    @Autowired
    private DistrictingService districtingService;

//    @GetMapping("/districting/{id}")
//    public ResponseEntity<DistrictingBoundsResponse> getDistrictingBounds(@PathVariable int id){
//        List<District> districts = districtingService.getDistrictingById(id);
//        return new ResponseEntity<>(DistrictingBoundsResponse.fromEntity(bounds), HttpStatus.OK);
//    }

    @GetMapping("/districting/{id}")
    public ResponseEntity<List<DistrictingBoundsResponse>> getDistrictingBounds(@PathVariable int id){
        List<District> districts = districtingService.getDistrictingById(id);
        List<DistrictingBoundsResponse> response = new ArrayList<>();
//        DistrictBounds districtBounds =
//        List<Integer> totalPop = new ArrayList<>();;
//        List<Integer> blackPop = new ArrayList<>();;
//        List<Integer> hispPop = new ArrayList<>();;
//        List<Integer> asianPop = new ArrayList<>();;
//        List<Integer> corr_ids = new ArrayList<>();;

        districts.forEach(district -> {
            response.add(DistrictingBoundsResponse.fromEntity(district.getId(), district.getDistrictBounds(), district.getTotpop(), district.getBlack(), district.getHisp(), district.getAsian(), district.getCorrIdBlack()));
//            districtBounds.add(district.getDistrictBounds());
//            totalPop.add(district.getTotpop());
//            blackPop.add(district.getBlack());
//            hispPop.add(district.getHisp());
//            asianPop.add(district.getAsian());
//            corr_ids.add(district.getCorrIdBlack());

        });

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
