import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: 'http://localhost:3000'
    },
    env: {
        indexPage: 'http://localhost:3000',
        computer: {w: 1920, h: 1080},
        iPhone14: {w: 430, h: 932},
        galaxyS20Ultra: {w: 421, h: 915}
    }

});
