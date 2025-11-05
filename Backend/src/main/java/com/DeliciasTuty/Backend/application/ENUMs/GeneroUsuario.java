package com.DeliciasTuty.Backend.application.ENUMs;

public enum GeneroUsuario {
    M("Masculino"),
    F("Feminino"),
    NB("Não binário");

    private final String genero;

    GeneroUsuario(String genero) {
        this.genero = genero;
    }

    public String getGenero() {
        return genero;
    }
}
