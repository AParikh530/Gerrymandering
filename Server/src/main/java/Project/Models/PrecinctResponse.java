package Project.Models;
import Project.Enums.Minority;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class PrecinctResponse {
    private Integer id;
    private Integer districtID;
    private Integer totalPop;
    private Integer vap;
    private Integer hisp;
    private Integer white;
    private Integer black;
    private Integer amin;
    private Integer asian;
    private Integer nhpi;
    private Integer hvap;
    private Integer wvap;
    private Integer bvap;
    private Integer aminvap;
    private Integer asianvap;
    private Integer nhpivap;
    private List<Integer> neighborIDs;
    private PrecinctBounds precinctBounds;

    public PrecinctResponse() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getDistrictID() {
        return districtID;
    }

    public void setDistrictID(Integer districtID) {
        this.districtID = districtID;
    }

    public Integer getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(Integer totalPop) {
        this.totalPop = totalPop;
    }

    public Integer getVap() {
        return vap;
    }

    public void setVap(Integer vap) {
        this.vap = vap;
    }

    public Integer getHisp() {
        return hisp;
    }

    public void setHisp(Integer hisp) {
        this.hisp = hisp;
    }

    public Integer getWhite() {
        return white;
    }

    public void setWhite(Integer white) {
        this.white = white;
    }

    public Integer getBlack() {
        return black;
    }

    public void setBlack(Integer black) {
        this.black = black;
    }

    public Integer getAmin() {
        return amin;
    }

    public void setAmin(Integer amin) {
        this.amin = amin;
    }

    public Integer getAsian() {
        return asian;
    }

    public void setAsian(Integer asian) {
        this.asian = asian;
    }

    public Integer getNhpi() {
        return nhpi;
    }

    public void setNhpi(Integer nhpi) {
        this.nhpi = nhpi;
    }

    public Integer getHvap() {
        return hvap;
    }

    public void setHvap(Integer hvap) {
        this.hvap = hvap;
    }

    public Integer getWvap() {
        return wvap;
    }

    public void setWvap(Integer wvap) {
        this.wvap = wvap;
    }

    public Integer getBvap() {
        return bvap;
    }

    public void setBvap(Integer bvap) {
        this.bvap = bvap;
    }

    public Integer getAminvap() {
        return aminvap;
    }

    public void setAminvap(Integer aminvap) {
        this.aminvap = aminvap;
    }

    public Integer getAsianvap() {
        return asianvap;
    }

    public void setAsianvap(Integer asianvap) {
        this.asianvap = asianvap;
    }

    public Integer getNhpivap() {
        return nhpivap;
    }

    public void setNhpivap(Integer nhpivap) {
        this.nhpivap = nhpivap;
    }

    public List<Integer> getNeighborIDs() {
        return neighborIDs;
    }

    public void setNeighborIDs(List<Integer> neighborIDs) {
        this.neighborIDs = neighborIDs;
    }

    public PrecinctBounds getPrecinctBounds() {
        return precinctBounds;
    }

    public void setPrecinctBounds(PrecinctBounds precinctBounds) {
        this.precinctBounds = precinctBounds;
    }

    public static PrecinctResponse fromEntity(Precinct precinct){
        PrecinctResponse response = new PrecinctResponse();
        response.id = precinct.getId();
        response.districtID = precinct.getDistrict().getId();
        response.totalPop = precinct.getTotalPop();
        response.vap = precinct.getVap();
        response.hisp = precinct.getHisp();
        response.white = precinct.getWhite();
        response.black = precinct.getBlack();
        response.amin = precinct.getAmin();
        response.asian = precinct.getAsian();
        response.nhpi = precinct.getNhpi();
        response.hvap = precinct.getHvap();
        response.wvap = precinct.getWvap();
        response.bvap = precinct.getBvap();
        response.aminvap = precinct.getAminvap();
        response.asianvap = precinct.getAsianvap();
        response.nhpivap = precinct.getNhpivap();
        response.neighborIDs = precinct.getNeighbors().stream().map(Precinct::getId).collect(Collectors.toList());
        response.precinctBounds = precinct.getPrecinctBounds();
        return response;
    }
}
