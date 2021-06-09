package Project.Models;

import javax.persistence.*;

@Entity
@Table(name = "PRECINCT_BOUNDS")
public class PrecinctBounds {

    private int id;
    private String geoJson;

    public PrecinctBounds() {
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
