package com.TP4.Mapamundi.config;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.TP4.Mapamundi.model.Continente;
import com.TP4.Mapamundi.model.Pais;
import com.TP4.Mapamundi.model.Provincia;
import com.TP4.Mapamundi.repository.ContinenteRepository;
import com.TP4.Mapamundi.repository.PaisRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataLoader {

    private final ContinenteRepository continenteRepository;
    private final PaisRepository paisRepository;

    @PostConstruct
    @Transactional
    public void init() {
        Continente america = new Continente(null, "América", null);
        Continente europa = new Continente(null, "Europa", null);

        continenteRepository.saveAll(List.of(america, europa));

        Provincia pBuenosAires = new Provincia(null, "Buenos Aires", null);
        Provincia pCordoba = new Provincia(null, "Córdoba", null);
        Provincia pSantaFe = new Provincia(null, "Santa Fe", null);

        Pais argentina = new Pais(null, "Argentina", "Buenos Aires", 2780400, america,
                List.of(pBuenosAires, pCordoba, pSantaFe), null);
        // Asociar provincias con país (porque provincias tienen campo Pais)
        pBuenosAires.setPais(argentina);
        pCordoba.setPais(argentina);
        pSantaFe.setPais(argentina);

        Provincia pSaoPaulo = new Provincia(null, "São Paulo", null);
        Provincia pRioJaneiro = new Provincia(null, "Rio de Janeiro", null);

        Pais brasil = new Pais(null, "Brasil", "Brasilia", 8515767, america,
                List.of(pSaoPaulo, pRioJaneiro), null);
        pSaoPaulo.setPais(brasil);
        pRioJaneiro.setPais(brasil);

        Pais bolivia = new Pais(null, "Bolivia", "Sucre", 1098581, america, List.of(), null);
        Pais chile = new Pais(null, "Chile", "Santiago", 756102, america, List.of(), null);
        Pais uruguay = new Pais(null, "Uruguay", "Montevideo", 176215, america, List.of(), null);
        Pais espana = new Pais(null, "España", "Madrid", 505990, europa, List.of(), null);

        paisRepository.saveAll(List.of(argentina, brasil, bolivia, chile, uruguay, espana));

        // Limítrofes
        argentina.setLimitrofes(Set.of(brasil, bolivia, chile, uruguay));
        brasil.setLimitrofes(Set.of(argentina, bolivia, uruguay));
        bolivia.setLimitrofes(Set.of(argentina, brasil, chile));
        chile.setLimitrofes(Set.of(argentina, bolivia));
        uruguay.setLimitrofes(Set.of(argentina, brasil));
        espana.setLimitrofes(Set.of());

        paisRepository.saveAll(List.of(argentina, brasil, bolivia, chile, uruguay, espana));
    }
}
