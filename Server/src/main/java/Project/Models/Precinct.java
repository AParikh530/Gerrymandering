package Project.Models;

import Project.Enums.Minority;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name = "PRECINCTS")
public class Precinct {

    private int id;
    private District district;
    private int area;
    private int totalPop;
    private int vap;
    private int hisp;
    private int white;
    private int black;
    private int amin;
    private int asian;
    private int nhpi;
    private int hvap;
    private int wvap;
    private int bvap;
    private int aminvap;
    private int asianvap;
    private int nhpivap;
    private List<Precinct> neighbors;
//    private List<TotalPopulation> totalPopulation;
//    private Map<Minority, Integer> totalVAP;
//    private Map<Minority, Integer> citizenVAP;
    private PrecinctBounds precinctBounds;

    public Precinct() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "district_id", nullable = false)
    @JsonIgnoreProperties("district_id")
    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public int getArea() {
        return area;
    }

    public void setArea(int area) {
        this.area = area;
    }

    public int getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(int totalPop) {
        this.totalPop = totalPop;
    }

    public int getVap() {
        return vap;
    }

    public void setVap(int vap) {
        this.vap = vap;
    }

    public int getHisp() {
        return hisp;
    }

    public void setHisp(int hisp) {
        this.hisp = hisp;
    }

    public int getWhite() {
        return white;
    }

    public void setWhite(int white) {
        this.white = white;
    }

    public int getBlack() {
        return black;
    }

    public void setBlack(int black) {
        this.black = black;
    }

    public int getAmin() {
        return amin;
    }

    public void setAmin(int amin) {
        this.amin = amin;
    }

    public int getAsian() {
        return asian;
    }

    public void setAsian(int asian) {
        this.asian = asian;
    }

    public int getNhpi() {
        return nhpi;
    }

    public void setNhpi(int nhpi) {
        this.nhpi = nhpi;
    }

    public int getHvap() {
        return hvap;
    }

    public void setHvap(int hvap) {
        this.hvap = hvap;
    }

    public int getWvap() {
        return wvap;
    }

    public void setWvap(int wvap) {
        this.wvap = wvap;
    }

    public int getBvap() {
        return bvap;
    }

    public void setBvap(int bvap) {
        this.bvap = bvap;
    }

    public int getAminvap() {
        return aminvap;
    }

    public void setAminvap(int aminvap) {
        this.aminvap = aminvap;
    }

    public int getAsianvap() {
        return asianvap;
    }

    public void setAsianvap(int asianvap) {
        this.asianvap = asianvap;
    }

    public int getNhpivap() {
        return nhpivap;
    }

    public void setNhpivap(int nhpivap) {
        this.nhpivap = nhpivap;
    }

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "precinct_id")
    public List<Precinct> getNeighbors() {
        return neighbors;
    }

    public void setNeighbors(List<Precinct> neighbors) {
        this.neighbors = neighbors;
    }

//    @OneToMany(mappedBy = "precinct")
//    public List<TotalPopulation> getTotalPopulation() {
//        return totalPopulation;
//    }
//
//    public void setTotalPopulation(List<TotalPopulation> totalPopulation) {
//        this.totalPopulation = totalPopulation;
//    }

//    @Transient
//    public Map<Minority, Integer> getTotalVAP() {
//        return totalVAP;
//    }
//
//    public void setTotalVAP(Map<Minority, Integer> totalVAP) {
//        this.totalVAP = totalVAP;
//    }
//
//    @Transient
//    public Map<Minority, Integer> getCitizenVAP() {
//        return citizenVAP;
//    }
//
//    public void setCitizenVAP(Map<Minority, Integer> citizenVAP) {
//        this.citizenVAP = citizenVAP;
//    }

    @OneToOne
    @JoinColumn(name = "bound_id", referencedColumnName = "id")
    public PrecinctBounds getPrecinctBounds() {
        return precinctBounds;
    }

    public void setPrecinctBounds(PrecinctBounds precinctBounds) {
        this.precinctBounds = precinctBounds;
    }

    @Override
    public String toString() {
        return "Precinct{" +
                "id=" + id +
                ", district=" + district +
                ", totalPop=" + totalPop +
                ", vap=" + vap +
                ", hisp=" + hisp +
                ", white=" + white +
                ", black=" + black +
                ", amin=" + amin +
                ", asian=" + asian +
                ", nhpi=" + nhpi +
                ", hvap=" + hvap +
                ", wvap=" + wvap +
                ", bvap=" + bvap +
                ", aminvap=" + aminvap +
                ", asianvap=" + asianvap +
                ", nhpivap=" + nhpivap +
                ", neighbors=" + neighbors +
                ", precinctBounds=" + precinctBounds +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Precinct precinct = (Precinct) o;
        return id == precinct.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
