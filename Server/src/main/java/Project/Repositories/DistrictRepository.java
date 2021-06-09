package Project.Repositories;

import Project.Models.District;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DistrictRepository extends CrudRepository<District, Integer> {

    @Query(value = "SELECT black,bvap,hisp,hvap,asian,asianvap,totpop,vap FROM DISTRICTS WHERE districting_id = ?1", nativeQuery = true)
    List<List<Integer>> findByDistrictingId(int id);

}
