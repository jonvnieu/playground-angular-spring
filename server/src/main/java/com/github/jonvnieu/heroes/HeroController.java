package com.github.jonvnieu.heroes;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
public class HeroController {

    private static final String TEMPLATE = "Hello %s!";

    private final AtomicLong counter;

    public HeroController() {
        this.counter = new AtomicLong();
    }

    @RequestMapping(value = "/hero", method = RequestMethod.GET)
    public Hero getGreeting(@RequestParam(name = "hero", defaultValue = "Superman") String name) {
        return new Hero(counter.getAndIncrement(), name);
    }
}
