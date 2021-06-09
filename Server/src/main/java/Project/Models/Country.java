package Project.Models;

import javax.persistence.*;

@Entity
@Table(name = "COUNTRIES")
public class Country {

    private int id;
    private CountryBounds countryBounds;

    public Country() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @OneToOne
    @JoinColumn(name = "bound_id", referencedColumnName = "id")
    public CountryBounds getCountryBounds() {
        return countryBounds;
    }

    public void setCountryBounds(CountryBounds countryBounds) {
        this.countryBounds = countryBounds;
    }
}
