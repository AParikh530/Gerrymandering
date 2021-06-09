package Project.Services;

import Project.Models.Country;
import Project.Repositories.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public Country getCountryById(int id){
        Optional<Country> result = countryRepository.findById(id);
        return result.orElseThrow(() -> new EntityNotFoundException("" + id));
    }

}
