package Project.Models;

import java.util.List;

public class DistrictingBoundsResponse {

//    List<DistrictBounds> districtBounds;
//
//    public DistrictingBoundsResponse() {
//    }
//
//    public List<DistrictBounds> getDistrictBounds() {
//        return districtBounds;
//    }
//
//    public void setDistrictBounds(List<DistrictBounds> districtBounds) {
//        this.districtBounds = districtBounds;
//    }
//
//    public static DistrictingBoundsResponse fromEntity(List<DistrictBounds> districtBounds){
//        DistrictingBoundsResponse response = new DistrictingBoundsResponse();
//        response.setDistrictBounds(districtBounds);
//        return response;
//    }

    Integer id;
    DistrictBounds districtBounds;
    Integer totalPop;
    Integer blackPop;
    Integer hispPop;
    Integer asianPop;
    Integer corr_ids;

    public DistrictingBoundsResponse() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public DistrictBounds getDistrictBounds() {
        return districtBounds;
    }

    public void setDistrictBounds(DistrictBounds districtBounds) {
        this.districtBounds = districtBounds;
    }

    public Integer getTotalPop() {
        return totalPop;
    }

    public void setTotalPop(Integer totalPop) {
        this.totalPop = totalPop;
    }

    public Integer getBlackPop() {
        return blackPop;
    }

    public void setBlackPop(Integer blackPop) {
        this.blackPop = blackPop;
    }

    public Integer getHispPop() {
        return hispPop;
    }

    public void setHispPop(Integer hispPop) {
        this.hispPop = hispPop;
    }

    public Integer getAsianPop() {
        return asianPop;
    }

    public void setAsianPop(Integer asianPop) {
        this.asianPop = asianPop;
    }

    public Integer getCorr_ids() {
        return corr_ids;
    }

    public void setCorr_ids(Integer corr_ids) {
        this.corr_ids = corr_ids;
    }

    public static DistrictingBoundsResponse fromEntity(Integer id, DistrictBounds districtBounds, Integer totalPop, Integer blackPop, Integer hispPop, Integer asianPop, Integer corr_ids){
        DistrictingBoundsResponse response = new DistrictingBoundsResponse();
        response.setId(id);
        response.setDistrictBounds(districtBounds);
        response.setTotalPop(totalPop);
        response.setBlackPop(blackPop);
        response.setHispPop(hispPop);
        response.setAsianPop(asianPop);
        response.setCorr_ids(corr_ids);

        return response;
    }

}
