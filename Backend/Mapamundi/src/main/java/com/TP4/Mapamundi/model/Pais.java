package com.TP4.Mapamundi.model;

import java.util.List;
import java.util.Set;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Pais {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @EqualsAndHashCode.Include
    private String nombre;

    private String capital;

    private double superficie;

    @ManyToOne
    @JoinColumn(name = "continente_id")
    private Continente continente;

    @OneToMany(mappedBy = "pais", cascade = CascadeType.ALL)
    private List<Provincia> provincias;

    @ManyToMany
    @JoinTable(
        name = "pais_limitrofes",
        joinColumns = @JoinColumn(name = "pais_id"),
        inverseJoinColumns = @JoinColumn(name = "limitrofe_id")
    )
    private Set<Pais> limitrofes;
}
