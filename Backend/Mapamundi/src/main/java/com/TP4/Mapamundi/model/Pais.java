package com.TP4.Mapamundi.model;

import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
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
    @JsonBackReference // <--- evita ciclo con Continente.paises
    private Continente continente;

    @OneToMany(mappedBy = "pais", cascade = CascadeType.ALL)
    @JsonManagedReference // <--- evita ciclo con Provincia.pais
    private List<Provincia> provincias;

    @ManyToMany
    @JoinTable(
        name = "pais_limitrofes",
        joinColumns = @JoinColumn(name = "pais_id"),
        inverseJoinColumns = @JoinColumn(name = "limitrofe_id")
    )
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true) // <--- evita ciclo serializando sólo el id de los limitrofes
    private Set<Pais> limitrofes;
}
