import { Container, tsParticles } from "@tsparticles/engine";
import { loadStarsPreset } from "@tsparticles/preset-stars";

export class Background {
    private particles: Container;

    async init() {
        await loadStarsPreset(tsParticles)

        this.particles = await tsParticles.load({
            id: "tsparticles",
            options: {
                preset: "stars",
                background: { color: "transparent" },
                particles: { move: { speed: 1, random: true } },
            },
        });

        return this
    }
}