package com.TP4.Mapamundi.config;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.TP4.Mapamundi.model.Continente;
import com.TP4.Mapamundi.model.Pais;
import com.TP4.Mapamundi.model.Provincia;
import com.TP4.Mapamundi.repository.ContinenteRepository;
import com.TP4.Mapamundi.repository.PaisRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final PaisRepository paisRepository;
    private final ContinenteRepository continenteRepository;

    @PostConstruct
    @Transactional
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = new ClassPathResource("paises.json").getInputStream();
            List<PaisDTO> paisDTOs = mapper.readValue(inputStream, new TypeReference<>() {});

            Map<String, Continente> continentesMap = new HashMap<>();
            Map<String, Pais> paisesMap = new HashMap<>();

            // Primero se crean países sin límite
            for (PaisDTO dto : paisDTOs) {
                Continente continente = continentesMap.computeIfAbsent(dto.continente(), c -> {
                    Continente nuevo = new Continente(null, c, new HashSet<>());
                    continenteRepository.save(nuevo);
                    return nuevo;
                });

                List<Provincia> provincias = new ArrayList<>();
                Pais pais = new Pais(null, dto.nombre(), dto.capital(), dto.superficie(), continente, provincias, new HashSet<>());

                for (String nombreProv : dto.provincias()) {
                    Provincia provincia = new Provincia(null, nombreProv, pais);
                    provincias.add(provincia);
                }

                paisRepository.save(pais);
                paisesMap.put(dto.nombre(), pais);
            }

            // Luego se setean los países limítrofes
            for (PaisDTO dto : paisDTOs) {
                Pais pais = paisesMap.get(dto.nombre());
                Set<Pais> limitrofes = new HashSet<>();
                for (String nombreLimitrofe : dto.limitrofes()) {
                    Pais limitrofe = paisesMap.get(nombreLimitrofe);
                    if (limitrofe != null) limitrofes.add(limitrofe);
                }
                pais.setLimitrofes(limitrofes);
                paisRepository.save(pais);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // DTO interno
    public record PaisDTO(
        String nombre,
        String capital,
        double superficie,
        String continente,
        List<String> provincias,
        List<String> limitrofes
    ) {}
}
