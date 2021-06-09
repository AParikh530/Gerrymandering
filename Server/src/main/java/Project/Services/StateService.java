package Project.Services;

import Project.Models.State;
import Project.Repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepo;

    public State getStateById(int id){
        Optional<State> result = stateRepo.findById(id);
        return result.orElseThrow(() -> new EntityNotFoundException("" + id));
    }

}
