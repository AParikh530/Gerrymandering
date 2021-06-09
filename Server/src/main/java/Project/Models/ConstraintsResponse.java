package Project.Models;

import java.util.List;
import java.util.Optional;

public class ConstraintsResponse {

    int afterEqualPopThres;
    int afterMinority;
    int afterCompactness;
    int afterIncuments;
    int remaining;
    List<Integer> ids;
    List<Double[]> info;


    public ConstraintsResponse() {
    }

    public int getAfterEqualPopThres() {
        return afterEqualPopThres;
    }

    public void setAfterEqualPopThres(int afterEqualPopThres) {
        this.afterEqualPopThres = afterEqualPopThres;
    }

    public int getAfterMinority() {
        return afterMinority;
    }

    public void setAfterMinority(int afterMinority) {
        this.afterMinority = afterMinority;
    }

    public int getAfterCompactness() {
        return afterCompactness;
    }

    public void setAfterCompactness(int afterCompactness) {
        this.afterCompactness = afterCompactness;
    }

    public int getAfterIncuments() {
        return afterIncuments;
    }

    public void setAfterIncuments(int afterIncuments) {
        this.afterIncuments = afterIncuments;
    }

    public int getRemaining() {
        return remaining;
    }

    public void setRemaining(int remaining) {
        this.remaining = remaining;
    }

    public List<Integer> getIds() {
        return ids;
    }

    public void setIds(List<Integer> ids) {
        this.ids = ids;
    }

    public List<Double[]> getInfo() {
        return info;
    }

    public void setInfo(List<Double[]> info) {
        this.info = info;
    }

    public static ConstraintsResponse fromEntity(int afterEqualPopThres, int afterMinority, int afterCompactness, int afterIncuments, int remaining, List<Integer> ids, List<Double[]> info){
        ConstraintsResponse cr = new ConstraintsResponse();
        cr.setAfterEqualPopThres(afterEqualPopThres);
        cr.setAfterMinority(afterMinority);
        cr.setAfterCompactness(afterCompactness);
        cr.setAfterIncuments(afterIncuments);
        cr.setRemaining(remaining);
        cr.setIds(ids);
        cr.setInfo(info);

        return cr;
    }
}
