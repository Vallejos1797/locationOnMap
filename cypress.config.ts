import {defineConfig} from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        },
        baseUrl: 'http://localhost:3000'
    },
    env: {
        indexPage: 'http://localhost:3000',
        computer: {width: 1920, height: 1080},
        iPhone14: {width: 430, height: 932},
        galaxyS20Ultra: {width: 421, height: 915}
    }

});
