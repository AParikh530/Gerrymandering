package Project.Repositories;


import Project.Models.Districting;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface DistrictingRepository extends CrudRepository<Districting, Integer> {

    //@Query(value = "SELECT * FROM DISTRICTINGS WHERE id = ?1 AND compactness <= ?2", nativeQuery = true)
    @Query(value = "SELECT * FROM DISTRICTINGS d WHERE d.id = ?1 and d.compactness <= ?2", nativeQuery = true)
    Districting findByDistrictingCompactness(int id, double compactness);

    @Query(value = "SELECT inc1,inc2,inc3,inc4,inc5,inc6,inc7,inc8,inc9,inc10,inc11,inc12,inc13,inc14 FROM DISTRICTINGS WHERE id = ?1", nativeQuery = true)
    List<Boolean> incumbentsByDistrictingId(int id);

}
