package Project.Models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "STATES")
public class State {

    private int id;
    private String stateSummary;
    private DistrictBounds districtBounds;
    private String name;

    public State(){

    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getStateSummary() {
        return stateSummary;
    }

    public void setStateSummary(String stateSummary) {
        this.stateSummary = stateSummary;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @OneToOne
    @JoinColumn(name = "bound_id", referencedColumnName = "id")
    public DistrictBounds getDistrictBounds() {
        return districtBounds;
    }

    public void setDistrictBounds(DistrictBounds districtBounds) {
        this.districtBounds = districtBounds;
    }

    @Override
    public String toString() {
        return "State{" +
                "id=" + id +
                ", stateSummary='" + stateSummary + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        State state = (State) o;
        return id == state.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
