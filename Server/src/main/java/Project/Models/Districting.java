package Project.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "DISTRICTINGS")
public class Districting {

    private Integer id;
    private List<District> districts;
    private String minority;
    private Integer mmDistricts;
    private Integer popThreshold;
    private Double compactness;
    private Double popEquality;
    private Double devB;
    private Double devBVap;
    private Double devA;
    private Double devAVap;
    private Double devH;
    private Double devHVap;
    private Double devArea;
    private Double devPop;
    private Double politicalFairness;
    private Boolean inc1;
    private Boolean inc2;
    private Boolean inc3;
    private Boolean inc4;
    private Boolean inc5;
    private Boolean inc6;
    private Boolean inc7;
    private Boolean inc8;
    private Boolean inc9;
    private Boolean inc10;
    private Boolean inc11;
    private Boolean inc12;
    private Boolean inc13;
    private Boolean inc14;

    public Districting() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    //@Column(name = "district")
    @OneToMany(mappedBy = "districting")
    public List<District> getDistricts() {
        return districts;
    }

    public void setDistricts(List<District> districts) {
        this.districts = districts;
    }

    @Column(name = "minority")
    public String getMinority() {
        return minority;
    }

    public void setMinority(String minority) {
        this.minority = minority;
    }

    @Column(name = "mm_district")
    public Integer getMmDistricts() {
        return mmDistricts;
    }

    public void setMmDistricts(Integer mmDistricts) {
        this.mmDistricts = mmDistricts;
    }

    @Column(name = "pop_threshold")
    public Integer getPopThreshold() {
        return popThreshold;
    }

    public void setPopThreshold(Integer popThreshold) {
        this.popThreshold = popThreshold;
    }

    @Column(name = "compactness")
    public Double getCompactness() {
        return compactness;
    }

    public void setCompactness(Double compactness) {
        this.compactness = compactness;
    }

    @Column(name = "pop_equality")
    public Double getPopEquality() {
        return popEquality;
    }

    public void setPopEquality(Double popEquality) {
        this.popEquality = popEquality;
    }

    @Column(name = "dev_b")
    public Double getDevB() {
        return devB;
    }

    public void setDevB(Double devB) {
        this.devB = devB;
    }

    @Column(name = "dev_bvap")
    public Double getDevBVap() {
        return devBVap;
    }

    public void setDevBVap(Double devBVap) {
        this.devBVap = devBVap;
    }

    @Column(name = "dev_a")
    public Double getDevA() {
        return devA;
    }

    public void setDevA(Double devA) {
        this.devA = devA;
    }

    @Column(name = "dev_avap")
    public Double getDevAVap() {
        return devAVap;
    }

    public void setDevAVap(Double devAVap) {
        this.devAVap = devAVap;
    }

    @Column(name = "dev_h")
    public Double getDevH() {
        return devH;
    }

    public void setDevH(Double devH) {
        this.devH = devH;
    }

    @Column(name = "dev_hvap")
    public Double getDevHVap() {
        return devHVap;
    }

    public void setDevHVap(Double devHVap) {
        this.devHVap = devHVap;
    }

    @Column(name = "dev_area")
    public Double getDevArea() {
        return devArea;
    }

    public void setDevArea(Double devArea) {
        this.devArea = devArea;
    }

    @Column(name = "dev_pop")
    public Double getDevPop() {
        return devPop;
    }

    public void setDevPop(Double devPop) {
        this.devPop = devPop;
    }

    @Column(name = "political_fairness")
    public Double getPoliticalFairness() {
        return politicalFairness;
    }

    public void setPoliticalFairness(Double politicalFairness) {
        this.politicalFairness = politicalFairness;
    }

    public Boolean getInc1() {
        return inc1;
    }

    public void setInc1(Boolean inc1) {
        this.inc1 = inc1;
    }

    public Boolean getInc2() {
        return inc2;
    }

    public void setInc2(Boolean inc2) {
        this.inc2 = inc2;
    }

    public Boolean getInc3() {
        return inc3;
    }

    public void setInc3(Boolean inc3) {
        this.inc3 = inc3;
    }

    public Boolean getInc4() {
        return inc4;
    }

    public void setInc4(Boolean inc4) {
        this.inc4 = inc4;
    }

    public Boolean getInc5() {
        return inc5;
    }

    public void setInc5(Boolean inc5) {
        this.inc5 = inc5;
    }

    public Boolean getInc6() {
        return inc6;
    }

    public void setInc6(Boolean inc6) {
        this.inc6 = inc6;
    }

    public Boolean getInc7() {
        return inc7;
    }

    public void setInc7(Boolean inc7) {
        this.inc7 = inc7;
    }

    public Boolean getInc8() {
        return inc8;
    }

    public void setInc8(Boolean inc8) {
        this.inc8 = inc8;
    }

    public Boolean getInc9() {
        return inc9;
    }

    public void setInc9(Boolean inc9) {
        this.inc9 = inc9;
    }

    public Boolean getInc10() {
        return inc10;
    }

    public void setInc10(Boolean inc10) {
        this.inc10 = inc10;
    }

    public Boolean getInc11() {
        return inc11;
    }

    public void setInc11(Boolean inc11) {
        this.inc11 = inc11;
    }

    public Boolean getInc12() {
        return inc12;
    }

    public void setInc12(Boolean inc12) {
        this.inc12 = inc12;
    }

    public Boolean getInc13() {
        return inc13;
    }

    public void setInc13(Boolean inc13) {
        this.inc13 = inc13;
    }

    public Boolean getInc14() {
        return inc14;
    }

    public void setInc14(Boolean inc14) {
        this.inc14 = inc14;
    }
}
