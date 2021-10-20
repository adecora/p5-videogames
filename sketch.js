import "./style.css";

import p5 from "p5";
import "p5/lib/addons/p5.sound";

new p5((sketch) => {
    // We made sketch available global to developer purpose only
    window.sketch = sketch;


    function readRandom(obj) {
        let len = obj.length;
        return obj[sketch.floor(sketch.random(len))];
    }

    let song, fft;
    const canvasSize = {
        w: 1200,
        h: 800
    };

    const colors = [
        [125, 0, 0],
        [0, 125, 0],
        [0, 0, 125]
    ];

    let color = readRandom(colors);

    const canvasBackground = [
        [0, 0, canvasSize.w / 3, canvasSize.h ],
        [canvasSize.w / 3, 0, canvasSize.w / 3 * 2, canvasSize.h ],
        [canvasSize.w / 3 * 2, 0, canvasSize.w, canvasSize.h ]
    ];


    sketch.preload = () => {
        console.log("PRELOAD");
        song = sketch.loadSound("assets/videogame1.mp3");
        // song = sketch.loadSound("assets/videogame2.mp3");
    };

    sketch.setup = () => {
        console.log("SETUP");
        let canvas = sketch.createCanvas(canvasSize.w, canvasSize.h);
        canvas.mouseClicked(togglePlay);

        fft = new p5.FFT();
        window.fft = fft;
        window.spectrum = fft.analyze();
        window.waveform = fft.waveform();

        song.setVolume(0.5);
    };

    // Math.floor(Math.random() * 3)

    sketch.draw = () => {
        sketch.background(220);

        let spectrum = fft.analyze();

        

        let getEnergies = [
            sketch.map(fft.getEnergy("bass"), 0, 255, 0, 1.5),
            sketch.map(fft.getEnergy("mid"), 0, 255, 0, 1.5),
            (sketch.map(fft.getEnergy("treble"), 0, 255, 0, 1.5) + 1) * 10,
        ];
        
        //console.table(getEnergies);

        canvasBackground.forEach(([x, y, w, h], idx) => {
            sketch.push();
            sketch.noStroke();
            sketch.fill([...color.map((el) => el * getEnergies[idx]), 100]);
            sketch.rect(x, y, w, h);
            sketch.pop();
        });


        // sketch.rect(0, 0, 100, 500);
        // sketch.rect(100, canvasSize.h - 500, 100, 500);
        // sketch.rect(200, canvasSize.h, 100, -500);
        






                    // sketch.noStroke();
                    // sketch.fill(255, 0, 255);

                    
                    // for(let i = 0; i < spectrum.length * 0.4; i++) {
                    //     let x = sketch.map(i, 0, spectrum.length * 0.4, 0, canvasSize.w)
                    //     let y = sketch.map(spectrum[i], 0, 255, canvasSize.h, 0);
                    //     let rec = {
                    //         w: canvasSize.w / (spectrum.length * 0.4),
                    //         h: -sketch.map(spectrum[i], 0, 255, 0, canvasSize.h)
                    //     };

                    //     sketch.rect(x, canvasSize.h, rec.w, rec.h);
                    // }

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
        // let waveform = fft.waveform();
        // let max = sketch.max(waveform);
        // if (max * 4 > 1) {
        //     console.log(max, "SIP");
        // }
        // sketch.noFill();

        // sketch.strokeW;

        // sketch.beginShape();
        // sketch.noFill();
        // sketch.stroke(20);
        // for (let i = 0; i < waveform.length; i++) {
        //     let x = sketch.map(i, 0, waveform.length, 0, sketch.width);
        //     let y = sketch.map(waveform[i] * 4, -1, 1, sketch.height, 0);
        //     sketch.vertex(x, y);
        // }
        // sketch.endShape();

        //sketch.text("tap to play", 20, 20);
    };

    const togglePlay = () => {
        if (song.isPlaying()) {
            song.pause();
        } else {
            song.loop();
        }
    };
});
