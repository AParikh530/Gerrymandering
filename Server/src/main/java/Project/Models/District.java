package Project.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "DISTRICTS")
public class District {

    private int id;
    private Districting districting;
    private int totpop;
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
    private List<Precinct> precincts;
    private DistrictBounds districtBounds;
    private String incumbent;
    private Integer corrIdBlack;
    private Integer corrIdBvap;
    private Integer corrIdHisp;
    private Integer corrIdHvap;
    private Integer corrIdAsian;
    private Integer corrIdAsianvap;


    public District() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @ManyToOne()
    @JoinColumn(name = "districting_id", nullable = false)
    public Districting getDistricting() {
        return districting;
    }

    public int getTotpop() {
        return totpop;
    }

    public void setTotpop(int totpop) {
        this.totpop = totpop;
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

    public void setDistricting(Districting districting) {
        this.districting = districting;
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

    @OneToOne
    @JoinColumn(name = "bound_id", referencedColumnName = "id")
    public DistrictBounds getDistrictBounds() {
        return districtBounds;
    }

    public void setDistrictBounds(DistrictBounds districtBounds) {
        this.districtBounds = districtBounds;
    }

    @OneToMany(mappedBy = "district")
    public List<Precinct> getPrecincts() {
        return precincts;
    }

    public void setPrecincts(List<Precinct> precincts) {
        this.precincts = precincts;
    }

    public String getIncumbent() {
        return incumbent;
    }

    public void setIncumbent(String incumbent) {
        this.incumbent = incumbent;
    }

    @Column(name = "corr_id_b")
    public Integer getCorrIdBlack() {
        return corrIdBlack;
    }

    public void setCorrIdBlack(Integer corrIdBlack) {
        this.corrIdBlack = corrIdBlack;
    }

    @Column(name = "corr_id_bvap")
    public Integer getCorrIdBvap() {
        return corrIdBvap;
    }

    public void setCorrIdBvap(Integer corrIdBvap) {
        this.corrIdBvap = corrIdBvap;
    }

    @Column(name = "corr_id_hisp")
    public Integer getCorrIdHisp() {
        return corrIdHisp;
    }

    public void setCorrIdHisp(Integer corrIdHisp) {
        this.corrIdHisp = corrIdHisp;
    }

    @Column(name = "corr_id_hvap")
    public Integer getCorrIdHvap() {
        return corrIdHvap;
    }

    public void setCorrIdHvap(Integer corrIdHvap) {
        this.corrIdHvap = corrIdHvap;
    }

    @Column(name = "corr_id_a")
    public Integer getCorrIdAsian() {
        return corrIdAsian;
    }

    public void setCorrIdAsian(Integer corrIdAsian) {
        this.corrIdAsian = corrIdAsian;
    }

    @Column(name = "corr_id_avap")
    public Integer getCorrIdAsianvap() {
        return corrIdAsianvap;
    }

    public void setCorrIdAsianvap(Integer corrIdAsianvap) {
        this.corrIdAsianvap = corrIdAsianvap;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        District district = (District) o;
        return id == district.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
