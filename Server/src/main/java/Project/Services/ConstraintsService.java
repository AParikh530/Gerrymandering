package Project.Services;

import Project.Models.District;
import Project.Models.Districting;
import Project.Repositories.DistrictRepository;
import Project.Repositories.DistrictingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConstraintsService {

    @Autowired
    private DistrictingRepository districtingRepository;

    @Autowired
    private DistrictRepository districtRepository;

    public Object[] getConstrainedDistrictings(String popType, String minority, int numDistricts, int threshold, double compactness, double equalPopThres, List<String> incumbents){
        Object[] districtingsInfo = new Object[7];
        List<Optional<Districting>> districtings = new ArrayList<>();
        List<Integer> ids = new ArrayList<>();
        List<Double[]> info = new ArrayList<>();
        int numDistrictings = (int)districtingRepository.count()-1;
        float thres = (float)threshold/100;
        int afterMinority = 0;
        int afterIncumbents = 0;
        int afterCompactness = 0;
        int afterEqualPopThres = 0;
        int remaining = 0;

        // For total population
        if(popType.equals("tp")){
            // Check which districtings meet MM criteria
            for(int i = 2; i <= numDistrictings; i++){
                List<List<Integer>> pops = districtRepository.findByDistrictingId(i);
                int mostPopulous = 0;
                int leastPopulous = 10000000;
                int leastTotPop = 5000;

                int mmDistricts = 0;
                for(List<Integer> pop: pops){
                    if(minority.equals("black")){
                        float blackPopRatio = (float)pop.get(0)/pop.get(6);
                        if(blackPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(6) < leastTotPop)
                            leastTotPop = pop.get(6);

                    }
                    else if(minority.equals("hispanic")){
                        float hispPopRatio = (float)pop.get(2)/pop.get(6);
                        if(hispPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(6) < leastTotPop)
                            leastTotPop = pop.get(6);
                    }
                    else{
                        float asianPopRatio = (float)pop.get(4)/pop.get(6);
                        if(asianPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(6) < leastTotPop)
                            leastTotPop = pop.get(6);
                    }

                    if(pop.get(6) > mostPopulous)
                        mostPopulous = pop.get(6);
                    if(pop.get(6) < leastPopulous)
                        leastPopulous = pop.get(6);
                }

                if(mostPopulous != 0 && leastPopulous != 0){
                    double diff = (double)(mostPopulous - leastPopulous) / mostPopulous * 10;
                    if(diff <= equalPopThres){
                        remaining += 1;
                        if(mmDistricts >= numDistricts && leastTotPop == 5000)
                            districtings.add(districtingRepository.findById(i));
                    }
                }
            }

            afterEqualPopThres = numDistrictings - remaining;
            afterMinority = remaining - districtings.size();
            remaining = districtings.size();

            // Check which districtings meet compactness criteria
            for(int i = 0; i < districtings.size(); i++){
                if(districtings.get(i).get().getCompactness() < compactness){
                    districtings.remove(i);
                    i--;
                }
            }

            afterCompactness = remaining - districtings.size();
            remaining = districtings.size();

            // Check which districtings meet protected incumbents criteria
            for(int i = 0; i < districtings.size(); i++){
                List<Boolean> protectedIncumbents = new ArrayList<>();
                for(int j = 0; j < incumbents.size(); j++){
                    if(incumbents.get(j).equals("district_1_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc1());
                    else if(incumbents.get(j).equals("district_2_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc2());
                    else if(incumbents.get(j).equals("district_3_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc3());
                    else if(incumbents.get(j).equals("district_4_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc4());
                    else if(incumbents.get(j).equals("district_5_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc5());
                    else if(incumbents.get(j).equals("district_6_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc6());
                    else if(incumbents.get(j).equals("district_7_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc7());
                    else if(incumbents.get(j).equals("district_8_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc8());
                    else if(incumbents.get(j).equals("district_9_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc9());
                    else if(incumbents.get(j).equals("district_10_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc10());
                    else if(incumbents.get(j).equals("district_11_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc11());
                    else if(incumbents.get(j).equals("district_12_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc12());
                    else if(incumbents.get(j).equals("district_13_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc13());
                    else if(incumbents.get(j).equals("district_14_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc14());
                }

                for(int k = 0; k < protectedIncumbents.size(); k++){
                    if(!protectedIncumbents.get(k)){
                        districtings.remove(i);
                        break;
                    }
                }
            }

            afterIncumbents = remaining - districtings.size();
            remaining = districtings.size();
        }

        // For total voting age population
        else{
            // Check which districtings meet MM criteria
            for(int i = 2; i <= numDistrictings; i++){
                List<List<Integer>> pops = districtRepository.findByDistrictingId(i);
                int mostPopulous = 0;
                int leastPopulous = 10000000;
                int leastTotPop = 5000;

                int mmDistricts = 0;
                for(List<Integer> pop: pops){
                    if(minority.equals("black")){
                        float blackPopRatio = (float)pop.get(1)/pop.get(7);
                        if(blackPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(7) < leastTotPop)
                            leastTotPop = pop.get(7);

                    }
                    else if(minority.equals("hispanic")){
                        float hispPopRatio = (float)pop.get(3)/pop.get(7);
                        if(hispPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(7) < leastTotPop)
                            leastTotPop = pop.get(7);
                    }
                    else{
                        float asianPopRatio = (float)pop.get(5)/pop.get(7);
                        if(asianPopRatio >= thres)
                            mmDistricts+=1;
                        if(pop.get(7) < leastTotPop)
                            leastTotPop = pop.get(7);
                    }

                    if(pop.get(7) > mostPopulous)
                        mostPopulous = pop.get(7);
                    if(pop.get(7) < leastPopulous)
                        leastPopulous = pop.get(7);
                }

                if(mostPopulous != 0 && leastPopulous != 0){
                    double diff = (double)(mostPopulous - leastPopulous) / mostPopulous * 10;
                    if(diff <= equalPopThres){
                        remaining += 1;
                        if(mmDistricts >= numDistricts && leastTotPop == 5000)
                            districtings.add(districtingRepository.findById(i));
                    }
                }
            }

            afterEqualPopThres = numDistrictings - remaining;
            afterMinority = remaining - districtings.size();
            remaining = districtings.size();

            // Check which districtings meet compactness criteria
            for(int i = 0; i < districtings.size(); i++){
                if(districtings.get(i).get().getCompactness() < compactness){
                    districtings.remove(i);
                    i--;
                }
            }

            afterCompactness = remaining - districtings.size();
            remaining = districtings.size();

            // Check which districtings meet protected incumbents criteria
            for(int i = 0; i < districtings.size(); i++){
                List<Boolean> protectedIncumbents = new ArrayList<>();
                for(int j = 0; j < incumbents.size(); j++){
                    if(incumbents.get(j).equals("district_1_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc1());
                    else if(incumbents.get(j).equals("district_2_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc2());
                    else if(incumbents.get(j).equals("district_3_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc3());
                    else if(incumbents.get(j).equals("district_4_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc4());
                    else if(incumbents.get(j).equals("district_5_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc5());
                    else if(incumbents.get(j).equals("district_6_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc6());
                    else if(incumbents.get(j).equals("district_7_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc7());
                    else if(incumbents.get(j).equals("district_8_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc8());
                    else if(incumbents.get(j).equals("district_9_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc9());
                    else if(incumbents.get(j).equals("district_10_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc10());
                    else if(incumbents.get(j).equals("district_11_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc11());
                    else if(incumbents.get(j).equals("district_12_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc12());
                    else if(incumbents.get(j).equals("district_13_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc13());
                    else if(incumbents.get(j).equals("district_14_incumbent"))
                        protectedIncumbents.add(districtings.get(i).get().getInc14());
                }

                for(int k = 0; k < protectedIncumbents.size(); k++){
                    if(!protectedIncumbents.get(k)){
                        districtings.remove(i);
                        break;
                    }
                }
            }

            afterIncumbents = remaining - districtings.size();
            remaining = districtings.size();
        }

        districtingsInfo[0] = afterEqualPopThres;
        districtingsInfo[1] = afterMinority;
        districtingsInfo[2] = afterCompactness;
        districtingsInfo[3] = afterIncumbents;
        districtingsInfo[4] = remaining;

        // Add to Object array the final constrained set
        districtings.forEach((districting -> {
            Double[] measures = new Double[4];
            ids.add(districting.get().getId());
            measures[0] = districting.get().getCompactness();
            measures[1] = districting.get().getDevArea();
            measures[2] = districting.get().getDevPop();
            if(minority.equals("black"))
                measures[3] = districting.get().getDevB();
            else if(minority.equals("hispanic"))
                measures[3] = districting.get().getDevH();
            else
                measures[3] = districting.get().getDevA();
            info.add(measures);
        }));
        districtingsInfo[5] = ids;
        districtingsInfo[6] = info;

        return districtingsInfo;
    }

}
