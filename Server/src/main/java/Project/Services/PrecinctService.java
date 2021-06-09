package Project.Services;

import Project.Models.Precinct;
import Project.Repositories.PrecinctRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrecinctService {

    @Autowired
    private PrecinctRepository precinctRepository;

    public Iterable<Precinct> getPrecincts(){
        return precinctRepository.findAll();
    }
}
