package com.TP4.Mapamundi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.TP4.Mapamundi.model.Provincia;

public interface ProvinciaRepository extends JpaRepository<Provincia, Long> {
    List<Provincia> findByPaisNombreIgnoreCase(String nombrePais);
}
