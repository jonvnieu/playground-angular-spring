package com.github.jonvnieu.heroes;

/**
 * Hero Bean.
 */
public class Hero {

    private final long id;
    private final String name;

    public Hero(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
