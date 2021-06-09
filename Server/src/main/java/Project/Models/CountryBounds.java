package Project.Models;

import javax.persistence.*;

@Entity
@Table(name = "COUNTRY_BOUNDS")
public class CountryBounds {

    private int id;
    private String geoJson;

    public CountryBounds() {
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
