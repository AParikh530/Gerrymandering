package Project.Models;

import Project.Enums.Minority;

import javax.persistence.*;

@Entity
public class TotalPopulation {

    Minority minority;

    int population;

    Precinct precinct;

    public TotalPopulation() {
    }

    @Id
    @Enumerated(EnumType.STRING)
    public Minority getMinority() {
        return minority;
    }

    public void setMinority(Minority minority) {
        this.minority = minority;
    }

    public int getPopulation() {
        return population;
    }

    public void setPopulation(int population) {
        this.population = population;
    }

    @ManyToOne
    @JoinColumn(name = "precinct_id")
    public Precinct getPrecinct() {
        return precinct;
    }

    public void setPrecinct(Precinct precinct) {
        this.precinct = precinct;
    }
}
