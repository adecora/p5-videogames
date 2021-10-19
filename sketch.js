import "./style.css";

import p5 from "p5";
import "p5/lib/addons/p5.sound";

new p5((sketch) => {
    // We made sketch available global to debug it
    window.sketch = sketch;

    let song, fft;

    sketch.preload = () => {
        console.log("PRELOAD");
        song = sketch.loadSound("assets/videogame1.mp3");
        console.log(song);
    };

    sketch.setup = () => {
        console.log("SETUP");
        let canvas = sketch.createCanvas(800, 400);
        canvas.mouseClicked(togglePlay);

        fft = new p5.FFT();
        window.fft = fft;
        window.spectrum = fft.analyze(22050);
        window.waveform = fft.waveform();

        song.setVolume(1);
    };

    sketch.draw = () => {
        sketch.background(220);

        let spectrum = fft.analyze();

        // sketch.noStroke();
        // sketch.fill(255, 0, 255);
        // sketch.rect(0, sketch.height, 100, -sketch.height + 100);
        // for (let i = 0; i < spectrum.length; i++) {
        //     let x = sketch.map(i, 0, spectrum.length, 0, sketch.width);
        //     let h =
        //         -sketch.height +
        //         sketch.map(spectrum[i], 0, 255, sketch.height, 0);
        //     sketch.rect(x, sketch.height, sketch.width / spectrum.length, h);
        // }
        //console.log(fft);
        let waveform = fft.waveform();
        let max = sketch.max(waveform);
        if (max * 4 > 1) {
            console.log(max, "SIP");
        }
        // sketch.noFill();

        // sketch.strokeW;

        sketch.beginShape();
        sketch.noFill();
        sketch.stroke(20);
        for (let i = 0; i < waveform.length; i++) {
            let x = sketch.map(i, 0, waveform.length, 0, sketch.width);
            let y = sketch.map(waveform[i] * 4, -1, 1, sketch.height, 0);
            sketch.vertex(x, y);
        }
        sketch.endShape();

        sketch.text("tap to play", 20, 20);
    };

    const togglePlay = () => {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.loop();
        }
    };
});
