package com.TP4.Mapamundi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TP4.Mapamundi.model.Continente;

public interface ContinenteRepository extends JpaRepository<Continente, Long> {

    Optional<Continente> findByNombreIgnoreCase(String nombre);

}
