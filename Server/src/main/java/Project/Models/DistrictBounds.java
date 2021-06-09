package Project.Models;

import javax.persistence.*;
import java.io.File;
import java.io.FileReader;

@Entity
@Table(name = "DISTRICT_BOUNDS")
public class DistrictBounds {

    private int id;
    private String geoJson;

    public DistrictBounds() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "geo_json")
    public String getGeoJson() {
        return geoJson;
    }

    public void setGeoJson(String geoJson) {
        this.geoJson = geoJson;
    }
}
