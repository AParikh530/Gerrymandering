package Project.Services;

import Project.Models.District;
import Project.Models.DistrictBounds;
import Project.Models.Districting;
import Project.Repositories.DistrictingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictingService {

    @Autowired
    private DistrictingRepository districtingRepository;

//    public List<DistrictBounds> getDistrictingById(int id){
//        Optional<Districting> result = districtingRepository.findById(id);
//        Districting districting =  result.orElseThrow(() -> new EntityNotFoundException("" + id));
//        List<District> districts = districting.getDistricts();
//        return districts.stream().map(District::getDistrictBounds).collect(Collectors.toList());
//    }

    public List<District> getDistrictingById(int id){
        Optional<Districting> result = districtingRepository.findById(id);
        Districting districting = result.orElseThrow(() -> new EntityNotFoundException("" + id));
        return districting.getDistricts();
//        return districts.stream().map(District::getDistrictBounds).collect(Collectors.toList());
    }

}
